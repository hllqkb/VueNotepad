<template>
	<div class="modify-user">
		<h2>修改个人信息</h2>
		<el-form :model="form" ref="form" label-width="80px">
			<el-form-item label="用户名">
				<el-input v-model="form.username" placeholder="请输入新用户名"></el-input>
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
				username: ''
			}
		};
	},
	methods: {
		async onSubmit() {
			try {
				const token = localStorage.getItem('jwt');
				const response = await axios.post(`${config.API_BASE_URL}/api/user/modifyUser`, this.form, {
					headers: {
						Authorization: `Bearer ${token}`
					}
				});
				ElMessage.success('个人信息修改成功');
				localStorage.removeItem('jwt'); // 清除本地存储中的 JWT
				this.$router.push('/login'); // 重定向到登录页面

			} catch (error) {
				console.error('修改个人信息失败:', error);
				ElMessage.error('修改个人信息失败');
			}
		}
	}
};
</script>

<style scoped>
.modify-user {
	padding: 20px;
}
</style>