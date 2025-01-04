<template>
  <div class="note-detail">
    <h2>笔记内容</h2>
    <p>{{ noteContent }}</p>
    <p>创建者: {{ creator }}</p>
    <el-button @click="goBack">返回</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import config from '@/config.js';

export default {
  data() {
    return {
      noteContent: '',
      creator: '',
    };
  },
  mounted() {
    this.fetchNoteContent();
  },
  methods: {
    async fetchNoteContent() {
      const noteId = this.$route.params.id;
      try {
        const response = await axios.get(`${config.API_BASE_URL}/api/notes/${noteId}`);
        this.noteContent = response.data.content;
        this.creator = response.data.account;
      } catch (error) {
        console.error('获取笔记内容失败:', error);
      }
    },
    goBack() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.note-detail {
  padding: 20px;
}
</style> 