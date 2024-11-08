import axios from 'axios';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import { createApp } from 'vue';
import App from './App.vue';
import config from './config.js';
import router from './router';
import store from './store';


const app = createApp(App);

// 设置 Axios 基础 URL
axios.defaults.baseURL = config.API_BASE_URL;

// 添加请求拦截器，自动附加 Token
axios.interceptors.request.use(
  (configAxios) => {
    const token = localStorage.getItem('jwt');
    if (token) {
      configAxios.headers.Authorization = `Bearer ${token}`;
      console.log('添加了 Authorization 头部:', `Bearer ${token}`); // 确认日志
    } else {
      console.log('未找到 token');
    }
    return configAxios;
  },
  (error) => {
    return Promise.reject(error);
  }
);

app.use(store).use(router).use(ElementPlus).mount('#app');