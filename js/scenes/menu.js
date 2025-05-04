// engine.js dosyasından canvas, ctx ve oyun durumu fonksiyonlarını import ediyoruz
import { canvas, ctx, getGameState, setGameState } from '../engine.js';

// Button sınıfını import ediyoruz (UI butonları için)
import { Button } from '../ui/button.js';

/**
 * Menu sınıfı, oyun başladığında görünen giriş menüsünü temsil eder.
 * - Arkaplan resmi
 * - Başla butonu
 * - Tıklama dinleyicisi
 */
export class Menu {

  /**
   * Menu sınıfının kurucu fonksiyonu (constructor)
   * - Arkaplan resmini yükler
   * - Butonları oluşturur
   * - Tıklama olaylarını başlatır
   */
  constructor() {
    // Menü arkaplanı için görsel oluşturuyoruz
    this.backgroundImage = new Image();
    this.backgroundImage.src = "../assets/images/menu-background.png";

    // Butonları başlat (Başla butonu vs.)
    this.initButtons();

    // Tıklama olaylarını dinlemeye başla
    this.setupEventListeners();
  }

  /**
   * Menüdeki butonları oluşturur
   */
  initButtons() {
    this.buttons = [
      new Button(
        50,                    // Buton X konumu (sol kenardan 50px)
        canvas.height - 110,   // Buton Y konumu (alt kenardan 50px yukarı)
        200,                   // Buton genişliği
        60,                    // Buton yüksekliği
        "Başla",               // Buton üzerindeki yazı
        "#2ecc71",             // Buton arkaplan rengi (yeşil)
        "white",               // Buton yazı rengi
        () => setGameState("game")  // Butona tıklanınca çalışacak fonksiyon (oyunu başlat)
      )
    ];
  }

  /**
   * Canvas üzerine tıklama olayını dinlemek için Event Listener ekler
   * (Kullanıcı butona tıklarsa algılanması için gereklidir)
   */
  setupEventListeners() {
    // Event handler'ı (this.handleClick) sınıfa bağlıyoruz
    this.clickHandler = this.handleClick.bind(this);

    // Canvas'a tıklama dinleyicisi ekliyoruz
    canvas.addEventListener("click", this.clickHandler);
  }

  /**
   * Menüden çıkarken (örneğin oyun başlayınca) tıklama dinleyicisini kaldırır
   * Bu, performans ve doğru sahne yönetimi için önemlidir
   */
  removeEventListeners() {
    canvas.removeEventListener("click", this.clickHandler);
  }

  /**
   * Canvas tıklama olayını işleyen fonksiyon
   * @param {MouseEvent} e - Tıklama olayı
   */
  handleClick(e) {
    // Eğer oyun şu an "menu" sahnesinde değilse işlem yapmayız
    if (getGameState() !== "menu") return;

    // Tıklama pozisyonunu hesaplıyoruz
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Butonlar arasında tıklanan olup olmadığını kontrol ediyoruz
    for (const button of this.buttons) {
      if (button.handleClick(mouseX, mouseY)) {
        // Eğer bir butona tıklandıysa işlem tamam → diğer butonlara bakmaya gerek yok
        break;
      }
    }
  }

  /**
   * Menü arkaplanını çizer
   * - Görsel yüklendiyse onu çizer
   * - Yüklenmediyse geçici mavi arkaplan çizer
   */
  drawBackground() {
    if (this.backgroundImage.complete) {
      // Arkaplan resmi yüklüyse çiz
      ctx.drawImage(this.backgroundImage, 0, 0, canvas.width, canvas.height);
    } else {
      // Resim henüz yüklenmediyse mavi renk ile doldur
      ctx.fillStyle = "#3498db";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  /**
   * Menü sahnesinin tümünü çizer
   * - Önce arkaplanı
   * - Sonra tüm butonları
   */
  draw() {
    this.drawBackground();

    // Tüm butonları sırayla çiz
    for (const button of this.buttons) {
      button.draw();
    }
  }
}

// Menü sahnesi için global bir Menu objesi oluşturuyoruz
const gameMenu = new Menu();

/**
 * Menü sahnesini çizen fonksiyon
 * (Oyun motoru tarafından her frame çağrılacak)
 */
export function drawMenu() {
  gameMenu.draw();
}

// Dışarıdan erişmek için Menu örneğini de export ediyoruz
export { gameMenu };
