import { ref, readonly } from 'vue'

export interface StreamingState {
  playing: boolean
  selectedMountpoint: any | null
  remoteStream: MediaStream | null
  error: string | null
  mountpoints: any[]
}

export const useStreaming = () => {
  const { getJanusInstance } = useJanus()
  
  const state = ref<StreamingState>({
    playing: false,
    selectedMountpoint: null,
    remoteStream: null,
    error: null,
    mountpoints: []
  })

  let streamingPlugin: any = null
  let remoteVideoElement: HTMLVideoElement | null = null

  const fetchMountpoints = async () => {
    try {
      const mountpoints = await $fetch('/api/mountpoints')
      state.value.mountpoints = mountpoints
      return mountpoints
    } catch (error) {
      state.value.error = `Failed to fetch mountpoints: ${error}`
      throw error
    }
  }

  const startStreaming = async (mountpointId: number): Promise<void> => {
    return new Promise((resolve, reject) => {
      const janus = getJanusInstance()
      if (!janus) {
        reject(new Error('Janus not initialized'))
        return
      }

      const selectedMountpoint = state.value.mountpoints.find(mp => mp.id === mountpointId)
      if (!selectedMountpoint) {
        reject(new Error('Mountpoint not found'))
        return
      }

      state.value.selectedMountpoint = selectedMountpoint

      janus.attach({
        plugin: "janus.plugin.streaming",
        success: (pluginHandle: any) => {
          streamingPlugin = pluginHandle
          console.log('Streaming plugin attached')
          
          // Start watching the stream
          const watchRequest = {
            request: "watch",
            id: mountpointId
          }
          
          streamingPlugin.send({ message: watchRequest })
        },
        error: (error: any) => {
          state.value.error = `Failed to attach streaming plugin: ${error}`
          reject(error)
        },
        onmessage: (msg: any, jsep: any) => {
          const result = msg.result
          
          if (result && result.status === "preparing") {
            console.log('Preparing to receive stream...')
          } else if (result && result.status === "starting") {
            console.log('Stream is starting...')
            state.value.playing = true
            resolve()
          } else if (msg.error) {
            state.value.error = msg.error_code ? `Error ${msg.error_code}: ${msg.error}` : msg.error
            reject(new Error(state.value.error))
          }
          
          if (jsep) {
            streamingPlugin.createAnswer({
              jsep: jsep,
              media: { audioSend: false, videoSend: false },
              success: (jsep: any) => {
                streamingPlugin.send({ message: { request: "start" }, jsep: jsep })
              },
              error: (error: any) => {
                state.value.error = `Failed to create answer: ${error}`
                reject(error)
              }
            })
          }
        },
        onremotestream: (stream: MediaStream) => {
          console.log('Received remote stream')
          state.value.remoteStream = stream
          if (remoteVideoElement) {
            remoteVideoElement.srcObject = stream
          }
        },
        oncleanup: () => {
          console.log('Streaming cleanup')
          state.value.playing = false
          state.value.remoteStream = null
          if (remoteVideoElement) {
            remoteVideoElement.srcObject = null
          }
        }
      })
    })
  }

  const stopStreaming = () => {
    if (streamingPlugin) {
      streamingPlugin.send({ message: { request: "stop" } })
      streamingPlugin.detach()
      streamingPlugin = null
    }
    
    state.value.playing = false
    state.value.selectedMountpoint = null
    state.value.remoteStream = null
    
    if (remoteVideoElement) {
      remoteVideoElement.srcObject = null
    }
  }

  const setRemoteVideoElement = (element: HTMLVideoElement) => {
    remoteVideoElement = element
    if (state.value.remoteStream) {
      element.srcObject = state.value.remoteStream
    }
  }

  return {
    state: readonly(state),
    fetchMountpoints,
    startStreaming,
    stopStreaming,
    setRemoteVideoElement
  }
}
