<template>
  <div class="manager">
    <!-- 表单 -->
    <el-dialog :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form :model="form" :rules="rules">
        <!-- 表单内容 -->
        <el-form-item label="用户名" :label-width="'320px'" prop="username">
          <el-input
            v-model="form.username"
            autocomplete="off"
            style="width: 192px"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="'320px'" prop="password">
          <el-input v-model="form.password" autocomplete="off" style="width: 192px" placeholder="请输入密码"></el-input>
        </el-form-item>

        <el-form-item label="权限等级" :label-width="'320px'" prop="power">
          <el-input
            v-model="form.power"
            autocomplete="off"
            style="width: 192px"
            placeholder="请输入权限等级"
          ></el-input>
        </el-form-item>
      </el-form>

      <!-- 表单的确认与取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="resetForm">重 置</el-button>
        <el-button type="success" @click="addManager" style="margin-right: 240px">确 定</el-button>
      </div>
    </el-dialog>

    <el-button size="mini" type="primary" @click="clickAdd()">添加管理人员</el-button>

    <!-- 表格主体 -->
    <div class="tableBox">
      <el-table :data="this.$store.state.userinfo" style="width: 100%" stripe border max-height="528">
        <!-- 用户名 -->
        <el-table-column label="用户名" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <!-- 权限等级 -->
        <el-table-column label="权限等级" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.power }}</span>
          </template>
        </el-table-column>

        <!-- 查看宿舍人员 -->
        <el-table-column label="查看宿舍人员" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.power >= 0" type="success">有权限</el-tag>
            <el-tag v-if="scope.row.power < 0" type="danger">无权限</el-tag>
          </template>
        </el-table-column>

        <!-- 通过入住申请 -->
        <el-table-column label="修改宿舍人员" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.power >= 1" type="success">有权限</el-tag>
            <el-tag v-if="scope.row.power < 1" type="danger">无权限</el-tag>
          </template>
        </el-table-column>

        <!-- 修改管理人员 -->
        <el-table-column label="修改管理人员" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.power >= 2" type="success">有权限</el-tag>
            <el-tag v-if="scope.row.power < 2" type="danger">无权限</el-tag>
          </template>
        </el-table-column>

        <!-- 编辑与退宿按钮  -->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div style="marginleft: 5px">
              <el-button size="mini" type="info" @click="editManager(scope.$index, scope.row)">修改权限等级</el-button>

              <el-button size="mini" type="danger" @click="delManager(scope.$index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'manager',
  data() {
    return {
      //添加的管理员是否有重名
      haveName: false,
      // 表单是否显示
      dialogFormVisible: false,
      // 遍历数组用的索引
      findIndex: 0,
      form: {
        username: '',
        password: '',
        power: ''
      },
      // 表单检查规则
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        power: [{ required: true, message: '请输入权限等级', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 点击添加管理人员后
    clickAdd() {
      this.resetForm()
      if (this.globalVariable.thePower >= 2) {
        this.dialogFormVisible = true
      } else {
        this.myError('无权限')
      }
    },
    //修改权限
    editManager(index) {
      if (this.globalVariable.thePower === 2) {
        if (this.$store.state.userinfo[index].username !== this.globalVariable.theUsername) {
          this.$prompt('请输入权限等级', '修改 ' + this.$store.state.userinfo[index].username + ' 的权限等级', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern: /^[0-2]$/,
            inputErrorMessage: '请输入0,1或2作为权限等级'
          })
            .then(({ value }) => {
              this.$store.state.userinfo[index].power = value
              this.mySuccess(this.$store.state.userinfo[index].username + ' 的权限等级已修改成: ' + value)
              console.log('修改成功')
            })
            .catch(() => {
              this.myInfo('取消修改')
              console.log('取消修改')
            })
        } else {
          this.myError('不能修改自己')
        }
      } else {
        this.myError('无权限')
      }
    },
    // 删除管理员
    delManager(index) {
      if (this.globalVariable.thePower >= 2) {
        if (this.$store.state.userinfo[index].username !== this.globalVariable.theUsername) {
          this.$store.state.userinfo.splice(index, 1)
          console.log('删除成功')
        } else {
          this.myError('不能修改自己')
        }
      } else {
        this.myError('无权限')
      }
    },
    // 添加管理员
    addManager() {
      // 判断是否重名了
      this.findIndex = 0
      this.$store.state.userinfo.forEach(() => {
        this.$store.state.userinfo[this.findIndex].username === this.form.username ? (this.haveName = true) : ' '
        this.findIndex++
      })
      //输入框不为空
      if (this.form.username !== '' && this.form.password !== '' && this.form.power !== '') {
        //权限格式正确
        if (this.form.power === '0' || this.form.power === '1' || this.form.power === '2') {
          //没有重名
          if (!this.haveName) {
            this.dialogFormVisible = false
            this.$store.state.userinfo.unshift({
              username: this.form.username,
              password: this.form.password,
              power: this.form.power
            })
            this.mySuccess('添加成功')
          } else {
            this.myWarning('该用户名已存在')
          }
        } else {
          this.myWarning('请输入0,1或2作为权限等级')
        }
      }
      this.haveName = false
    },
    //重置
    resetForm() {
      for (let i in this.form) {
        this.form[i] = ''
      }
    }
  },
  mounted() {
    this.$store.state.now = '管理人员'
  }
}
</script>

<style scoped>
/* 管理人员大盒子 */
.manager {
  position: absolute;
  top: 240px;
  left: 622px;
  width: 1480px;
  height: 762px;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  align-items: center;
  flex-direction: column;
}
/* 按钮与表格的背景盒子 */
.tableBox {
  width: 864px;
  height: 762px;
}
/* 添加管理员按钮 */
::v-deep .el-button--primary {
  width: 864px;
  height: 70px;
  margin: 20px 0 20px 0;
  border-radius: 20px;
  font-size: 20px;
}
</style>
