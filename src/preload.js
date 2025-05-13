// preload.js
const { contextBridge, ipcRenderer, shell } = require('electron');

// Renderer process'e API'lerini sağlıyoruz
contextBridge.exposeInMainWorld('api', {
  // Hisse senedi verilerini almak için fonksiyon
  getStockData: (symbol, startDate, endDate) => {
    return ipcRenderer.invoke('get-stock-data', symbol, startDate, endDate);
  },
  
  // Harici URL'i açmak için fonksiyon
  openExternalLink: (url) => {
    ipcRenderer.send('open-external-link', url);
  },
  
  // Diğer API fonksiyonları buraya eklenebilir
});