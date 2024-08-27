import { defineNuxtConfig } from 'nuxt/config'
import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: false,

  build: {
    transpile: ['vuetify'],
  },

  hooks: {
    'vite:extendConfig': (config) => {
      config.plugins!.push(vuetify())
    },
  },

  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'https://api.raintech.jp/',
    },
  },

  vite: {
    ssr: {
      noExternal: ['vuetify'],
    },
    define: {
      'process.env.DEBUG': false,
    },
  },

  css: ['@/assets/main.scss'],
  compatibilityDate: '2024-08-26',
})