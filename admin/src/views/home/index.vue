<template>
  <div class="main">
    <backGround></backGround>
    <myMenu></myMenu>
    <top></top>

  </div>



</template>

<script>
import myMenu from './components/myMenu.vue'
import top from '../home/components/top.vue'
import backGround from '../home/components/backGround.vue'
export default {
  name: 'home',
  components: {
    myMenu,
    top,
    backGround
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
