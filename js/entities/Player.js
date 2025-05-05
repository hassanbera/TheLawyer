// engine.js'den canvas ve ctx alıyoruz
import {canvas, ctx} from '../engine.js';

export class Player{
  constructor(x,y){
    // Oyuncunun Pozisyonu
    this.x = x;
    this.y = y;

    // Sprite'lar
    this.sprites = {
      idle : new Image(),
      run : new Image(),
      jump : new Image(),
      punch : new Image(),
      kick : new Image()
    };

    // Sprite dosyalarını yüklüyoruz
    this.sprites.idle.src ="../assets/images/"
    this.sprites.run.src ="../assets/images/"
    this.sprites.jump.src ="../assets/images/"
    this.sprites.punch.src ="../assets/images/"
    this.sprites.kick.src ="../assets/images/"
  }

}