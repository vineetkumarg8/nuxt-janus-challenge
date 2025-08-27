import { ref, onUnmounted, readonly } from 'vue'

declare global {
  interface Window {
    Janus: any;
  }
}

let Janus: any = null

export interface JanusState {
  connected: boolean
  error: string | null
  loading: boolean
}

export const useJanus = () => {
  const state = ref<JanusState>({
    connected: false,
    error: null,
    loading: false
  })

  let janus: any = null
  const config = useRuntimeConfig()

  const initJanus = async (): Promise<boolean> => {
    return new Promise(async (resolve, reject) => {
      // Load Janus library dynamically
      if (!Janus && process.client) {
        try {
          const janusModule = await import('typed_janus_js')
          Janus = janusModule.Janus
        } catch (e) {
          state.value.error = 'Failed to load Janus library'
          reject(new Error('Failed to load Janus library'))
          return
        }
      }

      if (!Janus) {
        state.value.error = 'Janus library not available'
        reject(new Error('Janus library not available'))
        return
      }

      state.value.loading = true
      state.value.error = null

      try {
        Janus.init({
          debug: "all",
          callback: () => {
            // Create Janus session
            janus = new Janus({
              server: config.public.janusUrl,
              success: () => {
                state.value.connected = true
                state.value.loading = false
                console.log('Janus session created successfully')
                resolve(true)
              },
              error: (error: any) => {
                state.value.error = `Failed to create Janus session: ${error}`
                state.value.loading = false
                console.error('Janus session error:', error)
                reject(error)
              },
              destroyed: () => {
                state.value.connected = false
                console.log('Janus session destroyed')
              }
            })
          }
        })
      } catch (error) {
        state.value.error = `Failed to initialize Janus: ${error}`
        state.value.loading = false
        reject(error)
      }
    })
  }

  const destroyJanus = () => {
    if (janus) {
      janus.destroy()
      janus = null
    }
    state.value.connected = false
  }

  const getJanusInstance = () => janus

  // Cleanup on component unmount
  onUnmounted(() => {
    destroyJanus()
  })

  return {
    state: readonly(state),
    initJanus,
    destroyJanus,
    getJanusInstance
  }
}
