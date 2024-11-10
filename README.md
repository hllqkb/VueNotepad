# Vue Notepad

## 🚀一个前后端分离的笔记桌面项目🚀

### 介绍:😀

![https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image.png](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image.png)
![https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy.png](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy.png)
![https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%203.png](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%203.png)
![https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%202.png](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%202.png)

1. 实现创建笔记，删除笔记，添加代办事项，查看笔记，发布笔记，markdown笔记编辑，ai总结，ai对话，主题切换，笔记搜索，账户登录和注册，产品留言，后端笔记管理，图片上传，图片管理，用户等管理的一个单页面多路由的笔记系统
2. 使用mysql2处理高并发，多个连接池
3. 使用jwt保存数据和验证数据，后端请求拦截器，中间件：验证 JWT Authorization header
4. 使用mq实现邮件发送
5. 使用redis防止ddos和页面缓存
6. 使用bcrypt防止彩虹表注入和实现加密，密码密匙加密
7. .env储存敏感信息
8. sql语法防止sql注入
9. 文件上传验证

### 技术栈:😎

* 前端frontend：使用Vue3,vite,vuex,elementui-plus,router,electron,axios,fusejs,vditor...构建的单页面桌面应用
* 本地后端localbackend：nodejs...
* 后端backend：nodejs,php,python,express,redis,mysql2,cors,bcrypt,jwt,router,multer...
* 数据库：mysql...
* 后台管理admin：...
* 留言comment：php,bootstrap,jq...

### 搭建方法:😘

###### 请先配置基本的php和py和nodejs等环境

###### 有cnpm

###### 然后

运行一键启动脚本就可以了

### 文档

`默认管理员账户是admin，密码123456`

### 更新日志(从新到旧):😁

* 添加了更多的表情😅
* 添加md编辑器高度拖拽功能
* 添加文本字数统计

#### 数据表结构

![https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%204.png](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%204.png)