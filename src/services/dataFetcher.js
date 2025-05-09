// dataFetcher.js - Borsa verilerini çekmek için servis
class DataFetcher {
  constructor() {
    this.baseUrl = 'https://query1.finance.yahoo.com/v8/finance/chart/';
    this.stockSymbols = [
      // BIST 100 Hisseleri (9 Mayıs 2025 itibariyle)
      { symbol: 'ACSEL.IS', name: 'Acıselsan Acıpayam Selüloz' },
      { symbol: 'ADEL.IS', name: 'Adel Kalemcilik' },
      { symbol: 'AEFES.IS', name: 'Anadolu Efes' },
      { symbol: 'AFYON.IS', name: 'Afyon Çimento' },
      { symbol: 'AGESA.IS', name: 'AgeSA Hayat ve Emeklilik' },
      { symbol: 'AGHOL.IS', name: 'Ag Holding' },
      { symbol: 'AKBNK.IS', name: 'Akbank' },
      { symbol: 'AKCNS.IS', name: 'Akçansa' },
      { symbol: 'AKFYE.IS', name: 'Akfen Yenilenebilir Enerji' },
      { symbol: 'AKSA.IS', name: 'Aksa Akrilik' },
      { symbol: 'AKSEN.IS', name: 'Aksa Enerji' },
      { symbol: 'ALARK.IS', name: 'Alarko Holding' },
      { symbol: 'ALBRK.IS', name: 'Albaraka Türk' },
      { symbol: 'ALFAS.IS', name: 'Alfa Solar Enerji' },
      { symbol: 'ALGYO.IS', name: 'Alarko GMYO' },
      { symbol: 'ALKIM.IS', name: 'Alkim Kimya' },
      { symbol: 'ANELE.IS', name: 'Anel Elektrik' },
      { symbol: 'ARCLK.IS', name: 'Arçelik' },
      { symbol: 'ARDYZ.IS', name: 'Ardıç Teknoloji' },
      { symbol: 'ARENA.IS', name: 'Arena Bilgisayar' },
      { symbol: 'ARMDA.IS', name: 'Armada Bilgisayar' },
      { symbol: 'ARSAN.IS', name: 'Arsan Tekstil' },
      { symbol: 'ASELS.IS', name: 'Aselsan' },
      { symbol: 'ASTOR.IS', name: 'Astor Enerji' },
      { symbol: 'ASUZU.IS', name: 'Anadolu Isuzu' },
      { symbol: 'AYCES.IS', name: 'Altınyunus Çeşme' },
      { symbol: 'AYEN.IS', name: 'Ayen Enerji' },
      { symbol: 'AYGAZ.IS', name: 'Aygaz' },
      { symbol: 'BAGFS.IS', name: 'Bagfaş' },
      { symbol: 'BAKAB.IS', name: 'Bak Ambalaj' },
      { symbol: 'BASCM.IS', name: 'Baştaş Başkent Çimento' },
      { symbol: 'BERA.IS', name: 'Bera Holding' },
      { symbol: 'BIMAS.IS', name: 'BİM Mağazalar' },
      { symbol: 'BIOEN.IS', name: 'Biotrend Çevre ve Enerji' },
      { symbol: 'BIZIM.IS', name: 'Bizim Toptan' },
      { symbol: 'BJKAS.IS', name: 'Beşiktaş Futbol Yatırımları' },
      { symbol: 'BRISA.IS', name: 'Brisa' },
      { symbol: 'BRYAT.IS', name: 'Borusan Yatırım' },
      { symbol: 'BUMYO.IS', name: 'Burgan Yatırım Menkul Değerler' },
      { symbol: 'CANTE.IS', name: 'Çan2 Termik' },
      { symbol: 'CCOLA.IS', name: 'Coca-Cola İçecek' },
      { symbol: 'CEMAS.IS', name: 'Çemaş Döküm' },
      { symbol: 'CIMSA.IS', name: 'Çimsa' },
      { symbol: 'CLEBI.IS', name: 'Çelebi Hava Servisi' },
      { symbol: 'CMENT.IS', name: 'Çimentaş' },
      { symbol: 'DESA.IS', name: 'Desa Deri' },
      { symbol: 'DESPC.IS', name: 'Despec Bilgisayar' },
      { symbol: 'DEVA.IS', name: 'Deva Holding' },
      { symbol: 'DOAS.IS', name: 'Doğuş Otomotiv' },
      { symbol: 'DOHOL.IS', name: 'Doğan Holding' },
      { symbol: 'ECILC.IS', name: 'EIS Eczacıbaşı İlaç' },
      { symbol: 'EGEEN.IS', name: 'Ege Endüstri' },
      { symbol: 'EGGUB.IS', name: 'Ege Gübre' },
      { symbol: 'EGSER.IS', name: 'Ege Seramik' },
      { symbol: 'EKGYO.IS', name: 'Emlak Konut GMYO' },
      { symbol: 'ENJSA.IS', name: 'Enerjisa Enerji' },
      { symbol: 'ENKAI.IS', name: 'Enka İnşaat' },
      { symbol: 'EREGL.IS', name: 'Ereğli Demir Çelik' },
      { symbol: 'ESEN.IS', name: 'Esenboğa Elektrik' },
      { symbol: 'EUPWR.IS', name: 'Europower Enerji' },
      { symbol: 'EUREN.IS', name: 'Eureko Sigorta' },
      { symbol: 'FENER.IS', name: 'Fenerbahçe Futbol' },
      { symbol: 'FROTO.IS', name: 'Ford Otosan' },
      { symbol: 'GARAN.IS', name: 'Garanti Bankası' },
      { symbol: 'GENIL.IS', name: 'Gen İlaç' },
      { symbol: 'GESAN.IS', name: 'Girişim Elektrik' },
      { symbol: 'GLYHO.IS', name: 'Global Yatırım Holding' },
      { symbol: 'GOODY.IS', name: 'Good-Year' },
      { symbol: 'GOZDE.IS', name: 'Gözde Girişim' },
      { symbol: 'GSDHO.IS', name: 'GSD Holding' },
      { symbol: 'GUBRF.IS', name: 'Gübre Fabrikaları' },
      { symbol: 'GWIND.IS', name: 'Galata Wind Enerji' },
      { symbol: 'HALKB.IS', name: 'Halkbank' },
      { symbol: 'HATEK.IS', name: 'Hateks Hatay Tekstil' },
      { symbol: 'HEKTS.IS', name: 'Hektaş' },
      { symbol: 'IPEKE.IS', name: 'İpek Doğal Enerji' },
      { symbol: 'ISBIR.IS', name: 'İşbir Holding' },
      { symbol: 'ISCTR.IS', name: 'İş Bankası (C)' },
      { symbol: 'ISDMR.IS', name: 'İskenderun Demir ve Çelik' },
      { symbol: 'ISFIN.IS', name: 'İş Finansal Kiralama' },
      { symbol: 'ISGYO.IS', name: 'İş GMYO' },
      { symbol: 'ISKUR.IS', name: 'İş Bankası Kurucu' },
      { symbol: 'ISMEN.IS', name: 'İş Yatırım' },
      { symbol: 'ISYAT.IS', name: 'İş Yatırım Ortaklığı' },
      { symbol: 'KARSN.IS', name: 'Karsan Otomotiv' },
      { symbol: 'KARTN.IS', name: 'Kartonsan' },
      { symbol: 'KCHOL.IS', name: 'Koç Holding' },
      { symbol: 'KCPHY.IS', name: 'Koç Healthcare' },
      { symbol: 'KERVT.IS', name: 'Kerevitaş Gıda' },
      { symbol: 'KLSER.IS', name: 'Kleopatra Seramik' },
      { symbol: 'KONTR.IS', name: 'Kontrolmatik Teknoloji' },
      { symbol: 'KORDS.IS', name: 'Kordsa Teknik Tekstil' },
      { symbol: 'KOZAA.IS', name: 'Koza Anadolu Metal' },
      { symbol: 'KOZAL.IS', name: 'Koza Altın' },
      { symbol: 'KRDMD.IS', name: 'Kardemir (D)' },
      { symbol: 'KRTEK.IS', name: 'Karsu Tekstil' },
      { symbol: 'LOGO.IS', name: 'Logo Yazılım' },
      { symbol: 'MAGEN.IS', name: 'Margün Enerji' },
      { symbol: 'MAVI.IS', name: 'Mavi Giyim' },
      { symbol: 'MGROS.IS', name: 'Migros Ticaret' },
      { symbol: 'MPARK.IS', name: 'MLP Sağlık' },
      { symbol: 'NETAS.IS', name: 'Netaş Telekom' },
      { symbol: 'NUHCM.IS', name: 'Nuh Çimento' },
      { symbol: 'ODAS.IS', name: 'Odaş Elektrik' },
      { symbol: 'ONERP.IS', name: 'One ERP Yazılım' },
      { symbol: 'OYAKC.IS', name: 'Oyak Çimento' },
      { symbol: 'OYAYO.IS', name: 'Oyak Yatırım Ortaklığı' },
      { symbol: 'OZKGY.IS', name: 'Özak GMYO' },
      { symbol: 'PENGD.IS', name: 'Penguen Gıda' },
      { symbol: 'PETKM.IS', name: 'Petkim' },
      { symbol: 'PETUN.IS', name: 'Pınar Et Ve Un' },
      { symbol: 'PGSUS.IS', name: 'Pegasus' },
      { symbol: 'PRKME.IS', name: 'Park Elektrik' },
      { symbol: 'QUAGR.IS', name: 'QUA Granite' },
      { symbol: 'SAFKR.IS', name: 'Şafak Gayrimenkul' },
      { symbol: 'SAHOL.IS', name: 'Sabancı Holding' },
      { symbol: 'SANFM.IS', name: 'Sanifoam Sünger' },
      { symbol: 'SASA.IS', name: 'Sasa Polyester' },
      { symbol: 'SELEC.IS', name: 'Selçuk Ecza Deposu' },
      { symbol: 'SISE.IS', name: 'Şişe Cam' },
      { symbol: 'SKBNK.IS', name: 'Şekerbank' },
      { symbol: 'SMRTG.IS', name: 'Smartiks Yazılım' },
      { symbol: 'SMART.IS', name: 'Smartek Bilgisayar' },
      { symbol: 'SOKM.IS', name: 'Şok Marketler' },
      { symbol: 'TATGD.IS', name: 'Tat Gıda' },
      { symbol: 'TAVHL.IS', name: 'TAV Havalimanları' },
      { symbol: 'TCELL.IS', name: 'Turkcell' },
      { symbol: 'THYAO.IS', name: 'Türk Hava Yolları' },
      { symbol: 'TKFEN.IS', name: 'Tekfen Holding' },
      { symbol: 'TKNSA.IS', name: 'Teknosa İç ve Dış Ticaret' },
      { symbol: 'TLMAN.IS', name: 'Trabzon Liman' },
      { symbol: 'TMSN.IS', name: 'Tümosan Motor ve Traktör' },
      { symbol: 'TOASO.IS', name: 'Tofaş Oto' },
      { symbol: 'TTKOM.IS', name: 'Türk Telekom' },
      { symbol: 'TTRAK.IS', name: 'Türk Traktör' },
      { symbol: 'TUKAS.IS', name: 'Tukaş' },
      { symbol: 'TUPRS.IS', name: 'Tüpraş' },
      { symbol: 'USAK.IS', name: 'Uşak Seramik' },
      { symbol: 'USDTR.IS', name: 'USDTry Parite' },
      { symbol: 'VAKBN.IS', name: 'Vakıfbank' },
      { symbol: 'VAKKO.IS', name: 'Vakko Tekstil' },
      { symbol: 'VERUS.IS', name: 'Verusa Holding' },
      { symbol: 'VESBE.IS', name: 'Vestel Beyaz Eşya' },
      { symbol: 'VESTL.IS', name: 'Vestel' },
      { symbol: 'VKGYO.IS', name: 'Vakıf GMYO' },
      { symbol: 'YATAS.IS', name: 'Yataş' },
      { symbol: 'YKBNK.IS', name: 'Yapı Kredi Bankası' },
      { symbol: 'YKSLN.IS', name: 'Yükselen Çelik' },
      { symbol: 'YUNSA.IS', name: 'Yünsa' },
      { symbol: 'ZOREN.IS', name: 'Zorlu Enerji' }
    ];
  }

  // Tüm hisse senetlerinin listesini döndürür
  getAllStockSymbols() {
    return this.stockSymbols;
  }

  // Belirli bir hisse senedi için aylık performans verilerini çeker
  async getStockMonthlyPerformance(symbol, startDate, endDate) {
    try {
      // Electron'da direkt window.api'ye erişilebilir, tarayıcıda değil
      if (window.api) {
        return await window.api.getStockData(symbol, startDate, endDate);
      } else {
        // Yahoo Finance API kullanarak gerçek veri çekme
        return await this._fetchYahooFinanceData(symbol, startDate, endDate);
      }
    } catch (error) {
      console.error(`Hisse verisi alınırken hata: ${error.message}`);
      // Hata durumunda mock veri dönelim
      return this._generateMockData(symbol, startDate, endDate);
    }
  }

  // Yahoo Finance API'den veri çeker
  async _fetchYahooFinanceData(symbol, startDate, endDate) {
    // BIST sembolleri için .IS uzantısı kontrol et
    const yahooSymbol = symbol.includes('.IS') ? symbol : `${symbol}.IS`;
    
    // Tarih aralıklarını Unix timestamp formatına çevir
    const start = new Date(startDate || '2020-01-01');
    const end = new Date(endDate || new Date());
    const period1 = Math.floor(start.getTime() / 1000);
    const period2 = Math.floor(end.getTime() / 1000);
    
    // Yahoo Finance API URL'i oluştur
    const url = `${this.baseUrl}${yahooSymbol}?period1=${period1}&period2=${period2}&interval=1mo&events=history`;
    
    // API'den veriyi çek
    const response = await fetch(url);
    
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
    
    return {
      symbol: yahooSymbol,
      data
    };
  }

  // Test amaçlı sahte veri oluşturur (API sorunu durumunda yedek)
  _generateMockData(symbol, startDate, endDate) {
    const data = [];
    
    // Başlangıç ve bitiş tarihlerini ayrıştır
    const start = new Date(startDate || '2020-01');
    const end = new Date(endDate || '2023-12');
    
    // Tarihleri ay ay dolaş ve rastgele değerler oluştur
    let currentDate = new Date(start);
    while (currentDate <= end) {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const formattedDate = `${year}-${month.toString().padStart(2, '0')}`;
      
      // -10 ile +10 arasında rastgele bir değişim yüzdesi
      const change = (Math.random() * 20 - 10).toFixed(2);
      
      data.push({
        date: formattedDate,
        change: parseFloat(change)
      });
      
      // Sonraki aya geç
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    
    return {
      symbol,
      data
    };
  }
}

// Global nesne olarak dışa aktar
window.dataFetcher = new DataFetcher();