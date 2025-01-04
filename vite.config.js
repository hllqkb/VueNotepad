import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173, // 确保端口设置正确
    open: true, // 启动时自动打开浏览器
  },
}); 