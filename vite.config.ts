import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import tsConfigPaths from 'vite-tsconfig-paths'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'

export default defineConfig(async ({ command }) => {
  const plugins: any[] = [
    tailwindcss(),
    tsConfigPaths({ projects: ['./tsconfig.json'] }),
    tanstackStart({ server: { entry: 'server' } }),
    react(),
  ]

  if (command === 'build') {
    try {
      const { nitro } = await import('nitro/vite')
      plugins.push(nitro({ defaultPreset: 'cloudflare-module' }))
    } catch {
      // nitro optional — skip if not installed
    }
  }

  return {
    plugins,
    resolve: {
      alias: { '@': `${process.cwd()}/src` },
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
    css: { transformer: 'lightningcss' },
    server: { host: '::', port: 8080 },
  }
})
