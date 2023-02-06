import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    minify: true,
    outDir: './dist/static/public',
  },
})
