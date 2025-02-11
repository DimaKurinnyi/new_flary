import path from 'path';
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    nodePolyfills({
      globals: {
        Buffer: true,  // Make sure Buffer is polyfilled
      },
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      buffer: path.resolve(__dirname, 'node_modules', 'buffer')
    }
  },
  // define: {
  //   'globalThis.Buffer': 'buffer.Buffer' // This makes Buffer available in the global scope
  // }
})
