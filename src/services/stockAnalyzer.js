// stockAnalyzer.js - Hisse senedi verilerini analiz eden servis
class StockAnalyzer {
  constructor() {
    // Renk kodları (yüzdelik değişimlere göre)
    this.colorRanges = [
      { min: 10, color: 'bg-green-800 text-white' },     // %10'dan büyük artış: koyu yeşil
      { min: 5, color: 'bg-green-600 text-white' },      // %5-10 arası artış: orta yeşil
      { min: 2, color: 'bg-green-400' },                 // %2-5 arası artış: açık yeşil
      { min: 0, color: 'bg-green-200' },                 // %0-2 arası artış: çok açık yeşil
      { min: -2, color: 'bg-red-200' },                  // %0-2 arası düşüş: çok açık kırmızı
      { min: -5, color: 'bg-red-400' },                  // %2-5 arası düşüş: açık kırmızı
      { min: -10, color: 'bg-red-600 text-white' },      // %5-10 arası düşüş: orta kırmızı
      { min: -100, color: 'bg-red-800 text-white' }      // %10'dan fazla düşüş: koyu kırmızı
    ];

    // Ay isimleri
    this.monthNames = [
      'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
      'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
    ];
  }

  // Veriyi takvim görünümü için organize eder
  organizeDataByYearMonth(stockData) {
    const organizedData = new Map();
    
    // Her veri noktası için
    stockData.data.forEach(item => {
      const dateParts = item.date.split('-');
      const year = dateParts[0];
      const month = parseInt(dateParts[1]);
      
      // Yıl haritada yoksa ekle
      if (!organizedData.has(year)) {
        organizedData.set(year, new Map());
      }
      
      // Ay bilgisini ve değişimi ekle
      organizedData.get(year).set(month, item.change);
    });
    
    return organizedData;
  }

  // Yüzde değişime göre bir renk sınıfı döndürür
  getColorClassForChange(change) {
    // Uygun renk aralığını bul
    for (const range of this.colorRanges) {
      if (change >= range.min) {
        return range.color;
      }
    }
    
    // Olası bir hata durumunda varsayılan
    return 'bg-gray-200';
  }

  // Veriyi grafik için hazırlar (Chart.js)
  prepareChartData(stockData) {
    // Tarihleri ve değişim yüzdelerini ayır
    const labels = stockData.data.map(item => {
      const [year, month] = item.date.split('-');
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'short' });
    });
    
    const changes = stockData.data.map(item => item.change);
    
    // Chart.js için veri nesnesi oluştur
    return {
      labels,
      datasets: [{
        label: 'Aylık Değişim (%)',
        data: changes,
        backgroundColor: changes.map(change => 
          change >= 0 ? 'rgba(79, 70, 229, 0.2)' : 'rgba(239, 68, 68, 0.2)'
        ),
        borderColor: changes.map(change => 
          change >= 0 ? 'rgb(79, 70, 229)' : 'rgb(239, 68, 68)'
        ),
        borderWidth: 2,
        pointBackgroundColor: changes.map(change => 
          change >= 0 ? 'rgb(79, 70, 229)' : 'rgb(239, 68, 68)'
        ),
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };
  }

  // Grafik görünümünü oluşturur 
  createChart(chartCanvas, chartData) {
    // Eğer önceki bir grafik varsa, yok et - daha güvenli kontrol
    if (window.performanceChart && typeof window.performanceChart.destroy === 'function') {
      window.performanceChart.destroy();
    }
    
    // Chart.js yapılandırması
    const config = {
      type: 'line',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            titleColor: '#1f2937',
            bodyColor: '#1f2937',
            borderColor: '#e5e7eb',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            displayColors: false,
            callbacks: {
              title: function(tooltipItems) {
                return tooltipItems[0].label;
              },
              label: function(context) {
                let value = context.parsed.y;
                return `Değişim: ${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
              }
            }
          },
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Aylık Performans Grafiği',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(226, 232, 240, 0.5)'
            },
            ticks: {
              callback: function(value) {
                return value + '%';
              },
              font: {
                size: 11
              }
            },
            suggestedMin: function(context) {
              const values = context.chart.data.datasets[0].data;
              const min = Math.min(...values);
              return Math.floor(min * 1.1); // Minimum değerin %10 altı
            },
            suggestedMax: function(context) {
              const values = context.chart.data.datasets[0].data;
              const max = Math.max(...values);
              return Math.ceil(max * 1.1); // Maksimum değerin %10 üstü
            }
          }
        },
        elements: {
          line: {
            tension: 0.3 // Hafif kavisli çizgiler için
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        hover: {
          mode: 'index',
          intersect: false
        }
      }
    };
    
    // Grafik oluştur ve referansı sakla
    window.performanceChart = new Chart(chartCanvas, config);
    
    return window.performanceChart;
  }
  
  // Performans özetini çıkarır
  generatePerformanceSummary(stockData) {
    const changes = stockData.data.map(item => item.change);
    
    // En büyük artış
    const maxGain = Math.max(...changes);
    const maxGainIndex = changes.indexOf(maxGain);
    const maxGainMonth = stockData.data[maxGainIndex].date;
    
    // En büyük düşüş
    const maxLoss = Math.min(...changes);
    const maxLossIndex = changes.indexOf(maxLoss);
    const maxLossMonth = stockData.data[maxLossIndex].date;
    
    // Ortalama değişim
    const avgChange = changes.reduce((a, b) => a + b, 0) / changes.length;
    
    return {
      highestGain: maxGain,
      highestGainMonth: this._formatMonth(maxGainMonth),
      highestLoss: maxLoss,
      highestLossMonth: this._formatMonth(maxLossMonth),
      averageChange: avgChange
    };
  }
  
  // Ay formatını değiştirir
  _formatMonth(dateStr) {
    const [year, month] = dateStr.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1);
    return date.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long' });
  }

  // Tüm hisseleri topluca analiz eder ve en iyi performans gösteren hisseleri aylarına göre gruplayarak döndürür
  async analyzeAllStocksMonthlyPerformance(startYear = 2015) {
    const results = {
      monthlyBestStocks: {},
      stockConsistencyByMonth: {}
    };
    
    // Tüm aylar için hazırlık yap
    for (let i = 1; i <= 12; i++) {
      results.monthlyBestStocks[i] = [];
      results.stockConsistencyByMonth[i] = [];
    }
    
    try {
      // Tüm hisse senetlerini al
      const stocks = window.dataFetcher.getAllStockSymbols();
      
      // Bugünün tarihi
      const today = new Date();
      const endDate = today.toISOString().substr(0, 7); // YYYY-MM formatı
      
      // Başlangıç tarihi
      const startDate = `${startYear}-01`;
      
      // Her hisse senedi için
      for (const stock of stocks) {
        // Hisse performans verilerini getir
        const performanceData = await window.dataFetcher.getStockMonthlyPerformance(
          stock.symbol, 
          startDate, 
          endDate
        );
        
        // Ay bazında grup
        const monthlyData = this._groupDataByMonth(performanceData.data);
        
        // Tutarlılık analizi (bir ay her yıl sürekli artış göstermişse)
        const consistencyAnalysis = this._analyzeConsistency(monthlyData, startYear, today.getFullYear());
        
        // Her ay için tutarlı performans gösteren hisseleri kaydet
        for (const [month, isConsistent] of Object.entries(consistencyAnalysis)) {
          if (isConsistent.isConsistent && isConsistent.consecutiveYears >= 3) {
            results.stockConsistencyByMonth[month].push({
              symbol: stock.symbol,
              name: stock.name,
              averageGain: isConsistent.averageGain,
              consecutiveYears: isConsistent.consecutiveYears,
              performance: isConsistent.performance
            });
          }
        }
        
        // Her ay için ortalama performansları hesapla
        for (const [month, data] of Object.entries(monthlyData)) {
          if (data.length > 0) {
            const avgChange = data.reduce((sum, item) => sum + item.change, 0) / data.length;
            
            results.monthlyBestStocks[month].push({
              symbol: stock.symbol,
              name: stock.name,
              averageChange: avgChange
            });
          }
        }
      }
      
      // Her ay için en iyi performans gösteren hisseleri sırala
      for (let i = 1; i <= 12; i++) {
        results.monthlyBestStocks[i].sort((a, b) => b.averageChange - a.averageChange);
        
        // En iyi 10 hisse ile sınırla
        results.monthlyBestStocks[i] = results.monthlyBestStocks[i].slice(0, 10);
      }
      
      // Tutarlı hisseleri önce artış yıllarına, sonra ortalama kazanca göre sırala
      for (let i = 1; i <= 12; i++) {
        results.stockConsistencyByMonth[i].sort((a, b) => {
          // Önce ardışık yıl sayısına göre azalan sıralama
          if (b.consecutiveYears !== a.consecutiveYears) {
            return b.consecutiveYears - a.consecutiveYears;
          }
          // Eğer ardışık yıl sayısı aynıysa, ortalama kazanca göre azalan sıralama
          return b.averageGain - a.averageGain;
        });
      }
      
      return results;
    } catch (error) {
      console.error('Toplu analiz sırasında hata:', error);
      throw error;
    }
  }
  
  // Veriyi aylara göre gruplar
  _groupDataByMonth(data) {
    const groupedByMonth = {};
    
    // 12 ay için grupları başlat
    for (let i = 1; i <= 12; i++) {
      groupedByMonth[i] = [];
    }
    
    // Her veri noktasını uygun aya ekle
    data.forEach(item => {
      const [year, month] = item.date.split('-');
      const monthNum = parseInt(month);
      
      groupedByMonth[monthNum].push({
        year: parseInt(year),
        month: monthNum,
        change: item.change
      });
    });
    
    return groupedByMonth;
  }
  
  // Bir hissenin her ay için tutarlılık analizini yapar
  _analyzeConsistency(monthlyData, startYear, endYear) {
    const result = {};
    
    // Her ay için kontrol et
    for (let month = 1; month <= 12; month++) {
      const monthData = monthlyData[month];
      
      if (!monthData || monthData.length < 3) {
        result[month] = { 
          isConsistent: false, 
          consecutiveYears: 0, 
          averageGain: 0,
          performance: []
        };
        continue;
      }
      
      // Yıla göre sırala
      monthData.sort((a, b) => a.year - b.year);
      
      let positiveYears = 0;
      let consecutivePositiveYears = 0;
      let maxConsecutive = 0;
      let totalGain = 0;
      let positiveData = [];
      
      let currentStreak = 0;
      
      // Her yıl için kontrol et
      monthData.forEach(data => {
        if (data.change > 0) {
          positiveYears++;
          currentStreak++;
          totalGain += data.change;
          positiveData.push(data);
        } else {
          maxConsecutive = Math.max(maxConsecutive, currentStreak);
          currentStreak = 0;
        }
      });
      
      // Son streaki de kontrol et
      maxConsecutive = Math.max(maxConsecutive, currentStreak);
      consecutivePositiveYears = maxConsecutive;
      
      const averageGain = positiveData.length > 0 ? 
        totalGain / positiveData.length : 0;
      
      // Son 3 yılın en az 2'sinde pozitif performans ve ortalama %3 üzeri kazanç
      const isConsistent = consecutivePositiveYears >= 3 && averageGain > 2;
      
      result[month] = {
        isConsistent,
        consecutiveYears: consecutivePositiveYears,
        averageGain,
        performance: monthData
      };
    }
    
    return result;
  }
  
  // Ay numarasına göre Türkçe ay adını döndürür
  getMonthName(monthNum) {
    return this.monthNames[monthNum - 1];
  }
  
  // Gelecek ay için öneri oluşturur
  getRecommendationsForNextMonth() {
    // Bugünün tarihi
    const today = new Date();
    // Şu anki ay (0-11 arasında)
    const currentMonth = today.getMonth();
    // Gelecek ay (1-12 arasında)
    const nextMonth = currentMonth + 2 > 12 ? 1 : currentMonth + 2;
    
    return {
      nextMonth,
      nextMonthName: this.monthNames[nextMonth - 1]
    };
  }
  
  // Belirli bir ay için en iyi hisseleri önerir
  getTopRecommendationsForMonth(analysisResults, month, limit = 10) {
    if (!analysisResults || !analysisResults.stockConsistencyByMonth || !analysisResults.stockConsistencyByMonth[month]) {
      return [];
    }
    
    // İlgili aydaki tutarlı performans gösteren hisseleri al
    // Zaten artış yılı ve ortalama kazanca göre sıralanmış durumda
    const recommendations = analysisResults.stockConsistencyByMonth[month];
    
    // Maksimum gösterilecek hisse sayısı ile sınırla
    return recommendations.slice(0, limit);
  }
}

// Global nesne olarak dışa aktar
window.stockAnalyzer = new StockAnalyzer();