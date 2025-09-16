import { fileURLToPath, URL } from 'node:url'
import { defineConfig, type PluginOption } from 'vite'
import { configDefaults } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  let plugins: PluginOption[]

  // the vueDevTools plugin will crash storybook
  const isStorybook = mode === 'storybook' || process.env.VITE_STORYBOOK_MODE === '1'
  const isDeploy = mode === 'deploy' || process.env.VITE_DEPLOY_MODE === '1'
  const isPreview = mode === 'preview' || process.env.VITE_PREVIEW_MODE === '1'

  if (isStorybook) {
    plugins = [vue(), tailwindcss()]
  } else if (isDeploy || isPreview) {
    plugins =[vue(), tailwindcss()]
  } else {
    plugins = [vue(), tailwindcss(), vueDevTools()]
  }

  return {
    plugins: plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
    },
  }
})
