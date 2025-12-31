import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/cheap-travels/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false, // Disable sourcemaps in production to reduce build size and time
    minify: 'esbuild', // Use esbuild for faster minification
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: undefined // Avoid complex chunking to reduce memory usage
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})