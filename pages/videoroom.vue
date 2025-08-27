<template>
  <div class="min-h-screen py-8">
    <div class="container max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-2">
          Janus WebRTC Publisher
        </h1>
        <p style="color: #6b7280;">
          Join a videoroom and publish your webcam stream
        </p>
      </div>

      <!-- Navigation -->
      <div class="flex justify-center mb-8">
        <div class="flex gap-4">
          <NuxtLink
            to="/videoroom"
            class="btn btn-primary"
          >
            Publisher
          </NuxtLink>
          <NuxtLink
            to="/streaming"
            class="btn btn-secondary"
          >
            Viewer
          </NuxtLink>
        </div>
      </div>

      <!-- Main Content -->
      <div class="flex justify-center">
        <PublisherCard />
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
                <span class="badge badge-blue">1</span>
                <div>
                  <p class="font-semibold">Connect to Janus</p>
                  <p style="color: #6b7280;">Click "Connect to Janus" to establish a connection to the WebRTC gateway.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="badge badge-blue">2</span>
                <div>
                  <p class="font-semibold">Join Room</p>
                  <p style="color: #6b7280;">Click "Join Room" to join the videoroom as a publisher.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="badge badge-blue">3</span>
                <div>
                  <p class="font-semibold">Start Publishing</p>
                  <p style="color: #6b7280;">Click "Start Publishing" to begin streaming your webcam and microphone.</p>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <span class="badge badge-blue">4</span>
                <div>
                  <p class="font-semibold">Register Mountpoint</p>
                  <p style="color: #6b7280;">Click "Register Mountpoint" to make your stream available for viewers.</p>
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
  title: 'Publisher - Videoroom'
})

// Set head
useHead({
  title: 'Publisher - Janus WebRTC Demo',
  meta: [
    {
      name: 'description',
      content: 'Publish your webcam stream to a Janus videoroom'
    }
  ]
})
</script>
