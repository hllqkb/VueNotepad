<template>
    <!-- 文件管理页面 -->

  <div class="image-manager">
    <h1>文件管理</h1>
    <el-upload
      class="upload-demo"
      :action="apiUrl + '/api/notes/upload'"
      list-type="picture-card"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-success="handleUploadSuccess"
      :file-list="fileList"
    >
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" width="50%">
      <img width="100%" :src="dialogImageUrl" alt="预览图片" />
    </el-dialog>
    <div class="image-gallery">
      <el-image
        v-for="image in images"
        :key="image"
        :src="image"
        lazy
        style="width: 200px; height: 200px; margin: 10px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);"
        @click="handlePreview({ url: image })"
        @contextmenu.prevent="confirmDelete(image)"
      >
        <el-button
          slot="placeholder"
          icon="el-icon-delete"
          size="mini"
          @click.stop="handleRemoveImage(image)"
        ></el-button>
      </el-image>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      dialogImageUrl: '',
      dialogVisible: false,
      images: [], // 存储图片 URL
      fileList: [], // 存储上传的文件列表
      apiUrl: process.env.VUE_APP_API_URL_BACKEND // 使用环境变量
    };
  },
  methods: {
    handlePreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleRemove(file) {
      // 调用删除图片的 API
      axios.delete(`${this.apiUrl}/api/notes/delete-image/${file.name}`).then(() => {
        this.$message.success('图片删除成功');
        this.fetchImages(); // 重新获取图片列表
      }).catch(() => {
        this.$message.error('图片删除失败');
      });
    },
    confirmDelete(imageUrl) {
      this.$confirm('确定要删除这张图片吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.handleRemoveImage(imageUrl);
      }).catch(() => {
        this.$message.info('已取消删除');
      });
    },
    handleRemoveImage(imageUrl) {
      const filename = imageUrl.split('/').pop();
      axios.delete(`${this.apiUrl}/api/notes/delete-image/${filename}`).then(() => {
        this.$message.success('图片删除成功');
        this.fetchImages(); // 重新获取图片列表
      }).catch(() => {
        this.$message.error('图片删除失败');
      });
    },
    handleUploadSuccess() {
      this.$message.success('图片上传成功');
      this.fetchImages(); // 上传成功后重新获取图片列表
    },
    fetchImages() {
      // 使用 POST 请求获取所有图片
      axios.post(`${this.apiUrl}/api/notes/images`).then(response => {
        this.images = response.data;
      }).catch(() => {
        this.$message.error('获取图片失败');
      });
    }
  },
  mounted() {
    this.fetchImages(); // 页面加载时获取图片
  }
}
</script>

<style scoped>
.image-manager {
  padding: 20px;
  display: flex;
  margin-top: 100px;
  flex-direction: column;
  align-items: center; /* 垂直居中 */
  justify-content: center; /* 水平居中 */
  position: absolute;
  top: 250px; /* 向下移动 */
  right: 200px; /* 向右移动 */
  transform: translateX(0); /* 调整到中间 */
  background-color: rgba(255, 255, 255, 0.7); /* 半透明背景 */
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px); /* 毛玻璃效果 */
}
.upload-demo {
  margin-bottom: 20px;
}
.image-gallery {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 图片居中 */
}
</style>
