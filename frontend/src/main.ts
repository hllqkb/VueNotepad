import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import Axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
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
}
