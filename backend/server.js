const express = require('express');
const cors = require('cors');
const userApi = require('./api/userApi');
const notesApi = require('./api/notesApi');
const app = express();

const corsOptions = {
  origin: 'http://localhost:5173', // 修改为前端运行的地址
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'], // 确保 Authorization 被允许
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json()); // 解析 JSON 请求体

app.use('/api/user', userApi);
app.use('/api/notes', notesApi);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
