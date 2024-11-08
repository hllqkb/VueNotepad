<template>
	<div>
		<div class="crumbs crumbs-register">
			<el-breadcrumb separator="/" class="register-title">
                <el-breadcrumb-item><i class="el-icon-setting"></i>注册</el-breadcrumb-item>
            </el-breadcrumb>
		</div>
		<div class="userContent">
			<el-form ref="form" :model="form" :rules="rules" label-width="80px">
				<el-form-item prop="name" label="用户名称">
					
					<el-input v-model="form.name" placeholder="请输入用户名称"></el-input>
				</el-form-item>
				<el-form-item prop="account" label="账号名称">
					<el-input v-model="form.account" placeholder="请输入账号"></el-input>
				</el-form-item>
				<el-form-item prop="pass" label="密码">
					
					<el-input v-model="form.pass" type="password" placeholder="请输入密码"></el-input>
				</el-form-item>
				<el-form-item prop="checkPass" label="确认密码">
					<el-input v-model="form.checkPass" type="password" placeholder="请再次输入密码"></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="onSubmit('form')">确定</el-button>
					<el-button @click="onCancle()">取消</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	import config from '@/config.js';
	import axios from 'axios';
	import { ElMessage } from 'element-plus'; // 引入 ElMessage

	export default {
		data() {
			var validatePass = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请输入密码'));
				} else {
					if(this.form.checkPass !== '') {
						this.$refs.form.validateField('checkPass');
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if(value === '') {
					callback(new Error('请再次输入密码'));
				} else if (value !== this.form.pass) {
					callback(new Error('两次输入的密码不一致'));
				} else {
					callback();
				}
			};
			var validateUsername = (rule, value, callback) => {
				const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/;
				if (!usernamePattern.test(value)) {
					callback(new Error('用户名只允许字母、数字和下划线，长度为3到20'));
				} else {
					callback();
				}
			};
			var validatePassword = (rule, value, callback) => {
				const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/;
				if (!passwordPattern.test(value)) {
					callback(new Error('密码长度为6到30的字符'));
				} else {
					callback();
				}
			};
			return {
				form: {
					name: '',
					account: '',
					pass: '',
					checkPass: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { validator: validateUsername, trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' },
                        { validator: validatePassword, trigger: 'blur' }
                    ],
                    checkPass: [
                        { validator: validatePass2, trigger: 'blur' }
                    ]
                }
			}
        },
		methods: {
			onCancle() {
            this.$router.push('/login');
        },
    onSubmit(formName) {
        const self = this;			
       // console.log('账户信息:', self.form);
        self.$refs[formName].validate((valid) => {
            if (valid) {
                // 提交表单数据到后端，发送不含 checkPass 的 formData
                const { checkPass, ...formData } = self.form; // 移除 checkPass
                axios.post(`${config.API_BASE_URL}/api/user/addUser`, {
                    username: formData.account, // 确保使用正确的字段名
                    password: formData.pass
                })
                .then((response) => {
                    ElMessage.success('注册成功！'); // 显示注册成功提示
                    const account = formData.account; // 提取账号
                    const password = formData.pass; // 提取密码

                    self.$router.push({
                        path: '/login',
                        query: {
                            account: account,
                            password: password // 使用 query 传递账号和密码
                        }
                    });
                })
                .catch((error) => {
                    console.log(error); // 错误处理
                    ElMessage.error('注册失败，请重试！'); // 显示注册失败提示
                });
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }
}

	}
</script>

<style>
	.crumbs-register {
		height: 50px;
		line-height: 50px;
	}
	.register-title {
		line-height: 50px;
		margin: 0 auto;
    	width: 50px;
    	font-size: 16px;
	}	
	.userContent {
		width: 400px;
		margin: 0 auto;
	}
</style>
