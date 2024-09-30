<template>
    <div class="footer" :style="{ backgroundColor: props.message ? '#333' : 'white' }">
      <div @click="openLoginWindow" class="left">
        <el-avatar :icon="UserFilled" size="small" />
        <span class="text-sm mr-2" style="color: var(--el-text-color-regular)">未登录</span>
      </div>
      <div class="right">
        <el-icon size="18px"><Setting /></el-icon>
      </div>
    </div>
</template>

<script setup lang="ts">
import { UserFilled } from '@element-plus/icons-vue';
import { defineProps, defineEmits } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  message: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['updateVisible']);

// 打开登录页面窗口
function openLoginWindow() {
  emits('updateVisible', true); // 打开登录窗口
  router.push('/login'); // 选中的文本
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


</style>
