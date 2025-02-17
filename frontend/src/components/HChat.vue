<template>
    <div class="chat">
      <h2>聊天页面 - 用户1: {{ username }}</h2>
      <el-input v-model="message" placeholder="输入消息..."></el-input>
      <el-button type="primary" @click="sendMessage">发送</el-button>
      <el-divider></el-divider>
      <div v-for="(msg, index) in messages" :key="index">{{ msg }}</div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['username'],
    data() {
      return {
        message: '',
        messages: []
      };
    },
    methods: {
      sendMessage() {
        if (this.message) {
          this.messages.push(`${this.username}: ${this.message}`);
          this.message = '';
        } else {
          this.$message.error('请输入消息');
        }
      }
    }
  }
  </script>
  
  <style scoped>
  .chat {
    max-width: 600px;
    margin: 50px auto;
  }
  </style>
  