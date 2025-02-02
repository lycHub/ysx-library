import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    sourcemap: 'hidden',
    lib: {
      // entry: join(dirname(import.meta.url), 'src/index.ts'),
      entry: 'src/index.ts',
      name: 'MobilePicker',
      fileName: (format) => `mobile-picker.${format}.js`,
    },
    // rollupOptions: {
    //   external: ['vue'],
    //   output: {
    //     globals: {
    //       vue: 'Vue'
    //     }
    //   }
    // }
  },
});
