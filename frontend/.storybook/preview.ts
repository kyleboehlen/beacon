import type { Preview } from '@storybook/vue3-vite'
import { setup } from '@storybook/vue3-vite'
import '../src/app/styles/main.css'
import 'preline/preline'
import type { IStaticMethods } from 'preline/preline'

// Extend the Window interface using Preline's type
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods
  }
}

// Initialize Preline for all stories
setup((app) => {
  app.mixin({
    mounted() {
      if (typeof window !== 'undefined' && window.HSStaticMethods) {
        window.HSStaticMethods.autoInit()
      }
    },
  })
})

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewMode: 'story',
  },
}

export default preview
