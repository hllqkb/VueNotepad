<template>
  <div>
    <div class="myMenu">
      <!-- 用户信息 -->
      <div class="menu_user">
        <div class="menu_user_pic">
          <el-avatar :size="40"> user </el-avatar>
        </div>
        <div class="menu_user_name_box">
          <a class="menu_user_name">{{ this.globalVariable.theUsername }}</a>
        </div>
      </div>

      <!-- 情况总览 -->
      <router-link to="/myView" class="router">
        <div class="menu_item">
          <div class="menu_item_pic">
            <i class="el-icon-s-help"></i>
          </div>
          <div class="menu_item_box">
            <a class="menu_item_box_a">情况总览</a>
          </div>
        </div>
      </router-link>

      <!-- 宿舍人员 -->
      <router-link to="/myTable" class="router">
        <div class="menu_item">
          <div class="menu_item_pic">
            <i class="el-icon-user-solid"></i>
          </div>
          <div class="menu_item_box">
            <a class="menu_item_box_a">宿舍人员</a>
          </div>
        </div>
      </router-link>

      <!-- 入住申请 -->
      <router-link to="/myCheck" class="router">
        <div class="menu_item">
          <div class="menu_item_pic">
            <i class="el-icon-s-check"></i>
          </div>
          <div class="menu_item_box">
            <a class="menu_item_box_a">入住申请</a>
          </div>
        </div>
      </router-link>

      <!-- 管理人员 -->
      <router-link to="/manager" class="router">
        <div class="menu_item">
          <div class="menu_item_pic">
            <i class="el-icon-s-custom"></i>
          </div>
          <div class="menu_item_box">
            <a class="menu_item_box_a">管理人员</a>
          </div>
        </div>
      </router-link>

      <!-- 修改密码 -->
      <router-link to="/changePassword" class="router">
        <div class="menu_item">
          <div class="menu_item_pic">
            <i class="el-icon-s-tools"></i>
          </div>
          <div class="menu_item_box">
            <a class="menu_item_box_a">修改密码</a>
          </div>
        </div>
      </router-link>

      <!-- 退出系统 -->
      <div class="menu_item" @click="quit">
        <div class="menu_item_pic">
          <i class="el-icon-caret-left"></i>
        </div>
        <div class="menu_item_box">
          <a class="menu_item_box_a">退出系统</a>
        </div>
      </div>
    </div>

    <transition name="fadeing">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'myMenu',
  components: {},
  data() {
    return {
      // 避免弹框重复出现的变量
      haveConfirm: false
    }
  },
  methods: {
    //退出系统
    quit() {
      this.haveConfirm = true
      this.$confirm('此操作将退出该系统, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$router.push({ path: '/login' })
          this.mySuccess('已退出')
        })
        .catch(() => {
          this.myInfo('已取消')
          setTimeout(() => {
            this.haveConfirm = false
          }, 100)
        })
    }
  },
  mounted() {
    // 页面绑定esc退出事件
    document.onkeyup = () => {
      if (window.event.keyCode == 27 && this.haveConfirm == false) {
        this.quit()
      }
    }
  }
}
</script>

<style scoped>
/* 左边菜单大背景 */
.myMenu {
  position: absolute;
  top: 80px;
  left: 185px;
  width: 308px;
  height: 928px;
  background-color: white;
  box-shadow: 0 0 10px rgb(128 145 165 / 20%);
  display: flex;
  flex-direction: column;
}
/* 用户信息盒子 */
.menu_user {
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #e8eaee;
  display: flex;
  align-items: center;
}
/* 用户头像 */
.menu_user_pic {
  position: relative;
  left: 57px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgb(185, 205, 239);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 用户名区域 */
.menu_user_name_box {
  position: absolute;
  width: 120px;
  height: 16px;
  left: 130px;
  display: flex;
  justify-content: center;
  align-items: center;
}
/* 用户名字体 */
.menu_user_name {
  left: 80px;
  font-size: 16px;
}
/* 菜单列表大背景 */
.menu_item {
  width: 100%;
  height: 50px;
  background-color: white;
  display: flex;
  align-items: center;
}
/* 鼠标经过时菜单列表大背景改变样式 */
.menu_item:hover {
  background-color: rgb(225, 236, 254);
  cursor: pointer;
}
/* 鼠标经过时图标盒子与字体盒子改变样式 */
.menu_item:hover > .menu_item_box,
.menu_item:hover > .menu_item_pic {
  color: rgb(53, 130, 251);
}
/* 菜单列表图标盒子 */
.menu_item_pic {
  position: relative;
  left: 70px;
}
/* 菜单列表字体盒子 */
.menu_item_box {
  position: relative;
  left: 100px;
  width: 135px;
  height: 35px;
}
/* 菜单列表字体 */
.menu_item_box_a {
  font-size: 24px;
  border-bottom: none;
}
/* 重置路由链接样式 */
.router {
  text-decoration: none;
  color: #000;
}
/* 出现与消失动画 */
.fadeing-enter,
.fadeing-leave-to {
  opacity: 0;
}
.fadeing-enter-active,
.fadeing-leave-active {
  transition: all 0.5s;
}
</style>
