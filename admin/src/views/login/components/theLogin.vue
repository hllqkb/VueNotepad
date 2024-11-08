<template>
  <div class="theBackGound">
    <!-- 表单 -->
    <el-dialog :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form :model="form" :inline="true" :rules="rules">
        <!-- 表单内容 -->
        <el-form-item label="姓名" :label-width="'120px'" prop="name">
          <el-input v-model="form.name" autocomplete="off" style="width: 192px" placeholder="请输入姓名"></el-input>
        </el-form-item>

        <el-form-item label="学号" :label-width="'120px'">
          <el-input v-model="form.number" autocomplete="off" style="width: 192px" placeholder="请输入学号"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="'120px'">
          <el-select v-model="form.gender" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="学院" :label-width="'120px'">
          <el-select v-model="form.school" placeholder="请选择学院">
            <el-option label="信工学院" value="信工学院"></el-option>
            <el-option label="传媒学院" value="传媒学院"></el-option>
            <el-option label="设计学院" value="设计学院"></el-option>
            <el-option label="商学院" value="商学院"></el-option>
            <el-option label="外国语学院" value="外国语学院"></el-option>
            <el-option label="人文学院" value="人文学院"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="班级" :label-width="'120px'">
          <el-input v-model="form.class" autocomplete="off" style="width: 192px" placeholder="请输入班级"></el-input>
        </el-form-item>

        <el-form-item label="宿舍楼" :label-width="'120px'">
          <el-select v-model="form.don" placeholder="请选择宿舍楼">
            <el-option label="15栋" value="15栋"></el-option>
            <el-option label="16栋" value="16栋"></el-option>
            <el-option label="17栋" value="17栋"></el-option>
            <el-option label="18栋" value="18栋"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="房间号" :label-width="'120px'">
          <el-input
            v-model="form.fangjian"
            autocomplete="off"
            style="width: 192px"
            placeholder="请输入房间号"
          ></el-input>
        </el-form-item>

        <el-form-item label="床号" :label-width="'120px'">
          <el-select v-model="form.chuang" placeholder="请选择床号">
            <el-option label="1号床" value="1号床"></el-option>
            <el-option label="2号床" value="2号床"></el-option>
            <el-option label="3号床" value="3号床"></el-option>
            <el-option label="4号床" value="4号床"></el-option>
            <el-option label="5号床" value="5号床"></el-option>
            <el-option label="6号床" value="6号床"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="电话" :label-width="'120px'">
          <el-input v-model="form.phone" autocomplete="off" style="width: 192px" placeholder="请输入电话"></el-input>
        </el-form-item>

        <el-form-item label="家属电话" :label-width="'120px'">
          <el-input
            v-model="form.homePhone"
            autocomplete="off"
            style="width: 192px"
            placeholder="请输入家属电话"
          ></el-input>
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
        <h3 class="title">高校宿舍管理系统登录</h3>
      </div>

      <!-- 用户名图标 -->
      <!-- <i class="el-icon-s-custom" style="position: absolute; z-index: 1000; color: white; left: 751px; top: 412px"></i> -->
      <!-- 密码图标 -->
      <!-- <i class="el-icon-lock" style="position: absolute; z-index: 1000; color: white; left: 751px; top: 486px"></i> -->

      <!-- 用户名输入框 -->
      <el-input class="loginInput" placeholder="请输入用户名" v-model="userLog.username" />

      <!-- 密码输入框 -->
      <el-input class="loginInput" placeholder="请输入密码" v-model="userLog.password" show-password />

      <!-- 登录按钮 -->
      <el-button type="primary" style="width: 100%" @click="loging">
        <a style="font-size: 14px">登录</a>
      </el-button>

      <!-- 入住登记按钮 -->
      <el-button type="success" style="width: 100%; margin-top: 20px; margin-left: 0px" @click="apply">
        <a style="font-size: 14px">入住登记</a>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'theLogin',
  data() {
    return {
      // 表单是否显示
      dialogFormVisible: false,
      // 账号密码是否正确
      success: false,
      // 输入框中的内容
      userLog: {
        username: '',
        password: ''
      },
      //表单数据
      form: {
        name: '',
        don: '',
        fangjian: '',
        chuang: '',
        school: '',
        class: '',
        gender: '',
        number: '',
        phone: '',
        homePhone: ''
      },
      // 表单内容检查
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 4, message: '长度在 2 到 4 个字', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 点击登录后
    loging() {
      //判断是否有输入
      if (this.userLog.username === '' && this.userLog.password === '') {
        return this.myWarning('请输入账号和密码')
      } else if (this.userLog.username === '' && this.userLog.password !== '') {
        return this.myWarning('请输入账号')
      } else if (this.userLog.username !== '' && this.userLog.password === '') {
        return this.myWarning('请输入密码')
      }
      //判断是否输入正确
      this.$store.state.userinfo.forEach((userinfo) => {
        this.userLog.username === userinfo.username && this.userLog.password === userinfo.password
          ? (this.success = true)
          : ''
      })
      //根据结果判断是否跳转
      this.success === false ? this.myWarning('账号或密码错误') : this.loginSuccess()
    },
    //账号正确后跳转
    loginSuccess() {
      this.globalVariable.theUsername = this.userLog.username
      this.getPower()
      this.$router.push({ path: '/myView' })
      this.mySuccess('登录成功')
      document.onkeydown = ''
    },
    // 获得权限等级
    getPower() {
      this.globalVariable.thePower = ''
      this.findIndex = 0
      this.$store.state.userinfo.forEach(() => {
        this.$store.state.userinfo[this.findIndex].username === this.globalVariable.theUsername
          ? (this.globalVariable.thePower = this.$store.state.userinfo[this.findIndex].power)
          : ''
        this.findIndex++
      })
    },
    // 点击入住登记后
    apply() {
      this.resetForm()
      this.dialogFormVisible = true
    },
    // 表单重置后的函数
    resetForm() {
      for (let i in this.form) {
        this.form[i] = ''
      }
    },
    // 表单确认后的函数
    handleAdd() {
      if (this.form.name.length >= 2 && this.form.name.length <= 4) {
        this.dialogFormVisible = false
        this.$store.state.applyInfo.unshift({
          name: this.form.name,
          don: this.form.don,
          fangjian: this.form.fangjian,
          chuang: this.form.chuang,
          school: this.form.school,
          class: this.form.class,
          gender: this.form.gender,
          number: this.form.number,
          phone: this.form.phone,
          homePhone: this.form.homePhone
        })
        console.log('申请完成')
        // 弹窗消息
        this.mySuccess('申请成功')
      } else {
        this.myWarning('请输入名字')
      }
    }
  },
  mounted() {
    // 页面绑定回车登录事件
    document.onkeydown = () => {
      if (window.event.keyCode == 13) {
        this.loging()
      }
    }
  }
}
</script>

<style scoped>
/* 背景 */
.theBackGound {
  /* background-color: rgb(45, 58, 75); */
  height: 100vh;
  width: 100%;
  background-color: rgb(45, 58, 75);
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
