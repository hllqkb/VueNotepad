<template>
  <div class="login">
    <el-form :model="form" ref="form" label-width="100px">
      <el-form-item label="用户名" prop="username">
        <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="form.password"
          style="width: 240px"
          type="password"
          placeholder="请输入密码"
          show-password>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 240px" type="primary" @click="login">登录</el-button>
      </el-form-item>
      <el-form-item>
        <el-button style="width: 240px" @click="$emit('switch-to-register')">去注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import config from '../config.js';
import axios from 'axios';
//
export default {
  data() {
    return {
      form: {
        username: '',
        password: ''
      }
    };
  },
  methods: {
    async login() {
      const { username, password } = this.form;

      // 确保用户名和密码不为空
      if (!username || !password) {
        return this.$message.error('请输入用户名和密码');
      }

      try {
        const response = await axios.post(`${config.API_BASE_URL}/login`, { 
          username,
          password
        });

        // 登录成功，状态码为 200
        if (response.status === 200) {
          this.$message.success('登录成功');
          this.$emit('login', username);
        }
      } catch (error) {
        // 根据不同的状态码返回相应的错误信息
        if (error.response) {
          if (error.response.status === 401) {
            this.$message.error('登录失败，用户名或密码错误');
          } else {
            this.$message.error('登录时出现错误，请稍后再试');
          }
        } else {
          this.$message.error('网络错误，请检查您的连接');
        }
        console.error('登录错误:', error);
      }
    }
  }
};
</script>

<style scoped>
.login {
  max-width: 300px;
  margin: 100px auto;
}
</style>
