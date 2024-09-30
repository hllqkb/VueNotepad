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
			return {
				form: {
					name: '',
					account: '',
					pass: '',
					checkPass: ''
                },
                rules: {
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    account: [
                        { required: true, message: '请输入账号', trigger: 'blur' }
                    ],
                    pass: [
                        { validator: validatePass, trigger: 'blur' }
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
        self.$refs[formName].validate((valid) => {
            if (valid) {
                // 提交表单数据到后端，发送不含 checkPass 的 formData
                const { checkPass, ...formData } = self.form; // 移除 checkPass
                self.$http.post(`${config.API_BASE_URL}/api/user/addUser`, formData)
                    .then((response) => { // 使用箭头函数
                        const account = formData.account; // 提取账号
                        const password = formData.pass; // 提取密码

                        // 打印确认是否正确提取
                        // console.log('Account:', account);
                        // console.log('Password:', password);

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
