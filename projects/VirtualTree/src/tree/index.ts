import { App } from 'vue';
import _Tree from './tree.vue';
export * from './types';
export default Object.assign(_Tree, {
  install: (app: App) => {
    app.component('VirTree', _Tree);
  },
});
