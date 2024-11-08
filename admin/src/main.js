import Vue from 'vue'
import App from './App.vue'
//引入vuex
import store from './store/index.js'
//引入router
import router from './router/index.js'
//引入ElementUI组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
//引入全局变量和函数
//全局变量this.globalVariable.变量名
//全局函数this.函数名
import globalVariable from './globalVariable.vue'
Vue.prototype.globalVariable = globalVariable
import globalFunction from './globalFunction.vue'
Vue.use(globalFunction)

import './style/baseStyle.css'
Vue.config.productionTip = false

new Vue({
  el: '#app',
  render: (h) => h(App),
  router,
  store
}).$mount('#app')
