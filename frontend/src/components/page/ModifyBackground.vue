<template>
    <div>
      <h2>修改背景图片</h2>
      <input type="file" @change="onFileChange" />
      <el-button type="primary" @click="uploadBackground">上传背景</el-button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import config from '@/config.js';
  
  export default {
    name: 'ModifyBackground',
    data() {
      return {
        file: null
      };
    },
    methods: {
      onFileChange(event) {
        this.file = event.target.files[0];
      },
      async uploadBackground() {
        if (!this.file) {
          return;
        }
        const formData = new FormData();
        formData.append('background', this.file);
  
        try {
          const token = localStorage.getItem('jwt');
          const response = await axios.post(`${config.API_BASE_URL}/api/user/uploadBackground`, formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data'
            }
          });
          this.$emit('close');
          this.$router.push('/profile'); // 返回到个人资料页面
          ElMessage.success('背景图片上传成功');
        } catch (error) {
          console.error('上传背景图片失败:', error);
          ElMessage.error('上传背景图片失败');
        }
      }
    }
  };
  </script>