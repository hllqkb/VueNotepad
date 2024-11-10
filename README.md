[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]


<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="images/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Best-README-Template</h3>

  <p align="center">
    An awesome README template to jumpstart your projects!
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/othneildrew/Best-README-Template">View Demo</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/othneildrew/Best-README-Template/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

# Vue Notepad：一款前后端分离的现代桌面笔记应用

## 🚀 关于 Vue Notepad 🚀

### 介绍：😀

Vue Notepad 是一款采用前后端分离架构的先进桌面笔记应用。以下是一些应用界面和功能的截图。
![Vue Notepad 截图](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image.png)
![Vue Notepad 截图](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy.png)
![Vue Notepad 截图](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%203.png)
![Vue Notepad 截图](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%202.png)

#### 核心功能：

1. **全面的笔记管理**：轻松创建、删除和管理笔记、待办事项和 Markdown 内容。功能包括 AI 摘要、AI 对话、主题切换和笔记搜索。
2. **强大的用户系统**：安全的账户登录、注册和用户管理，以及后端笔记管理。
3. **媒体处理**：在笔记环境中无缝上传和管理图片。
4. **互动反馈**：产品留言系统，用于收集用户反馈。

#### 技术亮点：

1. **数据库管理**：使用 `mysql2` 并通过连接池处理高并发。
2. **安全性**：使用 JWT 进行安全的数据处理，后端请求拦截器和中间件用于 JWT 头部验证。
3. **邮件通知**：使用消息队列高效发送电子邮件。
4. **缓存与安全**：Redis 用于防止 DDoS 攻击和页面缓存。bcrypt 用于密码哈希，防止彩虹表攻击。
5. **环境配置**：敏感信息存储在 `.env` 文件中。
6. **SQL 注入防护**：使用安全的 SQL 语法来降低注入风险。
7. **文件上传安全**：在上传过程中验证文件。

### 技术栈：😎

- **前端**：使用 Vue3、Vite、Vuex、ElementUI Plus、Vue Router、Electron、Axios、Fuse.js 和 Vditor 构建的单页面桌面应用。
- **本地后端**：Node.js 环境。
- **服务器后端**：强大的后端设置，包括 Node.js、PHP、Python、Express、Redis、mysql2、CORS、bcrypt、JWT 和 Multer。
- **数据库**：使用 MySQL 进行数据持久化。
- **管理面板**：用于后端管理的直观界面。
- **评论系统**：使用 PHP、Bootstrap 和 jQuery 实现用户交互。

### 安装指南：😘

#### 前提条件：

在继续之前，请确保 PHP、Python 和 Node.js 环境已正确配置。

#### 安装步骤：

安装 `cnpm` 后，只需运行提供的单键启动脚本即可启动应用程序。

### 文档：

默认管理员账户为 `admin`，密码为 `123456`。

### 更新日志（从新到旧）：😁

- **表情符号增强**：增加了更多表情符号供用户选择。
- **Markdown 编辑器升级**：实现了调整编辑器高度的功能。
- **字数统计功能**：新增文本字数统计功能，以便更好地管理内容。

#### 数据库架构：

![数据库架构截图](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%204.png)
Vue Notepad 旨在为用户提供友好且高效的使用体验，注重安全性和性能。应用的模块化架构确保了可扩展性和易于维护，使其成为重视生产力和隐私用户的理想选择。
