[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<br />

<div align="center">
  <a href="https://github.com/hllqkb/VueNotepad">
    <img src="https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/icon.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Vue Notepad</h1>

<p align="center">
    一款前后端分离的现代桌面笔记应用!
    <br />
    <a href="https://github.com/hllqkb/VueNotepad/blob/master/API.md"><strong>Explore the api docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/hllqkb/VueNotepad/blob/master/README_CN.md">中文文档</a>
    ·
    <a href="https://github.com/hllqkb/VueNotepad/blob/master/README.md">英文文档</a>
    ·
    <a href="https://github.com/hllqkb/VueNotepad/issues/new?labels=enhancement&template=feature-request---.md">报告BUG</a>
  </p>
</div>

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

### 主要语言

这一部分应该列出用于启动您的项目的主要框架/库。将任何附加组件/插件留到致谢部分。以下是一些示例。

* [![Next][Next.js]][Next-url]https://nextjs.org/
* [![React][React.js]][React-url]https://reactjs.org/
* [![Vue][Vue.js]][Vue-url]https://vuejs.org/
* [![Angular][Angular.io]][Angular-url]https://angular.io/
* [![Svelte][Svelte.dev]][Svelte-url]https://svelte.dev/
* [![Laravel][Laravel.com]][Laravel-url]https://laravel.com
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]https://getbootstrap.com
* [![JQuery][JQuery.com]][JQuery-url]https://jquery.com

### 技术栈：😎

- **前端**：使用 Vue3、Vite、Vuex、ElementUI Plus、Vue Router、Electron、Axios、Fuse.js 和 Vditor 构建的单页面桌面应用。
- **本地后端**：Node.js 环境。
- **服务器后端**：强大的后端设置，包括 Node.js、PHP、Python、Express、Redis、mysql2、CORS、bcrypt、JWT 和 Multer。
- **数据库**：使用 MySQL 进行数据持久化。
- **管理面板**：用于后端管理的直观界面。
- **评论系统**：使用 PHP、Bootstrap 和 jQuery 实现用户交互。

### 安装指南：😘

#### 前提条件：

在继续之前，请确保 PHP、Python 和 Node.js 环境和.env已正确配置。

admin/.env 文件中需要配置数据库信息。

```bash
VUE_APP_API_URL=http://localhost:3000 // admin后端地址
VUE_APP_API_URL_BACKEND=http://localhost:4000 // backend后端地址
DB_HOST=localhost // 数据库地址
DB_USER=root // 数据库用户名
DB_PASSWORD=root // 数据库密码
DB_NAME=test // 数据库名称
PORT=3000 // 端口
```

backend/.env 文件中需要配置数据库信息。

```bash
JWT_SECRET=your_secret_key_here // JWT密钥
```

#### 安装步骤：

1.Clone the repo
`git clone https://github.com/github_username/repo_name.git`

2.安装 `cnpm` 后，只需运行提供的单键启动脚本即可启动应用程序。

### 文档：

默认管理员账户为 `admin`，密码为 `123456`。

### 更新日志（从新到旧）：😁

- **表情符号增强**：增加了更多表情符号供用户选择。
- **Markdown 编辑器升级**：实现了调整编辑器高度的功能。
- **字数统计功能**：新增文本字数统计功能，以便更好地管理内容。

#### 数据库架构：

![数据库架构截图](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%204.png)
Vue Notepad 旨在为用户提供友好且高效的使用体验，注重安全性和性能。应用的模块化架构确保了可扩展性和易于维护，使其成为重视生产力和隐私用户的理想选择。
<<<<<<< HEAD

### 联系

hllqk - @hllqkb - hllqkb@gmail.com

Project Link: https://github.com/hllqk/VueNotepad

### 贡献

贡献是开源社区成为一个令人惊叹的学习、启发和创造的地方的原因。您所做出的任何贡献都非常受到感激。
如果您有建议可以改进这个项目，以下是一些步骤指南：

1. **Fork项目**
   使用GitHub的Fork按钮来创建项目的副本。
2. **创建您的特性分支**

   ```bash
   git checkout -b feature/AmazingFeature

   ```

在您自己的仓库中创建一个新的分支，用于开发您的特性。

提交您的更改

`git commit -m '添加一些AmazingFeature'`

提交您的更改，并附上清晰的提交信息。

推送到分支

`git push origin feature/AmazingFeature`

将您的特性分支推送到远程仓库。

开启一个Pull请求

通过GitHub界面，从您的特性分支向原仓库的主分支发起一个Pull请求。

别忘了给项目点个星！感谢您的贡献！

如果您想要提出改进建议，也可以直接打开一个带有“enhancement”标签的问题。

再次感谢您的参与和支持！

<!-- MARKDOWN LINKS & IMAGES -->

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->


[contributors-shield]: https://img.shields.io/github/contributors/othneildrew/Best-README-Template.svg?style=for-the-badge
[contributors-url]: https://github.com/othneildrew/Best-README-Template/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/othneildrew/Best-README-Template.svg?style=for-the-badge
[forks-url]: https://github.com/othneildrew/Best-README-Template/network/members
[stars-shield]: https://img.shields.io/github/stars/othneildrew/Best-README-Template.svg?style=for-the-badge
[stars-url]: https://github.com/othneildrew/Best-README-Template/stargazers
[issues-shield]: https://img.shields.io/github/issues/othneildrew/Best-README-Template.svg?style=for-the-badge
[issues-url]: https://github.com/othneildrew/Best-README-Template/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge
[license-url]: https://github.com/othneildrew/Best-README-Template/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/othneildrew
[product-screenshot]: images/screenshot.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com