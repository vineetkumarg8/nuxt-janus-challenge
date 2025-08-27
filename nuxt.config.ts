// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  typescript: {
    strict: false,
    typeCheck: false
  },
  runtimeConfig: {
    public: {
      janusUrl: process.env.JANUS_URL || 'wss://janus1.januscaler.com/janus/ws'
    }
  }
})
