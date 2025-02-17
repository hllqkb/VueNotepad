require('dotenv').config();
const express = require('express');
const router = express.Router();
const db = require('../db/db'); // 确保这里引用了正确的 db 模块
const jwt = require('jsonwebtoken'); // 引入 jsonwebtoken
const bcrypt = require('bcrypt'); // 引入 bcrypt
const multer = require('multer'); // 引入 multer
const path = require('path'); // 引入 path 模块

const JWT_SECRET = process.env.JWT_SECRET; // 从环境变量中获取密钥，确保安全

// 配置 multer 存储选项
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 指定上传文件的目录
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用时间戳作为文件名
    }
});

// 创建 multer 实例
const upload = multer({ storage: storage });

// 验证用户输入的有效性
const isInputValid = (name, password) => {
    const usernamePattern = /^[a-zA-Z0-9_]{3,20}$/; // 用户名只允许字母、数字和下划线，长度为3到20
    const passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{6,30}$/; // 密码长度为6到30的字符
    return usernamePattern.test(name) && passwordPattern.test(password);
};

// 登录接口
router.post('/login', async (req, res) => {
    console.log('登录请求到达', req.body); // 打印请求体
    const { name, password } = req.body; // 获取用户名和密码

    res.setHeader('Content-Type', 'application/json'); // 设置响应头

    try {
        // 验证用户的逻辑
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [name]);

        console.log('查询结果:', results); // 打印查询结果
        console.log('查询结果长度:', results.length); // 打印查询结果的长度

        if (results.length > 0) {
            const user = results[0]; // 获取用户信息
            // 验证密码
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return res.status(401).json({ error: '用户名或密码错误' });
            }
            // 用户存在且密码匹配，生成 JWT
            const token = jwt.sign({ name: user.username }, JWT_SECRET, { expiresIn: '168h' });//7*24=168小时
            return res.status(200).json({ 
                message: '登录成功', 
                token, 
                avatar: user.avatar, // 返回头像链接
                background: user.background // 返回背景链接
            }); // 返回状态码 200
        } else {
            return res.status(401).json({ error: '用户名或密码错误' });
        }
    } catch (err) {
        console.error('服务器内部错误:', err);
        return res.status(500).json({ error: '服务器内部错误' });
    }
});

// 中间件：验证 JWT
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log('Authorization Header:', authHeader); // 确认是否收到 header
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7, authHeader.length); // 提取 token
        console.log('Extracted Token:', token); // 日志提取的 token
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                console.log('JWT 验证失败:', err); // 日志验证错误
                return res.sendStatus(403); // 403 禁止
            }
            req.user = user;
            console.log('Authenticated User:', user); // 日志认证用户
            next();
        });
    } else {
        console.log('Authorization header 缺失或格式不正确'); // 日志错误信息
        res.sendStatus(401); // 401 未授权
    }
};

// 示例测试接口
router.get('/test', authenticateJWT, (req, res) => {
    console.log('测试路由被访问'); // 添加调试信息
    res.json({ message: '测试成功', user: req.user });
});

// 退登录接口
router.post('/logout', (req, res) => {
    // 这里可以添加逻辑，例如记录用户的登出时间
    res.status(200).json({ message: '登出成功' });
});

// 检查用户表是否存在的 API
router.get('/check-users-table', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection(); // 从连接池获取连接
        const checkTableQuery = "SHOW TABLES LIKE 'users'";
        const [results] = await connection.query(checkTableQuery);

        if (results.length > 0) {
            res.status(200).json({ exists: true }); // 表存在
        } else {
            res.status(200).json({ exists: false }); // 表不存在
        }
    } catch (error) {
        console.error('检查表时出错:', error);
        res.status(500).json({ error: '检查表时出错' });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 检查用户表是否存在并创建的 API
router.get('/check-and-create-users-table', async (req, res) => {
    let connection;
    try {
        connection = await db.getConnection(); // 从连接池获取连接
        const checkTableQuery = "SHOW TABLES LIKE 'users'";
        const [results] = await connection.query(checkTableQuery);

        if (results.length === 0) {
            // 表不存在，创建表
            const createUsersTableQuery = `
                CREATE TABLE users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL,
                    password VARCHAR(255) NOT NULL,
                    avatar VARCHAR(255) DEFAULT 'http://localhost:4000/public/avatar.png',
                    background VARCHAR(255) DEFAULT 'http://localhost:4000/public/background.jpg'
                )
            `;
            await connection.query(createUsersTableQuery);
            console.log("Users table created");
            return res.status(201).json({ message: '用户表已创建' });
        } else {
            return res.status(200).json({ message: '用户表已存在' });
        }
    } catch (error) {
        console.error('检查或创建用户表时出错:', error);
        return res.status(500).json({ error: '检查创建用户表时出错', details: error.message });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 添加用户注册接口
router.post('/addUser', async (req, res) => {
    const { username, password } = req.body; // 从请求体中获取用户名和密码

    if (!isInputValid(username, password)) {
        return res.status(400).json({ error: '用户名或密码格式不正确' });
    }

    let connection;
    try {
        connection = await db.getConnection(); // 从连接池获取连接
        const checkUserQuery = 'SELECT * FROM users WHERE username = ?';
        const [existingUser] = await connection.query(checkUserQuery, [username]);

        if (existingUser.length > 0) {
            return res.status(409).json({ error: '用户名已存在' });
        }

        // 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);// 10 为 bcrypt 算法的迭代次数

        const addUserQuery = 'INSERT INTO users (username, password) VALUES (?, ?)';
        await connection.query(addUserQuery, [username, hashedPassword]);
        res.status(201).json({ message: '用户注册成功' });
    } catch (error) {
        console.error('注册用户时出错:', error);
        res.status(500).json({ error: '注册用户时出错' });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 获取用户详细信息的 API
router.get('/user-details', authenticateJWT, async (req, res) => {
    const username = req.user.name; // 从 JWT 中获取用户名
    let connection;
    try {
        connection = await db.getConnection(); // 从连接池获取连接
        const query = 'SELECT username, avatar, background FROM users WHERE username = ?';
        const [results] = await connection.query(query, [username]);

        if (results.length > 0) {
            res.json(results[0]); // 返回用户详细信息
        } else {
            res.status(404).json({ error: '用户未找到' });
        }
    } catch (error) {
        console.error('获取用户详细信息时出错:', error);
        res.status(500).json({ error: '获取用户详细信息时出错' });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 修改个人信息的 API
router.post('/modifyUser', authenticateJWT, async (req, res) => {
    const { username } = req.body;
    console.log(req.user);
    const currentUsername = req.user.name; // 假设通过 JWT 获取当前用户名
    let connection;
    try {
        connection = await db.getConnection(); // 确保在 async 函数中使用 await
        const updateQuery = 'UPDATE users SET username = ? WHERE username = ?';
        await connection.query(updateQuery, [username, currentUsername]);
        res.status(200).json({ message: '个人信息修改成功' });
    } catch (error) {
        console.error('修改个人信息时出错:', error);
        res.status(500).json({ error: '修改个人信息时出错' });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 修改密码的 API
router.post('/modifyPassword', authenticateJWT, async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    
    const currentUsername = req.user.name; // 假设通过 JWT 获取当前用户名
    let connection;
    try {
        connection = await db.getConnection();
        const [results] = await connection.query('SELECT password FROM users WHERE username = ?', [currentUsername]);
        if (results.length > 0) {
            const user = results[0];
            const match = await bcrypt.compare(oldPassword, user.password);
            if (!match) {
                return res.status(401).json({ error: '旧密码不正确' });
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';
            await connection.query(updateQuery, [hashedPassword, currentUsername]);
            res.status(200).json({ message: '密码修改成功' });
        } else {
            res.status(404).json({ error: '用户未找到' });
        }
    } catch (error) {
        console.error('修改密码时出错:', error);
        res.status(500).json({ error: '修改密码时出错' });
    } finally {
        if (connection) connection.release();
    }
});

// 上传头像的 API
router.post('/uploadAvatar', authenticateJWT, upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        console.error('文件上传失败');
        return res.status(400).json({ error: '文件上传失败' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const currentUsername = req.user.name; // 现在 req.user 应该被正确设置
    let connection;
    try {
        connection = await db.getConnection(); // 从连接池获取连接
        const updateQuery = 'UPDATE users SET avatar = ? WHERE username = ?';
        await connection.query(updateQuery, [fileUrl, currentUsername]);
        res.json({ code: 0, message: '头像上传成功', url: fileUrl });
    } catch (error) {
        console.error('上传头像时出错:', error);
        res.status(500).json({ error: '上传头像时出错' });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 上传背景图片的 API
router.post('/uploadBackground', authenticateJWT, upload.single('background'), async (req, res) => {
    if (!req.file) {
        console.error('文件上传失败');
        return res.status(400).json({ error: '文件上传失败' });
    }

    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    const currentUsername = req.user.name; // 现在 req.user 应该被正确设置
    let connection;
    try {
        connection = await db.getConnection(); // 从连接池获取连接
        const updateQuery = 'UPDATE users SET background = ? WHERE username = ?';
        await connection.query(updateQuery, [fileUrl, currentUsername]);
        res.json({ code: 0, message: '背景图片上传成功', url: fileUrl });
    } catch (error) {
        console.error('上传背景图片时出错:', error);
        res.status(500).json({ error: '上传背景图片时出错' });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

module.exports = router; // 导出路由
