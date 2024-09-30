const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      //preload: path.join(__dirname, 'preload.js'), // 如果您需要使用预加载脚本
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  win.loadURL('http://localhost:8080'); // 根据您的开发服务器配置更改
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});
