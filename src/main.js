import Phaser from 'phaser';

class WildRangersScene extends Phaser.Scene {
constructor() {
super('WildRangersScene');
}

create() {
const { width, height } = this.scale;

this.cameras.main.setBackgroundColor('#16211A');

this.add.text(width / 2, height * 0.30, 'WILD RANGERS', {
  fontFamily: 'Arial, sans-serif',
  fontSize: '36px',
  fontStyle: 'bold',
  color: '#F7EFD8',
  align: 'center'
}).setOrigin(0.5);

this.add.text(width / 2, height * 0.37, 'ADVENTURE', {
  fontFamily: 'Arial, sans-serif',
  fontSize: '26px',
  fontStyle: 'bold',
  color: '#E0A438',
  align: 'center'
}).setOrigin(0.5);

this.add.text(
  width / 2,
  height * 0.47,
  'Explore. Learn. Protect Nature.',
  {
    fontFamily: 'Arial, sans-serif',
    fontSize: '18px',
    color: '#F7EFD8',
    align: 'center'
  }
).setOrigin(0.5);

this.add.circle(
  width / 2,
  height * 0.62,
  58,
  0xE0A438
);

this.add.text(
  width / 2,
  height * 0.62,
  '🦁',
  { fontSize: '54px' }
).setOrigin(0.5);

this.add.text(
  width / 2,
  height * 0.78,
  'YOUR SAFARI ADVENTURE IS COMING!',
  {
    fontFamily: 'Arial, sans-serif',
    fontSize: '15px',
    color: '#F7EFD8',
    align: 'center',
    wordWrap: { width: width * 0.85 }
  }
).setOrigin(0.5);

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