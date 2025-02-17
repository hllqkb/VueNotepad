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

        <el-form-item label="头像" :label-width="'320px'" prop="avatar">
          <el-input v-model="form.avatar" autocomplete="off" style="width: 192px" placeholder="请输入头像URL"></el-input>
        </el-form-item>

        <el-form-item label="背景" :label-width="'320px'" prop="background">
          <el-input v-model="form.background" autocomplete="off" style="width: 192px" placeholder="请输入背景URL"></el-input>
        </el-form-item>
      </el-form>

      <!-- 表单的确认与取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="resetForm">重 置</el-button>
        <el-button type="success" @click="isAdd ? addUser() : updateUser()" style="margin-right: 240px">确 定</el-button>
      </div>
    </el-dialog>

    <el-button size="mini" type="primary" @click="clickAdd()">添加用户</el-button>

    <!-- 表格主体 -->
    <div class="tableBox">
      <el-table :data="users" style="width: 100%" stripe border max-height="528">
        <!-- 用户ID -->
        <el-table-column label="ID" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.id }}</span>
          </template>
        </el-table-column>

        <!-- 用户名 -->
        <el-table-column label="用户名" width="90">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>

        <!-- 密码 -->
        <el-table-column label="密码" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.password }}</span>
          </template>
        </el-table-column>

        <!-- 头像 -->
        <el-table-column label="头像" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" alt="avatar" style="width: 50px; height: 50px;" />
          </template>
        </el-table-column>

        <!-- 背景 -->
        <el-table-column label="背景" width="100">
          <template slot-scope="scope">
            <img :src="scope.row.background" alt="background" style="width: 50px; height: 50px;" />
          </template>
        </el-table-column>

        <!-- 操作 -->
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <div style="marginleft: 5px">
              <el-button size="mini" type="info" @click="editUser(scope.$index, scope.row)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'manager',
  data() {
    return {
      dialogFormVisible: false,
      isAdd: true,
      users: [],
      form: {
        id: '',
        username: '',
        password: '',
        avatar: '',
        background: ''
      },
      rules: {
        username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        avatar: [{ required: true, message: '请输入头像URL', trigger: 'blur' }],
        background: [{ required: true, message: '请输入背景URL', trigger: 'blur' }]
      }
    }
  },
  methods: {
    fetchUsers() {
      axios.get(`${process.env.VUE_APP_API_URL}/api/users`)
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    clickAdd() {
      this.isAdd = true;
      this.resetForm();
      this.dialogFormVisible = true;
    },
    addUser() {
      axios.post(`${process.env.VUE_APP_API_URL}/api/users`, this.form)
        .then(() => {
          this.fetchUsers();
          this.dialogFormVisible = false;
          this.mySuccess('用户添加成功');
        })
        .catch(error => {
          console.error('Error adding user:', error);
          this.myError('用户添加失败');
        });
    },
    editUser(index, row) {
      this.isAdd = false;
      this.form = { ...row };
      this.dialogFormVisible = true;
    },
    updateUser() {
      axios.put(`${process.env.VUE_APP_API_URL}/api/users/${this.form.id}`, this.form)
        .then(() => {
          this.fetchUsers();
          this.dialogFormVisible = false;
          this.mySuccess('用户更新成功');
        })
        .catch(error => {
          console.error('Error updating user:', error);
          this.myError('用户更新失败');
        });
    },
    deleteUser(index, row) {
      axios.delete(`${process.env.VUE_APP_API_URL}/api/users/${row.id}`)
        .then(() => {
          this.users.splice(index, 1);
          this.mySuccess('用户删除成功');
        })
        .catch(error => {
          console.error('Error deleting user:', error);
          this.myError('用户删除失败');
        });
    },
    resetForm() {
      this.form = {
        id: '',
        username: '',
        password: '',
        avatar: '',
        background: ''
      };
    }
  },
  mounted() {
    this.fetchUsers();
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
