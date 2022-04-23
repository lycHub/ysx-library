import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

export default defineConfig({
  plugins: [
    vue({
      reactivityTransform: true
    }),
    vueJsx()
  ],
  build: {
    lib: {
      // entry: join(dirname(import.meta.url), 'src/index.ts'),
      entry: 'src/index.ts',
      name: 'VueVirtualTree',
      fileName: format => `vue-virtual-tree.${format}.js`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
