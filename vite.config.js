import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // позволяет принимать запросы не только с localhost
    allowedHosts: [
      'praeceptum.serveo.net', // твой домен от Serveo
    ],
  },
})
