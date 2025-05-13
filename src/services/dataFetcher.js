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

  // Belirli bir hisse senedi için günlük performans verilerini çeker
  async getStockDailyPerformance(symbol, startDate, endDate) {
    try {
      // Not: API sınırlaması nedeniyle doğrudan mock veri kullanıyoruz
      // Gerçek veri kullanmak için aşağıdaki satırı açabilirsiniz
      console.log("API sınırlaması nedeniyle mock veri kullanılıyor...");
      return this._generateDailyMockData(symbol, startDate, endDate);
      
      /* API aktifleştirmek için yorum satırlarını kaldırın
      // Electron'da direkt window.api'ye erişilebilir, tarayıcıda değil
      if (window.api) {
        return await window.api.getStockData(symbol, startDate, endDate, 'daily');
      } else {
        // Yahoo Finance API kullanarak gerçek veri çekme
        return await this._fetchYahooFinanceDailyData(symbol, startDate, endDate);
      }
      */
    } catch (error) {
      console.error(`Günlük hisse verisi alınırken hata: ${error.message}`);
      // Hata durumunda mock veri dönelim
      return this._generateDailyMockData(symbol, startDate, endDate);
    }
  }
  
  // Yahoo Finance URL'ini hazırla (harici tarayıcıda açmak için)
  getYahooFinanceChartURL(symbol, startDate, endDate) {
    // BIST sembolleri için .IS uzantısı kontrol et
    const yahooSymbol = symbol.includes('.IS') ? symbol : `${symbol}.IS`;
    
    // Tarih aralıklarını Unix timestamp formatına çevir
    const start = new Date(startDate || '2020-01-01');
    const end = new Date(endDate || new Date());
    const period1 = Math.floor(start.getTime() / 1000);
    const period2 = Math.floor(end.getTime() / 1000);
    
    // Yahoo Finance için JWT token (önceden hazırlanmış token)
    const chartConfig = "eyJsYXlvdXQiOnsiaW50ZXJ2YWwiOiJ3ZWVrIiwicGVyaW9kaWNpdHkiOjEsInRpbWVVbml0IjpudWxsLCJjYW5kbGVXaWR0aCI6MTcuMzcxNDI4NTcxNDI4NTcsImZsaXBwZWQiOmZhbHNlLCJ2b2x1bWVVbmRlcmxheSI6dHJ1ZSwiYWRqIjp0cnVlLCJjcm9zc2hhaXIiOnRydWUsImNoYXJ0VHlwZSI6ImNhbmRsZSIsImV4dGVuZGVkIjpmYWxzZSwibWFya2V0U2Vzc2lvbnMiOnt9LCJhZ2dyZWdhdGlvblR5cGUiOiJvaGxjIiwiY2hhcnRTY2FsZSI6ImxpbmVhciIsInN0dWRpZXMiOnsi4oCMdm9sIHVuZHLigIwiOnsidHlwZSI6InZvbCB1bmRyIiwiaW5wdXRzIjp7IlNlcmllcyI6InNlcmllcyIsImlkIjoi4oCMdm9sIHVuZHLigIwiLCJkaXNwbGF5Ijoi4oCMdm9sIHVuZHLigIwifSwib3V0cHV0cyI6eyJVcCBWb2x1bWUiOiIjMGRiZDZlZWUiLCJEb3duIFZvbHVtZSI6IiNmZjU1NDdlZSJ9LCJwYW5lbCI6ImNoYXJ0IiwicGFyYW1ldGVycyI6eyJjaGFydE5hbWUiOiJjaGFydCIsImVkaXRNb2RlIjp0cnVlLCJwYW5lbE5hbWUiOiJjaGFydCJ9LCJkaXNhYmxlZCI6ZmFsc2V9fSwicGFuZWxzIjp7ImNoYXJ0Ijp7InBlcmNlbnQiOjEsImRpc3BsYXkiOiJCSU1BUy5JUyIsImNoYXJ0TmFtZSI6ImNoYXJ0IiwiaW5kZXgiOjAsInlBeGlzIjp7Im5hbWUiOiJjaGFydCIsInBvc2l0aW9uIjpudWxsfSwieWF4aXNMSFMiOltdLCJ5YXhpc1JIUyI6WyJjaGFydCIsIuKAjHZvbCB1bmRy4oCMIl19fSwib3V0bGllcnMiOmZhbHNlLCJhbmltYXRpb24iOnRydWUsImhlYWRzVXAiOnsic3RhdGljIjp0cnVlLCJkeW5hbWljIjpmYWxzZSwiZmxvYXRpbmciOmZhbHNlfSwibGluZVdpZHRoIjoyLCJmdWxsU2NyZWVuIjp0cnVlLCJzdHJpcGVkQmFja2dyb3VuZCI6dHJ1ZSwiY29sb3IiOiIjMDA4MWYyIiwiY3Jvc3NoYWlyU3RpY2t5IjpmYWxzZSwiZG9udFNhdmVSYW5nZVRvTGF5b3V0Ijp0cnVlLCJzeW1ib2xzIjpbeyJzeW1ib2wiOiJCSU1BUy5JUyIsInN5bWJvbE9iamVjdCI6eyJzeW1ib2wiOiJCSU1BUy5JUyIsInF1b3RlVHlwZSI6IkVRVUlUWSIsImV4Y2hhbmdlVGltZVpvbmUiOiJFdXJvcGUvSXN0YW5idWwiLCJwZXJpb2QxIjoxNDI3MDYxNjAwLCJwZXJpb2QyIjoxNzQ3MDk4MDAwfSwicGVyaW9kaWNpdHkiOjEsImludGVydmFsIjoid2VlayIsInRpbWVVbml0IjpudWxsfV0sInJhbmdlIjp7ImR0TGVmdCI6IjIwMjAtMDEtMTBUMjE6MDA6MDAuMDAwWiIsImR0UmlnaHQiOiIyMDIxLTA1LTEyVDIwOjU5OjAwLjAwMFoiLCJmb3JjZUxvYWQiOnRydWUsInBhZGRpbmciOjB9fSwiZXZlbnRzIjp7ImRpdnMiOnRydWUsInNwbGl0cyI6dHJ1ZSwidHJhZGluZ0hvcml6b24iOiJub25lIiwic2lnRGV2RXZlbnRzIjpbXX0sInByZWZlcmVuY2VzIjp7fX0=";
    
    // Token'daki sembol ve tarih bilgilerini güncelleyelim
    // Not: Şu an için basit bir çözüm olarak doğrudan URL parametreleri kullanıyoruz
    
    // Yahoo Finance sayfası URL'i oluştur (JWT token ile)
    return `https://finance.yahoo.com/chart/${yahooSymbol}?period1=${period1}&period2=${period2}&interval=1d&indicators=volume&includePrePost=false&lineType=line&chartType=candle&style=market&timeUuid=13f9c380-8d8c-11e7-8bf0-eb19db77d711&corsDomain=finance.yahoo.com&.tsrc=finance`;
  }
  
  /* Artık kullanılmıyor - Sadece Yahoo Finance bağlantısı kullanılacak
  // Investing.com URL'i oluştur (alternatif kaynak)
  getInvestingChartURL(symbol) {
    // BIST sembol kodunu ayıkla (.IS uzantısı atla)
    const stockCode = symbol.replace('.IS', '');
    
    // Türkiye hisse senetleri için Investing.com sayfası
    return `https://tr.investing.com/equities/${stockCode.toLowerCase()}-chart`;
  }
  */

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

  // Yahoo Finance API'den günlük veri çeker
  async _fetchYahooFinanceDailyData(symbol, startDate, endDate) {
    // BIST sembolleri için .IS uzantısı kontrol et
    const yahooSymbol = symbol.includes('.IS') ? symbol : `${symbol}.IS`;
    
    // Tarih aralıklarını Unix timestamp formatına çevir
    const start = new Date(startDate || '2020-01-01');
    const end = new Date(endDate || new Date());
    const period1 = Math.floor(start.getTime() / 1000);
    const period2 = Math.floor(end.getTime() / 1000);
    
    // API sınırlamaları nedeniyle bekleme ekle
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Yahoo Finance API URL'i oluştur - günlük veri için 1d interval
    const url = `${this.baseUrl}${yahooSymbol}?period1=${period1}&period2=${period2}&interval=1d&events=history`;
    
    console.log(`Yahoo Finance API'ye istek yapılıyor: ${url}`);
    
    try {
      // API'den veriyi çek
      const response = await fetch(url, {
        headers: {
          // Tarayıcı gibi davranarak istek limiti aşma riskini azalt
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
        }
      });
      
      if (!response.ok) {
        throw new Error(`API yanıt vermedi: ${response.status} - ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Veriyi candlestick grafik formatına dönüştür
      const data = [];
      
      if (result.chart && result.chart.result && result.chart.result.length > 0) {
        const quotes = result.chart.result[0];
        const timestamps = quotes.timestamp || [];
        const opens = quotes.indicators.quote[0].open || [];
        const highs = quotes.indicators.quote[0].high || [];
        const lows = quotes.indicators.quote[0].low || [];
        const closes = quotes.indicators.quote[0].close || [];
        const volumes = quotes.indicators.quote[0].volume || [];
        
        // Her zaman damgası için fiyat bilgilerini hazırla
        for (let i = 0; i < timestamps.length; i++) {
          if (opens[i] !== null && closes[i] !== null && highs[i] !== null && lows[i] !== null) {
            const date = new Date(timestamps[i] * 1000);
            const formattedDate = date.toISOString().split('T')[0]; // YYYY-MM-DD
            
            // Değişim yüzdesini hesapla (Günlük değişim)
            let change = 0;
            if (opens[i] !== 0) {
              change = ((closes[i] - opens[i]) / opens[i] * 100);
            }
            
            // OHLCV (Open, High, Low, Close, Volume) formatında veri ekle
            data.push({
              date: formattedDate,
              open: opens[i],
              high: highs[i],
              low: lows[i],
              close: closes[i],
              volume: volumes[i] || 0,
              change: parseFloat(change.toFixed(2))
            });
          }
        }
      }
      
      return {
        symbol: yahooSymbol,
        data
      };
    } catch (error) {
      console.error(`Yahoo Finance API hatası: ${error.message}`);
      throw error; // Üst fonksiyonda yakalanıp mock veri döndürülecek
    }
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

  // Test amaçlı günlük sahte veri oluşturur (API sorunu durumunda yedek)
  _generateDailyMockData(symbol, startDate, endDate) {
    const data = [];
    
    // Başlangıç ve bitiş tarihlerini ayrıştır
    const start = new Date(startDate || '2023-01-01');
    const end = new Date(endDate || '2023-03-31');
    
    // Her gün için rasgele veri üret
    const currentDate = new Date(start);
    let previousClose = 100 + Math.random() * 50; // Başlangıç fiyatı
    
    // Trend yönü (pozitif = yükseliş, negatif = düşüş)
    let trend = Math.random() > 0.5 ? 1 : -1;
    let trendStrength = 0.01 + Math.random() * 0.02; // Trendin günlük etki gücü (% olarak)
    let trendDays = 0;
    let maxTrendDays = 5 + Math.floor(Math.random() * 10); // Bir trendin maksimum süresi (gün)
    
    while (currentDate <= end) {
      // Hafta sonu değilse veri ekle (0: Pazar, 6: Cumartesi)
      if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
        // Trend kontrolü
        trendDays++;
        if (trendDays > maxTrendDays) {
          // Trendi değiştir
          trend = -trend;
          trendStrength = 0.01 + Math.random() * 0.02;
          trendDays = 0;
          maxTrendDays = 5 + Math.floor(Math.random() * 10);
        }
        
        // Fiyat için baz değişim hesapla
        let baseChange = trend * trendStrength;
        
        // Rasgele dalgalanma ekle (trendin %30-70'i kadar)
        let randomNoise = (Math.random() * 0.4 + 0.3) * trendStrength * (Math.random() > 0.5 ? 1 : -1);
        
        // Toplam günlük değişim
        const dailyChange = previousClose * (baseChange + randomNoise);
        
        // Açılış fiyatı - bazen önceki gün kapanışından farklı açılabilir
        const open = previousClose + (dailyChange * 0.3 * (Math.random() > 0.7 ? -1 : 1));
        
        // Kapanış fiyatı
        const close = previousClose + dailyChange;
        
        // Gün içi dalgalanma (fiyatın %0.2-%2'si kadar)
        const volatility = previousClose * (0.002 + Math.random() * 0.018);
        
        // Yüksek ve düşük fiyatlar
        const high = Math.max(open, close) + volatility;
        const low = Math.min(open, close) - volatility;
        
        // Hacim (trend yönünde daha yüksek)
        let volumeBase = 200000 + Math.random() * 800000;
        const volume = Math.floor(volumeBase * (1 + Math.abs(baseChange) * 10)); // Trendin güçlü olduğu günlerde daha yüksek hacim
        
        // Formatlı tarih
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}`;
        
        // Değişim yüzdesini hesapla
        const change = open !== 0 ? ((close - open) / open * 100) : 0;
        
        // Veriyi ekle
        data.push({
          date: formattedDate,
          open: parseFloat(open.toFixed(2)),
          high: parseFloat(high.toFixed(2)),
          low: parseFloat(low.toFixed(2)),
          close: parseFloat(close.toFixed(2)),
          volume,
          change: parseFloat(change.toFixed(2))
        });
        
        // Sonraki gün için kapanış fiyatını güncelle
        previousClose = close;
      }
      
      // Sonraki güne geç
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return {
      symbol,
      data
    };
  }
}

// Global nesne olarak dışa aktar
window.dataFetcher = new DataFetcher();