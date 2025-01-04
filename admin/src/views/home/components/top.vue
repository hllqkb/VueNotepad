<template>
  <div class="top">
    <div class="left_title">
      <a class="left_title_text">{{ this.$store.state.now }}</a>
    </div>
    <div class="right_img">
      <i v-if="this.$store.state.now == '文档总览'" class="el-icon-s-help"></i>
      <i v-if="this.$store.state.now == '文档列表'" class="el-icon-document"></i>
      <i v-if="this.$store.state.now == '文档申请'" class="el-icon-s-check"></i>
      <i v-if="this.$store.state.now == '管理人员'" class="el-icon-s-custom"></i>
      <i v-if="this.$store.state.now == '修改密码'" class="el-icon-s-tools"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top'
}
</script>

<style scoped>
/* 上面标题大背景 */
.top {
  position: absolute;
  top: 80px;
  left: 622px;
  width: 1480px;
  height: 73px;
  background-color: white;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  align-items: center;
}
/* 左边的标题 */
.left_title {
  position: absolute;
  width: 132px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid #e8eaee;
}
/* 左边的标题的字体 */
.left_title_text {
  font-size: 24px;
}
/* 右边的图标盒子 */
.right_img {
  position: absolute;
  right: 0px;
  width: 57px;
  height: 24px;
  border-left: 1px solid #e8eaee;
}
/* 右边的图标 */
.right_img i {
  position: relative;
  left: 20px;
}
</style>
