<template>
	<div class="modify-password">
		<h2>修改密码</h2>
		<el-form :model="form" ref="form" label-width="80px">
			<el-form-item label="旧密码">
				<el-input v-model="form.oldPassword" type="password" placeholder="请输入旧密码"></el-input>
			</el-form-item>
			<el-form-item label="新密码">
				<el-input v-model="form.newPassword" type="password" placeholder="请输入新密码"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="onSubmit">提交</el-button>
			</el-form-item>
		</el-form>
	</div>
</template>

<script>
import axios from 'axios';
import { ElMessage } from 'element-plus';
import config from '@/config.js';

export default {
	data() {
		return {
			form: {
				oldPassword: '',
				newPassword: ''
			}
		};
	},
	methods: {
		async onSubmit() {
			try {
				const token = localStorage.getItem('jwt');	
				const response = await axios.post(`${config.API_BASE_URL}/api/user/modifyPassword`, this.form, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				ElMessage.success('密码修改成功');
				localStorage.removeItem('jwt'); // 清除本地存储中的 JWT
				this.$router.push('/login'); // 重定向到登录页面
			} catch (error) {
				console.error('修改密码失败:', error);
				ElMessage.error('修改密码失败');
			}
		}
	}
};
</script>

<style scoped>
.modify-password {
	padding: 20px;
}
</style>
   