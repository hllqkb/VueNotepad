<template>
  <div class="editor-container">
    <div id="vditor" ref="vditor"></div>
    
    <el-button type="primary" @click="handleBlur" :disabled="!isContentChanged">保存</el-button>
    <p>{{ title }}</p>
  </div>
</template>

<script>
import config from '@/config';
import axios from 'axios'; // 导入 Axios
import { ElMessage } from 'element-plus';
import Vditor from 'vditor';
import 'vditor/dist/index.css';

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
        width: '100%',
        height: 'calc(100vh - 100px)', // 固定高度
        placeholder: '请输入内容...',
        "toolbarConfig": {
          "pin": true
        },
        hint: {
          emoji: {
            "grinning": "😀",
            "smiley": "😃",
            "smile": "😄",
            "grin": "😁",
            "laughing": "😆",
            "sweat_smile": "😅",
            "joy": "😂",
            "blush": "😊",
            "wink": "😉",
            "eyes": "👀",
            "relieved": "😌",
            "heart_eyes": "😍",
            "kissing_heart": "😘",
            "yum": "😋",
            "stuck_out_tongue_winking_eye": "😜",
            "stuck_out_tongue_closed_eyes": "😝",
            "sunglasses": "😎",
            "smirk": "😏",
            "unamused": "😒",
            "worried": "😟",
            "confused": "😕",
            "fearful": "😖",
            "weary": "😫",
            "tired_face": "😩",
            "angry": "😠",
            "astonished": "😲",
            "dizzy": "😵",
            "flushed": "😳",
            "scream": "😱",
            "fear": "😨",
            "cry": "😢",
            "sob": "😭",
            "mask": "😷",
            "raised_hand": "✋",
            "v": "✌️",
            "punch": "👊",
            "wave": "👋",
            "clap": "👏",
            "thumbsup": "👍",
            "thumbsdown": "👎",
            "heart": "❤️",
            "tada": "🎉",
            "rocket": "🚀"
          }
        },
        resize:{
          enable: true
        },  
        outline: {
          enable: true
        },
        counter: {
          enable: true,
          type: 'text'
        },
        preview: {
          hljs: {
            lineNumber: true,
            style: 'vs',
          },
        },
        upload: {
          accept: 'image/*,.mp3,.wav,.rar',
          token: 'test',
          url: config.API_BASE_URL + '/api/notes/upload/editor',

          filename(name) {
            return name.replace(/[^(a-zA-Z0-9\u4e00-\u9fa5\.)]/g, '')
              .replace(/[\?\\/:|<>\*\[\]\(\)\$%\{\}@~]/g, '')
              .replace(/\s/g, ''); // 修正正则表达式以正确移除空格
          },
          fieldName: 'image', // 确保字段名与后端一致
          success: (responseText, msg) => {
            const msgJson = JSON.parse(msg);
            ElMessage.success('上传文件成功');
            this.vditor.insertValue('![' + msgJson.data.filename + '](' + msgJson.data.url + ')');
          },
          error: (err) => {
            ElMessage.error('上传文件失败: ' + err.message);
          }
        },
        after: () => {
          this.updateTheme(this.message);
        },
        input: () => {
          this.isContentChanged = true; // 标志内容已变化
          this.scrollToBottom(); // 内容变化时自动滚动到底部
        },
      });

      // 直接使用 Vue 的事件绑定方式
      this.$refs.vditor.addEventListener('blur', this.handleBlur);
    },
    scrollToBottom() {
      const vditorContent = document.querySelector('.vditor');
      vditorContent.scrollTop = vditorContent.scrollHeight; // 滚动到内容底部
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
      const content = this.vditor.getValue();
      const title = this.title ? this.title.split('.md')[0] : '';
      const account = this.$store.state.account; // 假设账户信息存储在 Vuex 中
      const fileName = title; // 假设文件名与标题相同

      const token = localStorage.getItem('jwt');
      axios.post(config.LOCAL_URL + '/api/notes/update', {
        title: title,
        newContent: content,
        account: account, // 添加账户信息
        fileName: fileName // 添加文件名
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        ElMessage.success('文件更新成功');
        this.$store.dispatch('updateNote');
        this.isContentChanged = false;
      })
      .catch(error => {
        if (error.response) {
          ElMessage.error('更新文件失败: ' + error.response.data);
        } else {
          ElMessage.error('更新文件失败: ' + error.message);
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
  margin-bottom: -30px;
}

</style>
