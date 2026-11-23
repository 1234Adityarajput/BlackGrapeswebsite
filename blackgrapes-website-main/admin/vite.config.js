import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { createApiMiddleware } from '../backend/apiMiddleware.js';

const BACKEND_URL = process.env.VITE_API_URL || 'https://blackgrapeswebsite.onrender.com';

// Standalone Vite Configuration for Black Grapes Admin Panel
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'local-api-middleware',
      configureServer(server) {
        server.middlewares.use(createApiMiddleware());
      }
    }
  ],
  server: {
    port: 5174,
    open: false,
    proxy: {
      '/api': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
      },
      '/uploads': {
        target: BACKEND_URL,
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@admin': fileURLToPath(new URL('./', import.meta.url)),
      '@backend': fileURLToPath(new URL('../backend', import.meta.url)),
      '@assets': fileURLToPath(new URL('../frontend/src/assets', import.meta.url))
    }
  }
});
