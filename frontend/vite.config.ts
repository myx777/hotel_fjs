/**
 * Vite configuration file.
 *
 * This file is used to configure the Vite development server and plugins.
 * In this setup, we use the React plugin and configure the server to
 * listen on all interfaces to ensure compatibility with Docker containers.
 *
 * @type {import('vite').UserConfig}
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    /**
     * Adds support for React JSX and other React-specific features.
     * @see https://github.com/vitejs/vite-plugin-react
     */
    react(),
  ],
  server: {
    /**
     * Configures the development server.
     *
     * @property {string} host - The network address the server listens on. Setting this to '0.0.0.0'
     *                           allows access from outside the container in a Docker environment.
     * @property {number} port - The port the server will listen to.
     */
    host: '0.0.0.0',
    port: 5173,
  },
})