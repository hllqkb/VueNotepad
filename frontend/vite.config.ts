// vite.config.ts配置文件
// https://vitejs.dev/config/ - Vite 配置文件的文档链接
import vue from '@vitejs/plugin-vue'; // 导入 Vue 插件用于 Vite
import { exec } from 'child_process'; // 导入 exec // 导入 execSync
import fs from 'node:fs'; // 导入 Node.js 的文件系统模块
import path from 'path'; // 导入 Node.js 的路径模块
import { defineConfig } from 'vite'; // 从 Vite 中导入 defineConfig 函数
import electron from 'vite-plugin-electron/simple'; // 导入 Vite Electron 插件
import pkg from './package.json'; // 导入 package.json 文件


export default defineConfig(({ command }) => {
  // 启动本地后端服务
  exec('nodemon localbackend/serve.js', { stdio: 'inherit' }, (error) => {
    if (error) {
      console.error('Error executing serve.js:', error);
    }
  });
  
  // 使用 try-catch 来处理文件删除过程中的潜在错误
  try {
    // 尝试同步删除 dist-electron 文件夹及其内容
    fs.rmSync('dist-electron', { recursive: true, force: true })
  } catch (error) {
    // 如果删除过程中出现错误，打印错误信息
    console.error('Error while deleting dist-electron:', error)
  }

  // 判断当前运行的命令是 'serve' 还是 'build'
  const isServe = command === 'serve'
  const isBuild = command === 'build'
  // 根据是否为开发模式或 VSCode 调试模式设置源映射
  const sourcemap = isServe || !!process.env.VSCODE_DEBUG

  // 获取项目中所有的外部依赖项
  const externalDependencies = Object.keys(pkg.dependencies || {});

  return {
    optimizeDeps: {
      // 指定需要优化的依赖项
      include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
    },
    plugins: [
      vue(), // 使用 Vue 插件
      electron({
        main: {
          entry: 'electron/main/index.ts', // 指定主进程入口文件
          onstart({ startup }) {
            // 应用启动时的逻辑
            if (process.env.VSCODE_DEBUG) {
              console.log('[startup] Electron App') // 如果在调试模式下，打印启动信息
            } else {
              startup() // 否则直接启动应用
            }
          },
          vite: {
            build: {
              sourcemap, // 构建时的源映射配置
              minify: isBuild, // 是否开启代码压缩
              outDir: 'dist-electron/main', // 指定主进程构建输出目录
              rollupOptions: {
                external: externalDependencies, // Rollup 配置的外部依赖项
              },
            },
          },
        },
        preload: {
          input: 'electron/preload/index.ts', // 指定预加载脚本的入口文件
          vite: {
            build: {
              sourcemap: sourcemap ? 'inline' : undefined, // 预加载部分的源映射配置
              minify: isBuild, // 是否开启代码压缩
              outDir: 'dist-electron/preload', // 指定预加载脚本构建输出目录
              rollupOptions: {
                external: externalDependencies, // Rollup 配置的外部依赖项
              },
            },
          },
        },
        renderer: {}, // 渲染进程的配置项（目前为空）
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // 配置路径别名
      },
    },
    server: process.env.VSCODE_DEBUG ? {
      // 如果在 VSCode 调试模式下，设置服务器的主机和端口
      host: new URL(pkg.debug.env.VITE_DEV_SERVER_URL).hostname,
      port: +new URL(pkg.debug.env.VITE_DEV_SERVER_URL).port,
    } : undefined, // 否则不设置服务器配置
    clearScreen: false, // 关闭清屏
  }
})
