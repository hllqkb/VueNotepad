// preload.js预加载脚本
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {

    closeWindow: () => ipcRenderer.send('close-window')
});
