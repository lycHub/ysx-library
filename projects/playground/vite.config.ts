import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const filename = fileURLToPath(import.meta.url);
const dir = dirname(filename);

export default defineConfig({
  build: {
    outDir: '../../docs/playground',
    rollupOptions: {
      input: {
        main: resolve(dir, 'portal/index.html'),
        mobilePicker: resolve(dir, 'mobile-picker/entry/index.html'),
        intro: resolve(dir, 'mobile-picker/pages/intro/index.html'),
        start: resolve(dir, 'mobile-picker/pages/start/index.html'),
        faq: resolve(dir, 'mobile-picker/pages/faq/index.html'),
        simple: resolve(dir, 'mobile-picker/pages/simple/index.html'),
        clickToSelect: resolve(dir, 'mobile-picker/pages/click-to-select/index.html'),
        mousewheel: resolve(dir, 'mobile-picker/pages/mousewheel/index.html'),
        scrollShape: resolve(dir, 'mobile-picker/pages/scroll-shape/index.html'),
        controlValue: resolve(dir, 'mobile-picker/pages/control-value/index.html'),
        multiCols: resolve(dir, 'mobile-picker/pages/multi-cols/index.html'),
        comprehensive: resolve(dir, 'mobile-picker/pages/comprehensive/index.html'),
        datepicker: resolve(dir, 'mobile-picker/pages/datepicker/index.html'),
        options: resolve(dir, 'mobile-picker/pages/options/index.html'),
        methods: resolve(dir, 'mobile-picker/pages/methods/index.html'),
      }
    }
  }
});