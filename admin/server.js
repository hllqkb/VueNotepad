require('dotenv').config(); // 加载环境变量

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios'); // 引入 axios
const app = express();
const bcrypt = require('bcryptjs');

const allowedOrigins = ['http://localhost:3001', 'http://localhost:5173'];

app.use(cors({
  origin: function (origin, callback) {
    // 允许请求的来源为 undefined（如 Postman）或在允许列表中
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const API_URL_BACKEND = process.env.VUE_APP_API_URL_BACKEND; // 使用环境变量

const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
};

let db;

function handleDisconnect() {
  db = mysql.createConnection(dbConfig);

  db.connect((err) => {
    if (err) {
      console.error('连接数据库失败:', err);
      setTimeout(handleDisconnect, 2000); // 2秒后重试连接
    } else {
      console.log('MySQL connected...');
      checkAndCreateAdminTable(); // 检查并创建 admin 表
    }
  });

  db.on('error', (err) => {
    console.error('数据库错误:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // 重新连接
    } else {
      throw err;
    }
  });
}

handleDisconnect();

// 检查并创建 admin 表
function checkAndCreateAdminTable() {
  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS admin (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL
    )
  `;

  db.query(createTableQuery, (err) => {
    if (err) throw err;
    console.log('admin 表已检查或创建');

    // 检查是否存在默认用户
    const checkUserQuery = 'SELECT * FROM admin WHERE username = ?';
    db.query(checkUserQuery, ['admin'], (err, results) => {
      if (err) throw err;
      if (results.length === 0) {
        // 如果不存在，则插入默认用户
        const insertUserQuery = 'INSERT INTO admin (username, password) VALUES (?, ?)';
        const defaultPassword = bcrypt.hashSync('123456', 10); // 加密默认密码
        db.query(insertUserQuery, ['admin', defaultPassword], (err) => {
          if (err) throw err;
          console.log('默认用户已插入到 admin 表');
        });
      } else {
        console.log('默认用户已存在');
      }
    });
  });
}

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

// 登录路由
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const query = 'SELECT * FROM admin WHERE username = ?';
  
  db.query(query, [username], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      // 使用 bcrypt 验证密码
      const hashedPassword = results[0].password;
      bcrypt.compare(password, hashedPassword, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          res.json({ success: true, message: 'Login successful' });
        } else {
          res.json({ success: false, message: 'Invalid credentials' });
        }
      });
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