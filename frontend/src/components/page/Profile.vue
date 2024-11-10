<template>
  <div class="profile" :style="{ backgroundImage: `url(${background})` }">
    <div class="user-info">
      <img :src="avatar" alt="用户头像" class="avatar" />
      <h2>用户信息</h2>
      <p><strong>用户名:</strong> {{ username }}</p>
      <p><strong>创建的笔记:</strong></p>
      <ul>
        <li v-for="note in notes" :key="note.id">
          <router-link :to="`/notes/${note.id}`">{{ note.title }}</router-link> - {{ note.created_at }}
        </li>
      </ul>
    </div>
    <div class="actions">
      <el-button type="primary" @click="editProfile">修改个人信息</el-button>
      <el-button type="warning" @click="changePassword">修改密码</el-button>
      <el-button type="info" @click="showModifyAvatar">修改头像</el-button>
      <el-button type="success" @click="showModifyBackground">修改背景</el-button>
    </div>
    <ModifyAvatar v-if="isModifyAvatarVisible" @close="isModifyAvatarVisible = false" />
    <ModifyBackground v-if="isModifyBackgroundVisible" @close="isModifyBackgroundVisible = false" />
  </div>
</template>

<script>
import config from '@/config.js';
import axios from 'axios';
import ModifyAvatar from './ModifyAvatar.vue';
import ModifyBackground from './ModifyBackground.vue';

export default {
  name: 'Profile',
  components: {
    ModifyAvatar,
    ModifyBackground
  },
  data() {
    return {
      username: '',
      notes: [],
      avatar: '',
      background: '',
      isModifyAvatarVisible: false,
      isModifyBackgroundVisible: false
    };
  },
  methods: {
    showModifyAvatar() {
      this.$router.push('/modifyAvatar');
    },
    showModifyBackground() {
      this.$router.push('/modifyBackground');
    },
    async fetchUserDetails() {
      try {
        const token = localStorage.getItem('jwt');
        const response = await axios.get(`${config.API_BASE_URL}/api/user/user-details`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.username = response.data.username;
        this.avatar = response.data.avatar;
        this.background = response.data.background;
        this.fetchNotes();
      } catch (error) {
        console.error('获取用户详细信息失败:', error);
        ElMessage.error('获取用户详细信息失败');
      }
    },
    async fetchNotes() {
      if (!this.username) {
        console.error('用户名未定义，无法获取笔记');
        return;
      }
      try {
        const token = localStorage.getItem('jwt');  
        const response = await axios.get(`${config.API_BASE_URL}/api/notes?username=${this.username}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        this.notes = response.data;
      } catch (error) {
        console.error('获取笔记失败:', error);
      }
    },
    editProfile() {
      this.$router.push('/modifyUser');
    },
    changePassword() {
      this.$router.push('/modifyPassword');
    }
  },
  mounted() {
    this.fetchUserDetails();
  }
};
</script>

<style scoped>
.profile {
  padding: 20px;
  background-size: cover;
  background-position: center;
}
.user-info {
  margin-bottom: 20px;
}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.actions {
  display: flex;
  gap: 10px;
}
</style> 