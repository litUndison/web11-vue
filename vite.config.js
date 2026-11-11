import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // При использовании Cloudflare Pages (*.pages.dev) или кастомного домена используется '/'
  // При необходимости деплоя в поддиректорию GitHub Pages можно задать VITE_BASE
  base: process.env.VITE_BASE || './',
  server: {
    port: 5173,
    host: true,
    watch: {
      ignored: ['**/.vs/**', '**/.git/**']
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false
  }
})

