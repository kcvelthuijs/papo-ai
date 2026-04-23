import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    dedupe: ['react', 'react-dom'],
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/llm': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },

  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // React core
          react: [
            'react',
            'react-dom',
            'react-nice-avatar',
            'react-markdown',
            'react-hook-form',
          ],

          // UI / icons
          ui: ['react-icons'],

          // Axios router
          axios: ['axios'],
        },
      },
    },
  },
});
