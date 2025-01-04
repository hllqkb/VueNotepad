<template>
  <div class="changePassword">
    <div class="box">
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        style="transform: translateX(-8%)"
      >
        <center><h1 style="color: rgb(255, 255, 255);">修改密码</h1></center>
        <el-form-item style="color: rgb(255, 255, 255)" label="密码" prop="pass">
          <el-input v-model="ruleForm.pass" autocomplete="off" ref="newPassword"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'changePassword',
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkPass: ''
      },
      rules: {
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post(`${process.env.VUE_APP_API_URL}/api/change-password`, {
            username: localStorage.getItem('username'),
            newPassword: this.ruleForm.pass
          })
          .then(response => {
            if (response.data.success) {
              this.mySuccess('修改成功');
              window.location.reload();
            } else {
              this.myError('用户未找到');
            }
          })
          .catch(error => {
            console.error('Error updating password:', error);
            this.myError('修改失败');
          });
        } else {
          console.log('修改失败');
          return false;
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    this.$store.state.now = '修改密码'
  }
}
</script>

<style scoped>
.changePassword {
  position: absolute;
  top: 240px;
  left: 622px;
  width: 1480px;
  height: 762px;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: 500px;
  height: 400px;
  box-shadow: 0 0.1rem 0.6rem 0 rgb(0 0 0 / 25%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .el-button {
  position: relative;
  top: 40px;
  margin-left: 10px;
  margin-right: 20px;
}
</style>
