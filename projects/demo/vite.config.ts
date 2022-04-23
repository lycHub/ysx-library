import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  base: '//vue-tree-4gi26kh195ddd24f-1257117519.tcloudbaseapp.com/',
  plugins: [
    vue({
      reactivityTransform: true
    }),
    vueJsx()
  ],
  build: {
    outDir: '../../docs/tree'
  }
});