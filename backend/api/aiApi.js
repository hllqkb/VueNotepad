const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

// AI 聊天接口
router.post('/chat', (req, res) => {
    const { content } = req.body;

    if (!content) {
        return res.status(400).json({ error: 'Content is required for AI chat' });
    }

    // 调用 Python 脚本
    const pythonProcess = spawn('python', ['./python/LLM.py', content]);

    let dataString = '';

    pythonProcess.stdout.on('data', (data) => {
        dataString += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error:', data.toString());
    });

    pythonProcess.on('close', (code) => {
        if (code === 0) {
            try {
                const response = JSON.parse(dataString); // 假设返回的是 JSON 格式
                res.json({ response: response }); // 返回 AI 的响应
            } catch (error) {
                console.error('Error parsing response:', error);
                res.status(500).json({ error: 'Failed to parse response', details: error.message });
            }
        } else {
            res.status(500).json({ error: 'Python script exited with code ' + code });
        }
    });
});

module.exports = router; // 导出路由 