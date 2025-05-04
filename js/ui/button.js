// engine.js dosyasından ctx (Canvas çizim context'i) import ediliyor
import { ctx } from "../engine.js";

/**
 * Oyun içinde kullanılacak bir butonu temsil eden sınıf
 * - Menü butonları
 * - Ayar butonları
 * - Oyun içi arayüz butonları için kullanılabilir
 */
export class Button {

  /**
   * Button nesnesi oluşturur
   * @param {number} x - Butonun X pozisyonu (sol üst köşe)
   * @param {number} y - Butonun Y pozisyonu (sol üst köşe)
   * @param {number} width - Butonun genişliği (pixel cinsinden)
   * @param {number} height - Butonun yüksekliği (pixel cinsinden)
   * @param {string} text - Butonun üstünde yazacak yazı
   * @param {string} backgroundColor - Butonun arkaplan rengi (varsayılan yeşil)
   * @param {string} textColor - Yazı rengi (varsayılan beyaz)
   * @param {Function} onClick - Butona tıklanınca çalışacak fonksiyon
   */
  constructor(x, y, width, height, text, backgroundColor = "#2ecc71", textColor = "white", onClick) {
    // Butonun pozisyon ve boyut bilgileri
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    // Butonun içeriği ve renk ayarları
    this.text = text;
    this.backgroundColor = backgroundColor;
    this.textColor = textColor;

    // Butona tıklanınca çalışacak callback fonksiyonu
    this.onClick = onClick;

    // Buton yazısı için font ayarı
    this.font = "30px Arial";
  }

  /**
   * Butonu ekranda çizer
   * - Arkaplan kutusu
   * - Üzerindeki yazı
   */
  draw() {
    // Arkaplan kutusunu çiz
    ctx.fillStyle = this.backgroundColor;
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Yazıyı çiz
    ctx.fillStyle = this.textColor;
    ctx.font = this.font;
    ctx.textAlign = "center";
    ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2 + 10);
  }

  /**
   * Verilen X ve Y koordinatlarının butonun içinde olup olmadığını kontrol eder
   * (Genelde fare tıklaması veya hover kontrolü için kullanılır)
   * @param {number} x - Kontrol edilecek X koordinatı
   * @param {number} y - Kontrol edilecek Y koordinatı
   * @returns {boolean} - Nokta butonun içindeyse true döner
   */
  isPointInside(x, y) {
    return x >= this.x &&
           x <= this.x + this.width &&
           y >= this.y &&
           y <= this.y + this.height;
  }

  /**
   * Tıklama durumunu kontrol eder ve gerekirse butonun onClick fonksiyonunu çalıştırır
   * @param {number} x - Tıklama X pozisyonu
   * @param {number} y - Tıklama Y pozisyonu
   * @returns {boolean} - Butona tıklandıysa true döner, tıklanmadıysa false
   */
  handleClick(x, y) {
    // Tıklama butonun içindeyse
    if (this.isPointInside(x, y)) {
      // Butona atanmış olan onClick fonksiyonunu çalıştır
      this.onClick();

      // İşleme alındığını belirtmek için true döndür
      return true;
    }

    // Tıklama bu butonun alanında değilse false döndür
    return false;
  }
}
