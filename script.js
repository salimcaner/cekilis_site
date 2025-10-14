// HTML elemanlarını seçme (DOM Seçimi)
const katilimciAlani = document.querySelector('#katilimcilar');
const cekilisButonu = document.querySelector('#cekilisButonu');
const yenilemeButonu = document.querySelector('#yenile')
const sonuc = document.querySelector('#sonuc');
const katilimci_sayisi = document.querySelector('#katilimci_sayisi')
console.log("Bütün veriler alındı: ", katilimciAlani,cekilisButonu,sonuc);
//Adım 3: Butona Fonskiyon ekleme
cekilisButonu.addEventListener('click', () => { 
    //Kullanıcının girdiği ham verileri alma 
    const hamKatilimcilar = katilimciAlani.value;
   
    // verileri böl ve listele
    let katilimcilistesi = hamKatilimcilar.split('\n');
    console.log("Oluşturulan liste:",katilimcilistesi);
    //listedeki boşlukları silme
    const temizlenmisListe = katilimcilistesi.map(isim => {
        return isim.trim(); // her bir isim için trim metodunu(her metnin başındaki ve sonundaki boşlukları siler) çalıştırır.
    });

    console.log("Temizlenmiş liste:",temizlenmisListe);

    //Boş satırları da silelim
    const sonKatilimcilistesi = temizlenmisListe.filter( isim => {
        return isim.length > 0;
    });
    console.log("Listenin son Hali: ", sonKatilimcilistesi);
    
   
    cekilisButonu.disabled = true;
    const katilimciSayisi = sonKatilimcilistesi.length;

    if(katilimciSayisi === 0 ){
        sonuc.textContent="Hata! Lütfen çekilişe katılanların isimlerini giriniz.";
        cekilisButonu.disabled = false;
        return; //Fonksiyonu burada durdurur.
    }
    katilimci_sayisi.textContent = `Katılımcı Sayısı: ${katilimciSayisi}`;
    intervalId = setInterval(() => {
        const rastgeleIndis = Math.floor(Math.random() * katilimciSayisi);
        const geciciKazanan = sonKatilimcilistesi[rastgeleIndis];

        sonuc.textContent = `🎲 Seçiliyor: ${geciciKazanan} 🎲`;
    }, 50); 
   setTimeout(() => {
        clearInterval(intervalId); 

        // ASIL KAZANANI SEÇ
        const asilIndis = Math.floor(Math.random() * katilimciSayisi);
        const asilKazanan = sonKatilimcilistesi[asilIndis];
        sonuc.textContent = `🎉 KAZANAN: ${asilKazanan} 🎉`;
        
        cekilisButonu.disabled = false;
    }, 5000); 
});
function sifirlauygulama(){
    katilimciAlani.value = "";
}
yenilemeButonu.addEventListener('click', sifirlauygulama);