import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: true,
    ssr: true,
    outDir: './dist/worker',
    rollupOptions: {
      external: ['__STATIC_CONTENT_MANIFEST'],
    },
  },
  ssr: {
    noExternal: true,
    format: 'esm',
  },
})
