import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import blogReloadPlugin from "./scripts/vite-reload-posts-plugin.ts"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), blogReloadPlugin()],
})
