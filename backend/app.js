const userApi = require('./api/userApi.js');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors'); // 引入 CORS 中间件
const app = express();

app.use(cors()); // 启用 CORS 支持
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // 添加参数

app.use('/api/user', userApi);
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// 处理未匹配的路由
app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

// 错误处理
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(4000, () => {
    console.log('success listen at port: 4000');
});
