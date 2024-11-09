require('dotenv').config(); // 加载环境变量

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const bcrypt = require('bcryptjs');

app.use(cors());
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// 创建 MySQL 连接
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL connected...');
});

// 登录路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM admin WHERE username = ? AND password = ?';
  
  db.query(query, [username, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      res.json({ success: true, message: 'Login successful' });
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  });
});

// 获取用户数量
app.get('/api/user-count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM users';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json({ count: results[0].count });
  });
});

// 获取文档数量
app.get('/api/note-count', (req, res) => {
  const query = 'SELECT COUNT(*) AS count FROM notes';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json({ count: results[0].count });
  });
});

// 获取文档列表
app.post('/api/notes', (req, res) => {
  const query = 'SELECT * FROM notes';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 编辑文档
app.put('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const { newId, content, title, account, created_at } = req.body;
  const query = 'UPDATE notes SET id = ?, content = ?, title = ?, account = ?, created_at = ? WHERE id = ?';
  db.query(query, [newId, content, title, account, created_at, id], (err, results) => {
    if (err) throw err;
    res.json({ success: true, message: 'Note updated successfully' });
  });
});

// 删除文档
app.delete('/api/notes/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM notes WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json({ success: true, message: 'Note deleted successfully' });
  });
});

// 添加文档
app.post('/api/notes', (req, res) => {
  const { content, title, account, created_at } = req.body;
  const query = 'INSERT INTO notes (content, title, account, created_at) VALUES (?, ?, ?, ?)';
  db.query(query, [content, title, account, created_at], (err, results) => {
    if (err) throw err;
    res.json({ success: true, message: 'Note added successfully', id: results.insertId });
  });
});

// 获取用户列表
app.get('/api/users', (req, res) => {
  const query = 'SELECT id, username, password, avatar, background FROM users';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// 添加用户
app.post('/api/users', async (req, res) => {
  const { username, password, avatar, background } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10); // 加密密码
    const query = 'INSERT INTO users (username, password, avatar, background) VALUES (?, ?, ?, ?)';
    db.query(query, [username, hashedPassword, avatar, background], (err, results) => {
      if (err) throw err;
      res.json({ success: true, message: 'User added successfully' });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error adding user' });
  }
});

// 编辑用户
app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const { username, password, avatar, background } = req.body;
  const query = 'UPDATE users SET username = ?, password = ?, avatar = ?, background = ? WHERE id = ?';
  db.query(query, [username, password, avatar, background, id], (err, results) => {
    if (err) throw err;
    res.json({ success: true, message: 'User updated successfully' });
  });
});

// 删除用户
app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json({ success: true, message: 'User deleted successfully' });
  });
});

// 修改密码
app.post('/api/change-password', async (req, res) => {
  const { username, newPassword } = req.body;
  try {
    const   query = 'UPDATE admin SET password = ? WHERE username = ?';
    db.query(query, [newPassword, username], (err, results) => {
      if (err) throw err;
      if (results.affectedRows > 0) {
        res.json({ success: true, message: 'Password updated successfully' });
      } else {
        res.json({ success: false, message: 'User not found' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating password' });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
}); 