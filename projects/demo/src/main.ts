import { createApp } from 'vue';
import App from './App.vue';
import GlobalComponents from './components';
import './styles/index.css';
console.log('object :>> ');
createApp(App).use(GlobalComponents).mount('#app');
