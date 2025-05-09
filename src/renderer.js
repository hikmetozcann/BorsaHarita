// renderer.js - Ana uygulama mantığı
document.addEventListener('DOMContentLoaded', () => {
  // DOM elementlerini seç
  const stockSymbolSelect = document.getElementById('stockSymbol');
  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');
  const analyzeBtn = document.getElementById('analyzeBtn');
  const resultsContainer = document.getElementById('resultsContainer');
  const stockTitle = document.getElementById('stockTitle');
  const performanceChartCanvas = document.getElementById('performanceChart');
  const calendarView = document.getElementById('calendarView');
  const loadingSpinner = document.getElementById('loadingSpinner');
  
  // Yeni eklenen sidebar elementleri
  const stockSearch = document.getElementById('stockSearch');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const stockList = document.getElementById('stockList');
  const defaultView = document.getElementById('defaultView');
  const stockDetailView = document.getElementById('stockDetailView');
  const backToMainBtn = document.getElementById('backToMainBtn');
  const detailStockTitle = document.getElementById('detailStockTitle');
  const detailPerformanceChartCanvas = document.getElementById('detailPerformanceChart');
  const detailCalendarView = document.getElementById('detailCalendarView');
  const detailHighestGain = document.getElementById('detailHighestGain');
  const detailHighestGainMonth = document.getElementById('detailHighestGainMonth');
  const detailHighestLoss = document.getElementById('detailHighestLoss');
  const detailHighestLossMonth = document.getElementById('detailHighestLossMonth');
  const detailAverageChange = document.getElementById('detailAverageChange');
  
  // Performans özeti elementleri
  const highestGainElement = document.getElementById('highestGain');
  const highestGainMonthElement = document.getElementById('highestGainMonth');
  const highestLossElement = document.getElementById('highestLoss');
  const highestLossMonthElement = document.getElementById('highestLossMonth');
  const averageChangeElement = document.getElementById('averageChange');
  
  // Navigasyon elementleri (YENİ)
  const singleStockBtn = document.getElementById('singleStockBtn');
  const monthlyAnalysisBtn = document.getElementById('monthlyAnalysisBtn');
  const recommendationsBtn = document.getElementById('recommendationsBtn');
  
  // Aylık analiz görünümü elementleri (YENİ)
  const monthlyAnalysisView = document.getElementById('monthlyAnalysisView');
  const runMonthlyAnalysisBtn = document.getElementById('runMonthlyAnalysisBtn');
  const monthlyAnalysisResults = document.getElementById('monthlyAnalysisResults');
  const selectedMonthDisplay = document.getElementById('selectedMonthDisplay');
  const bestPerformersTable = document.getElementById('bestPerformersTable');
  const consistentPerformersTable = document.getElementById('consistentPerformersTable');
  const monthButtons = document.querySelectorAll('.month-button');

  // Öneriler görünümü elementleri (YENİ)
  const recommendationsView = document.getElementById('recommendationsView');

  // Bileşenleri başlat
  const calendar = new StockCalendar('calendarView');
  const detailCalendar = new StockCalendar('detailCalendarView');

  // Tarihleri ayarla: başlangıç 1 Ocak 2015, bitiş bugün
  const today = new Date();
  const startDate = new Date('2015-01-01');
  const defaultDetailStartDate = new Date('2015-01-01');
  
  // Flatpickr tarih seçicileri başlat
  const startDatePicker = flatpickr(startDateInput, {
    plugins: [],
    locale: "tr",
    dateFormat: "Y-m",
    altInput: true,
    altFormat: "F Y",
    defaultDate: startDate,
    static: true,
    theme: "light",
    disableMobile: "true"
  });
  
  const endDatePicker = flatpickr(endDateInput, {
    plugins: [],
    locale: "tr",
    dateFormat: "Y-m",
    altInput: true,
    altFormat: "F Y",
    defaultDate: today,
    static: true,
    theme: "light",
    disableMobile: "true"
  });

  // Hisse senetlerini dropdown'a ekle
  populateStockSymbols();

  // Analiz butonuna tıklama olayı ekle
  analyzeBtn.addEventListener('click', performAnalysis);
  
  // Sidebar için hisse senedi listesini doldur
  populateSidebarStockList();
  
  // Arama kutusuna olay dinleyicisi ekle
  stockSearch.addEventListener('input', filterStockList);
  
  // Arama temizleme butonuna tıklama olayı ekle
  searchClearBtn.addEventListener('click', clearSearch);
  
  // Geri butonuna tıklama olayı ekle
  backToMainBtn.addEventListener('click', showMainView);
  
  // Navigasyon butonlarına tıklama olayları ekle (YENİ)
  singleStockBtn.addEventListener('click', showSingleStockView);
  monthlyAnalysisBtn.addEventListener('click', showMonthlyAnalysisView);
  recommendationsBtn.addEventListener('click', showRecommendationsView);
  
  // Aylık analiz çalıştırma butonuna tıklama olayı ekle (YENİ)
  runMonthlyAnalysisBtn.addEventListener('click', runMonthlyAnalysis);
  
  // Ay seçim butonlarına tıklama olayları ekle (YENİ)
  monthButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const selectedMonth = e.target.dataset.month;
      displayMonthlyAnalysisResults(selectedMonth);
    });
  });

  // Hisse senetlerini dropdown'a ekle
  function populateStockSymbols() {
    const stocks = window.dataFetcher.getAllStockSymbols();
    
    stocks.forEach(stock => {
      const option = document.createElement('option');
      option.value = stock.symbol;
      option.textContent = `${stock.symbol} - ${stock.name}`;
      stockSymbolSelect.appendChild(option);
    });
  }
  
  // Sidebar'daki hisse listesini doldur
  function populateSidebarStockList() {
    const stocks = window.dataFetcher.getAllStockSymbols();
    stockList.innerHTML = '';
    
    stocks.forEach(stock => {
      const stockItem = document.createElement('div');
      stockItem.className = 'p-2 my-1 rounded-lg cursor-pointer hover:bg-gray-800 transition-colors flex items-center';
      stockItem.dataset.symbol = stock.symbol;
      
      const stockIcon = document.createElement('div');
      stockIcon.className = 'w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center mr-2 flex-shrink-0';
      stockIcon.textContent = stock.symbol.substring(0, 2).toUpperCase();
      
      const stockInfo = document.createElement('div');
      stockInfo.className = 'flex-1 overflow-hidden';
      
      const stockSymbol = document.createElement('div');
      stockSymbol.className = 'font-medium text-white text-sm';
      stockSymbol.textContent = stock.symbol.replace('.IS', '');
      
      const stockName = document.createElement('div');
      stockName.className = 'text-gray-400 text-xs truncate';
      stockName.textContent = stock.name;
      
      stockInfo.appendChild(stockSymbol);
      stockInfo.appendChild(stockName);
      
      stockItem.appendChild(stockIcon);
      stockItem.appendChild(stockInfo);
      
      // Hisse senedine tıklama olayı ekle
      stockItem.addEventListener('click', () => {
        showStockDetail(stock.symbol, stock.name);
      });
      
      stockList.appendChild(stockItem);
    });
  }
  
  // Hisse listesini filtrele
  function filterStockList() {
    const searchTerm = stockSearch.value.toLowerCase();
    const stockItems = stockList.querySelectorAll('div[data-symbol]');
    
    // Temizleme butonunu göster/gizle
    if (searchTerm.length > 0) {
      searchClearBtn.classList.remove('hidden');
    } else {
      searchClearBtn.classList.add('hidden');
    }
    
    stockItems.forEach(item => {
      const symbol = item.dataset.symbol.toLowerCase();
      const name = item.querySelector('.text-gray-400').textContent.toLowerCase();
      
      if (symbol.includes(searchTerm) || name.includes(searchTerm)) {
        item.classList.remove('hidden');
      } else {
        item.classList.add('hidden');
      }
    });
  }
  
  // Aramayı temizle
  function clearSearch() {
    stockSearch.value = '';
    searchClearBtn.classList.add('hidden');
    filterStockList();
  }
  
  // Ana görünüme dön
  function showMainView() {
    stockDetailView.classList.add('hidden');
    defaultView.classList.remove('hidden');
    monthlyAnalysisView.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    recommendationsView.classList.add('hidden');
  }
  
  // Tek hisse analiz görünümünü göster (YENİ)
  function showSingleStockView() {
    defaultView.classList.remove('hidden');
    monthlyAnalysisView.classList.add('hidden');
    stockDetailView.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    recommendationsView.classList.add('hidden');
  }
  
  // Aylık analiz görünümünü göster (YENİ)
  function showMonthlyAnalysisView() {
    defaultView.classList.add('hidden');
    monthlyAnalysisView.classList.remove('hidden');
    stockDetailView.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    recommendationsView.classList.add('hidden');
    monthlyAnalysisResults.classList.add('hidden');
  }
  
  // Öneriler görünümünü göster (YENİ)
  function showRecommendationsView() {
    defaultView.classList.add('hidden');
    monthlyAnalysisView.classList.add('hidden');
    stockDetailView.classList.add('hidden');
    resultsContainer.classList.add('hidden');
    recommendationsView.classList.remove('hidden');
    
    // Analiz sonuçları kontrol et
    const analysisResults = JSON.parse(window.sessionStorage.getItem('monthlyAnalysisResults'));
    
    if (!analysisResults) {
      // Henüz analiz yapılmamışsa mesaj göster
      document.getElementById('noRecommendationsMessage').classList.remove('hidden');
      document.getElementById('recommendationsList').classList.add('hidden');
      return;
    }
    
    // Gelecek ay bilgisini al
    const nextMonthInfo = window.stockAnalyzer.getRecommendationsForNextMonth();
    
    // Gelecek ay adını ekrana yaz
    document.getElementById('nextMonthName').textContent = `${nextMonthInfo.nextMonthName} Ayı İçin Öneriler`;
    
    // Önerileri al
    const recommendations = window.stockAnalyzer.getTopRecommendationsForMonth(analysisResults, nextMonthInfo.nextMonth, 10);
    
    // Öneri listesini temizle
    const recommendationsList = document.getElementById('recommendationsList');
    recommendationsList.innerHTML = '';
    
    if (recommendations.length === 0) {
      // Öneri yoksa mesaj göster
      document.getElementById('noRecommendationsMessage').classList.remove('hidden');
      recommendationsList.classList.add('hidden');
      return;
    }
    
    // Mesajı gizle, listeyi göster
    document.getElementById('noRecommendationsMessage').classList.add('hidden');
    recommendationsList.classList.remove('hidden');
    
    // Her bir öneri için kart oluştur
    recommendations.forEach((stock, index) => {
      const cardElement = document.createElement('div');
      cardElement.className = 'bg-gray-700 rounded-lg p-4 flex items-start';
      
      // Sıralama numarası
      const rankElement = document.createElement('div');
      rankElement.className = 'flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mr-3 text-white font-bold';
      rankElement.textContent = index + 1;
      
      // Hisse bilgileri
      const infoElement = document.createElement('div');
      infoElement.className = 'flex-1';
      
      // Hisse başlık ve etiketleri
      const titleContainer = document.createElement('div');
      titleContainer.className = 'flex items-center mb-1';
      
      const stockName = document.createElement('h3');
      stockName.className = 'font-semibold text-white';
      stockName.textContent = `${stock.symbol.replace('.IS', '')} - ${stock.name}`;
      
      const consistencyTag = document.createElement('span');
      consistencyTag.className = 'ml-2 text-xs px-2 py-1 rounded-full bg-green-600 text-white';
      consistencyTag.textContent = `${stock.consecutiveYears} yıl artış`;
      
      titleContainer.appendChild(stockName);
      titleContainer.appendChild(consistencyTag);
      
      // İstatistikler
      const statsContainer = document.createElement('div');
      statsContainer.className = 'flex space-x-4 mt-2';
      
      const avgGainStat = document.createElement('div');
      avgGainStat.className = 'text-green-400';
      avgGainStat.innerHTML = `<span class="text-gray-400 text-xs">Ort. Kazanç:</span> <span class="font-medium">+${stock.averageGain.toFixed(2)}%</span>`;
      
      const consistencyYearsStat = document.createElement('div');
      consistencyYearsStat.className = 'text-yellow-400';
      consistencyYearsStat.innerHTML = `<span class="text-gray-400 text-xs">Artış Yılları:</span> <span class="font-medium">${stock.consecutiveYears}</span>`;
      
      statsContainer.appendChild(avgGainStat);
      statsContainer.appendChild(consistencyYearsStat);
      
      // Bilgileri bir araya getir
      infoElement.appendChild(titleContainer);
      infoElement.appendChild(statsContainer);
      
      // Kartı oluştur
      cardElement.appendChild(rankElement);
      cardElement.appendChild(infoElement);
      
      // Listeye ekle
      recommendationsList.appendChild(cardElement);
    });
  }
  
  // Aylık analizi başlat (YENİ)
  async function runMonthlyAnalysis() {
    try {
      // Yükleme göstergesini göster
      loadingSpinner.classList.remove('hidden');
      
      // Analiz sonuçlarını gizle
      monthlyAnalysisResults.classList.add('hidden');
      
      // Tüm hisseleri analiz et
      const analysisResults = await window.stockAnalyzer.analyzeAllStocksMonthlyPerformance();
      
      // Verileri oturum depolamasına kaydet (sayfayı yeniden yüklemek gerekmemesi için)
      window.sessionStorage.setItem('monthlyAnalysisResults', JSON.stringify(analysisResults));
      
      // İlk ay olarak Ocak'ı göster
      displayMonthlyAnalysisResults(1);
      
    } catch (error) {
      console.error('Aylık analiz sırasında hata:', error);
      alert(`Hata: ${error.message}`);
    } finally {
      // Yükleme göstergesini gizle
      loadingSpinner.classList.add('hidden');
    }
  }
  
  // Belirli bir ayın analiz sonuçlarını göster (YENİ)
  function displayMonthlyAnalysisResults(monthNum) {
    // Seçilen ayı görsel olarak vurgula
    monthButtons.forEach(button => {
      if (button.dataset.month === monthNum.toString()) {
        button.classList.add('bg-blue-600');
        button.classList.remove('bg-gray-700', 'hover:bg-blue-600');
      } else {
        button.classList.remove('bg-blue-600');
        button.classList.add('bg-gray-700', 'hover:bg-blue-600');
      }
    });
    
    try {
      // Oturum depolamasından sonuçları al
      const analysisResults = JSON.parse(window.sessionStorage.getItem('monthlyAnalysisResults'));
      
      if (!analysisResults) {
        alert('Lütfen önce analizi başlatın.');
        return;
      }
      
      // Seçilen ayın verilerini al
      const bestStocks = analysisResults.monthlyBestStocks[monthNum];
      const consistentStocks = analysisResults.stockConsistencyByMonth[monthNum];
      
      // Ay adını göster
      const monthName = window.stockAnalyzer.getMonthName(parseInt(monthNum));
      selectedMonthDisplay.textContent = `${monthName} Ayı Analiz Sonuçları`;
      
      // En iyi performans gösteren hisseleri doldur
      bestPerformersTable.innerHTML = '';
      bestStocks.forEach(stock => {
        const row = document.createElement('tr');
        
        // Değişime göre rengini belirle
        const changeClass = stock.averageChange >= 0 ? 'text-green-500' : 'text-red-500';
        const changePrefix = stock.averageChange >= 0 ? '+' : '';
        
        row.innerHTML = `
          <td class="py-3 px-4 text-white">${stock.symbol.replace('.IS', '')}</td>
          <td class="py-3 px-4 text-gray-300">${stock.name}</td>
          <td class="py-3 px-4 text-right ${changeClass} font-medium">
            ${changePrefix}${stock.averageChange.toFixed(2)}%
          </td>
        `;
        
        bestPerformersTable.appendChild(row);
      });
      
      // İstikrarlı performans gösteren hisseleri doldur
      consistentPerformersTable.innerHTML = '';
      if (consistentStocks.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td colspan="4" class="py-3 px-4 text-center text-gray-400">
            Bu ay için istikrarlı artış gösteren hisse bulunamadı
          </td>
        `;
        consistentPerformersTable.appendChild(row);
      } else {
        consistentStocks.forEach(stock => {
          const row = document.createElement('tr');
          
          row.innerHTML = `
            <td class="py-3 px-4 text-white">${stock.symbol.replace('.IS', '')}</td>
            <td class="py-3 px-4 text-gray-300">${stock.name}</td>
            <td class="py-3 px-4 text-right text-green-500 font-medium">
              +${stock.averageGain.toFixed(2)}%
            </td>
            <td class="py-3 px-4 text-right text-yellow-500 font-medium">
              ${stock.consecutiveYears} yıl
            </td>
          `;
          
          consistentPerformersTable.appendChild(row);
        });
      }
      
      // Sonuçları göster
      monthlyAnalysisResults.classList.remove('hidden');
      
    } catch (error) {
      console.error('Sonuç gösterimi sırasında hata:', error);
      alert(`Hata: ${error.message}`);
    }
  }
  
  // Hisse detayını göster
  async function showStockDetail(symbol, name) {
    try {
      // Yükleme göstergesini göster
      loadingSpinner.classList.remove('hidden');
      
      // Diğer görünümleri gizle
      defaultView.classList.add('hidden');
      resultsContainer.classList.add('hidden');
      
      const formattedDate = new Date().toISOString().substring(0, 7); // YYYY-MM formatı
      const detailStartDate = '2015-01'; // 1 Ocak 2025
      
      // Verileri getir
      const stockData = await window.dataFetcher.getStockMonthlyPerformance(symbol, detailStartDate, formattedDate);
      
      // Hisse adını göster
      detailStockTitle.textContent = `${symbol.replace('.IS', '')} - ${name} (1 Ocak 2025'ten Bugüne)`;
      
      // Veriyi takvim görünümü için organize et
      const organizedData = window.stockAnalyzer.organizeDataByYearMonth(stockData);
      
      // Takvim görünümünü oluştur
      detailCalendar.renderCalendar(organizedData);
      
      // Grafik verilerini hazırla
      const chartData = window.stockAnalyzer.prepareChartData(stockData);
      
      // Grafiği oluştur
      window.stockAnalyzer.createChart(detailPerformanceChartCanvas, chartData);
      
      // Performans özetini oluştur ve göster
      updateDetailPerformanceSummary(stockData);
      
      // Detay görünümünü göster
      stockDetailView.classList.remove('hidden');
      
    } catch (error) {
      console.error('Detay analizi sırasında hata:', error);
      alert(`Hata: ${error.message}`);
    } finally {
      // Yükleme göstergesini gizle
      loadingSpinner.classList.add('hidden');
    }
  }
  
  // Detay performans özeti elementlerini güncelle
  function updateDetailPerformanceSummary(stockData) {
    const summary = window.stockAnalyzer.generatePerformanceSummary(stockData);
    
    // En yüksek artış
    detailHighestGain.textContent = `+${summary.highestGain.toFixed(2)}%`;
    detailHighestGainMonth.textContent = summary.highestGainMonth;
    
    // En yüksek düşüş
    detailHighestLoss.textContent = `${summary.highestLoss.toFixed(2)}%`;
    detailHighestLossMonth.textContent = summary.highestLossMonth;
    
    // Ortalama değişim
    const avgChangePrefix = summary.averageChange >= 0 ? '+' : '';
    detailAverageChange.textContent = `${avgChangePrefix}${summary.averageChange.toFixed(2)}%`;
  }
  
  // Analiz işlemi
  async function performAnalysis() {
    const symbol = stockSymbolSelect.value;
    const startDate = startDateInput.value;
    const endDate = endDateInput.value;
    
    // Form validasyonu
    if (!symbol) {
      alert('Lütfen bir hisse senedi seçin.');
      return;
    }
    
    if (!startDate) {
      alert('Lütfen başlangıç tarihi seçin.');
      return;
    }
    
    if (!endDate) {
      alert('Lütfen bitiş tarihi seçin.');
      return;
    }
    
    try {
      // Yükleme göstergesini göster
      loadingSpinner.classList.remove('hidden');
      // Sonuç konteynerini gizle
      resultsContainer.classList.add('hidden');
      stockDetailView.classList.add('hidden');
      
      // Verileri getir
      const stockData = await window.dataFetcher.getStockMonthlyPerformance(symbol, startDate, endDate);
      
      // Hisse adını göster
      const selectedStockName = stockSymbolSelect.options[stockSymbolSelect.selectedIndex].text;
      stockTitle.textContent = `${selectedStockName} Aylık Performans Analizi`;
      
      // Veriyi takvim görünümü için organize et
      const organizedData = window.stockAnalyzer.organizeDataByYearMonth(stockData);
      
      // Takvim görünümünü oluştur
      calendar.renderCalendar(organizedData);
      
      // Grafik verilerini hazırla
      const chartData = window.stockAnalyzer.prepareChartData(stockData);
      
      // Grafiği oluştur
      window.stockAnalyzer.createChart(performanceChartCanvas, chartData);
      
      // Performans özetini oluştur ve göster
      updatePerformanceSummary(stockData);
      
      // Sonuçları göster, animasyon efektiyle
      setTimeout(() => {
        resultsContainer.classList.remove('hidden');
        resultsContainer.style.opacity = '0';
        setTimeout(() => {
          resultsContainer.style.opacity = '1';
        }, 50);
      }, 300);
      
    } catch (error) {
      console.error('Analiz sırasında hata:', error);
      alert(`Hata: ${error.message}`);
    } finally {
      // Yükleme göstergesini gizle
      loadingSpinner.classList.add('hidden');
    }
  }
  
  // Performans özeti elementlerini güncelle
  function updatePerformanceSummary(stockData) {
    const summary = window.stockAnalyzer.generatePerformanceSummary(stockData);
    
    // En yüksek artış
    highestGainElement.textContent = `+${summary.highestGain.toFixed(2)}%`;
    highestGainMonthElement.textContent = summary.highestGainMonth;
    
    // En yüksek düşüş
    highestLossElement.textContent = `${summary.highestLoss.toFixed(2)}%`;
    highestLossMonthElement.textContent = summary.highestLossMonth;
    
    // Ortalama değişim
    const avgChangePrefix = summary.averageChange >= 0 ? '+' : '';
    averageChangeElement.textContent = `${avgChangePrefix}${summary.averageChange.toFixed(2)}%`;
  }
});