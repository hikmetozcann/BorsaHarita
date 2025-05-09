// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Renderer process'e API'lerini sağlıyoruz
contextBridge.exposeInMainWorld('api', {
  // Hisse senedi verilerini almak için fonksiyon
  getStockData: (symbol, startDate, endDate) => {
    return ipcRenderer.invoke('get-stock-data', symbol, startDate, endDate);
  },
  
  // Diğer API fonksiyonları buraya eklenebilir
});