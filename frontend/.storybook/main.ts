import type { StorybookConfig } from '@storybook/vue3-vite';
import { defineConfig } from 'vite'
import path from 'path'

const config: StorybookConfig = {
  "stories": [
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-docs",
  ],
  "framework": {
    "name": "@storybook/vue3-vite",
    "options": {}
  },
  viteFinal: async (config) => {
    return defineConfig({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          '@': path.resolve(__dirname, '../src'),
        },
      },
    })
  },
};
export default config;
