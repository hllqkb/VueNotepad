本系统由使用Vue框架制作
需要用Node.js安装依赖并运行
在终端中进入该目录后
运行 npm i
(如果报错可以在更改镜像并安装cnpm后运行 cnpm i)
安装完依赖后运行 npm run serve
在浏览器中打开终端中输出的链接便可进入该系统

<!-- 文件目录 -->
页面尺寸自适应 postcssrc.js
全局函数 globalFunction.vue
全局变量 globalVariable.vue
vuex /store/index.js
预设数据 /store/data.js
路由 /router/index.js
api /api/request.js
相关图片 /assets

登陆页面 /login/components/theLogin.vue
主页面 /views/home/index.vue
上方大标题 /views/home/components/top.vue
左边菜单 /views/home/components/myMenu.vue
主界面 /views/home/components/backGround.vue

情况总览 /pages/myView.vue
宿舍人员 /pages/myTable.vue
入住申请 /pages/myCheck.vue
管理人员 /pages/manager.vue
修改密码 /pages/changePassword.vue