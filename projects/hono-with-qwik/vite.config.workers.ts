import { extendConfig } from '@builder.io/qwik-city/vite'
import baseConfig from './vite.config'

export default extendConfig(baseConfig, () => {
  return {
    build: {
      ssr: true,
      rollupOptions: {
        input: ['src/entry.workers.tsx', '@qwik-city-plan'],
      },
    },
  }
})
