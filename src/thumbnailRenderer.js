const { ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

const handleFileDropped = (fileName, fileContent) => {
    console.log('File received: '+ fileName);
};

// Setup event listener
const setupThumbnailListener = () => {
    ipcMain.on('file-content', (event, { fileName, fileContent }) => {
        handleFileDropped(fileName, fileContent);
    });
};

module.exports = setupThumbnailListener;
