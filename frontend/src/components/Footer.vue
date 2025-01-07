<template>
  <div class="footer" :style="{ backgroundColor: props.message ? '#333' : 'white' }">
    <div @click="openLoginWindow" class="left">
      <el-icon size="small"><UserFilled /></el-icon>
      <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">
        {{ username ? username : '未登录' }}
      </span>
    </div>
    <div class="right">
      <el-dropdown placement="top">
        <el-button class="more-button"><el-icon><More /></el-icon></el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="openSettings">设置</el-dropdown-item>
            <el-dropdown-item @click="toggleTheme">切换主题</el-dropdown-item>
            <el-dropdown-item @click="logout">注销</el-dropdown-item>
            <el-dropdown-item @click="goToAiChat">与 AI 对话</el-dropdown-item>
            <el-dropdown-item @click="comment">产品留言</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import config from '@/config.js'; // 确保引入配置文件
import { ElMessage } from 'element-plus';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
const router = useRouter();
const store = useStore();

const props = defineProps({
  message: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['updateVisible']);

const username = computed(() => {
  return localStorage.getItem('username') || '';
});

function logout() {
  try {
    localStorage.removeItem('jwt');
    localStorage.removeItem('username');
    store.commit('setUsername', '');
    ElMessage.success('注销成功');
    window.location.reload();
  } catch (error) {
    console.error('注销时出错:', error);
  }
}

function openLoginWindow() {
  const token = localStorage.getItem('jwt');
  if (token) {
    emits('updateVisible', true);
    router.push('/profile'); // 跳转到个人主页
    return; // 结束方法
  }
  emits('updateVisible', true);
  router.push('/login');
}
function comment() {
  // 在新的浏览器窗口中打开留言页面
  window.open(config.COMMENT_URL, '_blank');
}
function openSettings() {
  router.push('/settings'); // 假设您有一个设置页面
}

function toggleTheme() {
  // 切换主题的逻辑
  ElMessage.success('自己点切换主题');
  console.log('切换主题'); // 这里可以添加实际的主题切换逻辑
}

// 新增的函数，跳转到 AI 聊天页面
function goToAiChat() {
  emits('updateVisible', true);
  router.push('/ai'); // 跳转到 AI 聊天页面
}
</script>

<style scoped>
.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  padding: 0 10px;
}
.left {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.right {
  display: flex;
  align-items: center;
  margin-left: auto;
}
.more-button {
  padding: 0; /* 去掉按钮的内边距 */
  border: none;
  background-color: transparent;
}
</style>
