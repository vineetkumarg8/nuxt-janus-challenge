<template>
  <div class="min-h-screen py-8">
    <div class="container max-w-4xl mx-auto px-4">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold mb-4">
          Janus WebRTC Demo
        </h1>
        <p class="text-xl mb-8" style="color: #6b7280;">
          A Nuxt application demonstrating WebRTC streaming with Janus Gateway
        </p>

        <!-- Main Navigation -->
        <div class="flex justify-center gap-4">
          <NuxtLink
            to="/videoroom"
            class="btn btn-primary"
            style="padding: 0.75rem 1.5rem; font-size: 1.125rem;"
          >
            📹 Publisher
          </NuxtLink>
          <NuxtLink
            to="/streaming"
            class="btn btn-success"
            style="padding: 0.75rem 1.5rem; font-size: 1.125rem;"
          >
            ▶️ Viewer
          </NuxtLink>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid md:grid-cols-2 gap-4 mb-8">
        <div class="card">
          <div class="card-header">
            <div class="flex items-center gap-4">
              <span style="font-size: 1.5rem;">📹</span>
              <h3 class="text-lg font-semibold">Publisher</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <p style="color: #6b7280;">
                Join a Janus videoroom and publish your webcam stream for others to watch.
              </p>
              <ul class="space-y-1" style="font-size: 0.875rem;">
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Connect to Janus WebRTC Gateway</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Join videoroom as publisher</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Stream webcam and microphone</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Register stream as mountpoint</span>
                </li>
              </ul>
              <NuxtLink to="/videoroom" class="btn btn-primary w-full">
                Start Publishing
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <div class="flex items-center gap-4">
              <span style="font-size: 1.5rem;">▶️</span>
              <h3 class="text-lg font-semibold">Viewer</h3>
            </div>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <p style="color: #6b7280;">
                Watch live streams from publishers using the Janus streaming plugin.
              </p>
              <ul class="space-y-1" style="font-size: 0.875rem;">
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Connect to Janus WebRTC Gateway</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Browse available mountpoints</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Select and play live streams</span>
                </li>
                <li class="flex items-center gap-2">
                  <span style="color: #10b981;">✓</span>
                  <span>Real-time video playback</span>
                </li>
              </ul>
              <NuxtLink to="/streaming" class="btn btn-success w-full">
                Start Viewing
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>

      <!-- Technical Info -->
      <div class="card">
        <div class="card-header">
          <h3 class="text-lg font-semibold">Technical Stack</h3>
        </div>
        <div class="card-body">
          <div class="grid md:grid-cols-3 gap-4" style="font-size: 0.875rem;">
            <div>
              <h4 class="font-semibold mb-2">Frontend</h4>
              <ul class="space-y-1" style="color: #6b7280;">
                <li>• Nuxt 3</li>
                <li>• Vue 3</li>
                <li>• Custom CSS</li>
                <li>• TypeScript</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2">WebRTC</h4>
              <ul class="space-y-1" style="color: #6b7280;">
                <li>• Janus Gateway</li>
                <li>• typed_janus_js</li>
                <li>• VideoRoom Plugin</li>
                <li>• Streaming Plugin</li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2">Backend</h4>
              <ul class="space-y-1" style="color: #6b7280;">
                <li>• Nuxt Server API</li>
                <li>• H3 Framework</li>
                <li>• In-memory Storage</li>
                <li>• RESTful Endpoints</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Set head
useHead({
  title: 'Janus WebRTC Demo - Nuxt4',
  meta: [
    {
      name: 'description',
      content: 'A Nuxt4 application demonstrating WebRTC streaming with Janus Gateway'
    }
  ]
})
</script>
