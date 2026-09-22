import Phaser from 'phaser';

const W = 540;
const H = 960;

const LANGUAGES = {
en: {
title: 'WILD RANGERS',
adventure: 'ADVENTURE',
tagline: 'Explore. Learn. Protect Nature.',
welcome: 'Ready, Junior Ranger?',
start: 'START ADVENTURE',
footer: 'A safari full of discovery awaits!',
create: 'CREATE YOUR RANGER',
choose: 'Choose your ranger outfit',
continue: 'CONTINUE',
back: 'BACK',
hub: 'WELCOME TO THE SAVANNAH!',
missions: 'MISSIONS',
animals: 'WILDLIFE',
learn: 'LEARNING',
badges: 'BADGES'
},
fr: {
title: 'WILD RANGERS',
adventure: 'AVENTURE',
tagline: 'Explore. Apprends. Protège la nature.',
welcome: 'Prêt, jeune ranger ?',
start: "COMMENCER L’AVENTURE",
footer: 'Un safari plein de découvertes t’attend !',
create: 'CRÉE TON RANGER',
choose: 'Choisis la tenue de ton ranger',
continue: 'CONTINUER',
back: 'RETOUR',
hub: 'BIENVENUE DANS LA SAVANE !',
missions: 'MISSIONS',
animals: 'ANIMAUX',
learn: 'APPRENDRE',
badges: 'BADGES'
},
es: {
title: 'WILD RANGERS',
adventure: 'AVENTURA',
tagline: 'Explora. Aprende. Protege la naturaleza.',
welcome: '¿Listo, joven ranger?',
start: 'COMENZAR AVENTURA',
footer: '¡Te espera un safari lleno de descubrimientos!',
create: 'CREA TU RANGER',
choose: 'Elige el traje de tu ranger',
continue: 'CONTINUAR',
back: 'VOLVER',
hub: '¡BIENVENIDO A LA SABANA!',
missions: 'MISIONES',
animals: 'ANIMALES',
learn: 'APRENDER',
badges: 'INSIGNIAS'
}
};

const OUTFITS = [0xE0A438, 0x4A8C9E, 0x5A3E2B, 0x8B5FA6];

function getLanguage() {
return localStorage.getItem('wr_v1_lang') || 'en';
}

function getText(key) {
return LANGUAGES[getLanguage()][key];
}

function makeText(scene, x, y, text, size = 24, color = '#FFFFFF') {
return scene.add.text(x, y, text, {
fontFamily: 'Arial, sans-serif',
fontSize: "${size}px",
fontStyle: 'bold',
color,
align: 'center',
wordWrap: { width: 460 }
}).setOrigin(0.5);
}

function makeButton(scene, x, y, label, callback, color = 0xE0A438, width = 310) {
const box = scene.add.graphics();
box.fillStyle(0x354A29, 1);
box.fillRoundedRect(x - width / 2, y - 34, width, 76, 22);
box.fillStyle(color, 1);
box.lineStyle(3, 0xFFF0B9, 1);
box.fillRoundedRect(x - width / 2, y - 42, width, 76, 22);
box.strokeRoundedRect(x - width / 2, y - 42, width, 76, 22);

const text = makeText(scene, x, y - 4, label, 20, '#3D321F');

const hit = scene.add.rectangle(x, y - 4, width, 84, 0xffffff, 0);
hit.setInteractive({ useHandCursor: true });
hit.on('pointerdown', callback);

return { box, text, hit };
}

class HomeScene extends Phaser.Scene {
constructor() {
super('HomeScene');
}

create() {
this.drawSafari();

makeText(this, W / 2, 75, getText('title'), 36, '#FFF5D8')
  .setStroke('#59452A', 6);

makeText(this, W / 2, 120, getText('adventure'), 29, '#FFE08A')
  .setStroke('#59452A', 5);

makeText(this, W / 2, 184, getText('tagline'), 16)
  .setStroke('#72512C', 3);

makeText(this, W / 2, 280, getText('welcome'), 22)
  .setStroke('#5B432C', 4);

this.drawLeo(W / 2, 510);

makeButton(this, W / 2, 755, getText('start'), () => {
  this.scene.start('RangerScene');
});

makeText(this, W / 2, 855, getText('footer'), 14);

this.addLanguageButtons();

}

drawSafari() {
this.cameras.main.setBackgroundColor('#F5B85B');

const g = this.add.graphics();
g.fillGradientStyle(0xF6C56B, 0xF6C56B, 0xE9844D, 0xE9844D, 1);
g.fillRect(0, 0, W, H);

this.add.circle(420, 170, 62, 0xFFE7A0);

g.fillStyle(0xB7A64D, 1);
g.fillEllipse(100, 550, 430, 260);
g.fillEllipse(480, 570, 430, 300);

g.fillStyle(0x657D3B, 1);
g.fillRect(0, 620, W, 340);

g.fillStyle(0x435F32, 1);
g.fillEllipse(270, 900, 720, 190);

this.drawTree(70, 620, 0.7);
this.drawTree(475, 625, 0.65);

}

drawTree(x, y, s) {
const g = this.add.graphics();
g.fillStyle(0x62472F, 1);
g.fillRoundedRect(x - 6 * s, y - 70 * s, 12 * s, 75 * s, 4);
g.fillStyle(0x3D5A32, 1);
g.fillEllipse(x, y - 82 * s, 105 * s, 34 * s);
g.fillEllipse(x - 22 * s, y - 94 * s, 48 * s, 28 * s);
g.fillEllipse(x + 25 * s, y - 94 * s, 48 * s, 28 * s);
}

drawLeo(x, y, outfit = 0xE0A438) {
const leo = this.add.container(x, y);
const g = this.add.graphics();

g.fillStyle(0x59402D, 1);
g.fillRoundedRect(-31, 55, 22, 58, 8);
g.fillRoundedRect(9, 55, 22, 58, 8);

g.fillStyle(outfit, 1);
g.fillRoundedRect(-47, -8, 94, 82, 22);

g.fillStyle(0x9B653D, 1);
g.fillRoundedRect(-64, 0, 20, 58, 9);
g.fillRoundedRect(44, 0, 20, 58, 9);

g.fillStyle(0xB87948, 1);
g.fillCircle(0, -48, 48);
g.fillCircle(-38, -76, 13);
g.fillCircle(38, -76, 13);

g.fillStyle(0x493326, 1);
g.fillEllipse(0, -82, 76, 28);

g.fillStyle(0x2B211B, 1);
g.fillCircle(-16, -49, 4);
g.fillCircle(16, -49, 4);

g.lineStyle(3, 0x57351F, 1);
g.beginPath();
g.arc(0, -37, 14, 0.2, Math.PI - 0.2, false);
g.strokePath();

g.fillStyle(0xE0A438, 1);
g.fillEllipse(0, -88, 104, 20);
g.fillRoundedRect(-33, -112, 66, 27, 10);

leo.add(g);

this.tweens.add({
  targets: leo,
  y: y - 7,
  duration: 1100,
  yoyo: true,
  repeat: -1,
  ease: 'Sine.easeInOut'
});

return leo;

}

addLanguageButtons() {
['en', 'fr', 'es'].forEach((lang, i) => {
const x = 178 + i * 92;
const y = 925;

  const bg = this.add.rectangle(x, y, 72, 42,
    getLanguage() === lang ? 0xE0A438 : 0x435B32);
  bg.setStrokeStyle(2, 0xFFF0B9);

  makeText(this, x, y, lang.toUpperCase(), 16)
    .setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      localStorage.setItem('wr_v1_lang', lang);
      this.scene.restart();
    });

  bg.setInteractive({ useHandCursor: true })
    .on('pointerdown', () => {
      localStorage.setItem('wr_v1_lang', lang);
      this.scene.restart();
    });
});

}
}

class RangerScene extends Phaser.Scene {
constructor() {
super('RangerScene');
this.outfit = OUTFITS[0];
}

create() {
this.cameras.main.setBackgroundColor('#EFB65C');

const g = this.add.graphics();
g.fillStyle(0x657D3B, 1);
g.fillRect(0, 620, W, 340);
g.fillStyle(0x435F32, 1);
g.fillEllipse(270, 900, 720, 190);

makeText(this, W / 2, 95, getText('create'), 29, '#FFF5D8')
  .setStroke('#59452A', 5);

makeText(this, W / 2, 160, getText('choose'), 19, '#FFFFFF')
  .setStroke('#59452A', 3);

this.preview = this.drawPreview(W / 2, 400, this.outfit);

this.outfitButtons = [];

OUTFITS.forEach((color, i) => {
  const x = 100 + i * 113;
  const y = 600;

  const circle = this.add.circle(x, y, 37, color);
  circle.setStrokeStyle(4, 0xFFF0B9);
  circle.setInteractive({ useHandCursor: true });

  circle.on('pointerdown', () => {
    this.outfit = color;
    this.preview.destroy();
    this.preview = this.drawPreview(W / 2, 400, this.outfit);
  });

  this.outfitButtons.push(circle);
});

makeButton(this, W / 2, 740, getText('continue'), () => {
  localStorage.setItem('wr_v1_outfit', String(this.outfit));
  this.scene.start('ParkScene');
});

makeButton(this, W / 2, 840, getText('back'), () => {
  this.scene.start('HomeScene');
}, 0xF7EFD8, 220);

}

drawPreview(x, y, outfit) {
const preview = this.add.container(x, y);
const g = this.add.graphics();

g.fillStyle(0x59402D, 1);
g.fillRoundedRect(-24, 40, 18, 54, 7);
g.fillRoundedRect(6, 40, 18, 54, 7);

g.fillStyle(outfit, 1);
g.fillRoundedRect(-39, -10, 78, 70, 18);

g.fillStyle(0xB87948, 1);
g.fillCircle(0, -50, 40);
g.fillCircle(-31, -73, 10);
g.fillCircle(31, -73, 10);

g.fillStyle(0x493326, 1);
g.fillEllipse(0, -80, 62, 23);

g.fillStyle(0x2B211B, 1);
g.fillCircle(-13, -51, 3);
g.fillCircle(13, -51, 3);

g.fillStyle(0xE0A438, 1);
g.fillEllipse(0, -85, 85, 16);
g.fillRoundedRect(-27, -105, 54, 22, 8);

preview.add(g);
return preview;

}
}

class ParkScene extends Phaser.Scene {
constructor() {
super('ParkScene');
}

create() {
this.cameras.main.setBackgroundColor('#F5B85B');

const g = this.add.graphics();
g.fillStyle(0xB7A64D, 1);
g.fillEllipse(150, 400, 500, 260);
g.fillEllipse(470, 460, 480, 300);
g.fillStyle(0x657D3B, 1);
g.fillRect(0, 570, W, 390);

makeText(this, W / 2, 100, getText('hub'), 25, '#FFF5D8')
  .setStroke('#59452A', 5);

const outfit = Number(localStorage.getItem('wr_v1_outfit')) || OUTFITS[0];
this.drawRanger(W / 2, 320, outfit);

[
  ['missions', 510],
  ['animals', 620],
  ['learn', 730],
  ['badges', 840]
].forEach(([key, y]) => {
  makeButton(this, W / 2, y, getText(key), () => {
    // These destinations will be connected as we build each feature.
  }, 0xE0A438, 300);
});

}

drawRanger(x, y, outfit) {
const g = this.add.graphics();

g.fillStyle(0x59402D, 1);
g.fillRoundedRect(x - 28, y + 42, 18, 45, 7);
g.fillRoundedRect(x + 10, y + 42, 18, 45, 7);

g.fillStyle(outfit, 1);
g.fillRoundedRect(x - 40, y - 8, 80, 62, 18);

g.fillStyle(0xB87948, 1);
g.fillCircle(x, y - 45, 39);

g.fillStyle(0x493326, 1);
g.fillEllipse(x, y - 76, 62, 23);

g.fillStyle(0x2B211B, 1);
g.fillCircle(x - 13, y - 45, 3);
g.fillCircle(x + 13, y - 45, 3);

g.fillStyle(0xE0A438, 1);
g.fillEllipse(x, y - 81, 85, 16);
g.fillRoundedRect(x - 27, y - 101, 54, 22, 8);

}
}

const game = new Phaser.Game({
type: Phaser.AUTO,
parent: 'game-container',
width: W,
height: H,
backgroundColor: '#16211A',
scale: {
mode: Phaser.Scale.FIT,
autoCenter: Phaser.Scale.CENTER_BOTH
},
scene: [HomeScene, RangerScene, ParkScene]
});