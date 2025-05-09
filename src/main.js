const { app, BrowserWindow, ipcMain, net } = require('electron');
const path = require('path');
const Store = require('electron-store');

// Verileri saklamak için bir store oluşturalım
const store = new Store();

function createWindow() {
  // Tarayıcı penceresini oluştur
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // index.html dosyasını yükle
  mainWindow.loadFile(path.join(__dirname, '../public/index.html'));
  
  // Geliştirme ortamında DevTools'u aç
  if (process.argv.includes('--dev')) {
    mainWindow.webContents.openDevTools();
  }
}

// Electron hazır olduğunda pencereyi oluştur
app.whenReady().then(() => {
  createWindow();
  
  app.on('activate', function () {
    // macOS'ta dock ikonuna tıklandığında yeni pencere oluştur
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Tüm pencereler kapatıldığında uygulamadan çık (Windows & Linux)
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit();
});

// IPC Handlers - Renderer process ile iletişim
ipcMain.handle('get-stock-data', async (event, symbol, startDate, endDate) => {
  try {
    // BIST sembolleri için .IS uzantısı kontrol et
    const yahooSymbol = symbol.includes('.IS') ? symbol : `${symbol}.IS`;
    
    // Tarih aralıklarını Unix timestamp formatına çevir
    const start = new Date(startDate || '2020-01-01');
    const end = new Date(endDate || new Date());
    const period1 = Math.floor(start.getTime() / 1000);
    const period2 = Math.floor(end.getTime() / 1000);
    
    // Yahoo Finance API URL'i oluştur
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${yahooSymbol}?period1=${period1}&period2=${period2}&interval=1mo&events=history`;
    
    // Electron net modülü ile istek yap (CORS sorunlarını aşmak için)
    const response = await net.fetch(url);
    
    if (!response.ok) {
      throw new Error(`API yanıt vermedi: ${response.status}`);
    }
    
    const result = await response.json();
    
    // Veriyi uygun formata dönüştür
    const data = [];
    
    if (result.chart && result.chart.result && result.chart.result.length > 0) {
      const quotes = result.chart.result[0];
      const timestamps = quotes.timestamp || [];
      const closes = quotes.indicators.quote[0].close || [];
      const opens = quotes.indicators.quote[0].open || [];
      
      // Her zaman damgası için % değişimi hesapla
      for (let i = 0; i < timestamps.length; i++) {
        if (closes[i] !== null && opens[i] !== null) {
          const date = new Date(timestamps[i] * 1000);
          const year = date.getFullYear();
          const month = date.getMonth() + 1;
          const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
          
          // Önceki kapanışa göre % değişim (eğer ilk veri değilse)
          let change = 0;
          if (i > 0 && closes[i-1] !== null) {
            change = ((closes[i] - closes[i-1]) / closes[i-1] * 100).toFixed(2);
          } else {
            // İlk veri için günlük değişim
            change = ((closes[i] - opens[i]) / opens[i] * 100).toFixed(2);
          }
          
          data.push({
            date: formattedDate,
            change: parseFloat(change)
          });
        }
      }
    }
    
    // Veriyi cache'e kaydetme olanağı
    const cacheKey = `stock-data-${yahooSymbol}-${startDate}-${endDate}`;
    store.set(cacheKey, { timestamp: Date.now(), data: { symbol: yahooSymbol, data } });
    
    return {
      symbol: yahooSymbol,
      data
    };
  } catch (error) {
    console.error('Hisse verisi alınırken hata:', error);
    throw error;
  }
});