import { App } from 'vue';
import antComponents from './antd';
export default function(app: App) {
  antComponents.forEach(item => app.use(item));
}