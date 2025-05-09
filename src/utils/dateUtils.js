// dateUtils.js - Tarih işlemleri için yardımcı fonksiyonlar
const dateUtils = {
  // Tarih aralığını oluşturur (başlangıç-bitiş)
  getDateRange(startDateStr, endDateStr) {
    // Varsayılan değerler
    const startDate = startDateStr ? new Date(startDateStr) : new Date(new Date().getFullYear() - 3, 0);
    const endDate = endDateStr ? new Date(endDateStr) : new Date();
    
    return { startDate, endDate };
  },
  
  // Ay adını döndürür
  getMonthName(month) {
    const monthNames = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
      "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];
    return monthNames[month - 1];
  },
  
  // Tarih aralığındaki tüm yılları döndürür
  getYearsInRange(startDate, endDate) {
    const years = [];
    const startYear = startDate.getFullYear();
    const endYear = endDate.getFullYear();
    
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
    
    return years;
  },
  
  // Tarih aralığındaki tüm ayları döndürür (yıl-ay formatında)
  getMonthsInRange(startDate, endDate) {
    const months = [];
    let currentDate = new Date(startDate);
    
    while (currentDate <= endDate) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      months.push(`${year}-${month.toString().padStart(2, '0')}`);
      
      // Bir sonraki aya geç
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return months;
  },
  
  // "YYYY-MM" formatını tarihe çevirir
  parseYearMonth(yearMonthStr) {
    const [year, month] = yearMonthStr.split('-');
    return new Date(parseInt(year), parseInt(month) - 1);
  },
  
  // Tarih nesnesini "YYYY-MM" formatına çevirir
  formatYearMonth(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  }
};

// Global nesne olarak dışa aktar
window.dateUtils = dateUtils;