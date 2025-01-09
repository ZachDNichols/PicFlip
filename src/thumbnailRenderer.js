const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const handleFileDropped = (filePath, event) => {
    console.log('File received: '+ filePath);
};

// Setup event listener
const setupThumbnailListener = () => {
    ipcMain.on('file-dropped', (event, filePath) => {
        console.log('File received in main process:', filePath);
        handleFileDropped(filePath, event);
    });
};

module.exports = setupThumbnailListener;
