import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [reactRouter(), tailwindcss(), tsconfigPaths()],
  server: {
    allowedHosts: ['client'],
    host: "0.0.0.0",
    port: 5173,
    strictPort: true
  },
  build: {
    target: 'esnext',
  },
});
