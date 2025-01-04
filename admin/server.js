require('dotenv').config(); // 加载环境变量

const express = require('express');
const mysql = require('mysql2'); // 改为直接使用 mysql2
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');
const app = express();
const bcrypt = require('bcryptjs');

const allowedOrigins = ['http://localhost:3001', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND;

// 创建数据库连接池
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise(); // 添加 .promise() 来获取 Promise 接口

// 检查并创建所需的表
async function checkAndCreateTables() {
  try {
    // 创建 admin 表
    const createAdminTableQuery = `
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL
      )
    `;
    await pool.query(createAdminTableQuery);
    console.log('admin 表已检查或创建');

    // 创建 notes 表
    const createNotesTableQuery = `
      CREATE TABLE IF NOT EXISTS notes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        title VARCHAR(255),
        account VARCHAR(255),
        created_at DATETIME
      )
    `;
    await pool.query(createNotesTableQuery);
    console.log('notes 表已检查或创建');

    // 创建 users 表
    const createUsersTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        avatar VARCHAR(255),
        background VARCHAR(255)
      )
    `;
    await pool.query(createUsersTableQuery);
    console.log('users 表已检查或创建');

    // 检查是否存在默认管理员用户
    const [users] = await pool.query('SELECT * FROM admin WHERE username = ?', ['admin']);
    if (users.length === 0) {
      const defaultPassword = await bcrypt.hash('123456', 10);
      await pool.query('INSERT INTO admin (username, password) VALUES (?, ?)', ['admin', defaultPassword]);
      console.log('默认管理员用户已创建');
    } else {
      console.log('默认管理员用户已存在');
    }

  } catch (err) {
    console.error('初始化数据库表失败:', err);
  }
}

// 替换原来的 checkAndCreateAdminTable 调用
checkAndCreateTables();

// 修改所有数据库操作为 async/await 方式
//Started

// 登录路由
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const [users] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
    
    if (users.length > 0) {
      const isMatch = await bcrypt.compare(password, users[0].password);
      if (isMatch) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('登录错误:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// 获取所有图片
app.post('/api/images', async (req, res) => { // 改为 POST 请求
  try {
    const response = await axios.post(`${API_URL_BACKEND}/api/images`);
    res.json(response.data);
  } catch (error) {
    console.error('获取图片失败:', error);
    res.status(500).json({ error: '获取图片失败' });
  }
});

// 删除图片
app.delete('/api/delete-image/:filename', async (req, res) => {
  const { filename } = req.params;
  try {
    const response = await axios.delete(`${API_URL_BACKEND}/api/delete-image/${filename}`);
    res.json(response.data);
  } catch (error) {
    console.error('删除图片失败:', error);
    res.status(500).json({ error: '删除图片失败' });
  }
});

// 获取用户数量
app.get('/api/user-count', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT COUNT(*) AS count FROM users');
    res.json({ count: results.count });
  } catch (err) {
    console.error('获取用户数量失败:', err);
    res.status(500).json({ error: '获取用户数量失败' });
  }
});

// 获取文档数量
app.get('/api/note-count', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT COUNT(*) AS count FROM notes');
    res.json({ count: results.count });
  } catch (err) {
    console.error('获取文档数量失败:', err);
    res.status(500).json({ error: '获取文档数量失败' });
  }
});

// 获取文档列表
app.post('/api/notes', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT * FROM notes');
    res.json(results);
  } catch (err) {
    console.error('获取文档列表失败:', err);
    res.status(500).json({ error: '获取文档列表失败' });
  }
});

// 编辑文档
app.put('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  const { newId, content, title, account, created_at } = req.body;
  try {
    await pool.query('UPDATE notes SET id = ?, content = ?, title = ?, account = ?, created_at = ? WHERE id = ?', [newId, content, title, account, created_at, id]);
    res.json({ success: true, message: 'Note updated successfully' });
  } catch (err) {
    console.error('编辑文档失败:', err);
    res.status(500).json({ error: '编辑文档失败' });
  }
});

// 删除文档
app.delete('/api/notes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM notes WHERE id = ?', [id]);
    res.json({ success: true, message: 'Note deleted successfully' });
  } catch (err) {
    console.error('删除文档失败:', err);
    res.status(500).json({ error: '删除文档失败' });
  }
});

// 添加文档
app.post('/api/notes', async (req, res) => {
  const { content, title, account, created_at } = req.body;
  try {
    const [results] = await pool.query('INSERT INTO notes (content, title, account, created_at) VALUES (?, ?, ?, ?)');
    res.json({ success: true, message: 'Note added successfully', id: results.insertId });
  } catch (err) {
    console.error('添加文档失败:', err);
    res.status(500).json({ error: '添加文档失败' });
  }
});

// 获取用户列表
app.get('/api/users', async (req, res) => {
  try {
    const [results] = await pool.query('SELECT id, username, password, avatar, background FROM users');
    res.json(results);
  } catch (err) {
    console.error('获取用户列表失败:', err);
    res.status(500).json({ error: '获取用户列表失败' });
  }
});

// 添加用户
app.post('/api/users', async (req, res) => {
  const { username, password, avatar, background } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 加密密码
    await pool.query('INSERT INTO users (username, password, avatar, background) VALUES (?, ?, ?, ?)', [username, hashedPassword, avatar, background]);
    res.json({ success: true, message: 'User added successfully' });
  } catch (err) {
    console.error('添加用户失败:', err);
    res.status(500).json({ error: '添加用户失败' });
  }
});

// 编辑用户
app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  const { username, password, avatar, background } = req.body;
  try {
    await pool.query('UPDATE users SET username = ?, password = ?, avatar = ?, background = ? WHERE id = ?', [username, password, avatar, background, id]);
    res.json({ success: true, message: 'User updated successfully' });
  } catch (err) {
    console.error('编辑用户失败:', err);
    res.status(500).json({ error: '编辑用户失败' });
  }
});

// 删除用户
app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id = ?', [id]);
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('删除用户失败:', err);
    res.status(500).json({ error: '删除用户失败' });
  }
});

// 修改密码
app.post('/api/change-password', async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    await pool.query('UPDATE admin SET password = ? WHERE username = ?', [newPassword, username]);
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (err) {
    console.error('修改密码失败:', err);
    res.status(500).json({ error: '修改密码失败' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 