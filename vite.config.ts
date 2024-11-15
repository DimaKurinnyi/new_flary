import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    nodePolyfills({
      globals: {
        Buffer: true,  // Make sure Buffer is polyfilled
      },
    })
  ],
  resolve: {
    alias: {
      buffer: path.resolve(__dirname, 'node_modules', 'buffer')
    }
  },
  // define: {
  //   'globalThis.Buffer': 'buffer.Buffer' // This makes Buffer available in the global scope
  // }
})
