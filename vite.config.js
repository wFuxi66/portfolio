import { defineConfig } from 'vite';

// Dev stays at the root; the production build and preview are served from /portfolio/.
export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/portfolio/' : '/',
}));
