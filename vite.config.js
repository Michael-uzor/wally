import {defineConfig} from 'vite';

export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Keep the tree-shaken engine cacheable across scene/content updates.
        // These chunks remain behind Core's existing dynamic import.
        manualChunks(id) {
          if (id.includes('/node_modules/three/')) return 'three';
          if (id.includes('/node_modules/@react-three/fiber/') || id.includes('/node_modules/react-reconciler/')) return 'fiber';
        },
        onlyExplicitManualChunks: true,
      },
    },
  },
});
