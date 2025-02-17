<template>
  <el-container>
    <el-header>
      <h1 class="title">聊天室</h1>
    </el-header>
    <el-container>
      <el-aside v-if="isLoggedIn" width="200px">
        <el-menu>
          <el-menu-item index="1">用户: {{ username }}</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <slot></slot>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  props: {
    isLoggedIn: {
      type: Boolean,
      required: true
    },
    username: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.title {
  color: white;
  margin: 0;
}
</style>
