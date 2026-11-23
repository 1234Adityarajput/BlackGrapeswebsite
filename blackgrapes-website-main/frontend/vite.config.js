import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';
import { createApiMiddleware } from '../backend/apiMiddleware.js';

const BACKEND_URL = process.env.VITE_API_URL || 'https://blackgrapeswebsite.onrender.com';

// https://vite.dev/config/
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
    port: 5173,
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
      'react': fileURLToPath(new URL('./node_modules/react', import.meta.url)),
      'react-dom': fileURLToPath(new URL('./node_modules/react-dom', import.meta.url)),
      '@backend': fileURLToPath(new URL('../backend', import.meta.url)),
      '@assets': fileURLToPath(new URL('./src/assets', import.meta.url))
    }
  }
});
