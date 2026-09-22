import Phaser from 'phaser';

class WildRangersScene extends Phaser.Scene {
constructor() {
super('WildRangersScene');
this.language = 'en';
}

create() {
this.drawBackground();
this.drawLeo();
this.drawTitle();
this.drawStartButton();
this.drawLanguageSelector();

this.scale.on('resize', () => this.scene.restart());

}

drawBackground() {
const { width: w, height: h } = this.scale;

this.cameras.main.setBackgroundColor('#F5B85B');

// Sky
const sky = this.add.graphics();
sky.fillGradientStyle(
  0xF6C56B, 0xF6C56B,
  0xE9844D, 0xE9844D, 1
);
sky.fillRect(0, 0, w, h);

// Sun
this.add.circle(w * 0.78, h * 0.17, 62, 0xFFE7A0);

// Distant hills
const hills = this.add.graphics();
hills.fillStyle(0xB7A64D, 1);
hills.fillEllipse(w * 0.18, h * 0.57, w * 0.9, h * 0.28);
hills.fillEllipse(w * 0.88, h * 0.59, w * 0.9, h * 0.32);

// Savannah ground
const ground = this.add.graphics();
ground.fillStyle(0x657D3B, 1);
ground.fillRect(0, h * 0.63, w, h * 0.37);

// Foreground grass
ground.fillStyle(0x435F32, 1);
ground.fillEllipse(w * 0.5, h * 0.91, w * 1.3, h * 0.24);

// Simple acacia trees
this.drawTree(w * 0.13, h * 0.60, 0.85);
this.drawTree(w * 0.88, h * 0.61, 0.72);

// Decorative stars/sparkles
this.add.text(w * 0.16, h * 0.16, '✦', {
  fontSize: '26px',
  color: '#FFF1C6'
});

this.add.text(w * 0.83, h * 0.34, '✦', {
  fontSize: '20px',
  color: '#FFF1C6'
});

}

drawTree(x, y, scale) {
const tree = this.add.graphics();

tree.fillStyle(0x62472F, 1);
tree.fillRoundedRect(x - 7 * scale, y - 72 * scale, 14 * scale, 80 * scale, 5);

tree.fillStyle(0x3D5A32, 1);
tree.fillEllipse(x, y - 83 * scale, 112 * scale, 35 * scale);
tree.fillEllipse(x - 25 * scale, y - 95 * scale, 48 * scale, 28 * scale);
tree.fillEllipse(x + 27 * scale, y - 94 * scale, 50 * scale, 27 * scale);

}

drawLeo() {
const { width: w, height: h } = this.scale;
const x = w / 2;
const y = h * 0.57;

const leo = this.add.container(x, y);

// Legs
const legs = this.add.graphics();
legs.fillStyle(0x59402D, 1);
legs.fillRoundedRect(-31, 56, 22, 58, 8);
legs.fillRoundedRect(9, 56, 22, 58, 8);
leo.add(legs);

// Body / ranger shirt
const body = this.add.graphics();
body.fillStyle(0xD99A36, 1);
body.fillRoundedRect(-47, -8, 94, 86, 24);
body.fillStyle(0xF3D18A, 1);
body.fillRoundedRect(-9, 1, 18, 57, 7);
leo.add(body);

// Arms
const arms = this.add.graphics();
arms.fillStyle(0x9B653D, 1);
arms.fillRoundedRect(-64, 3, 22, 59, 10);
arms.fillRoundedRect(42, 3, 22, 59, 10);
leo.add(arms);

// Head
const head = this.add.graphics();
head.fillStyle(0xB87948, 1);
head.fillCircle(0, -47, 48);

// Ears
head.fillCircle(-39, -75, 13);
head.fillCircle(39, -75, 13);

// Hair
head.fillStyle(0x493326, 1);
head.fillEllipse(0, -81, 76, 30);

// Eyes
head.fillStyle(0x2B211B, 1);
head.fillCircle(-16, -49, 4);
head.fillCircle(16, -49, 4);

// Smile
head.lineStyle(3, 0x57351F, 1);
head.beginPath();
head.arc(0, -36, 14, 0.2, Math.PI - 0.2, false);
head.strokePath();

leo.add(head);

// Ranger hat
const hat = this.add.graphics();
hat.fillStyle(0xE0A438, 1);
hat.fillEllipse(0, -87, 104, 20);
hat.fillRoundedRect(-33, -112, 66, 27, 10);
hat.fillStyle(0x6C512D, 1);
hat.fillRect(-31, -94, 62, 6);
leo.add(hat);

// Friendly idle animation
this.tweens.add({
  targets: leo,
  y: y - 7,
  duration: 1100,
  yoyo: true,
  repeat: -1,
  ease: 'Sine.easeInOut'
});

}

drawTitle() {
const { width: w, height: h } = this.scale;

this.add.text(w / 2, h * 0.075, 'WILD RANGERS', {
  fontFamily: 'Arial, sans-serif',
  fontSize: '34px',
  fontStyle: 'bold',
  color: '#FFF5D8',
  stroke: '#59452A',
  strokeThickness: 6,
  align: 'center'
}).setOrigin(0.5);

this.add.text(w / 2, h * 0.12, 'ADVENTURE', {
  fontFamily: 'Arial, sans-serif',
  fontSize: '29px',
  fontStyle: 'bold',
  color: '#FFE08A',
  stroke: '#59452A',
  strokeThickness: 5,
  align: 'center'
}).setOrigin(0.5);

this.add.text(w / 2, h * 0.19, this.getTagline(), {
  fontFamily: 'Arial, sans-serif',
  fontSize: '16px',
  fontStyle: 'bold',
  color: '#FFF8E7',
  stroke: '#72512C',
  strokeThickness: 3,
  align: 'center'
}).setOrigin(0.5);

this.welcome = this.add.text(w / 2, h * 0.29, this.getWelcome(), {
  fontFamily: 'Arial, sans-serif',
  fontSize: '21px',
  fontStyle: 'bold',
  color: '#FFFFFF',
  stroke: '#5B432C',
  strokeThickness: 4,
  align: 'center'
}).setOrigin(0.5);

}

drawStartButton() {
const { width: w, height: h } = this.scale;
const y = h * 0.79;

const button = this.add.container(w / 2, y);

const shadow = this.add.graphics();
shadow.fillStyle(0x354A29, 1);
shadow.fillRoundedRect(-154, -30, 308, 76, 28);

const face = this.add.graphics();
face.fillStyle(0xE0A438, 1);
face.lineStyle(4, 0xFFF0B9, 1);
face.fillRoundedRect(-154, -40, 308, 76, 28);
face.strokeRoundedRect(-154, -40, 308, 76, 28);

const label = this.add.text(0, -2, this.getStartLabel(), {
  fontFamily: 'Arial, sans-serif',
  fontSize: '21px',
  fontStyle: 'bold',
  color: '#3D321F',
  align: 'center'
}).setOrigin(0.5);

button.add([shadow, face, label]);
button.setSize(308, 82);
button.setInteractive(
  new Phaser.Geom.Rectangle(-154, -42, 308, 84),
  Phaser.Geom.Rectangle.Contains
);

button.on('pointerover', () => button.setScale(1.04));
button.on('pointerout', () => button.setScale(1));
button.on('pointerdown', () => {
  label.setText(this.getComingSoon());
});

this.startLabel = label;

this.add.text(w / 2, h * 0.88, this.getFooter(), {
  fontFamily: 'Arial, sans-serif',
  fontSize: '13px',
  color: '#FFF3D4',
  align: 'center',
  stroke: '#40502A',
  strokeThickness: 3
}).setOrigin(0.5);

}

drawLanguageSelector() {
const { width: w, height: h } = this.scale;
const languages = [
{ code: 'en', label: 'EN' },
{ code: 'fr', label: 'FR' },
{ code: 'es', label: 'ES' }
];

const startX = w / 2 - 94;

languages.forEach((lang, index) => {
  const x = startX + index * 94;
  const y = h * 0.94;

  const button = this.add.container(x, y);
  const bg = this.add.graphics();

  bg.fillStyle(
    this.language === lang.code ? 0xE0A438 : 0x435B32,
    1
  );
  bg.lineStyle(2, 0xFFF0B9, 1);
  bg.fillRoundedRect(-36, -20, 72, 40, 14);
  bg.strokeRoundedRect(-36, -20, 72, 40, 14);

  const text = this.add.text(0, 0, lang.label, {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontStyle: 'bold',
    color: '#FFFFFF'
  }).setOrigin(0.5);

  button.add([bg, text]);
  button.setSize(72, 40);
  button.setInteractive(
    new Phaser.Geom.Rectangle(-36, -20, 72, 40),
    Phaser.Geom.Rectangle.Contains
  );

  button.on('pointerdown', () => {
    this.language = lang.code;
    this.scene.restart();
  });
});

}

getTagline() {
return {
en: 'Explore. Learn. Protect Nature.',
fr: 'Explore. Apprends. Protège la nature.',
es: 'Explora. Aprende. Protege la naturaleza.'
}[this.language];
}

getWelcome() {
return {
en: 'Ready, Junior Ranger?',
fr: 'Prêt, jeune ranger ?',
es: '¿Listo, joven ranger?'
}[this.language];
}

getStartLabel() {
return {
en: 'START ADVENTURE',
fr: "COMMENCER L’AVENTURE",
es: 'COMENZAR AVENTURA'
}[this.language];
}

getComingSoon() {
return {
en: 'Adventure coming soon!',
fr: 'Aventure bientôt disponible !',
es: '¡Aventura muy pronto!'
}[this.language];
}

getFooter() {
return {
en: 'A safari full of discovery awaits!',
fr: 'Un safari plein de découvertes t’attend !',
es: '¡Te espera un safari lleno de descubrimientos!'
}[this.language];
}
}

const config = {
type: Phaser.AUTO,
parent: 'game-container',
width: 540,
height: 960,
backgroundColor: '#16211A',

scale: {
mode: Phaser.Scale.FIT,
autoCenter: Phaser.Scale.CENTER_BOTH
},

scene: [WildRangersScene]
};

new Phaser.Game(config);