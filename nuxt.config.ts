// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui',
    '@nuxtjs/tailwindcss'
  ],
  css: ['~/assets/css/main.css'],
  ssr: false,
  typescript: {
    strict: false,
    typeCheck: false
  },
  runtimeConfig: {
    public: {
      janusUrl: process.env.JANUS_URL || 'wss://janus1.januscaler.com/janus/ws'
    }
  },

  // GitHub Pages deployment configuration
  nitro: {
    preset: process.env.NITRO_PRESET === 'github_pages' ? 'github_pages' : 'node-server',
    prerender: {
      routes: ['/']
    }
  },

  // Base URL for GitHub Pages (update with your repository name)
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/nuxt-janus-challenge/' : '/'
  },

  // Ensure static generation works properly
  experimental: {
    payloadExtraction: false
  }
})
