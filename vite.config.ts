import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  base: './', // Relative base path ensures GitHub Pages assets resolve correctly under /<repo-name>/
  plugins: [
    tailwindcss(),
    react(),
  ],
  server: {
    host: true, // Listen on all network interfaces (0.0.0.0) for multi-device Wi-Fi access
    port: 5173,
    allowedHosts: true, // Allow public tunnels (localtunnel, ngrok, localhost.run, cloudflare)
  },
  preview: {
    host: true,
    port: 4173,
    allowedHosts: true,
  },
});
