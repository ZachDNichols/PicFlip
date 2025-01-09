const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
    sendFilePath: (filePath) => ipcRenderer.send('file-dropped', filePath),
});