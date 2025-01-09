const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronApi', {
    sendFileContent: (fileName, fileContent) => {
        ipcRenderer.send('file-content', { fileName, fileContent });
    }
});