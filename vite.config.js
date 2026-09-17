import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/so-sanh-phi-giao-dich/', // Absolute base path for GitHub Pages deployment
});
