import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // Allows an ngrok tunnel to reach the dev server for review on real
    // devices. Vite otherwise rejects requests whose Host header isn't
    // localhost. Dev-only — has no effect on the production build.
    allowedHosts: ['.ngrok-free.dev', '.ngrok-free.app', '.ngrok.app', '.ngrok.io'],
  },
})
