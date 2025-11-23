import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vitest/config'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  test: {
    environment: 'jsdom',
    exclude: [...configDefaults.exclude, 'e2e/**'],
    root: fileURLToPath(new URL('./', import.meta.url)),
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  plugins: [vue()]
})
