// src/plugins/recaptcha.js
import { defineNuxtPlugin } from 'nuxt/app'
import { useReCaptcha } from 'vue-recaptcha-v3'

export default defineNuxtPlugin((nuxtApp) => {
  useReCaptcha({
    siteKey: 'YOUR_SITE_KEY' // Reemplaza 'YOUR_SITE_KEY' con tu clave de sitio de Google reCAPTCHA
  })
})