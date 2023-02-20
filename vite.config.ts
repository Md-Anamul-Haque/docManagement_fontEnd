import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
interface importMeta {
  readonly VITE_API_URL: string
}

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../backend-server/public'
  }
})

