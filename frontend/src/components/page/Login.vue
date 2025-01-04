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
                    <el-input type="password" placeholder="密码" v-model="ruleForm.password" @keyup.enter.native="handleLogin"></el-input>
                </el-form-item>
                <el-form-item prop="validate">
                    <el-input v-model="ruleForm.validate" class="validate-code" placeholder="验证码"></el-input>
                    <div class="code" @click="refreshCode">
                        <s-identify :identifyCode="identifyCode"></s-identify>
                    </div>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="handleLogin">登录</el-button>
                </div>
                <p class="register" @click="handleCommand()">注册</p>
            </el-form>
        </div>
    </div>
</template>

<script>
import SIdentify from '@/components/page/identify.vue';
import config from '@/config.js';
import axios from 'axios';
import { ElMessage } from 'element-plus'; // 引入 ElMessage
export default {
    name: 'login',
    components: {
        SIdentify
    },
    data() {
        return {
            identifyCodes: "1234",
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
        async handleLogin() {
            try {
                const response = await axios.post(`${config.API_BASE_URL}/api/user/login`, {
                    name: this.ruleForm.name,
                    password: this.ruleForm.password
                });
                if (response.data.token) {
                    localStorage.setItem('jwt', response.data.token); // 确保使用 'jwt' 作为键名
                    localStorage.setItem('avatar', response.data.avatar); // 存储头像
                    this.$store.commit('setUsername', this.ruleForm.name); // 存储用户名到 Vuex
                    this.$router.push('/profile'); // 登录成功后跳转
                    ElMessage.success('登录成功'); // 提示登录成功
                } else {
                    ElMessage.error('登录失败: 未收到 token');
                }
            } catch (error) {
                ElMessage.error('登录失败: ' + error.response.data.error);
            }
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
