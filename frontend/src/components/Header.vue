<template>
  <header>
    <div class="container">
      <div class="user-bio">
        <div class="user-bio-top">
          <div class="circle-red"></div>
          <div class="circle-yellow"></div>
          <div class="circle-green"></div>
         
          <el-icon @click="ToggleTheme" v-if="!isDark" class="icon-moon" size="15"><Moon /></el-icon>
          <el-icon @click="ToggleTheme" v-if="isDark" class="icon-sun" size="15"><Sunny /></el-icon>
          <button :style="{color: isDark ? '#FFFFFF' : '#000000FF'}" class="close-button" @click="handleClose">✖</button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      isDark: false
    };
  },
  name: 'Header',
  methods: {
    ToggleTheme() {
      //alert('ToggleTheme');
      this.isDark = !this.isDark;
      this.$emit('sendMessage', this.isDark);
      //console.log('ToggleTheme', this.isDark);

    },
      handleClose() {
        console.log('close window');
       // alert('close button clicked');
          window.electron.closeWindow(); // 调用预加载中的方法
      }
  }
};
</script>

<style scoped>
.icon-sun {
  -webkit-app-region: no-drag; /* 添加这行 */
  position: absolute;
  padding-left: 100px;
  cursor: pointer;
}
.icon-moon {
  cursor: pointer;
  -webkit-app-region: no-drag; /* 添加这行 */
  position: absolute;
  padding-left: 100px;
}
header {
  width: 100%;
  -webkit-app-region: drag;
  -webkit-user-select: none;
}
.user-bio {
  font-size: 14px;
}
.user-bio .user-bio-top {
  height: 15px;
  padding: 8px 12px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  position: relative;
}
.user-bio .user-bio-top div {
  float: left;
  margin-right: 10px;
  width: 13px;
  height: 13px;
  border-radius: 50px;
}
.user-bio .user-bio-top .circle-red {
  background-color: #FF4D4D;
}
.user-bio .user-bio-top .circle-yellow {
  background-color: #FFBD2E;
}
.user-bio .user-bio-top .circle-green {
  background-color: #28CA42;
}
.close-button {
  -webkit-app-region: no-drag; /* 添加这行 */
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #000000FF;
}
</style>
