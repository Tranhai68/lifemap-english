import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    host: true, // Listen on all network addresses (0.0.0.0) so iPad / mobile on local network can access
    port: 5173,
  },
})
