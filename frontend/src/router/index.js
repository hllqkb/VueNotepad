import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',

    },
    {
        path: '/readme',
        component: () => import('../components/common/Home.vue'), // 使用异步导入
        children: [
            {
                path: '/upload',
                component: () => import('../components/page/Upload.vue') // Vue-Core-Image-Upload组件
            },
            {
                path: '/userCenter',
                component: () => import('../components/page/UserCenter.vue') // 拖拽列表组件
            },
            {
                path: '/modifyUser',
                component: () => import('../components/page/ModifyUser.vue') // 使用异步导入
            },
            {
                path: '/modifyPassword',
                component: () => import('../components/page/ModifyPassword.vue') // 使用异步导入
            },
            {
                path: '/success',
                component: () => import('../components/page/Success.vue') // 使用异步导入
            }
        ]
    },
    {
        path: '/addnote',
        component: () => import('../components/page/AddNote.vue'), // 使用异步导入
    },
    {
        path: '/register',
        component: () => import('../components/page/Register.vue') // 使用异步导入
    },
    {
        path: '/login',
        component: () => import('../components/page/Login.vue') // 使用异步导入
    },
];

// 创建路由实例
const router = createRouter({
    history: createWebHistory(), // 使用 HTML5 历史模式
    routes, // 路由配置
});

// 导出路由实例
export default router;
