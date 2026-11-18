import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Конфигурация сборщика Vite
export default defineConfig({
  plugins: [vue()],
  // Базовый путь для публикации
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

