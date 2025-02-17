//模板文件
import { app, BrowserWindow, ipcMain, Menu, shell } from 'electron'
// 从 Electron 中导入所需的模块
import { createRequire } from 'node:module'
// 导入 Node.js 的 createRequire 方法
import { fileURLToPath } from 'node:url'
// 导入 Node.js 的 fileURLToPath 方法
import path from 'node:path'
// 导入 Node.js 的 path 模块
import os from 'node:os'
// 导入 Node.js 的 os 模块

const require = createRequire(import.meta.url)
// 创建 require 函数以支持 ESM 模块的导入
const __dirname = path.dirname(fileURLToPath(import.meta.url))
// 获取当前模块的目录名

// 设定应用根目录
process.env.APP_ROOT = path.join(__dirname, '../..')

// 构建主进程和渲染进程的目录路径
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron') // 主进程的构建目录
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist') // 渲染进程的构建目录
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL // Vite 开发服务器的 URL

// 设置公共路径，依据 VITE_DEV_SERVER_URL 是否存在
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, 'public') // 如果存在，设置公共路径
  : RENDERER_DIST // 否则使用 渲染进程的构建目录

// 对于 Windows 7 禁用 GPU 加速
if (os.release().startsWith('6.1')) app.disableHardwareAcceleration()

// 为 Windows 10+ 通知设置应用程序名称
if (process.platform === 'win32') app.setAppUserModelId(app.getName())

// 检查应用是否已经在运行，若是则退出
if (!app.requestSingleInstanceLock()) {
  app.quit()
  process.exit(0)
}

let win: BrowserWindow | null = null // 声明主窗口变量
const preload = path.join(__dirname, '../preload/index.mjs') // 预加载脚本路径
const indexHtml = path.join(RENDERER_DIST, 'index.html') // 渲染进程 HTML 文件路径

// 创建主窗口的异步函数
async function createWindow() {
  const menu = Menu.buildFromTemplate([]) // 构建应用菜单
  Menu.setApplicationMenu(menu) // 设置应用菜单
  // 创建主窗口!
  win = new BrowserWindow({
    title: 'Main window', // 窗口标题
    icon: path.join(process.env.VITE_PUBLIC, 'favicon.ico'), // 窗口图标
    width: 1100, height: 800, // 窗口大小
    
    frame: false,
    webPreferences: {
      preload, // 预加载脚本
    
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true, // 仅在开发模式下使用，生产模式下请保持关闭

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false, // 建议在生产中使用上下文隔离
    },
  })

  // 如果存在 VITE_DEV_SERVER_URL，则加载开发服务器 URL
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL) // 加载开发服务器地址
    // 如果应用未打包，则打开开发者工具
   //win.webContents.openDevTools() //有bugs要关掉
  } else {
    win.loadFile(indexHtml) // 否则加载 HTML 文件
  }

  // 在页面加载完成后，将当前时间主动发送到渲染进程
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', new Date().toLocaleString())
  })

  // 将所有链接在浏览器中打开，而不是在应用程序内打开
  win.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https:')) shell.openExternal(url) // 若为 https 链接，则在外部浏览器中打开
    return { action: 'deny' } // 拒绝在应用内打开链接
  })
}

// 应用准备就绪后创建窗口
app.whenReady().then(createWindow)
// 处理关闭窗口的 IPC 事件
ipcMain.on('close-window', () => {
  if (win) {
    win.close(); // 调用关闭方法
  }
});

// 处理所有窗口关闭事件
app.on('window-all-closed', () => {
  win = null // 清空主窗口变量
  if (process.platform !== 'darwin') app.quit() // 非 macOS 平台退出应用
})

// 处理应用再次实例化事件
app.on('second-instance', () => {
  if (win) {
    // 如果用户试图打开另一个实例，则聚焦主窗口
    if (win.isMinimized()) win.restore() // 如果窗口最小化则恢复窗口
    win.focus() // 聚焦主窗口
  }
})

// 处理应用激活事件
app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows() // 获取所有窗口
  if (allWindows.length) {
    allWindows[0].focus() // 若存在窗口则聚焦第一个窗口
  } else {
    createWindow() // 否则创建新窗口
  }
})

// 处理打开新窗口的 IPC 事件
ipcMain.handle('open-win', (_, arg) => {
  const childWindow = new BrowserWindow({
    webPreferences: {
      preload, // 预加载脚本
      nodeIntegration: true, // 启用节点集成（开发模式）
      contextIsolation: false, // 禁用上下文隔离（开发模式）
    },
  })

  // 加载新的窗口内容
  if (VITE_DEV_SERVER_URL) {
    childWindow.loadURL(`${VITE_DEV_SERVER_URL}#${arg}`) // 加载开发服务器地址并附加参数
  } else {
    childWindow.loadFile(indexHtml, { hash: arg }) // 加载 HTML 文件并附加哈希参数
  }
 
})
