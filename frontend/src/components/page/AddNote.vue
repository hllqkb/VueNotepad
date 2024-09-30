<template>
  <div class="note-container">
    <h2 class="note-title">创建笔记</h2>
    <el-form :rules="[{ required: true, message: '请填写标题', trigger: 'blur' }]" :model="note" ref="noteForm">
      <el-form-item label="标题" prop="title" :rules="[{ required: true, message: '请输入标题', trigger: 'blur' }]">
        <el-input v-model="note.title" placeholder="请输入笔记标题"></el-input>
      </el-form-item>

      <el-form-item label="内容" style="padding-left: 10px;">
        <el-input type="textarea" v-model="note.content" placeholder="请输入笔记内容" :rows="parseInt('10', 10)" class="textarea-input"></el-input>
      </el-form-item>
      <button type="button" class="el-button el-button--primary submit-button" @click="submitNote">提交</button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'; // 导入axios
import { ElMessage } from 'element-plus'; // 导入 Element Plus 的消息提示


export default {
  data() {
    return {
      note: {
        title: '',
        content: '',
      }
    };
  },
  methods: {
    async submitNote() {
      const postData = {
        title: this.note.title,
        content: this.note.content,
    };
    //alert(this.note.content); // 弹出创建的笔记内容
      try {
        //this.$store.dispatch('updateNote', this.note); // 触发 action 更新 Vuex 状态
       // this.$store.dispatch('updateVisibility', false); // 触发 mutation 更新 Vuex 状态
       this.$store.commit('setVisible', false); // 触发 mutation 更新 Vuex 状态，关闭弹窗
        const response = await axios.post('http://localhost:3000/api/notes',  postData,{
          headers: {
                'Content-Type': 'application/json', // 设置请求头为 JSON
            },
        });
        ElMessage.success('文件创建成功！'); // 提示成功信息
        //重新刷新侧边栏页面·
        this.$store.dispatch('updateNote'); // 触发 action 刷新笔记列表

        
      } catch (error) {
        ElMessage.error('创建文件失败，原因：' + error.response?.data.error); // 提示失败信息//
        console.error('创建文件失败:', error.response?.data.error || error.message);
      }
    }
  }
};
</script>

<style scoped>
.note-title {
  text-align: center;
  margin-bottom: 20px;
}

.el-form-item {
  margin-bottom: 20px;
}

.textarea-input {
  resize: vertical; /* 允许垂直方向调整大小 */
  overflow: hidden; /* 隐藏滚动条 */
  height: auto; /* 高度自适应 */
}

.submit-button {
  /* 按钮居中 */
  margin: 0 auto;
  display: block;
  width: 50%; /* 使按钮宽度为100% */
  height: 40px; /* 按钮高度 */
}
</style>
