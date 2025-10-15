// ** Adım 1: HTML Elemanlarını Seçme (DOM Seçimi) **
const katilimciAlani = document.querySelector('#katilimcilar');
const cekilisButonu = document.querySelector('#cekilisButonu');
const yenilemeButonu = document.querySelector('#yenile');
const sonuc = document.querySelector('#sonuc');
const katilimci_sayisi = document.querySelector('#katilimci_sayisi');
const kazananSayisiInput = document.querySelector('#kazananSayisi');
// Konsol çıktısı
console.log("Bütün veriler alındı: ", katilimciAlani, cekilisButonu, sonuc);

// Global değişken tanımlama (intervalId'nin scope dışından erişilebilir olması için)
let intervalId;

// ** Adım 2: Çekiliş İşlemi Fonksiyonu **
function cekilisYap() {
    // Çekiliş butonunu devre dışı bırak
    cekilisButonu.disabled = true;

    // Kullanıcının girdiği ham verileri alma 
    const hamKatilimcilar = katilimciAlani.value;

    // 1. Verileri böl ve listele
    let katilimcilistesi = hamKatilimcilar.split('\n');
    console.log("Oluşturulan liste:", katilimcilistesi);

    // 2. Listedeki boşlukları silme (trim)
    const temizlenmisListe = katilimcilistesi.map(isim => isim.trim());
    console.log("Temizlenmiş liste:", temizlenmisListe);

    // 3. Boş satırları filtreleme
    const sonKatilimcilistesi = temizlenmisListe.filter(isim => isim.length > 0);
    console.log("Listenin son Hali: ", sonKatilimcilistesi);

    const katilimciSayisi = sonKatilimcilistesi.length;

    // Katılımcı kontrolü
    if (katilimciSayisi === 0) {
        sonuc.textContent = "Hata! Lütfen çekilişe katılanların isimlerini giriniz.";
        cekilisButonu.disabled = false;
        return; // Fonksiyonu burada durdurur.
    }

    // Katılımcı sayısını güncelle
    katilimci_sayisi.textContent = `Katılımcı Sayısı: ${katilimciSayisi}`;

    const hedefKazananSayisi = parseInt(kazananSayisiInput.value);

    if(isNaN(hedefKazananSayisi)||hedefKazananSayisi<1){
        sonuc.textContent ="HATA: Lütfen çekiliş için geçerli (1 veya daha fazla)kazanan sayısı belirleyiniz.";
        cekilisButonu.disabled = false;
        return;
    }
    
    if(hedefKazananSayisi>katilimciSayisi){
        sonuc.textContent = `HATA: ${hedefKazananSayisi} kazanan seçilemez. Sadece ${katilimciSayisi} benzersiz katılımcı var.`;
        cekilisButonu.disabled = false;
        return;
    }
    cekilisButonu.disabled = true;
    // Rastgele seçimi başlat (interval)
    intervalId = setInterval(() => {
        const rastgeleIndis = Math.floor(Math.random() * katilimciSayisi);
        const geciciKazanan = sonKatilimcilistesi[rastgeleIndis];

        sonuc.textContent = ` Seçiliyor: ${geciciKazanan} `;
    }, 50);

    // Belirli bir süre sonra durdur ve asıl kazananı belirle (timeout)
    setTimeout(() => {
        clearInterval(intervalId); // Interval'ı durdur

        // ASIL KAZANANI SEÇ
        const asilIndis = Math.floor(Math.random() * katilimciSayisi);
        const asilKazanan = sonKatilimcilistesi[asilIndis];
        sonuc.textContent = ` KAZANAN: ${asilKazanan} `;

        // Butonu tekrar etkinleştir
        cekilisButonu.disabled = false;
    }, 5000);
}

// ** Adım 3: Uygulama Sıfırlama Fonksiyonu **
function sifirlauygulama() {
    katilimciAlani.value = "";
    sonuc.textContent = ""; // Sonucu da temizle (opsiyonel ama mantıklı)
    katilimci_sayisi.textContent = "Katılımcı Sayısı: 0"; // Sayacı da sıfırla
    // Butonu varsayılan olarak etkinleştir (çekiliş yapılmamışsa zaten etkin olmalı)
    cekilisButonu.disabled = false;
}

// ** Adım 4: Butonlara Fonksiyon Ekleme (Event Listeners) **
cekilisButonu.addEventListener('click', cekilisYap);
yenilemeButonu.addEventListener('click', sifirlauygulama);