<template>
  <header>
    <div class="container">
      <div class="user-bio">
        <div class="user-bio-top">
          <div class="circle-red"></div>
          <div class="circle-yellow"></div>
          <div class="circle-green"></div>
         
          <el-icon @click="ToggleTheme" v-if="!isDarkTheme" class="icon-moon" size="15"><Moon /></el-icon>
          <el-icon @click="ToggleTheme" v-if="isDarkTheme" class="icon-sun" size="15"><Sunny /></el-icon>
          <button :style="{color: isDarkTheme ? '#FFFFFF' : '#000000FF'}" class="close-button" @click="handleClose">✖</button>
          <el-button class="myai-button" @click="ai">AI</el-button>
          <el-button class="run-button" @click="runApp">
            <el-icon><Plus /></el-icon> 发布
          </el-button>
          
          <el-button class="view-note-button" @click="viewNote">查看笔记 {{ title }}</el-button>
        </div>
      </div>
      <el-alert v-if="loading" title="加载中..." type="info" />
      <el-alert v-if="summary" :title="summary" type="success" />
    </div>
  </header>
</template>

<script>
import config from '@/config.js'; // 确保引入配置文件
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';
import { mapState, mapMutations } from 'vuex'; // Import mapState to access Vuex state and mapMutations

export default {
  data() {
    return {
      isDark: false,
      loading: false, // 添加 loading 状态
      summary: '', // 用于存储摘要
      account: localStorage.getItem('username') // 这里可以替换为从 Vuex 获取的账户信息
    };
  },
  name: 'Header',
  components: {
    Plus
  },
  computed: {
    ...mapState(['note', 'title', 'currentNoteId', 'isDarkTheme']), // Map the currentNoteId state from Vuex and add isDarkTheme
  },
  methods: {
    ...mapMutations(['toggleTheme']), // Add toggleTheme mutation
    ToggleTheme() {
      this.toggleTheme(); // Switch theme
      this.$emit('sendMessage', this.isDarkTheme);
    },
    handleClose() {
      window.electron.closeWindow();
    },
    async runApp() {
      const content = this.note; // 使用当前笔记的内容
      const account = this.account; // 使用 Vuex 中的账户信息
      const title = this.title; // 使用当前笔记的标题
      const fileName = title; // 假设文件名为标题
      console.log('account',account);
      try {
        const response = await axios.post(`${config.API_BASE_URL}/api/notes`, { content, account, fileName });
        console.log('发布成功:', response.data);
      } catch (error) {
        console.error('发布失败:', error.response.data); // 输出详细错误信息
        this.$message.error('发布笔记失败: ' + error.response.data.error);
      }
    },
    viewNote() {
      // 打开新的浏览器窗口或标签页，使用 Vuex 中的 currentNoteId
      if (this.currentNoteId) {
        window.open(`${config.API_BASE_URL}/api/notes/notes/${this.currentNoteId}`, '_blank');
      } else {
        this.$message.error('未选择笔记');
      }
    },
    async ai() {
      if (!this.note || this.note.trim() === '') {
        this.$message.error('Content is required for summarization');
        return;
      }

      this.loading = true; // 开始加载
      this.summary = ''; // 清空之前的摘要

      try {
        const response = await axios.post(`${config.API_BASE_URL}/api/summarize`, { content: this.note });
        console.log('Summary:', response.data);
        this.summary = response.data.summary.response; // 获取摘要内容
      } catch (error) {
        console.error('AI summarization failed:', error);
        this.$message.error('AI summarization failed');
      } finally {
        this.loading = false; // 结束加载
      }
    }
  }
};
</script>

<style scoped>
.icon-sun {
  -webkit-app-region: no-drag;
  position: absolute;
  padding-left: 100px;
  cursor: pointer;
}
.icon-moon {
  cursor: pointer;
  -webkit-app-region: no-drag;
  position: absolute;
  padding-left: 100px;
}
header {
  width: 100%;
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
.user-bio {
  font-size: 14px;
}
.user-bio .user-bio-top {
  height: 15px;
  padding: 8px 12px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  position: relative;
}
.user-bio .user-bio-top div {
  float: left;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border-radius: 50px;
}
.user-bio .user-bio-top .circle-red {
  background-color: #FF4D4D;
}
.user-bio .user-bio-top .circle-yellow {
  background-color: #FFBD2E;
}
.user-bio .user-bio-top .circle-green {
  background-color: #28CA42;
}
.close-button {
  -webkit-app-region: no-drag;
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #000000FF;
}
.myai-button {
  -webkit-app-region: no-drag;
  position: absolute;
  left: 100px;

  border: none;
  margin-left: 30px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent; /* 设置背景为透明 */
}
.run-button {
  -webkit-app-region: no-drag;
  position: absolute;
  right: 50px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent; /* 设置背景为透明 */
}
.view-note-button {
  -webkit-app-region: no-drag;
  position: absolute;
  right: 150px; /* 调整位置 */
  top: 50%;
  background-color: transparent; /* 设置背景为透明 */
  transform: translateY(-50%);
}
</style>
