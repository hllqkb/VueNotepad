const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'test',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// 检查并创建所需的表
async function checkAndCreateTables() {
  try {
    // 创建 todos 表
    const createTodosTableQuery = `
      CREATE TABLE IF NOT EXISTS todos (
        id INT AUTO_INCREMENT PRIMARY KEY,
        content TEXT,
        account VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    await pool.query(createTodosTableQuery);
    console.log('todos 表已检查或创建');

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

  } catch (err) {
    console.error('初始化数据库表失败:', err);
  }
}

// 初始化表
checkAndCreateTables();

module.exports = pool;
