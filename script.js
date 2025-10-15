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

function getTemizKatilimcilar(){
    const hamKatilimcilar = katilimciAlani.value;
    const sonKatilimcilistesi = hamKatilimcilar
        .split('\n')
        .map(isim => isim.trim())
        .filter(isim => isim.length > 0);
    return sonKatilimcilistesi;
}


function updateKatilimciSayisi(){
    const katilimcilistesi = getTemizKatilimcilar();
    katilimci_sayisi.textContent = `Katılımcı Sayısı: ${katilimcilistesi.length}`;
}

function cekilisYap() {
    const sonKatilimcilistesi = getTemizKatilimcilar();
    const katilimciSayisi = sonKatilimcilistesi.length;
    cekilisButonu.disabled = true;

    if (katilimciSayisi === 0) {
        sonuc.textContent = "Hata! Lütfen çekilişe katılanların isimlerini giriniz.";
        cekilisButonu.disabled = false;
        return; // Fonksiyonu burada durdurur.
    }

    const hedefKazananSayisi = parseInt(kazananSayisiInput.value, 10);

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
        console.log("Hedef Kazanan Sayısı:", hedefKazananSayisi);
        // ASIL KAZANANI SEÇ
        let cekilebilirListe = [...sonKatilimcilistesi]; //orijinal listeyi kopyalana
        let kazananlar = [];

        for(let i = 0; i<hedefKazananSayisi; i++){
            const rastgeleIndis = Math.floor(Math.random()*cekilebilirListe.length);

            kazananlar.push(cekilebilirListe[rastgeleIndis]);

            cekilebilirListe.splice(rastgeleIndis,1);
        }
        console.log("Seçilen Kazananlar Dizisi:", kazananlar);

        let sonucMetni;
        if(kazananlar.length === 1){
            sonucMetni = `KAZANAN: ${kazananlar[0]}`;
        } else {
            sonucMetni = `KAZANAN: ${kazananlar.join(', ')}`;
        }
        console.log("Nihai Sonuç Metni:", sonucMetni);
        sonuc.textContent  = sonucMetni;

        // Butonu tekrar etkinleştir
        cekilisButonu.disabled = false;
    }, 5000);
}

function sifirlauygulama() {
    katilimciAlani.value = "";
    sonuc.textContent = "Henüz Kazanan Belirlenmedi!";
    katilimci_sayisi.textContent = "Katılımcı Sayısı: 0"; 
    kazananSayisiInput.value = "1";
    cekilisButonu.disabled = false;
    clearInterval(intervalId);
}

katilimciAlani.addEventListener('input', updateKatilimciSayisi);
cekilisButonu.addEventListener('click', cekilisYap);
yenilemeButonu.addEventListener('click', sifirlauygulama);

document.addEventListener('DOMContentLoaded', updateKatilimciSayisi);