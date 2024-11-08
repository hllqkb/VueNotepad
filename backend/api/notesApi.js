const express = require('express');
const router = express.Router();
const pool = require('../db/db'); // 确保路径正确
const multer = require('multer');
const path = require('path');

// 设置 multer 存储选项
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // 指定上传文件的目录
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用时间戳作为文件名
    }
});

// 创建 multer 实例，添加文件类型和大小限制
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 限制文件大小为5MB
    fileFilter: (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif|mp3|wav|rar/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('仅支持图片、音频和压缩文件格式!'));
        }
    }
});

// 创建新笔记的 API
router.post('/', async (req, res) => {
    let connection; // 在 try 块外部声明 connection 变量
    try {
        connection = await pool.getConnection(); // 从连接池获取连接
        console.log('MySQL Connected...');

        // 检查 notes 表是否存在，如果不存在则创建
        const createNotesTableQuery = `
            CREATE TABLE IF NOT EXISTS notes (
                id INT AUTO_INCREMENT PRIMARY KEY,
                content TEXT NOT NULL,
                account VARCHAR(255) NOT NULL,
                title VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            ) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
        `;
        
        await connection.query(createNotesTableQuery); // 使用 await 等待查询完成
        console.log("Notes table checked/created");

        const { content, account, fileName } = req.body; // 从请求体中获取内容、账户信息和文件名
        if (!content || !account || !fileName) {
            return res.status(400).json({ error: '内容、账户和文件名不能为空' }); // 返回错误信息
        }

        const sql = 'INSERT INTO notes (content, account, title) VALUES (?, ?, ?)';
        const [result] = await connection.query(sql, [content, account, fileName]);
        res.json({ message: '笔记发布成功', id: result.insertId }); // 返回成功消息
    } catch (err) {
        console.error('数据库连接或查询时出错:', err); // 打印错误信息
        return res.status(500).json({ error: '发布笔记失败' }); // 返回错误信息
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});
router.get('/notes/:id', async (req, res) => {
    const noteId = req.params.id; // 获取笔记 ID
    let connection; // 在 try 块外部声明 connection 变量
    try {
        connection = await pool.getConnection(); // 从连接池获取连接
        const selectNoteQuery = `SELECT * FROM notes WHERE id = ?`;
        const [results] = await connection.query(selectNoteQuery, [noteId]); // 使用 await 等待查询结果

        if (results.length > 0) {
            const note = results[0];
            res.json(note); // 返回笔记内容
        } else {
            res.status(404).json({ error: '笔记未找到' });
        }
    } catch (error) {
        console.error('数据库连接时出错:', error); // 打印错误信息
        return res.status(500).json({ error: '获取笔记失败' }); // 返回错误信息
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 创建新代办事项的 API
router.post('/todos', async (req, res) => {
    const { content, account } = req.body; // 从请求体中获取内容和账户信息
    if (!content || !account) {
        return res.status(400).json({ error: '内容和账户不能为空' }); // 返回错误信息
    }

    const sql = 'INSERT INTO todos (content, account) VALUES (?, ?)';
    try {
        const connection = await pool.getConnection(); // 从连接池获取连接
        const [result] = await connection.query(sql, [content, account]);
        connection.release(); // 释放连接
        res.json({ message: '代办事项发布成功', id: result.insertId }); // 返回成功消息
    } catch (err) {
        console.error('数据库插入错误:', err); // 打印错误信息
        return res.status(500).json({ error: '发布代办事项失败' }); // 返回错误信息
    }
});

// 获取所有代办事项的 API
router.get('/todos', async (req, res) => {
    const sql = 'SELECT * FROM todos'; // 查询所有代办事项
    try {
        const connection = await pool.getConnection(); // 从连接池获取连接
        const [results] = await connection.query(sql);
        connection.release(); // 释放连接
        res.json(results); // 返回代办事项列表
    } catch (err) {
        console.error('获取代办事项失败:', err); // 打印错误信息
        return res.status(500).json({ error: '获取代办事失败' }); // 返回错误信息
    }
});

// 获取当前账户的所有代办事项的 API
router.get('/todos/:account', async (req, res) => {
    const account = req.params.account; // 获取账户信息
    const sql = 'SELECT * FROM todos WHERE account = ?'; // 查询特定账户的代办事项
    try {
        const connection = await pool.getConnection(); // 从连接池获取连接
        const [results] = await connection.query(sql, [account]);
        connection.release(); // 释放连接
        res.json(results); // 返回代办事项列表
    } catch (err) {
        console.error('获取代办事项失败:', err); // 打印错误信息
        return res.status(500).json({ error: '获取代办事项失败' }); // 返回错误信息
    }
});

// 删除待办事项的 API
router.delete('/todos/:id', async (req, res) => {
    const todoId = req.params.id; // 获取待办事项的 ID
    const sql = 'DELETE FROM todos WHERE id = ?'; // 删除特定 ID 的待办事项
    try {
        const connection = await pool.getConnection(); // 从连接池获取连接
        await connection.query(sql, [todoId]);
        connection.release(); // 释放连接
        res.json({ message: '待办事项删除成功' });
    } catch (err) {
        console.error('删除待办事项失败:', err);
        return res.status(500).json({ error: '删除待办事项失败' });
    }
});

// 删除笔记的 API
router.delete('/deletenotes/:fileName', async (req, res) => {
    const fileName = req.params.fileName; // 获取笔记的文件名
    const sql = 'DELETE FROM notes WHERE fileName = ?'; // 删除特定文件名的笔记
    try {
        const connection = await pool.getConnection(); // 从连接池获取连接
        await connection.query(sql, [fileName]);
        connection.release(); // 释放连接
        res.json({ message: '笔记删除成功' });
    } catch (err) {
        console.error('删除笔记失败:', err);
        return res.status(500).json({ error: '删除笔记失败' });
    }
});

// 获取特定笔记的 API
router.get('/:id', async (req, res) => {
    const noteId = req.params.id; // 获取笔记 ID
    const sql = 'SELECT * FROM notes WHERE id = ?'; // 查询特定 ID 的笔记
    try {
        const connection = await pool.getConnection(); // 从连接池获取连接
        const [results] = await connection.query(sql, [noteId]);
        connection.release(); // 释放连接

        if (results.length > 0) {
            res.json(results[0]); // 返回笔记内容
        } else {
            res.status(404).json({ error: '笔记未找到' });
        }
    } catch (err) {
        console.error('获取笔记失败:', err); // 打印错误信息
        return res.status(500).json({ error: '获取笔记失败' }); // 返回错误信息
    }
});

// vditor内置上传api，不要写
router.post('/upload/editor', upload.single('image'), (req, res) => {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`; // 构建文件的访问 URL
    console.log('文件上传成功:', fileUrl);
    
    res.json({
        code: 0,
        msg: '文件上传成功',
        data: {
            url: fileUrl
        }
    });
    res.status(200).end();
});

// 获取特定用户的所有笔记
router.get('/', async (req, res) => {
    const username = req.query.username; // 从查询参数获取用户名
    let connection;
    try {
        connection = await pool.getConnection(); // 从连接池获取连接
        const sql = 'SELECT * FROM notes WHERE account = ?'; // 查询特定用户的笔记
        const [results] = await connection.query(sql, [username]);
        res.json(results); // 返回笔记列表
    } catch (error) {
        console.error('获取笔记失败:', error);
        return res.status(500).json({ error: '获取笔记失败' });
    } finally {
        if (connection) connection.release(); // 确保连接被释放
    }
});

// 添加更新笔记的 API
router.post('/update', async (req, res) => {
    const { title, newContent, account, fileName } = req.body;
    console.log('接收到的请求数据:', { title, newContent, account, fileName }); // 添加日志

    if (!title || !newContent || !account || !fileName) {
        return res.status(400).json({ error: '标题、内容、账户和文件名不能为空' });
    }

    const sql = 'UPDATE notes SET content = ?, title = ? WHERE account = ? AND fileName = ?';
    try {
        const connection = await pool.getConnection();
        await connection.query(sql, [newContent, title, account, fileName]);
        connection.release();
        res.json({ message: '笔记更新成功' });
    } catch (err) {
        console.error('更新笔记失败:', err);
        return res.status(500).json({ error: '更新笔记失败' });
    }
});

module.exports = router; // 导出路由