<template>
  <div class="theBackGound">
    <!-- 表单 -->
    <el-dialog :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form :model="form" :inline="true" :rules="rules">
        <!-- 表单内容 -->
        <el-form-item label="文档名称" :label-width="'120px'" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width: 192px" placeholder="请输入文档名称"></el-input>
        </el-form-item>

        <el-form-item label="文档类型" :label-width="'120px'">
          <el-select v-model="form.type" placeholder="请选择文档类型">
            <el-option label="类型1" value="类型1"></el-option>
            <el-option label="类型2" value="类型2"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="文档状态" :label-width="'120px'">
          <el-select v-model="form.status" placeholder="请选择文档状态">
            <el-option label="草稿" value="草稿"></el-option>
            <el-option label="已提交" value="已提交"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 表单的确认与取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="resetForm()">重 置</el-button>
        <el-button type="primary" @click="handleAdd()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="loginBox">
      <div>
        <h3 class="title">文档管理系统登录</h3>
      </div>

      <!-- 用户名输入框 -->
      <el-input class="loginInput" placeholder="请输入用户名" v-model="userLog.username" />

      <!-- 密码输入框 -->
      <el-input class="loginInput" placeholder="请输入密码" v-model="userLog.password" show-password />

      <!-- 登录按钮 -->
      <el-button type="primary" style="width: 100%" @click="loging">
        <a style="font-size: 14px">登录</a>
      </el-button>

      <!-- 文档登记按钮 -->
      <el-button type="success" style="width: 100%; margin-top: 20px; margin-left: 0px" @click="apply">
        <a style="font-size: 14px">文档登记</a>
      </el-button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
//加载 .env 文件中的环境变量到 process.env 中
export default {
  name: 'theLogin',
  data() {
    return {
      dialogFormVisible: false,
      success: false,
      userLog: {
        username: '',
        password: ''
      },
      form: {
        name: '',
        type: '',
        status: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入文档名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loging() {
      if (this.userLog.username === '' && this.userLog.password === '') {
        return this.myWarning('请输入账号和密码');
      }

      axios.post(`${process.env.VUE_APP_API_URL}/login`, this.userLog)
        .then(response => {
          if (response.data.success) {
            localStorage.setItem('username', this.userLog.username);
            localStorage.setItem('password', this.userLog.password);
            this.$router.push({ path: '/myView' })
            this.mySuccess('登录成功');
            // 跳转到主页或其他页面
          } else {
            this.myError('账号或密码错误');
          }
        })
        .catch(error => {
          console.error(error);
          this.myError('登录失败');
        });
    },
    apply() {
      this.resetForm();
      this.dialogFormVisible = true;
    },
    resetForm() {
      for (let i in this.form) {
        this.form[i] = '';
      }
    },
    handleAdd() {
      if (this.form.name.length >= 2 && this.form.name.length <= 20) {
        this.dialogFormVisible = false;
        this.$store.state.applyInfo.unshift({
          name: this.form.name,
          type: this.form.type,
          status: this.form.status
        });
        console.log('申请完成');
        this.mySuccess('申请成功');
      } else {
        this.myWarning('请输入文档名称');
      }
    }
  },
  mounted() {
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');
    if (savedUsername && savedPassword) {
      this.userLog.username = savedUsername;
      this.userLog.password = savedPassword;
      this.loging();
    }

    document.onkeydown = () => {
      if (window.event.keyCode == 13) {
        this.loging();
      }
    }
  }
}
</script>

<style scoped>
/* 背景 */
.theBackGound {
  background-size: cover;
  background-position: center;
  background-image: url('/bg.jpg');
  background-color: rgb(45, 58, 75);
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 登录区域盒子 */
.loginBox {
  width: 560px;
  height: 387px;
}
/* 标题字体 */
.title {
  color: rgb(238, 238, 238);
  text-align: center;
  font-size: 40px;
  margin-bottom: 50px;
}
/* 输入框样式 */
::v-deep .loginInput .el-input__inner {
  margin-bottom: 25px;
  height: 65px;
  background-color: rgb(40, 52, 67);
  font-size: 20px;
  color: white;
  /* padding: 0 0 0 50px; */
}
/* 图标样式 */
::v-deep .el-input__icon {
  width: 20px;
  height: 68px;
}
</style>
