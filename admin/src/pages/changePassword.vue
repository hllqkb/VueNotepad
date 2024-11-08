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
        <el-form-item label="密码" prop="pass">
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
export default {
  name: 'changePassword',
  data() {
    // 第一次密码
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
    // 第二次密码
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
    //提交
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let index = 0
          this.$store.state.userinfo.forEach(() => {
            if (this.$store.state.userinfo[index].username === this.globalVariable.theUsername) {
              this.$store.state.userinfo[index].password = this.$refs.newPassword.value
            }
            index++
          })
          this.mySuccess('修改成功')
        } else {
          console.log('修改失败')
          return false
        }
      })
    },
    //重置
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  },
  mounted() {
    //同步vue的账号密码
    this.$store.state.now = '修改密码'
  }
}
</script>

<style scoped>
/* 大背景 */
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
/* 盒子背景 */
.box {
  width: 500px;
  height: 400px;
  box-shadow: 0 0.1rem 0.6rem 0 rgb(0 0 0 / 25%);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(219, 207, 202);
}
/* 按钮样式 */
::v-deep .el-button {
  position: relative;
  top: 40px;
  margin-left: 10px;
  margin-right: 20px;
}
</style>
