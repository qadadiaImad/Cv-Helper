import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@cv-components', replacement: path.resolve(__dirname, '../components/cv-templates') },
      { find: '@cv-lib', replacement: path.resolve(__dirname, '../lib') },
      { find: '@cv-templates', replacement: path.resolve(__dirname, '../templates/react') },
      { find: '@/components/builder/html-renderer', replacement: path.resolve(__dirname, '../components/builder/html-renderer') },
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
  server: {
    port: 3003,
    open: true,
  },
  optimizeDeps: {
    include: ['react-dnd', 'react-dnd-html5-backend'],
  },
})
