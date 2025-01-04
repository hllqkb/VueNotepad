require('dotenv').config(); // 加载环境变量
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userApi = require('./api/userApi'); // 引入用户 API
const notesApi = require('./api/notesApi'); // 引入笔记 API
const aiApi = require('./api/aiApi'); // 引入 AI API
const db = require('./db/db'); // 引入数据库连接
const path = require('path'); // 引入 path 模块
const PORT = process.env.PORT || 4000; // 设置端口为 4000
const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const redis = require('redis');
const { exec } = require('child_process');

const app = express(); // 初始化 Express 应用

// 创建 Redis 客户端
const redisClient = redis.createClient({
    host: 'localhost',
    port: 6379,
    password: process.env.REDIS_PASSWORD || '123456', // 使用环境变量中的密码
});

redisClient.on('error', (err) => console.error('Redis Client Error', err));

redisClient.on('connect', () => {
    console.log('Connected to Redis');
});

// 配置速率限制
const limiter = rateLimit({
    store: new RedisStore({
        client: redisClient, // 传递降级后的 Redis 客户端
    }),
    windowMs: 15 * 60 * 1000, // 15 分钟
    max: 100, // 每个IP最多100次请求
    standardHeaders: true, // 返回RateLimit头
    legacyHeaders: false, // 禁用X-RateLimit头
    message: '请求过于频繁，请稍后再试。',
});

app.use(limiter); // 将速率限制中间件应用到所有请求

// 静态文件服务
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// CORS 配置
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3001', 'http://localhost:3000'], // 确保这里是你的前端地址
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'x-upload-token'] // 添加 'x-upload-token' 到允许的请求头
}));

app.use(bodyParser.json()); // 解析 JSON 请求体
app.use(bodyParser.urlencoded({ extended: true })); // 解析 URL 编码请求体

// 注册用户 API 路由
app.use('/api/user', userApi);

// 注册笔记 API 路由
app.use('/api/notes', notesApi);

// 注册 AI API 路由
app.use('/api/ai', aiApi);

// 添加 AI 摘要 API 路由
app.post('/api/summarize', async (req, res) => {
    const { content } =req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content is required for summarization' });
    }

    try {
        // 构建 LLM.py 的绝对路径
        const scriptPath = path.join(__dirname, 'python', 'LLM.py');
        
        // 使用子进程执行 Python 脚本
        exec(`python "${scriptPath}" "帮我总结以下内容：${content}"`, (error, stdout, stderr) => {
            if (error) {
                console.error('Error executing Python script:', error);
                return res.status(500).json({ error: 'Failed to summarize content' });
            }
            if (stderr) {
                console.error('Python script stderr:', stderr);
                return res.status(500).json({ error: 'Failed to summarize content' });
            }

            // 解析 Python 脚本的输出
            const result = JSON.parse(stdout);
            res.json({ summary: result });
        });
    } catch (error) {
        console.error('Summarization error:', error);
        res.status(500).json({ error: 'Failed to summarize content' });
    }
});

// 添加根路由
app.get('/', (req, res) => {
    res.send('欢迎使用 VueNotepad API'); // 返回欢迎信息
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// 测试数据库连接
db.getConnection()
    .then(connection => {
        console.log('数据库连接成功');
        connection.release(); // 释放连接
    })
    .catch(err => {
        console.error('数据库连接失败:', err);
    });

