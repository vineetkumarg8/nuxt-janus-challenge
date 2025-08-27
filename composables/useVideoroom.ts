import { ref, readonly } from 'vue'

export interface VideoroomState {
  joined: boolean
  publishing: boolean
  roomId: number
  publisherId: number | null
  localStream: MediaStream | null
  error: string | null
}

export const useVideoroom = () => {
  const { getJanusInstance } = useJanus()
  
  const state = ref<VideoroomState>({
    joined: false,
    publishing: false,
    roomId: 1234, // Default room ID
    publisherId: null,
    localStream: null,
    error: null
  })

  let videoroomPlugin: any = null
  let localVideoElement: HTMLVideoElement | null = null

  const joinRoom = async (roomId: number = 1234): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const janus = getJanusInstance()
      if (!janus) {
        reject(new Error('Janus not initialized'))
        return
      }

      state.value.roomId = roomId

      janus.attach({
        plugin: "janus.plugin.videoroom",
        success: (pluginHandle: any) => {
          videoroomPlugin = pluginHandle
          console.log('Videoroom plugin attached')
          
          // Join the room
          const joinRequest = {
            request: "join",
            room: roomId,
            ptype: "publisher",
            display: `Publisher-${Date.now()}`
          }
          
          videoroomPlugin.send({ message: joinRequest })
        },
        error: (error: any) => {
          state.value.error = `Failed to attach videoroom plugin: ${error}`
          reject(error)
        },
        onmessage: (msg: any, jsep: any) => {
          const event = msg.videoroom
          
          if (event === "joined") {
            state.value.joined = true
            state.value.publisherId = msg.id
            console.log('Successfully joined room', roomId, 'as publisher', msg.id)
            resolve(true)
          } else if (event === "event" && msg.error) {
            state.value.error = msg.error_code ? `Error ${msg.error_code}: ${msg.error}` : msg.error
            reject(new Error(state.value.error))
          }
          
          if (jsep) {
            videoroomPlugin.handleRemoteJsep({ jsep })
          }
        },
        onlocalstream: (stream: MediaStream) => {
          state.value.localStream = stream
          if (localVideoElement) {
            localVideoElement.srcObject = stream
          }
        }
      })
    })
  }

  const startPublishing = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (!videoroomPlugin) {
        reject(new Error('Not joined to room'))
        return
      }

      // Get user media
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        state.value.localStream = stream
        
        // Configure and publish
        const publishRequest = {
          request: "configure",
          audio: true,
          video: true
        }
        
        videoroomPlugin.createOffer({
          stream: stream,
          success: (jsep: any) => {
            videoroomPlugin.send({
              message: publishRequest,
              jsep: jsep
            })
          },
          error: (error: any) => {
            state.value.error = `Failed to create offer: ${error}`
            reject(error)
          }
        })
        
        state.value.publishing = true
        resolve()
      }).catch((error) => {
        state.value.error = `Failed to get user media: ${error}`
        reject(error)
      })
    })
  }

  const stopPublishing = () => {
    if (state.value.localStream) {
      state.value.localStream.getTracks().forEach(track => track.stop())
      state.value.localStream = null
    }
    
    if (videoroomPlugin) {
      videoroomPlugin.send({ message: { request: "unpublish" } })
    }
    
    state.value.publishing = false
  }

  const leaveRoom = () => {
    stopPublishing()
    
    if (videoroomPlugin) {
      videoroomPlugin.detach()
      videoroomPlugin = null
    }
    
    state.value.joined = false
    state.value.publisherId = null
  }

  const setLocalVideoElement = (element: HTMLVideoElement) => {
    localVideoElement = element
    if (state.value.localStream) {
      element.srcObject = state.value.localStream
    }
  }

  const registerMountpoint = async (description?: string) => {
    if (!state.value.publisherId || !state.value.joined) {
      throw new Error('Not publishing or not joined to room')
    }

    try {
      const response = await $fetch('/api/mountpoints', {
        method: 'POST',
        body: {
          description: description || `Stream from Publisher ${state.value.publisherId}`,
          roomId: state.value.roomId,
          publisherId: state.value.publisherId
        }
      })
      return response
    } catch (error) {
      state.value.error = `Failed to register mountpoint: ${error}`
      throw error
    }
  }

  return {
    state: readonly(state),
    joinRoom,
    startPublishing,
    stopPublishing,
    leaveRoom,
    setLocalVideoElement,
    registerMountpoint
  }
}
