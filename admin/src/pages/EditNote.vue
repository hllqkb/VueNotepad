<template>
  <div class="editNote">
    <el-form :model="form" :rules="rules" ref="form" label-width="100px">
      <el-form-item label="ID" prop="id">
        <el-input v-model="form.id" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建者" prop="account">
        <el-input v-model="form.account" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="created_at">
        <el-date-picker v-model="form.created_at" type="datetime" placeholder="选择日期时间"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">保存</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'EditNote',
  data() {
    return {
      form: {
        id: '',
        title: '',
        content: '',
        account: '',
        created_at: ''
      },
      rules: {
        id: [
          { required: true, message: '请输入ID', trigger: 'blur' }
        ],
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 2, max: 50, message: '长度在 2 到 50 个字', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ],
        account: [
          { required: true, message: '请输入创建者', trigger: 'blur' }
        ],
        created_at: [
          { type: 'date', required: true, message: '请选择创建时间', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.put(`${process.env.VUE_APP_API_URL}/api/notes/${this.$route.params.id}`, this.form)
            .then(() => {
              this.mySuccess('保存成功');
            })
            .catch(error => {
              console.error('Error saving note:', error);
              this.myError('保存失败');
            });
        } else {
          console.log('保存失败');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  },
  mounted() {
    const noteId = this.$route.params.id;
    axios.get(`${process.env.VUE_APP_API_URL}/api/notes/${noteId}`)
      .then(response => {
        this.form = response.data;
      })
      .catch(error => {
        console.error('Error loading note:', error);
      });
  }
}
</script>

<style scoped>
.editNote {
  width: 600px;
  margin: 0 auto;
}
</style> 