// preload.js
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {

    closeWindow: () => ipcRenderer.send('close-window')
});
