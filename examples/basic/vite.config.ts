import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@/': resolve(__dirname, './src'),
      '@bloxi/core': resolve(__dirname, '../../packages/core/dist/index.esm.js'),
      '@bloxi/components': resolve(__dirname, './src/components')
    }
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@bloxi/core']
  },
  server: {
    port: 3000,
    hmr: {
      overlay: false
    }
  },
  cacheDir: '.vite',
  build: {
    commonjsOptions: {
      include: [/node_modules/],
      extensions: ['.js', '.cjs', '.mjs']
    }
  }
})