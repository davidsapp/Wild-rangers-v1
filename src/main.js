import Phaser from "phaser";

const W = 540;
const H = 960;

const LANGUAGES = {
  en: {
    title: "WILD RANGERS",
    subtitle: "ADVENTURE",
    tagline: "Explore. Learn. Protect Nature.",
    welcome: "Welcome, Little Ranger!",
    start: "LET'S EXPLORE!",
    footer: "A wild adventure awaits!",
    create: "CREATE YOUR RANGER",
    choose: "Choose your ranger outfit",
    continue: "LET'S GO!",
    back: "BACK",
    hub: "SAVANNAH PARK",
    hubWelcome: "Welcome to the park!",
    missions: "MISSIONS",
    animals: "ANIMALS",
    learn: "LEARNING",
    badges: "MY BADGES",
    outfit: "Choose your outfit!",
    leo: "Hi, Ranger! I'm Leo!",
    selectLang: "Language",
  },

  fr: {
    title: "LES RANGERS",
    subtitle: "SAUVAGES",
    tagline: "Explore. Apprends. Protège la nature.",
    welcome: "Bienvenue, petit Ranger !",
    start: "PARTONS EXPLORER !",
    footer: "Une aventure t'attend !",
    create: "CRÉE TON RANGER",
    choose: "Choisis ta tenue",
    continue: "C'EST PARTI !",
    back: "RETOUR",
    hub: "PARC DE LA SAVANE",
    hubWelcome: "Bienvenue au parc !",
    missions: "MISSIONS",
    animals: "ANIMAUX",
    learn: "APPRENDRE",
    badges: "MES BADGES",
    outfit: "Choisis ta tenue !",
    leo: "Salut, Ranger ! Moi, c'est Leo !",
    selectLang: "Langue",
  },

  es: {
    title: "GUARDIANES",
    subtitle: "SALVAJES",
    tagline: "Explora. Aprende. Protege la naturaleza.",
    welcome: "¡Bienvenido, pequeño Ranger!",
    start: "¡VAMOS A EXPLORAR!",
    footer: "¡Una aventura te espera!",
    create: "CREA TU RANGER",
    choose: "Elige tu uniforme",
    continue: "¡VAMOS!",
    back: "VOLVER",
    hub: "PARQUE DE LA SABANA",
    hubWelcome: "¡Bienvenido al parque!",
    missions: "MISIONES",
    animals: "ANIMALES",
    learn: "APRENDER",
    badges: "MIS MEDALLAS",
    outfit: "¡Elige tu uniforme!",
    leo: "¡Hola, Ranger! ¡Soy Leo!",
    selectLang: "Idioma",
  },
};

let currentLang = localStorage.getItem("wr_v1_lang") || "en";

function T(key) {
  return LANGUAGES[currentLang]?.[key] || LANGUAGES.en[key] || key;
}

// --------------------------------------------------
// SHARED CARTOON HELPERS
// --------------------------------------------------

function addText(scene, x, y, text, size = 24, color = "#ffffff") {
  return scene.add.text(x, y, text, {
    fontFamily: "Trebuchet MS, Arial, sans-serif",
    fontSize: `${size}px`,
    fontStyle: "bold",
    color,
    align: "center",
    wordWrap: { width: 470 },
    stroke: "#4b3825",
    strokeThickness: size >= 28 ? 3 : 1,
  }).setOrigin(0.5);
}

function roundedButton(scene, x, y, w, h, label, color, callback, fontSize = 25) {
  const shadow = scene.add.graphics();
  shadow.fillStyle(0x49321f, 0.35);
  shadow.fillRoundedRect(x - w / 2 + 3, y - h / 2 + 7, w, h, 24);

  const button = scene.add.graphics();
  button.fillStyle(0xffffff, 1);
  button.fillRoundedRect(x - w / 2, y - h / 2, w, h, 24);
  button.fillStyle(color, 1);
  button.fillRoundedRect(x - w / 2 + 5, y - h / 2 + 5, w - 10, h - 12, 20);

  button.fillStyle(0xffffff, 0.18);
  button.fillRoundedRect(x - w / 2 + 12, y - h / 2 + 9, w - 24, 13, 8);

  const text = addText(scene, x, y - 1, label, fontSize);

  const hit = scene.add.rectangle(x, y, w, h, 0xffffff, 0)
    .setInteractive({ useHandCursor: true });

  hit.on("pointerdown", callback);

  hit.on("pointerover", () => {
    button.setAlpha(0.85);
    text.setScale(1.04);
  });

  hit.on("pointerout", () => {
    button.setAlpha(1);
    text.setScale(1);
  });

  return { button, text, hit, shadow };
}

function drawCloud(scene, x, y, scale = 1) {
  const g = scene.add.graphics();
  g.fillStyle(0xffffff, 0.92);

  g.fillCircle(x, y, 24 * scale);
  g.fillCircle(x + 25 * scale, y - 12 * scale, 30 * scale);
  g.fillCircle(x + 55 * scale, y, 23 * scale);
  g.fillRoundedRect(
    x - 5 * scale,
    y - 4 * scale,
    65 * scale,
    25 * scale,
    12 * scale
  );
}

function drawTree(scene, x, y, scale = 1) {
  const g = scene.add.graphics();

  // Trunk
  g.fillStyle(0x85502d, 1);
  g.fillRoundedRect(x - 9 * scale, y, 18 * scale, 75 * scale, 6);

  // Acacia canopy
  g.fillStyle(0x3e8b45, 1);
  g.fillEllipse(x, y - 12 * scale, 125 * scale, 36 * scale);

  g.fillStyle(0x58a94e, 1);
  g.fillEllipse(x - 28 * scale, y - 25 * scale, 55 * scale, 28 * scale);
  g.fillEllipse(x + 20 * scale, y - 28 * scale, 58 * scale, 29 * scale);
}

function drawSavannah(scene) {
  const g = scene.add.graphics();

  // Sky
  g.fillGradientStyle(0x65c9ed, 0x65c9ed, 0xafe8f7, 0xafe8f7, 1);
  g.fillRect(0, 0, W, H);

  // Sun
  g.fillStyle(0xffe36b, 1);
  g.fillCircle(430, 145, 58);
  g.fillStyle(0xfff1a5, 1);
  g.fillCircle(430, 145, 44);

  // Clouds
  drawCloud(scene, 65, 145, 0.8);
  drawCloud(scene, 280, 95, 0.65);

  // Distant hills
  g.fillStyle(0xa7d56c, 1);
  g.fillEllipse(100, 510, 450, 230);
  g.fillEllipse(450, 500, 480, 260);

  // Savannah grass
  g.fillStyle(0x82bd4d, 1);
  g.fillRect(0, 540, W, 420);

  // Rolling foreground hills
  g.fillStyle(0x6eae42, 1);
  g.fillEllipse(70, 700, 520, 280);
  g.fillEllipse(480, 740, 480, 300);

  g.fillStyle(0x9bd45a, 1);
  g.fillEllipse(260, 850, 650, 250);

  // Little flowers
  for (let i = 0; i < 18; i++) {
    const x = Phaser.Math.Between(15, 525);
    const y = Phaser.Math.Between(610, 930);

    g.fillStyle(i % 2 ? 0xffe06b : 0xffffff, 1);
    g.fillCircle(x, y, 4);
  }

  drawTree(scene, 55, 490, 0.8);
  drawTree(scene, 485, 510, 0.75);
}

// --------------------------------------------------
// CARTOON LEO
// --------------------------------------------------

function drawLeo(scene, x, y, scale = 1, outfit = 0x2c9b58) {
  const c = scene.add.container(x, y);
  c.setScale(scale);

  const g = scene.add.graphics();

  // Legs
  g.fillStyle(0x6b442b, 1);
  g.fillRoundedRect(-35, 78, 25, 65, 10);
  g.fillRoundedRect(10, 78, 25, 65, 10);

  // Boots
  g.fillStyle(0x49301e, 1);
  g.fillRoundedRect(-43, 124, 37, 22, 10);
  g.fillRoundedRect(7, 124, 37, 22, 10);

  // Body
  g.fillStyle(outfit, 1);
  g.fillRoundedRect(-48, -5, 96, 105, 28);

  // Shirt highlight
  g.fillStyle(0xffffff, 0.14);
  g.fillRoundedRect(-34, 4, 25, 74, 12);

  // Belt
  g.fillStyle(0x684126, 1);
  g.fillRoundedRect(-47, 65, 94, 12, 5);

  // Belt buckle
  g.fillStyle(0xffd45e, 1);
  g.fillRoundedRect(-8, 64, 17, 14, 4);

  // Neck
  g.fillStyle(0xb96e3d, 1);
  g.fillRoundedRect(-17, -28, 34, 36, 10);

  // Ears
  g.fillStyle(0x8e542f, 1);
  g.fillCircle(-44, -66, 20);
  g.fillCircle(44, -66, 20);

  g.fillStyle(0xf2b27b, 1);
  g.fillCircle(-44, -66, 11);
  g.fillCircle(44, -66, 11);

  // Head
  g.fillStyle(0xc9824a, 1);
  g.fillCircle(0, -64, 59);

  // Face muzzle
  g.fillStyle(0xf4c18d, 1);
  g.fillEllipse(0, -39, 66, 43);

  // Eyes
  g.fillStyle(0xffffff, 1);
  g.fillEllipse(-22, -70, 21, 28);
  g.fillEllipse(22, -70, 21, 28);

  g.fillStyle(0x382619, 1);
  g.fillCircle(-20, -67, 7);
  g.fillCircle(20, -67, 7);

  g.fillStyle(0xffffff, 1);
  g.fillCircle(-22, -71, 3);
  g.fillCircle(18, -71, 3);

  // Nose
  g.fillStyle(0x4b2c24, 1);
  g.fillEllipse(0, -45, 17, 11);

  // Smile
  g.lineStyle(3, 0x6a3927, 1);
  g.beginPath();
  g.arc(0, -35, 17, 0.25, Math.PI - 0.25, false);
  g.strokePath();

  // Safari hat brim
  g.fillStyle(0x9c682e, 1);
  g.fillEllipse(0, -112, 130, 25);

  // Hat crown
  g.fillStyle(0xe8b653, 1);
  g.fillRoundedRect(-43, -153, 86, 43, 15);

  // Hat band
  g.fillStyle(0x3c8d48, 1);
  g.fillRect(-41, -123, 82, 9);

  // Hat shine
  g.fillStyle(0xffffff, 0.2);
  g.fillRoundedRect(-30, -147, 13, 25, 6);

  c.add(g);

  // Gentle floating animation
  scene.tweens.add({
    targets: c,
    y: y - 7,
    duration: 1200,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut",
  });

  return c;
}

// --------------------------------------------------
// HOME SCREEN
// --------------------------------------------------

class HomeScene extends Phaser.Scene {
  constructor() {
    super("HomeScene");
  }

  create() {
    drawSavannah(this);

    // Title panel
    const panel = this.add.graphics();
    panel.fillStyle(0x315b35, 0.92);
    panel.fillRoundedRect(30, 28, 480, 155, 30);
    panel.lineStyle(5, 0xffd45e, 1);
    panel.strokeRoundedRect(30, 28, 480, 155, 30);

    addText(this, W / 2, 72, T("title"), 38, "#fff6c7");
    addText(this, W / 2, 119, T("subtitle"), 31, "#ffdf65");
    addText(this, W / 2, 215, T("tagline"), 19, "#ffffff");

    drawLeo(this, W / 2, 470, 1.35);

    // Welcome bubble
    const bubble = this.add.graphics();
    bubble.fillStyle(0xffffff, 1);
    bubble.fillRoundedRect(45, 625, 450, 66, 25);
    bubble.fillTriangle(255, 690, 285, 690, 270, 710);

    addText(this, W / 2, 657, T("welcome"), 24, "#315b35");

    roundedButton(
      this,
      W / 2,
      765,
      420,
      78,
      T("start"),
      0x35a85b,
      () => this.scene.start("RangerScene"),
      25
    );

    addText(this, W / 2, 830, T("footer"), 19);

    // Language buttons
    ["en", "fr", "es"].forEach((lang, i) => {
      const x = 170 + i * 100;

      roundedButton(
        this,
        x,
        900,
        82,
        48,
        lang.toUpperCase(),
        currentLang === lang ? 0xe5a52f : 0x3c83b8,
        () => {
          currentLang = lang;
          localStorage.setItem("wr_v1_lang", lang);
          this.scene.restart();
        },
        18
      );
    });
  }
}

// --------------------------------------------------
// RANGER CREATION
// --------------------------------------------------

class RangerScene extends Phaser.Scene {
  constructor() {
    super("RangerScene");
  }

  create() {
    drawSavannah(this);

    addText(this, W / 2, 75, T("create"), 31, "#fff5c6");
    addText(this, W / 2, 125, T("choose"), 21);

    const colors = [
      0x2c9b58,
      0xe5a52f,
      0x3d83c5,
      0xc75c4a,
    ];

    let selected = Number(localStorage.getItem("wr_v1_outfit")) || 0;

    const ranger = drawLeo(
      this,
      W / 2,
      430,
      1.45,
      colors[selected]
    );

    // Outfit selection cards
    colors.forEach((color, i) => {
      const x = 90 + i * 120;
      const y = 675;

      const card = this.add.graphics();
      card.fillStyle(0xffffff, 1);
      card.fillRoundedRect(x - 42, y - 42, 84, 84, 18);

      card.fillStyle(color, 1);
      card.fillRoundedRect(x - 34, y - 34, 68, 68, 15);

      if (i === selected) {
        card.lineStyle(5, 0xffe05d, 1);
        card.strokeRoundedRect(x - 42, y - 42, 84, 84, 18);
      }

      this.add.rectangle(x, y, 90, 90, 0xffffff, 0)
        .setInteractive({ useHandCursor: true })
        .on("pointerdown", () => {
          selected = i;
          localStorage.setItem("wr_v1_outfit", String(i));
          this.scene.restart();
        });
    });

    addText(this, W / 2, 755, T("outfit"), 22);

    roundedButton(
      this,
      W / 2,
      835,
      370,
      75,
      T("continue"),
      0x35a85b,
      () => {
        localStorage.setItem("wr_v1_outfit", String(selected));
        this.scene.start("ParkScene");
      },
      26
    );

    roundedButton(
      this,
      100,
      920,
      150,
      55,
      T("back"),
      0x3d83c5,
      () => this.scene.start("HomeScene"),
      20
    );
  }
}

// --------------------------------------------------
// PARK HUB
// --------------------------------------------------

class ParkScene extends Phaser.Scene {
  constructor() {
    super("ParkScene");
  }

  create() {
    drawSavannah(this);

    const panel = this.add.graphics();
    panel.fillStyle(0x315b35, 0.94);
    panel.fillRoundedRect(25, 35, 490, 125, 25);
    panel.lineStyle(4, 0xffd45e, 1);
    panel.strokeRoundedRect(25, 35, 490, 125, 25);

    addText(this, W / 2, 78, T("hub"), 32, "#fff6c7");
    addText(this, W / 2, 120, T("hubWelcome"), 20);

    const outfitColors = [
      0x2c9b58,
      0xe5a52f,
      0x3d83c5,
      0xc75c4a,
    ];

    const outfitIndex =
      Number(localStorage.getItem("wr_v1_outfit")) || 0;

    drawLeo(
      this,
      W / 2,
      350,
      0.85,
      outfitColors[outfitIndex]
    );

    // Park menu cards
    roundedButton(
      this,
      155,
      575,
      240,
      95,
      "🌟  " + T("missions"),
      0x35a85b,
      () => this.showComingSoon(T("missions")),
      23
    );

    roundedButton(
      this,
      405,
      575,
      220,
      95,
      "🦓  " + T("animals"),
      0xe5a52f,
      () => this.showComingSoon(T("animals")),
      22
    );

    roundedButton(
      this,
      155,
      710,
      240,
      95,
      "📚  " + T("learn"),
      0x3d83c5,
      () => this.showComingSoon(T("learn")),
      23
    );

    roundedButton(
      this,
      405,
      710,
      220,
      95,
      "🏅  " + T("badges"),
      0xb86ac9,
      () => this.showComingSoon(T("badges")),
      21
    );

    roundedButton(
      this,
      W / 2,
      865,
      250,
      65,
      T("back"),
      0x3d83c5,
      () => this.scene.start("HomeScene"),
      22
    );
  }

  showComingSoon(section) {
    const box = this.add.graphics();
    box.fillStyle(0x315b35, 0.97);
    box.fillRoundedRect(45, 390, 450, 180, 25);
    box.lineStyle(4, 0xffd45e, 1);
    box.strokeRoundedRect(45, 390, 450, 180, 25);

    const message = addText(
      this,
      W / 2,
      445,
      section,
      28,
      "#fff6c7"
    );

    const sub = addText(
      this,
      W / 2,
      490,
      "Coming soon!",
      23
    );

    roundedButton(
      this,
      W / 2,
      535,
      150,
      48,
      "OK!",
      0x35a85b,
      () => {
        box.destroy();
        message.destroy();
        sub.destroy();
      },
      20
    );
  }
}

// --------------------------------------------------
// GAME START
// --------------------------------------------------

const config = {
  type: Phaser.AUTO,
  width: W,
  height: H,
  backgroundColor: "#65c9ed",
  parent: "game",
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [HomeScene, RangerScene, ParkScene],
};

new Phaser.Game(config);