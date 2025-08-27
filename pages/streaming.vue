<template>
  <div class="min-h-screen py-8">
    <div class="container max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">
          Janus WebRTC Viewer
        </h1>
        <p style="color: #6b7280;">
          Select and watch live streams from publishers
        </p>
      </div>

      <!-- Navigation -->
      <div class="flex justify-center mb-8">
        <div class="flex gap-4">
          <NuxtLink
            to="/videoroom"
            class="btn btn-secondary"
          >
            Publisher
          </NuxtLink>
          <NuxtLink
            to="/streaming"
            class="btn btn-primary"
          >
            Viewer
          </NuxtLink>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex justify-center">
        <ViewerCard />
      </div>

      <!-- Instructions -->
      <div class="mt-8 max-w-2xl mx-auto">
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold">How to Use</h3>
          </div>
          <div class="card-body">
            <div class="space-y-4" style="font-size: 0.875rem;">
              <div class="flex items-start gap-4">
                <span class="badge badge-green">1</span>
                <div>
                  <p class="font-semibold">Connect to Janus</p>
                  <p style="color: #6b7280;">Click "Connect to Janus" to establish a connection to the WebRTC gateway.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="badge badge-green">2</span>
                <div>
                  <p class="font-semibold">Select Mountpoint</p>
                  <p style="color: #6b7280;">Choose a mountpoint from the dropdown. These are streams registered by publishers.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="badge badge-green">3</span>
                <div>
                  <p class="font-semibold">Play Stream</p>
                  <p style="color: #6b7280;">Click "Play Stream" to start watching the selected live stream.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="badge badge-green">4</span>
                <div>
                  <p class="font-semibold">Refresh Mountpoints</p>
                  <p style="color: #6b7280;">Use the refresh button to check for new streams from publishers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set page meta
definePageMeta({
  title: 'Viewer - Streaming'
})

// Set head
useHead({
  title: 'Viewer - Janus WebRTC Demo',
  meta: [
    {
      name: 'description',
      content: 'Watch live streams from Janus publishers'
    }
  ]
})
</script>
