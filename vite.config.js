import path from "path"
import { fileURLToPath } from "url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Use CI env flags to decide base
const isVercel = (typeof process !== 'undefined' && process.env?.VERCEL === '1')
const isNetlify = (typeof process !== 'undefined' && process.env?.NETLIFY === 'true')
const isGhPages = (typeof process !== 'undefined' && process.env?.GITHUB_PAGES === 'true')
const basePath = isGhPages ? '/hire-smart' : '/'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ['react', 'react-dom']
  },
  // Root base for Vercel/Netlify/most hosts; subpath only for GitHub Pages
  base: basePath,
  build: {
    sourcemap: true,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-framer';
            if (id.includes('@radix-ui')) return 'vendor-radix';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('redux')) return 'vendor-redux';
            if (id.includes('swiper')) return 'vendor-swiper';
            return 'vendor';
          }
        },
      },
    },
  },
})
