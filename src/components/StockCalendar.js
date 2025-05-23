// StockCalendar.js - Takvim görünümünü oluşturan bileşen
class StockCalendar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    // Ay isimlerini 3 karaktere kısaltalım
    this.monthNames = [
      "Oca", "Şub", "Mar", "Nis", "May", "Haz",
      "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
    ];
    // Tıklanan ay ve yıl için veri
    this.currentSymbol = null;
    this.currentSymbolName = null;
  }

  // O anki sembol bilgisini ayarla
  setCurrentStock(symbol, name) {
    this.currentSymbol = symbol;
    this.currentSymbolName = name;
  }

  // Takvim görünümünü oluştur
  renderCalendar(organizedData) {
    this.container.innerHTML = '';
    
    // Yılları alıp sırala - en güncel yıl en üstte olacak şekilde
    const years = Array.from(organizedData.keys()).sort((a, b) => b - a);
    
    // Ana konteyner - max-w-3xl yerine max-w-4xl ile tablo genişliğini artır
    const mainContainer = document.createElement('div');
    mainContainer.className = 'bg-gray-900 p-6 rounded-lg shadow-xl max-w-4xl mx-auto flex flex-col items-center';
    mainContainer.id = 'performanceMapContainer';
    
    // Başlık
    const title = document.createElement('h3');
    title.className = 'text-white text-lg font-bold mb-5';
    title.textContent = 'Performans Haritası';
    mainContainer.appendChild(title);
    
    // Ay başlıklarını ve veri hücrelerini içeren tablo
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-auto mb-3'; // w-auto ile genişliği içeriğe göre ayarla
    
    // THead oluştur - ay başlıklarını ekle
    const headerRow = document.createElement('div');
    headerRow.className = 'grid gap-1 mb-2';
    // Sabit bir grid-template-columns tanımlamak yerine, dinamik genişlik hesapla
    const cellWidth = this.calculateOptimalCellSize(years.length);
    headerRow.style.gridTemplateColumns = `55px repeat(12, ${cellWidth}px)`;
    
    // Boş köşe hücresi
    const emptyCell = document.createElement('div');
    emptyCell.className = 'text-gray-500 flex items-center justify-center';
    headerRow.appendChild(emptyCell);
    
    // Ay başlıklarını ekle
    for (let month = 0; month < 12; month++) {
      const monthCell = document.createElement('div');
      monthCell.className = 'text-center text-gray-400 py-1 flex items-center justify-center text-xs font-semibold';
      monthCell.innerText = this.monthNames[month];
      headerRow.appendChild(monthCell);
    }
    
    gridContainer.appendChild(headerRow);
    
    // Her yıl için satır oluştur - yıl sayısına göre dinamik boyutlandırma
    const cellSize = this.calculateOptimalCellSize(years.length);
    years.forEach(year => {
      const yearRow = document.createElement('div');
      yearRow.className = 'grid gap-1 mb-1';
      yearRow.style.gridTemplateColumns = `55px repeat(12, ${cellSize}px)`;
      
      // Yıl hücresi
      const yearCell = document.createElement('div');
      yearCell.className = 'text-gray-300 flex items-center justify-center text-sm font-semibold';
      yearCell.innerText = year;
      yearRow.appendChild(yearCell);
      
      // Her ay için bir hücre oluştur - kare şeklinde ve dinamik boyutlu
      for (let month = 1; month <= 12; month++) {
        const cell = document.createElement('div');
        cell.className = 'flex items-center justify-center w-full h-full';
        cell.style.width = `${cellSize}px`;
        cell.style.height = `${cellSize}px`;
        
        // Eğer veri varsa göster
        if (organizedData.get(year).has(month)) {
          const change = organizedData.get(year).get(month);
          
          // Değişim seviyesine göre renk belirle
          let bgColor;
          
          if (change >= 7) {
            bgColor = 'bg-green-600';
          } else if (change >= 3) {
            bgColor = 'bg-green-500';
          } else if (change > 0) {
            bgColor = 'bg-green-400';
          } else if (change === 0) {
            bgColor = 'bg-gray-500';
          } else if (change >= -3) {
            bgColor = 'bg-red-400';
          } else if (change >= -7) {
            bgColor = 'bg-red-500';
          } else {
            bgColor = 'bg-red-600';
          }
          
          // Hücre arka planını ayarla
          cell.className += ` ${bgColor} text-white font-semibold rounded text-sm transition-all duration-150 hover:opacity-90 hover:scale-105 hover:shadow-lg cursor-pointer`;
          
          // Değer gösteren metin
          cell.innerHTML = `<span>${change > 0 ? '+' : ''}${change.toFixed(1)}</span>`;
          
          // Tooltip bilgisi ekle
          cell.setAttribute('title', `${this.monthNames[month - 1]} ${year}: ${change > 0 ? '+' : ''}${change.toFixed(2)}%`);
          
          // Tıklama olayı ekle - ay ve yıl bilgisini fonksiyona aktar
          cell.addEventListener('click', () => {
            if (this.currentSymbol) {
              this.showMonthDetailChart(year, month);
            }
          });
        } else {
          // Veri olmayan hücreler için gri arka plan
          cell.className += ' bg-gray-700 text-gray-400 rounded text-sm';
        }
        
        yearRow.appendChild(cell);
      }
      
      gridContainer.appendChild(yearRow);
    });
    
    mainContainer.appendChild(gridContainer);
    
    // Tabloyu ana konteynere ekle
    this.container.className = 'w-full flex justify-center';
    
    // Renk lejantı ekle
    const legendContainer = document.createElement('div');
    legendContainer.className = 'mt-5 flex flex-wrap justify-center gap-3 text-sm';
    
    // Lejant öğelerini ekle
    const legendItems = [
      { color: 'bg-green-600', text: '≥ +7%' },
      { color: 'bg-green-500', text: '+3% ile +7%' },
      { color: 'bg-green-400', text: '0% ile +3%' },
      { color: 'bg-gray-500', text: '0%' },
      { color: 'bg-red-400', text: '0% ile -3%' },
      { color: 'bg-red-500', text: '-3% ile -7%' },
      { color: 'bg-red-600', text: '≤ -7%' }
    ];
    
    legendItems.forEach(item => {
      const legendItem = document.createElement('div');
      legendItem.className = 'flex items-center gap-1';
      
      const colorBox = document.createElement('div');
      colorBox.className = `${item.color} w-4 h-4 rounded`;
      
      const text = document.createElement('span');
      text.className = 'text-gray-300';
      text.textContent = item.text;
      
      legendItem.appendChild(colorBox);
      legendItem.appendChild(text);
      legendContainer.appendChild(legendItem);
    });
    
    mainContainer.appendChild(legendContainer);
    this.container.appendChild(mainContainer);
    
    // Pencere boyutunu değiştirme olayını dinle
    this.setupResizeListener();
  }
  
  // Tıklanan ay için detay sayfasını göster
  async showMonthDetailChart(year, month) {
    try {
      // Yükleme göstergesini göster
      document.getElementById('loadingSpinner').classList.remove('hidden');
      
      // Ay değişkenleri hesapla - seçilen ay, önceki ay ve sonraki ay
      let prevMonth = month - 1;
      let prevYear = year;
      if (prevMonth < 1) {
        prevMonth = 12;
        prevYear -= 1;
      }
      
      let nextMonth = month + 1;
      let nextYear = year;
      if (nextMonth > 12) {
        nextMonth = 1;
        nextYear += 1;
      }
      
      // Tarihler için Date objesi oluştur
      const startDateObj = new Date(prevYear, prevMonth - 1, 1);
      const endDateObj = new Date(nextYear, nextMonth, 0);
      
      // Tarih formatları oluştur
      const startDateStr = startDateObj.toISOString().split('T')[0];
      const endDateStr = endDateObj.toISOString().split('T')[0];
      
      // Yahoo Finance URL'i hazırla
      const yahooUrl = window.dataFetcher.getYahooFinanceChartURL(
        this.currentSymbol, 
        startDateStr,
        endDateStr
      );
      
      // Modal oluştur
      const detailView = document.createElement('div');
      detailView.className = 'fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50';
      detailView.id = 'externalLinkModal';
      
      // Ay isimleri
      const monthNames = [
        'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
        'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
      ];
      
      // Modal içeriği
      detailView.innerHTML = `
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg max-w-lg w-full border border-gray-600 text-center">
          <h2 class="text-xl font-bold text-blue-100 mb-4">${this.currentSymbol.replace('.IS', '')} - ${this.currentSymbolName}</h2>
          <h3 class="text-lg text-gray-300 mb-6">${monthNames[month-1]} ${year} Detaylı Grafiği</h3>
          
          <p class="text-gray-300 mb-6">Detaylı mum grafiğini görüntülemek için Yahoo Finance'e yönlendirileceksiniz.</p>
          
          <div class="flex flex-col space-y-4">
            <button id="openYahooBtn" class="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors flex items-center justify-center">
              <span class="mr-2">Yahoo Finance'de Görüntüle</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
          
          <button id="closeModalBtn" class="mt-6 text-gray-400 hover:text-white transition-colors">
            Kapat
          </button>
        </div>
      `;
      
      // Modal'ı sayfaya ekle
      document.body.appendChild(detailView);
      
      // Olay dinleyicileri ekle
      document.getElementById('openYahooBtn').addEventListener('click', () => {
        if (window.api) {
          window.api.openExternalLink(yahooUrl);
        } else {
          window.open(yahooUrl, '_blank');
        }
        document.getElementById('externalLinkModal').remove();
      });
      
      document.getElementById('closeModalBtn').addEventListener('click', () => {
        document.getElementById('externalLinkModal').remove();
      });
      
      document.getElementById('loadingSpinner').classList.add('hidden');
      
    } catch (error) {
      console.error('Harici site yönlendirme hatası:', error);
      alert(`Hata: ${error.message}`);
      document.getElementById('loadingSpinner').classList.add('hidden');
    }
  }
  
  // Ekran boyutuna göre optimal hücre boyutunu hesapla
  calculateOptimalCellSize(yearCount) {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    
    // Sidebar, başlıklar ve diğer UI elemanları için alan bırak
    const availableHeight = viewportHeight - 260; // header, footer, başlıklar için yaklaşık 260px
    const availableWidth = viewportWidth - 360; // sidebar ve kenar boşlukları için yaklaşık 360px
    
    // Yıl sayısı + başlık satırı, her satır için yükseklik belirle
    const rowCount = yearCount + 1;
    const maxHeightPerCell = Math.floor(availableHeight / rowCount) - 4; // Satır boşlukları için 4px düş
    
    // 12 ay + yıl sütunu, her sütun için genişlik belirle
    const columnCount = 13;
    const maxWidthPerCell = Math.floor(availableWidth / columnCount) - 4; // Sütun boşlukları için 4px düş
    
    // Kare hücreler için en küçük değeri seç, minimum 35px maksimum 65px olacak şekilde
    return Math.min(Math.max(Math.min(maxHeightPerCell, maxWidthPerCell), 35), 65);
  }    
  
  // Pencere yeniden boyutlandırıldığında takvimi güncelle
  setupResizeListener() {
    const updateCalendarSize = () => {
      const performanceMapContainer = document.getElementById('performanceMapContainer');
      if (performanceMapContainer) {
        // Yeniden render edilmeli, sadece hücre boyutlarını güncellemek yetersiz
        const gridRows = performanceMapContainer.querySelectorAll('.grid');
        if (gridRows.length > 0) {
          const yearCount = gridRows.length - 1; // Başlık satırı hariç
          const newSize = this.calculateOptimalCellSize(yearCount);
          
          // Tüm satırların grid-template-columns değerlerini güncelle
          gridRows.forEach(row => {
            row.style.gridTemplateColumns = `55px repeat(12, ${newSize}px)`;
          });
          
          // Tüm hücrelerin boyutlarını güncelle
          const gridCells = performanceMapContainer.querySelectorAll('.grid > div:not(:first-child)');
          gridCells.forEach(cell => {
            cell.style.width = `${newSize}px`;
            cell.style.height = `${newSize}px`;
          });
          
          // İlk hücrelerin (yıl sütunu) genişliğini güncelle
          const yearCells = performanceMapContainer.querySelectorAll('.grid > div:first-child');
          yearCells.forEach(cell => {
            cell.style.width = '55px'; // Yıl sütununu sabit genişlikte tut
          });
        }
      }
    };
    
    // Varsa eski dinleyiciyi kaldır
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
    
    // Yeni dinleyiciyi ekle
    this.resizeListener = updateCalendarSize;
    window.addEventListener('resize', this.resizeListener);
  }
  
  /* API sınırlamaları nedeniyle kullanımdan kaldırıldı
  // 3 aylık grafik için veri hazırlama
  prepare3MonthChartData(stockData) {
    if (!stockData.data || stockData.data.length === 0) {
      return { datasets: [] };
    }
    
    // Verileri tarihe göre sırala
    const sortedData = [...stockData.data].sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Tarihleri ayır (kategori ekseni için)
    const labels = sortedData.map(item => item.date);
    
    // OHLC (Open, High, Low, Close) verilerini candlestick formatına getir
    const ohlcData = sortedData.map(item => ({
      x: item.date,
      o: item.open,
      h: item.high,
      l: item.low,
      c: item.close
    }));
    
    // Günlük hacim verileri
    const volumes = sortedData.map(item => ({
      x: item.date,
      y: item.volume
    }));
    
    // Mum rengi için (yeşil-kırmızı)
    const colors = sortedData.map(item => 
      item.close >= item.open ? 'rgb(34, 197, 94)' : 'rgb(239, 68, 68)'
    );
    
    // Chart.js için veri nesnesi oluştur
    return {
      labels,
      datasets: [
        {
          label: 'OHLC', 
          type: 'candlestick',
          data: ohlcData,
          color: {
            up: 'rgb(34, 197, 94)',   // Yeşil
            down: 'rgb(239, 68, 68)',  // Kırmızı
            unchanged: 'rgb(156, 163, 175)' // Gri
          }
        },
        {
          label: 'Hacim',
          type: 'bar',
          backgroundColor: colors.map(color => color === 'rgb(34, 197, 94)' ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'),
          borderColor: colors,
          borderWidth: 1,
          data: volumes,
          yAxisID: 'volume'
        }
      ]
    };
  }
  
  // 3 aylık detay grafiği oluştur
  create3MonthChart(chartCanvas, chartData) {
    // Chart.js kütüphanesini kontrol et
    if (!window.Chart) {
      console.error("Chart.js yüklenmemiş!");
      return null;
    }
    
    // Chart.js yapılandırması
    const config = {
      type: 'candlestick',
      data: chartData,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
              displayFormats: {
                day: 'dd MMM'
              }
            },
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 10
              },
              color: '#cbd5e1',
              maxRotation: 45,
              minRotation: 30
            },
            adapters: {
              date: {
                locale: 'tr'
              }
            }
          },
          y: {
            position: 'right',
            grid: {
              color: 'rgba(226, 232, 240, 0.2)'
            },
            ticks: {
              callback: function(value) {
                return value.toFixed(2) + ' ₺';
              },
              font: {
                size: 11
              },
              color: '#cbd5e1'
            }
          },
          volume: {
            position: 'left',
            beginAtZero: true,
            grid: {
              display: false
            },
            ticks: {
              callback: function(value) {
                if (value >= 1000000) {
                  return (value / 1000000).toFixed(1) + 'M';
                } else if (value >= 1000) {
                  return (value / 1000).toFixed(1) + 'K';
                }
                return value;
              },
              font: {
                size: 10
              },
              color: '#94a3b8'
            }
          }
        },
        plugins: {
          tooltip: {
            mode: 'index',
            intersect: false,
            callbacks: {
              label: function(context) {
                const datasetLabel = context.dataset.label;
                const value = context.raw;
                
                if (datasetLabel === 'OHLC') {
                  return [
                    `Açılış: ${value.o.toFixed(2)} ₺`,
                    `Yüksek: ${value.h.toFixed(2)} ₺`,
                    `Düşük: ${value.l.toFixed(2)} ₺`,
                    `Kapanış: ${value.c.toFixed(2)} ₺`
                  ];
                } else if (datasetLabel === 'Hacim') {
                  return `Hacim: ${value.y.toLocaleString()} adet`;
                }
              },
              title: function(context) {
                // Tarih formatı: 15 Mayıs 2023
                const date = new Date(context[0].label);
                return date.toLocaleDateString('tr-TR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                });
              }
            },
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            titleColor: '#fff',
            bodyColor: '#fff',
            padding: 12,
            bodyFont: {
              size: 12
            },
            bodySpacing: 8,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            cornerRadius: 6,
            displayColors: false
          },
          legend: {
            display: false
          },
          title: {
            display: true,
            text: 'Günlük Fiyat Grafiği',
            color: '#fff',
            font: {
              size: 16,
              weight: 'bold'
            },
            padding: {
              top: 10,
              bottom: 20
            }
          }
        }
      }
    };
    
    // Grafik oluştur
    try {
      return new Chart(chartCanvas, config);
    } catch (error) {
      console.error('Grafik oluşturulurken hata:', error);
      const errorDiv = document.createElement('div');
      errorDiv.className = 'text-red-500 text-center p-6';
      errorDiv.textContent = 'Grafik oluşturulamadı.';
      chartCanvas.parentNode.appendChild(errorDiv);
      return null;
    }
  }
  */
}

// Global nesne olarak dışa aktar
window.StockCalendar = StockCalendar;
