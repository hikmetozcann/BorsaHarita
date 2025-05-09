// StockCalendar.js - Takvim görünümünü oluşturan bileşen
class StockCalendar {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    // Ay isimlerini 3 karaktere kısaltalım
    this.monthNames = [
      "Oca", "Şub", "Mar", "Nis", "May", "Haz",
      "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"
    ];
  }

  // Takvim görünümünü oluştur
  renderCalendar(organizedData) {
    this.container.innerHTML = '';
    
    // Yılları alıp sırala - en güncel yıl en üstte olacak şekilde
    const years = Array.from(organizedData.keys()).sort((a, b) => b - a);
    
    // Ana konteyner
    const mainContainer = document.createElement('div');
    mainContainer.className = 'bg-gray-900 p-4 rounded-lg shadow-xl w-full';
    
    // Başlık
    const title = document.createElement('h3');
    title.className = 'text-white text-sm font-bold mb-3';
    title.textContent = 'Performans Haritası';
    mainContainer.appendChild(title);
    
    // Ay başlıklarını ve veri hücrelerini içeren tablo
    const gridContainer = document.createElement('div');
    gridContainer.className = 'w-full';
    
    // THead oluştur - ay başlıklarını ekle
    const headerRow = document.createElement('div');
    headerRow.className = 'grid grid-cols-13 gap-1 mb-1';
    headerRow.style.gridTemplateColumns = '40px repeat(12, 1fr)';
    
    // Boş köşe hücresi
    const emptyCell = document.createElement('div');
    emptyCell.className = 'text-gray-500 flex items-center justify-center';
    headerRow.appendChild(emptyCell);
    
    // Ay başlıklarını ekle
    for (let month = 0; month < 12; month++) {
      const monthCell = document.createElement('div');
      monthCell.className = 'text-center text-gray-400 py-1 flex items-center justify-center text-xs';
      monthCell.innerText = this.monthNames[month];
      headerRow.appendChild(monthCell);
    }
    
    gridContainer.appendChild(headerRow);
    
    // Her yıl için satır oluştur
    years.forEach(year => {
      const yearRow = document.createElement('div');
      yearRow.className = 'grid grid-cols-13 gap-1 mb-1';
      yearRow.style.gridTemplateColumns = '40px repeat(12, 1fr)';
      
      // Yıl hücresi
      const yearCell = document.createElement('div');
      yearCell.className = 'text-gray-300 flex items-center justify-center';
      yearCell.innerText = year;
      yearRow.appendChild(yearCell);
      
      // Her ay için bir hücre oluştur - kare şeklinde
      for (let month = 1; month <= 12; month++) {
        const cell = document.createElement('div');
        cell.className = 'aspect-square flex items-center justify-center w-full h-full';
        
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
          cell.className += ` ${bgColor} text-white font-medium rounded`;
          
          // Değer gösteren metin
          cell.innerHTML = `<span>${change > 0 ? '+' : ''}${change.toFixed(1)}</span>`;
          
          // Tooltip bilgisi ekle
          cell.setAttribute('title', `${this.monthNames[month - 1]} ${year}: ${change > 0 ? '+' : ''}${change.toFixed(2)}%`);
        } else {
          // Veri olmayan hücreler için gri arka plan
          cell.className += ' bg-gray-700 text-gray-400 rounded';
        }
        
        yearRow.appendChild(cell);
      }
      
      gridContainer.appendChild(yearRow);
    });
    
    mainContainer.appendChild(gridContainer);
    
    // Tabloyu ana konteynere ekle
    this.container.className = 'w-full';
    this.container.appendChild(mainContainer);
  }
}

// Global nesne olarak dışa aktar
window.StockCalendar = StockCalendar;