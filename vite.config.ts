import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    // javascriptObfuscator is disabled to prevent 2-3 second startup freeze and massive bundle bloat.
    // Built-in Terser minification/mangling below is more than enough for production performance and security.
  ],
  server: {
    port: 5173,
    open: true,
    host: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,       // no source maps in production
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,      // remove debugger statements
        passes: 3,                // multiple compression passes
        unsafe: false,
        unsafe_comps: false,
        unsafe_math: false,
        unsafe_proto: false,
      },
      mangle: {
        toplevel: true,           // mangle top-level variable names
        eval: true,
        properties: false,        // keep false to avoid runtime errors
      },
      format: {
        comments: false,          // strip all comments
        ascii_only: true,
      },
    },
    rollupOptions: {
      output: {
        // Randomize chunk filenames with hash
        chunkFileNames: 'assets/[hash].js',
        entryFileNames: 'assets/[hash].js',
        assetFileNames: 'assets/[hash].[ext]',
        // Vendor splitting: frameworks rarely change, so isolating them lets
        // visitors keep long-lived cache hits across app-code deploys.
        manualChunks(id) {
          if (!id.includes('node_modules')) return;
          if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'vendor-motion';
          if (id.includes('/ogl/')) return 'vendor-gl';
          if (id.includes('/react') || id.includes('/scheduler/')) return 'vendor-react';
        },
      },
    },
  },
});
