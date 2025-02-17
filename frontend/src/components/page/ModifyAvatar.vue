<template>
  <div class="modify-avatar">
    <h2>修改头像</h2>
    <div class="avatar-preview">
      <el-image
        v-if="avatar"
        :src="avatar"
        fit="cover"
        style="width: 100px; height: 100px"
      />
      <p v-else>当前头像未设置</p>
    </div>
    <el-upload
      class="upload-avatar"
      action="/api/user/uploadAvatar"
      :on-success="handleAvatarSuccess"
      :on-error="handleAvatarError"
      :show-file-list="false"
      :on-change="handleChange"
      :before-upload="beforeUpload"
      :http-request="customRequest"
    >
      <el-button type="primary">上传新头像</el-button>
      <el-progress v-if="uploading" :percentage="uploadPercentage" />
    </el-upload>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus';
import config from '../../config.js';
import axios from 'axios';

export default {
  data() {
    return {
      avatar: '', // 当前头像
      uploading: false, // 上传状态
      uploadPercentage: 0 // 上传进度
    };
  },
  computed: {
    config() {
      return config; // 将 config 添加到 computed 中
    }
  },
  methods: {
    handleAvatarSuccess(response) {
      const token = localStorage.getItem('jwt');
      if (!token) {
        ElMessage.error('请先登录');
        return;
      }
      if (response.code === 0) {
        ElMessage.success('头像上传成功');
        this.avatar = response.url; // 使用 response.url 更新头像
        localStorage.setItem('avatar', response.url); // 更新 localStorage 中的头像
      } else {
        ElMessage.error('头像上传失败');
      }
      this.uploading = false; // 上传结束
    },
    handleAvatarError() {
      ElMessage.error('头像上传失败');
      this.uploading = false; // 上传结束
    },
    handleChange(file) {
      if (file.status === 'uploading') {
        this.uploading = true; // 开始上传
      }
    },
    beforeUpload(file) {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        ElMessage.error('只能上传图片文件!');
      }
      return isImage;
    },
    customRequest({ file, onSuccess, onError }) {
      const formData = new FormData();
      formData.append('avatar', file);
      const token = localStorage.getItem('jwt');
      axios.post(`${this.config.API_BASE_URL}/api/user/uploadAvatar`, formData, {
        headers: {
          Authorization: `Bearer ${token}`
        },
        onUploadProgress: (progressEvent) => {
          this.uploadPercentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        }
      })
      .then(response => {
        onSuccess(response.data);
      })
      .catch(error => {
        onError(error);
        console.error('上传头像错误:', error);
      });
    }
  },
  mounted() {
    console.log('Config:', this.config); // 确认 config 被正确导入
    this.avatar = localStorage.getItem('avatar') || '';
  }
};
</script>

<style scoped>
.modify-avatar {
  padding: 20px;
}
.avatar-preview {
  margin-bottom: 20px;
}
.upload-avatar {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> 