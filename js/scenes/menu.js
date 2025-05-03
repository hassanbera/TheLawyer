import { canvas, ctx, getGameState, setGameState } from '../engine.js';

// Menü arkaplan görselini oluşturuyoruz
const backgroundImage = new Image();
// Görselin dosya yolunu belirtiyoruz (bu dosya assets/images klasöründe olmalı)
backgroundImage.src = "../assets/images/menu-background.png";

// Menü sahnesini çizen fonksiyon
export function drawMenu() {
  // Eğer görsel yüklenmişse (hazırsa) arkaplan olarak çiziyoruz
  if (backgroundImage.complete) {
    ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  } else {
    // Görsel henüz yüklenmemişse, geçici olarak düz renk arkaplan çiziyoruz
    ctx.fillStyle = "#3498db";  // mavi renk
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  // Başla butonu sol alt köşeye çiziliyor
  ctx.fillStyle = "#2ecc71";  // yeşil renk
  const buttonWidth = 200;
  const buttonHeight = 60;
  const buttonX = 50;  // sol kenardan mesafe
  const buttonY = canvas.height - 50 - buttonHeight;  // alt kenardan mesafe
  ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);

  // Butonun üstüne "Başla" yazısı yazılıyor
  ctx.fillStyle = "white";  // yazı rengi
  ctx.font = "30px Arial";  // yazı tipi ve boyutu
  ctx.textAlign = "center";  // yazıyı butonun ortasına hizalıyor
  ctx.fillText("Başla", buttonX + buttonWidth/2, buttonY + buttonHeight/2 + 10);  // yazının konumu
}

// Canvas üzerine tıklama olayını dinleyen fonksiyon (oyuncu bir yere tıklarsa çalışır)
canvas.addEventListener("click", (e) => {
    // Eğer oyun hali "menu" değilse, tıklama işleme alınmaz (başka sahnelerde tıklama geçersiz olur)
    if (getGameState() !== "menu") return;

    // Canvas'ın ekran üzerindeki konumunu alıyoruz
    const rect = canvas.getBoundingClientRect();
    // Tıklamanın canvas içindeki X koordinatı
    const mouseX = e.clientX - rect.left;
    // Tıklamanın canvas içindeki Y koordinatı
    const mouseY = e.clientY - rect.top;

    // Tıklamanın başla butonunun koordinatlarına denk gelip gelmediğini kontrol ediyoruz
    if (mouseX >= canvas.width / 2 - 100 &&  // Butonun sol kenarı
        mouseX <= canvas.width / 2 + 100 &&  // Butonun sağ kenarı
        mouseY >= 300 &&                     // Butonun üstü
        mouseY <= 360) {                     // Butonun altı
        // Eğer tıklama butonun içindeyse oyun sahnesine geçiyoruz
        setGameState("game");
    }
});
