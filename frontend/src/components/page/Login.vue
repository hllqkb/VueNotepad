<template>
    <div class="login-wrap">
        <div class="ms-title"></div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <div v-if="errorInfo">
                    <span>{{ errInfo }}</span>
                </div>
                <h2>登录</h2>
                <el-form-item prop="name">
                    <el-input v-model="ruleForm.name" placeholder="账号"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <el-form-item prop="validate">
                    <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码"></el-input>
                    <div class="code" @click="refreshCode">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p class="register" @click="handleCommand()">注册</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import config from '@/config.js';
import axios from 'axios';
import { ElMessage } from 'element-plus'; // 引入 ElMessage
import SIdentify from '@/components/page/identify.vue'
export default {
    name: 'login',
    components: {
        SIdentify
    },
    data() {
        return {
            identifyCodes: "1234567890",
            identifyCode: "",
            errorInfo: false,
            errInfo: "",
            ruleForm: {
                name: '',
                password: '',
                validate: ''
            },
            rules: {
                name: [
                    { required: true, message: '请输入用户名', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' }
                ],
                validate: [
                    { required: true, message: '请输入验证码', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
        this.refreshCode(); // 直接调用刷新验证码
        const { account, password } = this.$route.query; // 获取 query 参数
        
        if (account && password) {
            this.ruleForm.name = account; // 将账号赋值
            this.ruleForm.password = password; // 将密码赋值
            //停止运行
        }
        const username1 = localStorage.getItem('username'); // 获取用户名
const password1 = localStorage.getItem('password'); // 获取密码
if (username1 && password1) {
    this.ruleForm.name = username1; // 将用户名赋值
    this.ruleForm.password = password1; // 将密码赋值
}
    },
    methods: {
        submitForm(formName) { 
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    //验证码验证
                    if (this.ruleForm.validate.toUpperCase() !== this.identifyCode.toUpperCase()) {
                        this.errorInfo = true;
                        this.errInfo = '验证码错误';
                        ElMessage.error('验证码错误'); // 使用 ElMessage 显示错误信息
                        return;
                    }
                    axios.post(`${config.API_BASE_URL}/api/user/login`, this.ruleForm)
                    .then((response) => {
                        if (response.data == -1) {
                            this.errorInfo = true;
                            this.errInfo = '该用户不存在';
                            ElMessage.error('该用户不存在'); // 使用 ElMessage 显示错误信息
                        } else if (response.data == 0) {
                            this.errorInfo = true;
                            this.errInfo = '密码错误';
                            ElMessage.error('密码错误'); // 使用 ElMessage 显示错误信息
                        } else if (response.status === 200) {
                            this.$router.push('/');
                            sessionStorage.setItem('ms_username', this.ruleForm.name);
                            sessionStorage.setItem('ms_user', JSON.stringify(this.ruleForm));
                            localStorage.setItem('username', this.ruleForm.name);
                            localStorage.setItem('password', this.ruleForm.password);
                            ElMessage.success('登录成功'); // 提示登录成功
                            this.$store.commit('setVisible', false);
                        }
                    })
                    .catch((error) => {
                        console.error(error); // 打印错误信息
                        ElMessage.error('请求失败，请稍后再试'); // 使用 ElMessage 显示请求失败信息
                    });
                } else {
                    ElMessage.error('请确保表单填写完整'); // 显示表单填写完整的信息
                }
            });
        },
        handleCommand() {
            this.$router.push('/register');
        },
        refreshCode() {
      this.identifyCode = "";
      this.makeCode(this.identifyCodes, 4);
    },
    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min) + min);
    },
        makeCode(o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[
          this.randomNum(0, this.identifyCodes.length)
        ];
      }
      //identifyCode= this.identifyCode;
        }
    }
}
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}
.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
}
.ms-login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: auto;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    background: #fff;
}
.ms-login span {
    color: red;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
}
.code {
    width: 112px;
    height: 35px;
    border: 1px solid #ccc;
    float: right;
    border-radius: 2px;
}
.validate-code {
    width: 136px;
    float: left;
}
.register {
    font-size: 14px;
    line-height: 30px;
    color: #999;
    cursor: pointer;
    float: right;
}
</style>
