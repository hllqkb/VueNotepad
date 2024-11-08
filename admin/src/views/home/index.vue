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

<style scoped></style>
