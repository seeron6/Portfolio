import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // This ensures assets are loaded relatively, fixing the blank screen on GitHub Pages
  define: {
    // This prevents "Uncaught ReferenceError: process is not defined"
    'process.env': {}
  }
})