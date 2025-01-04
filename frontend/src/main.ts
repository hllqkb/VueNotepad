import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Axios from 'axios';
import ElementPlus, { version as elementPlusVersion } from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp, version as vueVersion } from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store'; // 引入 Vuex store
import './style.css';
import * as utils from './utils/utils.js';

const app = createApp(App);

app.config.globalProperties.$http = Axios;
app.config.globalProperties.$utils = utils;

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

try {
  app
    .use(ElementPlus)
    .use(store) // 注册 Vuex store
    .use(router)
    .mount('#app')
    .$nextTick(() => {
      postMessage({ payload: 'removeLoading' }, '*');
    });
} catch (error) {
  console.error('插件注册失败:', error);
  console.error('当前 Vue 版本:', vueVersion); // 输出当前 Vue 版本
  console.error('Element Plus 版本:', elementPlusVersion); // 输出 Element Plus 版本
}
