// server.js
import express from 'express';
import fs from 'fs';
import { dirname, join } from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import { fileURLToPath } from 'url'; // 导入文件URL

const app = express();
const PORT = 3000;

// 中间件
app.use(cors());
app.use(bodyParser.json());

// 获取 __filename 和 __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const notesFilePath = join(__dirname, 'notes.json');

// 创建 notes.json 文件（如果不存在）
if (!fs.existsSync(notesFilePath)) {
    fs.writeFileSync(notesFilePath, JSON.stringify([]));
}

app.use('/api/test', (req, res) => {
    res.json({
        message: 'Hello World!1'
    });
});

app.post('/api/notes', (req, res) => {
    const { title, content } = req.body;

    // 确保标题和内容都存在
    if (!title) {
        return res.status(400).json({ error: '标题不能为空' });
    }

    // 生成文件名，使用标题和当前时间戳
    const safeTitle = title.replace(/[\s\\/:"<>|?*]+/g, '-'); // 替换文件名不安全字符
    const fileName = `${safeTitle}.md`;
    const filePath = join(__dirname, 'notes', fileName); // 修正了 path.join 为 join

    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
        return res.status(400).json({ error: '文件已存在，请使用其他标题' });
    }
    // 将内容写入文件
    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ error: '创建文件失败', details: err.message });
        }
console.log('喵喵喵');
        // 记录创建时间和文件名到 notes.json
        const notesData = JSON.parse(fs.readFileSync(notesFilePath, 'utf-8'));
        notesData.push({ title: safeTitle, createdAt: new Date().toISOString(), fileName });
        fs.writeFileSync(notesFilePath, JSON.stringify(notesData, null, 2));

        res.status(201).json({ message: '文件创建成功', filePath });
    });
});

// 确保 notes 目录存在
fs.mkdir(join(__dirname, 'notes'), { recursive: true }, (err) => {
    if (err) {
        console.error('创建目录失败:', err);
    } else {
        // 启动服务器
        app.listen(PORT, () => {
            console.log(`服务器正在运行在 http://localhost:${PORT}`);
        });
    }
});
//文件更新
app.post('/api/notes/update', (req, res) => {
    const { title, newContent } = req.body;

    // 确保标题和新内容都存在
    if (!title) {
        return res.status(400).json({ error: '标题不能为空' });
    }

    // 生成文件名
    const fileName = title + '.md'; // 确保文件名以 `.md` 结尾
    const filePath = join(__dirname, 'notes', fileName);
    const notesPath = join(__dirname, 'notes.json'); // notes.json 的路径

    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 文件不存在
            return res.status(404).json({ error: '文件不存在' });
        }

        // 将新内容写入文件
        fs.writeFile(filePath, newContent, (err) => {
            if (err) {
                return res.status(500).json({ error: '更新文件失败', details: err.message });
            }

            // 读取 notes.json 文件
            fs.readFile(notesPath, 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ error: '读取 notes.json 文件失败', details: err.message });
                }

                // 解析 JSON 数据
                let notes;
                try {
                    notes = JSON.parse(data);
                } catch (parseErr) {
                    return res.status(500).json({ error: '解析 JSON 数据失败', details: parseErr.message });
                }

                // 找到标题并更新 createdAt
                const note = notes.find(note => note.title === title);
                if (note) {
                    note.createdAt = new Date().toISOString(); // 更新为当前时间
                } else {
                    return res.status(404).json({ error: '未找到对应的标题' });
                }

                // 将更新后的数据写回 notes.json
                fs.writeFile(notesPath, JSON.stringify(notes, null, 2), (writeErr) => {
                    if (writeErr) {
                        return res.status(500).json({ error: '更新 notes.json 文件失败', details: writeErr.message });
                    }
                    res.status(200).json({ message: '文件更新成功', filePath });
                });
            });
        });
    });
});

// 获取所有笔记的列表
app.get('/api/notes', (req, res) => {
    const notesData = fs.readFileSync(notesFilePath, 'utf-8');
    res.json(JSON.parse(notesData));
});
//。。
//获取笔记内容
app.get('/api/notes/:title', (req, res) => {
    const { title } = req.params;
    const safeTitle = title.replace(/[\s\\/:"<>|?*]+/g, '-'); // 替换文件名不安全字符
    const fileName = `${safeTitle}`; // 假设文件名为 <标题>.md
    const filePath = join(__dirname, 'notes', fileName);
//res.json({ title, content: filePath });
    // 检查文件是否存在
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            // 文件不存在
            return res.status(404).json({ error: '文件不存在' });
        }

        // 读取文件内容
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).json({ error: '读取文件失败', details: err.message });
            }
            res.json({ title, content: data });
        });
    });
});