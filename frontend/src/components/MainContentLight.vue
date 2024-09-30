<template>
  <div class="editor-container">
    <div id="vditor" ref="vditor"></div>
    
    <el-button type="primary" @click="handleBlur" :disabled="!isContentChanged">保存</el-button>
    <p>{{ title }}</p>
  </div>
</template>

<script>
import Vditor from 'vditor';
import 'vditor/dist/index.css';
import axios from 'axios'; // 导入 Axios
import { ElMessage } from 'element-plus';

export default {
  computed: {
    title() {
      return this.$store.state.title;
    }
  },
  data() {
    return {
      isContentChanged: false,
    };
  },
  props: {
    message: {
      type: Boolean,
      default: false,
    },
    note: {
      type: String,
      default: '',
    },
  },
  name: 'VditorEditor',
  mounted() {
    this.initVditor();
  },
  watch: {
    message(newValue) {
      this.handleMessageChange(newValue);
    },
    note(newValue) {
      this.vditor.setValue(newValue);
    },
  },
  methods: {
    initVditor() {
      this.vditor = new Vditor('vditor', {
        height: "calc(100vh)",
        width: '100%',
        autoHeight: true,
        placeholder: '请输入内容...',
        preview: {
          hljs: {
            lineNumber: true,
            style: 'vs',
          },
        },
        after: () => {
          this.updateTheme(this.message);
        },
        input: () => {
          this.isContentChanged = true; // 标志内容已变化
        },
      });
      
      // 直接使用 Vue 的事件绑定方式
      this.$refs.vditor.addEventListener('blur', this.handleBlur);
    },
    handleMessageChange(newValue) {
      this.updateTheme(newValue);
    },
    updateTheme(isDark) {
      if (isDark) {
        this.vditor.setTheme('dark', 'dark', 'solarized-dark256');
      } else {
        this.vditor.setTheme('light', 'light', 'vs');
      }
    },
    handleBlur() {
      // 失去焦点时调用 POST 方法
      const content = this.vditor.getValue(); // 获取当前内容
      const title = this.title ? this.title.split('.md')[0] : ''; //假设标题
      console.log('标题:', title);
      console.log('内容:', content);

      // 发送 POST 请求
      axios.post('http://localhost:3000/api/notes/update', {
        title: title,
        newContent: content,
      })
      .then(response => {
        ElMessage.success('文件更新成功'); // 使用 ElMessage 成功提示
        //重新刷新侧边栏页面
        this.$store.dispatch('updateNote'); // 触发 action 刷新笔记列表
        this.isContentChanged = false; // 更新成功后重置变更标志
      })
      .catch(error => {
        if (error.response) {
          ElMessage.error('更新文件失败: ' + error.response.data); // 使用 ElMessage 失败提示
        } else {
          ElMessage.error('更新文件失败: ' + error.message); // 使用 ElMessage 失败提示
        }
      });
    },
  },
};
</script>

<style scoped>
.editor-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: calc(100vh - 80px);
}

#vditor {
  flex: 1;
  width: 100%;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
</style>
