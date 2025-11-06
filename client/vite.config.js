import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // output folder for deployment
  },
  server: {
    open: true,   // opens browser automatically during dev
    port: 5173,   // default Vite dev port
  },
});
