import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

export default defineConfig(({ mode }) => {
  const isLib = mode === 'lib'

  return {
    plugins: [
      vue(),
      ...(isLib
        ? [
            dts({
              include: ['src/**/*.ts', 'src/**/*.vue'],
              outDir: 'dist',
              rollupTypes: true,
            }),
          ]
        : []),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
      },
    },
    ...(isLib
      ? {
          build: {
            lib: {
              entry: resolve(__dirname, 'src/index.ts'),
              name: 'AdaheiUI',
              fileName: 'ui',
            },
            rollupOptions: {
              external: ['vue'],
              output: {
                globals: {
                  vue: 'Vue',
                },
              },
            },
          },
        }
      : {
          root: 'playground',
          build: {
            outDir: resolve(__dirname, 'dist-playground'),
          },
        }),
  }
})
