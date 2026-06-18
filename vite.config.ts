import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// ── Non-blocking CSS plugin ──────────────────────────────────────────────────
// Vite injects the main CSS bundle as a synchronous <link rel="stylesheet">,
// which blocks the browser from rendering ANYTHING until the CSS is downloaded.
// This plugin converts it to a non-blocking preload (same trick as Google Fonts):
//   rel="preload" as="style" onload="this.rel='stylesheet'"
// Lighthouse reports this as saving ~150ms on mobile.
function nonBlockingCssPlugin(): Plugin {
  return {
    name: 'non-blocking-css',
    apply: 'build',
    transformIndexHtml(html) {
      // Match <link rel="stylesheet" crossorigin href="/assets/....css">
      // and convert to a preload-then-apply pattern
      return html.replace(
        /<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/g,
        (_, href) =>
          `<link rel="preload" as="style" crossorigin href="${href}" onload="this.onload=null;this.rel='stylesheet'">` +
          `<noscript><link rel="stylesheet" crossorigin href="${href}"></noscript>`
      );
    },
  };
}

// ── Selective modulepreload plugin ───────────────────────────────────────────
// Vite adds <link rel="modulepreload"> for ALL vendor chunks by default.
// This forces the browser to eagerly download 181 KB of framer-motion and 42 KB
// of OGL before they are actually needed — Lighthouse flags this as unused JS.
// We keep only vendor-react preloaded (needed immediately to mount React).
// OGL and framer-motion will be fetched on-demand when their dynamic imports run.
function selectiveModulePreloadPlugin(
  chunkIdsToRemove: string[]
): Plugin {
  return {
    name: 'selective-modulepreload',
    apply: 'build',
    // We need the chunk manifest to know which hash → chunk name mapping to use
    generateBundle(_opts, bundle) {
      // Collect the filenames of chunks we want to stop preloading
      const toStrip = new Set<string>();
      for (const [fileName, chunk] of Object.entries(bundle)) {
        if (chunk.type !== 'chunk') continue;
        if (chunkIdsToRemove.some((id) => chunk.name === id)) {
          toStrip.add(fileName);
        }
      }
      // Store on `this` so transformIndexHtml can read it
      (this as unknown as { _toStrip: Set<string> })._toStrip = toStrip;
    },
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        // Fallback: if bundle info not available just return unchanged
        const meta = ctx.bundle;
        if (!meta) return html;
        const toStrip = new Set<string>();
        for (const [fileName, chunk] of Object.entries(meta)) {
          if ((chunk as { type: string }).type !== 'chunk') continue;
          const name = (chunk as { name?: string }).name ?? '';
          if (chunkIdsToRemove.includes(name)) {
            toStrip.add(fileName);
          }
        }
        // Remove modulepreload links for the specified chunks
        return html.replace(
          /<link rel="modulepreload" crossorigin href="\/assets\/([^"]+)">\n?/g,
          (full, filename) => {
            if (toStrip.has(`assets/${filename}`)) return '';
            return full;
          }
        );
      },
    },
  };
}

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    nonBlockingCssPlugin(),
    // Remove eagerly-injected modulepreload for heavy vendor chunks that are not
    // needed before React mounts. They will still download on-demand.
    // vendor-react stays preloaded because React itself is needed immediately.
    selectiveModulePreloadPlugin(['vendor-motion', 'vendor-gl']),
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
