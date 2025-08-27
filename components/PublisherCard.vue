<template>
  <div class="card w-full max-w-2xl">
    <div class="card-header">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Publisher - Videoroom</h3>
        <span
          :class="getStatusClass()"
          class="badge"
        >
          {{ getStatusText() }}
        </span>
      </div>
    </div>

    <div class="card-body space-y-4">
      <!-- Video Preview -->
      <div class="video-container">
        <video
          ref="localVideoRef"
          autoplay
          muted
          playsinline
        />
        <div
          v-if="!videoroomState.localStream"
          class="video-placeholder"
        >
          <div class="text-center">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <p style="margin-top: 0.5rem;">No video stream</p>
          </div>
        </div>
      </div>

      <!-- Room Info -->
      <div class="grid grid-cols-2 gap-4" style="font-size: 0.875rem;">
        <div>
          <span class="font-semibold">Room ID:</span>
          <span style="margin-left: 0.5rem;">{{ videoroomState.roomId }}</span>
        </div>
        <div v-if="videoroomState.publisherId">
          <span class="font-semibold">Publisher ID:</span>
          <span style="margin-left: 0.5rem;">{{ videoroomState.publisherId }}</span>
        </div>
      </div>

      <!-- Error Display -->
      <div
        v-if="janusState.error || videoroomState.error"
        class="alert alert-error"
      >
        <div class="flex">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <div style="margin-left: 0.75rem;">
            <p>{{ janusState.error || videoroomState.error }}</p>
          </div>
        </div>
      </div>

      <!-- Controls -->
      <div class="flex flex-wrap gap-2">
        <button
          v-if="!janusState.connected"
          :disabled="janusState.loading"
          @click="handleConnect"
          class="btn btn-primary"
        >
          {{ janusState.loading ? 'Connecting...' : 'Connect to Janus' }}
        </button>

        <button
          v-if="janusState.connected && !videoroomState.joined"
          @click="handleJoinRoom"
          class="btn btn-success"
        >
          Join Room
        </button>

        <button
          v-if="videoroomState.joined && !videoroomState.publishing"
          @click="handleStartPublishing"
          class="btn btn-warning"
        >
          Start Publishing
        </button>

        <button
          v-if="videoroomState.publishing"
          @click="handleStopPublishing"
          class="btn btn-danger"
        >
          Stop Publishing
        </button>

        <button
          v-if="videoroomState.publishing"
          @click="handleRegisterMountpoint"
          class="btn"
          style="background-color: #7c3aed; color: white;"
        >
          Register Mountpoint
        </button>

        <button
          v-if="videoroomState.joined"
          @click="handleLeaveRoom"
          class="btn btn-secondary"
        >
          Leave Room
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const localVideoRef = ref<HTMLVideoElement>()

// Composables
const { state: janusState, initJanus } = useJanus()
const { 
  state: videoroomState, 
  joinRoom, 
  startPublishing, 
  stopPublishing, 
  leaveRoom,
  setLocalVideoElement,
  registerMountpoint
} = useVideoroom()

// Watch for local video element
watch(localVideoRef, (element) => {
  if (element) {
    setLocalVideoElement(element)
  }
})

// Status helpers
const getStatusClass = () => {
  if (!janusState.value.connected) return 'badge-gray'
  if (videoroomState.value.publishing) return 'badge-green'
  if (videoroomState.value.joined) return 'badge-blue'
  return 'badge-yellow'
}

const getStatusText = () => {
  if (!janusState.value.connected) return 'Disconnected'
  if (videoroomState.value.publishing) return 'Publishing'
  if (videoroomState.value.joined) return 'Joined'
  return 'Connected'
}

// Event handlers
const handleConnect = async () => {
  try {
    await initJanus()
  } catch (error) {
    console.error('Failed to connect to Janus:', error)
  }
}

const handleJoinRoom = async () => {
  try {
    await joinRoom()
  } catch (error) {
    console.error('Failed to join room:', error)
  }
}

const handleStartPublishing = async () => {
  try {
    await startPublishing()
  } catch (error) {
    console.error('Failed to start publishing:', error)
  }
}

const handleStopPublishing = () => {
  stopPublishing()
}

const handleLeaveRoom = () => {
  leaveRoom()
}

const handleRegisterMountpoint = async () => {
  try {
    const mountpoint = await registerMountpoint()
    console.log('Mountpoint registered:', mountpoint)
    // You could show a success notification here
  } catch (error) {
    console.error('Failed to register mountpoint:', error)
  }
}
</script>