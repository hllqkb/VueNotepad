<template>
    <div class="container">
      <el-card>
        <h2>笔记详情</h2>
        <el-divider></el-divider>
        <div v-if="note">
          <p><strong>内容:</strong> {{ note.content }}</p>
          <p><strong>创建者:</strong> {{ note.account }}</p>
          <p><strong>创建时间:</strong> {{ formatDate(note.created_at) }}</p>
        </div>
        <div v-else>
          <p>加载中...</p>
        </div>
      </el-card>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        note: null,
      };
    },
    created() {
      this.fetchNote();
    },
    methods: {
      async fetchNote() {
        const noteId = this.$route.params.id; // 从路由参数获取笔记 ID
        try {
          const response = await axios.get(`http://localhost:4000/notes/${noteId}`);
          this.note = response.data; // 设置笔记数据
        } catch (error) {
          console.error('获取笔记失败:', error);
        }
      },
      formatDate(dateString) {
        return new Date(dateString).toLocaleString(); // 格式化日期
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    margin: 20px;
  }
  </style>