import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        // 主进程
        entry: 'electron/main/index.ts',
        vite: {
          build: {
            outDir: 'dist-electron/main',
            minify: false,
          },
        },
      },
      {
        // 预加载进程
        entry: 'electron/preload/index.ts',
        vite: {
          build: {
            outDir: 'dist-electron/preload',
            minify: false,
          },
        },
      }
    ]),
    renderer(),
  ],
  build: {
    emptyOutDir: false,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        index: './index.html'
      },
      output: {
        manualChunks: {
          'element-plus': ['element-plus'],
          'vue-vendor': ['vue', 'vue-router', 'vuex'],
          'editor-vendor': [
            '@wangeditor/editor',
            '@wangeditor/editor-for-vue',
            'md-editor-v3',
            'mavon-editor',
            'vditor'
          ],
          'markdown-vendor': [
            'markdown-it',
            'marked',
            'highlight.js',
            'prismjs'
          ]
        }
      }
    }
  }
}) 