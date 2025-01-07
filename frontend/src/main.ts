import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Axios from 'axios';
import ElementPlus, { version as elementPlusVersion } from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp, version as vueVersion } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './style.css';
import * as utils from './utils/utils';

const app = createApp(App);

app.config.globalProperties.$http = Axios;
app.config.globalProperties.$utils = utils;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

try {
  const vueApp = app
    .use(ElementPlus)
    .use(store)
    .use(router)
    .mount('#app');

  // 保应用完全挂载后再发送消息
  setTimeout(() => {
    window.postMessage({ payload: 'removeLoading' }, '*');
  }, 100);
} catch (error) {
  console.error('插件注册失败:', error);
  console.error('当前 Vue 版本:', vueVersion);
  console.error('Element Plus 版本:', elementPlusVersion);
}
