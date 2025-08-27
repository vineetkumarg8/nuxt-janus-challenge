<template>
  <div class="card w-full max-w-2xl">
    <div class="card-header">
      <div class="flex items-center justify-between">
        <h3 class="text-lg font-semibold">Viewer - Streaming</h3>
        <span
          :class="getStatusClass()"
          class="badge"
        >
          {{ getStatusText() }}
        </span>
      </div>
    </div>

    <div class="card-body space-y-4">
      <!-- Mountpoint Selection -->
      <div class="form-group">
        <label class="form-label">Select Mountpoint:</label>
        <div class="flex gap-2">
          <select
            v-model="selectedMountpointId"
            class="form-select flex-1"
            :disabled="streamingState.playing"
          >
            <option value="">Choose a mountpoint...</option>
            <option
              v-for="option in mountpointOptions"
              :key="option.value"
              :value="option.value"
            >
              {{ option.label }}
            </option>
          </select>
          <button
            @click="handleRefreshMountpoints"
            :disabled="refreshing"
            class="btn btn-secondary"
          >
            {{ refreshing ? 'Refreshing...' : 'Refresh' }}
          </button>
        </div>
      </div>

      <!-- Video Player -->
      <div class="video-container">
        <video
          ref="remoteVideoRef"
          autoplay
          playsinline
          controls
        />
        <div
          v-if="!streamingState.remoteStream"
          class="video-placeholder"
        >
          <div class="text-center">
            <svg width="48" height="48" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p style="margin-top: 0.5rem;">Select a mountpoint and click Play</p>
          </div>
        </div>
      </div>

      <!-- Stream Info -->
      <div v-if="streamingState.selectedMountpoint" style="font-size: 0.875rem;" class="space-y-1">
        <div>
          <span class="font-semibold">Description:</span>
          <span style="margin-left: 0.5rem;">{{ streamingState.selectedMountpoint.description }}</span>
        </div>
        <div>
          <span class="font-semibold">Room ID:</span>
          <span style="margin-left: 0.5rem;">{{ streamingState.selectedMountpoint.roomId }}</span>
        </div>
        <div>
          <span class="font-semibold">Created:</span>
          <span style="margin-left: 0.5rem;">{{ formatDate(streamingState.selectedMountpoint.createdAt) }}</span>
        </div>
      </div>

      <!-- Error Display -->
      <div
        v-if="janusState.error || streamingState.error"
        class="alert alert-error"
      >
        <div class="flex">
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
          <div style="margin-left: 0.75rem;">
            <p>{{ janusState.error || streamingState.error }}</p>
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
          v-if="janusState.connected && !streamingState.playing"
          :disabled="!selectedMountpointId"
          @click="handlePlay"
          class="btn btn-success"
        >
          Play Stream
        </button>

        <button
          v-if="streamingState.playing"
          @click="handleStop"
          class="btn btn-danger"
        >
          Stop Stream
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const remoteVideoRef = ref<HTMLVideoElement>()
const selectedMountpointId = ref<number>()
const refreshing = ref(false)

// Composables
const { state: janusState, initJanus } = useJanus()
const { 
  state: streamingState, 
  fetchMountpoints, 
  startStreaming, 
  stopStreaming,
  setRemoteVideoElement
} = useStreaming()

// Watch for remote video element
watch(remoteVideoRef, (element) => {
  if (element) {
    setRemoteVideoElement(element)
  }
})

// Computed
const mountpointOptions = computed(() => {
  return streamingState.value.mountpoints.map(mp => ({
    label: `${mp.description} (ID: ${mp.id})`,
    value: mp.id
  }))
})

// Status helpers
const getStatusClass = () => {
  if (!janusState.value.connected) return 'badge-gray'
  if (streamingState.value.playing) return 'badge-green'
  return 'badge-blue'
}

const getStatusText = () => {
  if (!janusState.value.connected) return 'Disconnected'
  if (streamingState.value.playing) return 'Playing'
  return 'Connected'
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleString()
}

// Event handlers
const handleConnect = async () => {
  try {
    await initJanus()
    await handleRefreshMountpoints()
  } catch (error) {
    console.error('Failed to connect to Janus:', error)
  }
}

const handleRefreshMountpoints = async () => {
  refreshing.value = true
  try {
    await fetchMountpoints()
  } catch (error) {
    console.error('Failed to fetch mountpoints:', error)
  } finally {
    refreshing.value = false
  }
}

const handlePlay = async () => {
  if (!selectedMountpointId.value) return
  
  try {
    await startStreaming(selectedMountpointId.value)
  } catch (error) {
    console.error('Failed to start streaming:', error)
  }
}

const handleStop = () => {
  stopStreaming()
}

// Initialize mountpoints on mount
onMounted(() => {
  handleRefreshMountpoints()
})
</script>
