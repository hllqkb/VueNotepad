<template>
  <div class="note-detail">
    <h1>{{ note.title }}</h1>
    <p>{{ note.content }}</p>
    <button @click="editNote">编辑</button>
    <button @click="copyNote">复制</button>
    <button @click="deleteNote">删除</button>
    <router-link to="/">返回</router-link>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config.js'; // 确保引入配置文件

export default {
  data() {
    return {
      note: {},
      loading: true // 添加加载状态
    };
  },
  created() {
    this.fetchNote();
  },
  methods: {
    async fetchNote() {
      const noteId = this.$route.params.id; // 从路由参数获取笔记 ID
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/notes/${noteId}`);
        this.note = response.data; // 设置笔记数据
      } catch (error) {
        console.error('获取笔记失败:', error);
        this.$message.error('获取笔记失败');
      } finally {
        this.loading = false; // 请求完成后设置加载状态
      }
    },
    editNote() {
      // 编辑笔记的逻辑
      console.log('编辑笔记:', this.note);
      // 这里可以实现跳转到编辑页面的逻辑
    },
    copyNote() {
      // 复制笔记的逻辑
      console.log('复制笔记:', this.note);
      // 这里可以实现复制笔记内容的逻辑
    },
    async deleteNote() {
      const noteId = this.note.id; // 获取笔记 ID
      try {
        await axios.delete(`${config.API_BASE_URL}/api/notes/${noteId}`);
        this.$message.success('笔记已删除');
        this.$router.push('/'); // 删除后返回主页面
      } catch (error) {
        console.error('删除笔记失败:', error);
        this.$message.error('删除笔记失败');
      }
    }
  }
};
</script>

<style scoped>
.note-detail {
  padding: 20px;
}
</style> 