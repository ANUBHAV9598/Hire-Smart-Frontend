import path from "path"
import { fileURLToPath } from "url"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
// Read env via import.meta.env when available; fall back for node during build
const isVercel = (typeof process !== 'undefined' && process.env?.VERCEL === '1') || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VERCEL === '1')

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Use root base on Vercel, GitHub Pages needs subpath
  base: isVercel ? "/" : "/hire-smart",
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
