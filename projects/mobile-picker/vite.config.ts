import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  const isServe = command === 'serve';
  return {
    build: {
      sourcemap: isServe ? 'hidden' : false,
      lib: {
        // entry: join(dirname(import.meta.url), 'src/index.ts'),
        entry: 'src/index.ts',
        name: 'MobilePicker',
        fileName: (format) => `mobile-picker.${format}.js`,
      },
    },
  };
});
