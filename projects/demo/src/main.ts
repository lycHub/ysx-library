import { createApp } from 'vue';
// import App from './App.vue';
// import AppLazy from './App.lazy.vue';
import AppBac from './App.bac.vue';

import '@ysx/vue-virtual-tree/style.css';
createApp(AppBac).mount('#app');
