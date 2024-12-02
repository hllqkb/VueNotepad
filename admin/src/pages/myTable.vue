<template>
  <div>
    <!-- 表单 -->
    <el-dialog :visible.sync="dialogFormVisible" v-if="dialogFormVisible">
      <el-form :model="form" :inline="true" :rules="rules">
        <!-- 表单内容 -->
        <el-form-item label="标题" :label-width="'120px'" prop="title">
          <el-input v-model="form.title" autocomplete="off" style="width: 192px" placeholder="请输入标题"></el-input>
        </el-form-item>

        <el-form-item label="内容" :label-width="'120px'" prop="content">
          <el-input v-model="form.content" autocomplete="off" style="width: 192px" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="创建者" :label-width="'120px'" prop="account">
          <el-select v-model="form.account" placeholder="请选择创建者">
            <el-option
              v-for="user in users"
              :key="user.username"
              :label="user.username"
              :value="user.username"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建时间" :label-width="'120px'" prop="created_at">
          <el-date-picker v-model="form.created_at" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
      </el-form>
      <!-- 表单的确认与取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button type="danger" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="warning" @click="resetForm()">重 置</el-button>
        <el-button type="primary" @click="isAdd ? handleAdd() : handleUpData()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="myTable">
      <!-- 顶部功能区 -->
      <div class="top">
        <!-- 搜索框 -->
        <div class="seaDiv">
          <el-input placeholder="搜索笔记" v-model="input" clearable @input="searchNotes"></el-input>
        </div>

        <!-- 添加的按钮 -->
        <el-button type="success" style="marginright: 20px" @click="add" icon="el-icon-edit">添加</el-button>
      </div>
      <!-- 表格主体 -->
      <div class="table_box">
        <el-table :data="filteredNotes" style="width: 100%" stripe border max-height="568">
          <!-- 文档ID -->
          <el-table-column label="文档ID" width="90">
            <template slot-scope="scope">
              <span style="margin-left: 0px">{{ scope.row.id }}</span>
            </template>
          </el-table-column>

          <!-- 标题 -->
          <el-table-column label="标题" width="150">
            <template slot-scope="scope">
              <span style="margin-left: 0px">{{ scope.row.title }}</span>
            </template>
          </el-table-column>

          <!-- 内容 -->
          <el-table-column label="内容" width="200">
            <template slot-scope="scope">
              <span style="margin-left: 0px">{{ scope.row.content }}</span>
            </template>
          </el-table-column>

          <!-- 创建者 -->
          <el-table-column label="创建者" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 0px">{{ scope.row.account }}</span>
            </template>
          </el-table-column>

          <!-- 创建时间 -->
          <el-table-column label="创建时间" width="150">
            <template slot-scope="scope">
              <span style="margin-left: 0px">{{ scope.row.created_at }}</span>
            </template>
          </el-table-column>

          <!-- 操作 -->
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="mini" type="primary" @click="editDocument(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Fuse from 'fuse.js';

export default {
  name: 'myTable',
  data() {
    return {
      dialogFormVisible: false,
      isAdd: false,
      index: '',
      input: '',
      notes: [],
      filteredNotes: [],
      users: [], // 存储用户列表
      form: {
        id: '',
        title: '',
        content: '',
        account: '',
        created_at: ''
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请选择创建者', trigger: 'change' }
        ],
        created_at: [
          { type: 'date', required: true, message: '请选择创建时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    fetchNotes() {
      axios.post(`${process.env.VUE_APP_API_URL}/api/notes`)
        .then(response => {
          this.notes = response.data;
          this.filteredNotes = this.notes;
        })
        .catch(error => {
          console.error('Error fetching notes:', error);
        });
    },
    fetchUsers() {
      axios.get(`${process.env.VUE_APP_API_URL}/api/users`)
        .then(response => {
          this.users = response.data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    add() {
      this.isAdd = true;
      this.resetForm();
      this.dialogFormVisible = true;
    },
    handleAdd() {
      axios.post(`${process.env.VUE_APP_API_URL}/api/notes`, this.form)
        .then(response => {
          this.form.id = response.data.id; // 使用后端返回的 ID
          this.notes.push({ ...this.form });
          this.filteredNotes = this.notes;
          this.dialogFormVisible = false;
          this.mySuccess('添加成功');
        })
        .catch(error => {
          console.error('Error adding note:', error);
          this.myError('添加失败');
        });
    },
    editDocument(id) {
      this.$router.push({ path: `/editNote/${id}` });
    },
    handleDelete(index, row) {
      axios.delete(`${process.env.VUE_APP_API_URL}/api/notes/${row.id}`)
        .then(() => {
          this.notes.splice(index, 1);
          this.filteredNotes = this.notes;
          this.mySuccess('删除成功');
        })
        .catch(error => {
          console.error('Error deleting note:', error);
          this.myError('删除失败');
        });
    },
    handleUpData() {
      axios.put(`${process.env.VUE_APP_API_URL}/api/notes/${this.form.id}`, this.form)
        .then(() => {
          this.notes[this.index] = { ...this.form };
          this.filteredNotes = this.notes;
          this.dialogFormVisible = false;
          this.mySuccess('修改成功');
        })
        .catch(error => {
          console.error('Error updating note:', error);
          this.myError('修改失败');
        });
    },
    searchNotes() {
      const fuse = new Fuse(this.notes, {
        keys: ['title', 'content', 'account']
      });
      this.filteredNotes = this.input ? fuse.search(this.input).map(result => result.item) : this.notes;
    },
    resetForm() {
      for (let i in this.form) {
        this.form[i] = '';
      }
    }
  },
  mounted() {
    this.fetchNotes();
    this.fetchUsers(); // 获取用户列表
  }
}
</script>

<style scoped>
/* 表格插件大背景 */
.myTable {
  position: absolute;
  top: 240px;
  left: 622px;
  width: 1480px;
  height: 762px;
  background-color: white;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  flex-direction: column;
}
/* 表格上方控制台 */
.top {
  width: 1480px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: end;
}
/* 搜索框 */
.seaDiv {
  width: 187.5px;
  height: 42px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 表格背景 */
.table_box {
  width: 1460px;
  height: 709px;
  margin-left: 10px;
}
</style>
