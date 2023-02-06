import { extendConfig } from '@builder.io/qwik-city/vite'
import baseConfig from './vite.config'

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['src/entry.bun.tsx', '@qwik-city-plan'],
      },
    },
  }
})
