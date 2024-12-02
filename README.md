[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

<br />

<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/icon.png" alt="Logo" width="80" height="80">
  </a>

<h1 align="center">Vue Notepad</h1>

<p align="center">
    A modern desktop note-taking application with a front-end and back-end separation!
    <br />
    <a href="https://github.com/hllqkb/VueNotepad/blob/master/API.md"><strong>Explore the API docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/hllqkb/VueNotepad/blob/master/README_CN.md">Chinese Documentation</a> 
    ·
    <a href="https://github.com/hllqkb/VueNotepad/blob/master/README.md">English Documentation</a>
    ·
    <a href="https://github.com/hllqkb/VueNotepad/issues/new?labels=enhancement&template=feature-request---.md">Report a Bug</a>
  </p>
</div>

## 🚀 About Vue Notepad 🚀

### Introduction: 😀

Vue Notepad is an advanced desktop note-taking application that employs a front-end and back-end separation architecture. Below are screenshots of the application's interface and features.
![Vue Notepad Screenshot](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image.png)
![Vue Notepad Screenshot](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy.png)
![Vue Notepad Screenshot](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%203.png)
![Vue Notepad Screenshot](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%202.png)

#### Core Features:

1. **Comprehensive Note Management**: Easily create, delete, and manage notes, to-do lists, and Markdown content. Features include AI summarization, AI conversation, theme switching, and note searching.
2. **Powerful User System**: Secure account login, registration, and user management, along with back-end note management.
3. **Media Handling**: Seamlessly upload and manage images within the note environment.
4. **Interactive Feedback**: A product message system for collecting user feedback.

#### Technical Highlights:

1. **Database Management**: Utilizes `mysql2` and handles high concurrency through connection pooling.
2. **Security**: Secure data processing with JWT, back-end request interceptors, and middleware for JWT header validation.
3. **Email Notifications**: Efficiently sends emails using message queues.
4. **Caching and Security**: Redis is used to prevent DDoS attacks and page caching. bcrypt is used for password hashing to prevent rainbow table attacks.
5. **Environment Configuration**: Sensitive information is stored in `.env` files.
6. **SQL Injection Protection**: Uses secure SQL syntax to reduce the risk of injection.
7. **File Upload Security**: Verifies files during the upload process.

### Main Languages

This section should list the main frameworks/libraries used to bootstrap your project. Leave any additional components/plugins for the acknowledgments section. Here are some examples.

* [![Next][Next.js]][Next-url]https://nextjs.org/
* [![React][React.js]][React-url]https://reactjs.org/
* [![Vue][Vue.js]][Vue-url]https://vuejs.org/
* [![Angular][Angular.io]][Angular-url]https://angular.io/
* [![Svelte][Svelte.dev]][Svelte-url]https://svelte.dev/
* [![Laravel][Laravel.com]][Laravel-url]https://laravel.com
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]https://getbootstrap.com
* [![JQuery][JQuery.com]][JQuery-url]https://jquery.com

### Technology Stack: 😎

- **Front-end**: A single-page desktop application built with Vue3, Vite, Vuex, ElementUI Plus, Vue Router, Electron, Axios, Fuse.js, and Vditor.
- **Local Back-end**: Node.js environment.
- **Server Back-end**: A powerful back-end setup, including Node.js, PHP, Python, Express, Redis, mysql2, CORS, bcrypt, JWT, and Multer.
- **Database**: Uses MySQL for data persistence.
- **Management Panel**: An intuitive interface for back-end management.
- **Comment System**: User interaction implemented with PHP, Bootstrap, and jQuery.

### Installation Guide: 😘

#### Prerequisites:

Before proceeding, ensure that PHP, Python, and Node.js environments, along with the .env configuration, are correctly set up.


admin/.env file needs to be configured with database information.

```bash
VUE_APP_API_URL=http://localhost:3000 // admin backend address
VUE_APP_API_URL_BACKEND=http://localhost:4000 // backend address
DB_HOST=localhost // database address
DB_USER=root // database username
DB_PASSWORD=root // database password
DB_NAME=test // database name
PORT=3000 // port
```

backend/.env file needs to be configured with database information.

```bash
JWT_SECRET=your_secret_key_here // JWT secret key
```

#### Installation Steps:

1. Clone the repo
git clone https://github.com/github_username/repo_name.git


2. After installing `cnpm`, simply run the provided one-click startup script to launch the application.

### Documentation:

The default administrator account is `admin` with a password of `123456`.

### Update Log (Newest to Oldest): 😁

- **Emoji Enhancement**: Added more emojis for users to choose from.
- **Markdown Editor Upgrade**: Implemented the ability to adjust the editor's height.
- **Word Count Feature**: Introduced a text word count feature for better content management.

#### Database Architecture:

![Database Architecture Screenshot](https://raw.githubusercontent.com/hllqkb/VueNotepad/refs/heads/master/public/image%20copy%204.png)
Vue Notepad is designed to provide users with a friendly and efficient experience, focusing on security and performance. The application's modular architecture ensures scalability and ease of maintenance, making it an ideal choice for users who value productivity and privacy.

### Contact

hllqk - @hllqkb - hllqkb@gmail.com

Project Link: https://github.com/hllqk/VueNotepad 

### Contributing

Contributions are what make the open source community such a wonderful place to learn, inspire, and create. Any contributions you make are greatly appreciated.
If you have suggestions for improving this project, here are some step-by-step guidelines:

1. **Fork the Project**
Use GitHub's Fork button to create a copy of the project.

2. **Create Your Feature Branch**

  git checkout -b feature/AmazingFeature
  Create a new branch in your fork for development of your feature.

Commit your changes

git commit -m 'Add some AmazingFeature'
Commit your changes with a clear message.

Push to the branch

git push origin feature/AmazingFeature
Push your feature branch to the remote repository.

Open a Pull Request

Initiate a Pull Request through the GitHub interface from your feature branch to the main branch of the original repository.

Don't forget to star the project! Thanks for your contribution!

If you wish to propose improvements, you can also open an issue with the “enhancement” label.

Thank you again for your participation and support!

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
