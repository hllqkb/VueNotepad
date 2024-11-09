import VueRouter from 'vue-router';
import Vue from 'vue';
Vue.use(VueRouter);

//创建并暴露路由器
const router = new VueRouter({
  routes: [
    {
      path: '/login',
      component: () => import('../views/login/index.vue'),
    },
    {
      path: '/home',
      component: () => import('../views/home/index.vue'),
      children:[
        {
          path: '/myView',
          component: () => import('../pages/myView.vue'),
        },
        {
          path: '/myTable',
          component: () => import('../pages/myTable.vue'),
        },
        {
          path: '/manager',
          component: () => import('../pages/manager.vue')
        },
        {
          path: '/myCheck',
          component: () => import('../pages/myCheck.vue'),
        },
        {
          path: '/changePassword',
          component: () => import('../pages/changePassword.vue')
        },
      ]
    },
    {
      path: '/editNote/:id',
      component: () => import('../pages/EditNote.vue')
    },
  ],
});
export default router;


// 解决跳转时出现报错警告
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push的
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace的
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}