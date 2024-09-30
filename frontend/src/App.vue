<template>
  <div :class="['app', { 'dark-theme': toggleTheme }]" id="app">
    <div class="common-layout">
      <el-container>
        <el-header height="100%"><Header @sendMessage="handleMessage" /></el-header>
        <el-container>
          <el-aside class="sidebar"><SideBar @updateVisible="handleUpdateVisible" :currenttheme="toggleTheme" /></el-aside>
          <el-container style="height:95%">
            <el-main style="padding-top: 0%; overflow: hidden;">
              <MainContentLight :note="note" :message="toggleTheme" style="padding-left: 0%;" />
              
            </el-main>
            <p>收到的笔记: {{ note }}</p>
            <p>当前: {{ isVisible }}</p>
            <el-footer style="height: auto;"><Footer @updateVisible="handleUpdateVisible" :message="toggleTheme" /></el-footer>
            <!-- 弹窗 -->
            <div v-if="isVisible" class="modal-wrapper" @click="closeLoginModal">
              <div class="modal-content" @click.stop>
            <router-view ></router-view>
            </div>
          </div>
            </el-container>
</el-container>
            
  
        </el-container>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import Footer from './components/Footer.vue';
import Header from './components/Header.vue';
import MainContentLight from './components/MainContentLight.vue';
import SideBar from './components/SideBar.vue'; // 引入 SideBar 组件
import config from './config';
import {ref,onMounted} from 'vue';

export default {
computed: {
  note(){
    return this.$store.state.note;
  }
  ,isVisible(){
    //this.isVisible = false;
    return this.$store.state.isVisible;
   
  }
},
  components: {
    Header,
    MainContentLight,
    Footer,
    SideBar // 注册 SideBar 组件
  },
  data() {
    return {
      toggleTheme: false,
      isLoggedIn: false,
      username: '',
      loading: false,
      showRegister: false,
      showChat: false,
    };
  },
  
  methods: {
    handleUpdateVisible(visible) {
      
      this.$store.dispatch('updateVisibility', visible);
 
    },
    increment() {
    alert('Incremented!');
  },
    // 关闭登录弹窗
    closeLoginModal() {
      this.$store.dispatch('updateVisibility', false);
},
    handleMessage(msg) {
      this.toggleTheme = msg; // 切换主题
    },
    handleLogin(username) {
      this.username = username;
      this.isLoggedIn = true;
      this.showRegister = false;
      this.showChat = true;
    },
    async checkBackendConnection() {
      this.loading = true;
      try {
        const response = await axios.get(`${config.API_BASE_URL}`);
        ElMessage.success('连接成功!');
      } catch (error) {
        ElMessage.error('连接失败，请检查后端服务!');
        console.error('后端连接错误: ', error);
      } finally {
        this.loading = false;
      }
    },
  },

  mounted() {
    
    this.checkBackendConnection(); // 连接后端服务
  }
};

</script>

<style>
.app {
  transition: background-color 0.5s ease, color 0.5s ease; /* 添加过渡效果 */
}

.dark-theme {
  background-color: #1f1f1f; /* 深色主题的背景色 */
  color: white; /* 深色主题的字体颜色 */
}

.common-layout {
  /* 为主体内容添加渐变过渡背景 */
  transition: background 0.5s ease; /* 渐变过渡 */
}
/* CSS样式，用于居中Modal */
.modal-wrapper {
  position: fixed; /* 使其固定在视口 */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex; /* 使用flexbox布局 */
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  background-color: rgba(0, 0, 0, 0.5); /* 背景遮罩 */
  z-index: 1000; /* 提高z-index确保持在最上层 */
}

.modal-content {
  max-width: 600px;
    margin: 0 auto;
    padding: 30px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
.main-content {
  display: flex; /* 启用 Flexbox 布局 */
}

.content-area {
  display: flex; 
  flex-direction: column; /* 使导航和主内容垂直排列 */
}

.sidebar {
  border-radius: 8px;
  padding-left: 1px;
  width: 200px;
}

footer {
  width: 100%;
}

/* 添加渐变背景动画效果 */
@keyframes fadeIn {
  from {
    background-color: rgba(31, 31, 31, 0); /* 从透明开始 */
  }
  to {
    background-color: rgba(31, 31, 31, 1); /* 到达最终色 */
  }
}

.fade-enter-active, .fade-leave-active {
  animation: fadeIn 0.5s forwards; /* 添加渐变动画效果 */
}
</style>
