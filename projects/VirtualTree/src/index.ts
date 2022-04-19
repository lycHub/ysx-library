import { App } from 'vue';
import VirTree from './tree.vue';
export { VirTree };

import './styles/index.css';

export * from './types';
export default function (app: App) {
  app.component('VirTree', VirTree);
}
