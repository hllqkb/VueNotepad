const express = require('express');
const cors = require('cors');
const mysql = require('mysql'); // 引入 mysql 模块

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // 使用 express 内置的 json 解析中间件

// 创建 MySQL 连接
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Qw1357924680',
    database: 'test',
    port: 3306 // 添加数据库端口 (通常是 3306)
});
  
// 连接到数据库
db.connect(err => {
    if (err) throw err;
    console.log('MySQL Connected...');

    // 检查 users 表是否存在，如果不存在则创建
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(255) NOT NULL,
            password VARCHAR(255) NOT NULL
        )
    `;
    
    db.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log("Users table checked/created");
    });
});
  
// 注册 API
app.post('/api/register', (req, res) => {
    const { username, password } = req.body;
  
    // 简单的错误处理
    if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码不能为空' });
    }
  
    // 插入用户到数据
    const sql = 'INSERT INTO users (username, password) VALUES (?, ?)';
    db.query(sql, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: '注册失败' });
        }
        res.json({ message: '注册成功' });
    });
});
  //
app.get('/api/', (req, res) => {
    res.send('Hello World!');
});
app.get('/api/data', (req, res) => {
    res.json({ message: 'Separate notepads from the front and back' });
});
// 登录 API
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    // 简化的错误处理
    if (!username || !password) {
        return res.status(400).json({ message: '用户名和密码不能为空' });
    }

    // 查询数据库中的用户
    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], (err, results) => {
        if (err) {
            return res.status(500).json({ message: '数据库查询失败' });
        }

        // 检查用户是否存在
        if (results.length === 0 || results[0].password !== password) {
            return res.status(401).json({ message: '无效的用户名或密码' });
        }

        // 登录成功
        return res.status(200).json({ message: '登录成功' });
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
