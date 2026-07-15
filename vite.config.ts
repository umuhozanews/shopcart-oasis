import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({
      server: { entry: 'server' },
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': `${process.cwd()}/src`,
    },
    dedupe: [
      'react',
      'react-dom',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
      '@tanstack/react-query',
      '@tanstack/query-core',
    ],
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react/jsx-runtime',
      'react/jsx-dev-runtime',
    ],
    ignoreOutdatedRequests: true,
  },
  css: {
    transformer: 'lightningcss',
  },
  server: {
    host: '::',
    port: 8080,
  },
})
