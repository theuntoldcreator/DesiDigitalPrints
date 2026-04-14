import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Replaced local proxy with direct PocketBase cloud access in src/lib/pb.js
  },
  optimizeDeps: {
    include: ['framer-motion', 'lucide-react']
  }
})
