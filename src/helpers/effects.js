// =========================================================
// WILD RANGERS ADVENTURE
// VISUAL EFFECTS & GUIDE HELPERS
// =========================================================

import {
  W,
  H
} from "../config.js";

import {
  t
} from "../systems/locale.js";

import {
  startAudio,
  soundGuide
} from "../systems/audio.js";

import {
  txt,
  btn
} from "./ui.js";

import {
  character
} from "./character.js";



/* =========================================================
   SAVANNAH BACKGROUND
   LAYERED 2D WITH GENTLE ANIMATION
========================================================= */

export function savannah(s) {

  // -------------------------------------------------------
  // LAYER 1: SKY
  // -------------------------------------------------------

  if (s.textures.exists("savannah_sky")) {
    s.add.image(0, 0, "savannah_sky")
      .setOrigin(0, 0)
      .setDisplaySize(W, H)
      .setDepth(-50);
  }

  // -------------------------------------------------------
  // LAYER 2: MOUNTAINS
  // -------------------------------------------------------

  if (s.textures.exists("savannah_mountains")) {
    s.add.image(0, 0, "savannah_mountains")
      .setOrigin(0, 0)
      .setDisplaySize(W, H)
      .setDepth(-40);
  }

  // -------------------------------------------------------
  // LAYER 3: TREES
  // -------------------------------------------------------

  if (s.textures.exists("savannah_trees")) {
    s.add.image(0, 0, "savannah_trees")
      .setOrigin(0, 0)
      .setDisplaySize(W, H)
      .setDepth(-30);
  }

  // -------------------------------------------------------
  // LAYER 4: GRASSLAND
  // -------------------------------------------------------

  if (s.textures.exists("savannah_grassland")) {
    s.add.image(0, 0, "savannah_grassland")
      .setOrigin(0, 0)
      .setDisplaySize(W, H)
      .setDepth(-20);
  }

  // -------------------------------------------------------
  // LAYER 5: FOREGROUND
  // -------------------------------------------------------

  if (s.textures.exists("savannah_foreground")) {
    s.add.image(0, 0, "savannah_foreground")
      .setOrigin(0, 0)
      .setDisplaySize(W, H)
      .setDepth(-10);
  }

  // -------------------------------------------------------
  // ANIMATED CLOUDS
  // -------------------------------------------------------

  const clouds = [];

  for (let i = 0; i < 3; i++) {

    const cloud = s.add.container(
      -100 + i * 230,
      115 + i * 65
    );

    const cloudGraphics = s.add.graphics();

    cloudGraphics.fillStyle(0xffffff, 0.32);

    cloudGraphics.fillEllipse(0, 0, 85, 30);
    cloudGraphics.fillCircle(-22, -8, 17);
    cloudGraphics.fillCircle(0, -16, 22);
    cloudGraphics.fillCircle(24, -7, 17);

    cloud.add(cloudGraphics);

    cloud.setDepth(-45);

    clouds.push(cloud);

    s.tweens.add({
      targets: cloud,
      x: 650,
      duration: 45000 + i * 8000,
      repeat: -1,
      onRepeat: () => {
        cloud.x = -100;
      }
    });
  }

  // -------------------------------------------------------
  // DISTANT FLYING BIRDS
  // -------------------------------------------------------

  for (let i = 0; i < 3; i++) {

    const bird = s.add.graphics();

    bird.lineStyle(2, 0x29483b, 0.7);

    // Natural M-shaped flying bird silhouette
    bird.beginPath();

    bird.moveTo(-13, 0);
    bird.lineTo(-9, -4);
    bird.lineTo(-4, -5);
    bird.lineTo(0, 0);
    bird.lineTo(4, -5);
    bird.lineTo(9, -4);
    bird.lineTo(13, 0);

    bird.strokePath();

    bird.setPosition(
      -40 - i * 100,
      245 + i * 22
    );

    bird.setDepth(-35);

    s.tweens.add({
      targets: bird,
      x: W + 40,
      y: bird.y - 12,
      duration: 26000 + i * 5000,
      repeat: -1,

      onRepeat: () => {
        bird.x = -40;
        bird.y = 245 + i * 22;
      }
    });

  }

  // -------------------------------------------------------
  // GENTLE FOREGROUND GRASS MOVEMENT
  // -------------------------------------------------------

  const grass = s.add.graphics();

  grass.setDepth(-5);

  const grassBlades = [];

  for (let i = 0; i < 18; i++) {

    grassBlades.push({
      x: 12 + i * 31,
      y: 930 - (i % 4) * 13,
      sway: 0
    });

  }

  const grassMotion = {
    value: -1
  };

  s.tweens.add({
    targets: grassMotion,
    value: 1,
    duration: 2200,
    yoyo: true,
    repeat: -1,
    onUpdate: () => {

      grass.clear();

      grassBlades.forEach((blade, i) => {

        const movement =
          grassMotion.value * (5 + (i % 3) * 2);

        grass.lineStyle(3, 0x397b32, 0.8);

        grass.beginPath();

        grass.moveTo(blade.x, blade.y);

        grass.lineTo(
          blade.x + movement,
          blade.y - 28
        );

        grass.strokePath();

      });

       }
  });


  // -------------------------------------------------------
  // GENTLE BUTTERFLY ANIMATION
  // -------------------------------------------------------

  const butterflyColors = [
    0xffd447,
    0xff85b8,
    0x8bdcff
  ];

  for (let i = 0; i < 3; i++) {

    const butterfly = s.add.graphics();

    butterfly.setDepth(-4);

    const color = butterflyColors[i];

    butterfly.fillStyle(color, 0.9);

    butterfly.fillEllipse(-7, -4, 13, 16);
    butterfly.fillEllipse(7, -4, 13, 16);

    butterfly.fillStyle(0x35452b, 1);
    butterfly.fillEllipse(0, 0, 3, 13);

    butterfly.setPosition(
      75 + i * 155,
      790 + i * 35
    );

    s.tweens.add({
      targets: butterfly,
      y: butterfly.y - 28,
      x: butterfly.x + 22,
      duration: 2400 + i * 500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

    s.tweens.add({
      targets: butterfly,
      scaleX: 0.55,
      duration: 350,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });

   }

} 


/* =========================================================
   SCENE FADE
========================================================= */

export function fadeScene(
  s,
  next,
  data = {}
) {
  startAudio();

  const c = s.add.rectangle(
    W / 2,
    H / 2,
    W,
    H,
    0x183d29,
    0
  );

  s.tweens.add({
    targets: c,
    alpha: 1,
    duration: 220,
    onComplete: () => {
      s.scene.start(
        next,
        data
      );
    }
  });
}

/* =========================================================
   ASK LEO BUTTON
========================================================= */

export function leoGuide(
  s,
  message,
  onClose = null
) {
  startAudio();
  soundGuide();

  const overlay = s.add.container(0, 0);

  const shade = s.add.rectangle(
    W / 2,
    H / 2,
    W,
    H,
    0x000000,
    0.35
  );

  // Make the full-screen shade a modal,
// but leave the GOT IT button's input area clear.
const guideShadeHitArea = new Phaser.Geom.Rectangle(
  -W / 2,
  -H / 2,
  W,
  H
);

shade.setInteractive(
  guideShadeHitArea,
  (hitArea, x, y) => {
    // GOT IT button area:
    // x: 175–365
    // y: 526–584
    // Shade is centered at 270,480,
    // so convert those coordinates to local coordinates.
    const buttonLeft = 175 - W / 2;
    const buttonRight = 365 - W / 2;
    const buttonTop = 526 - H / 2;
    const buttonBottom = 584 - H / 2;

    // Do NOT let the shade capture touches inside GOT IT.
    return !(
      x >= buttonLeft &&
      x <= buttonRight &&
      y >= buttonTop &&
      y <= buttonBottom
    );
  },
  false
);

  const box = s.add.graphics();

  box.fillStyle(
    0x183d29,
    0.98
  );

  box.fillRoundedRect(
    25,
    250,
    490,
    390,
    28
  );

  const portrait = character(
    s,
    "leo",
    105,
    350,
    145
  );

  const title = txt(
    s,
    270,
    285,
    t("leoGuide"),
    24,
    "#ffdf65"
  );

  const body = txt(
    s,
    295,
    400,
    message,
    20,
    "#fff6c7"
  );

  overlay.add([
    shade,
    box
  ]);

  if (portrait) {
    overlay.add(portrait);
  }

  overlay.add([
    title,
    body
  ]);
  // Create GOT IT as a top-level scene button.
  // It must NOT be a child of the modal container,
  // otherwise the full-screen modal can interfere with input.
  const ok = btn(
    s,
    270,
    555,
    190,
    58,
    t("gotIt"),
    0x35a85b,
    () => {
      // Prevent repeated taps.
      if (ok && !ok.destroyed) {
        ok.disableInteractive();
      }

      // Remove every part of the top-level GOT IT button.
      if (ok && ok._buttonParts) {
        ok._buttonParts.forEach((part) => {
          if (part && !part.destroyed) {
            part.destroy();
          }
        });
      }

      // Stop the guide from being considered active.
      if (s.soundGuideActive) {
        s.soundGuideActive = false;
      }

      // Remove the complete Leo Guide.
      if (overlay && !overlay.destroyed) {
        overlay.destroy(true);
      }

      // Continue the mission only after GOT IT.
      if (typeof onClose === "function") {
        onClose();
      }
    },
    18
  );

  // Keep the complete GOT IT button above the Leo modal.
  if (ok && ok._buttonParts) {
    ok._buttonParts.forEach((part) => {
      if (part && !part.destroyed) {
        part.setDepth(101);
      }
    });
  }

  overlay.setDepth(100);
   s.soundGuideActive = true;

  return overlay;
}
/* =========================================================
   GUIDE BUTTON
========================================================= */

export function guideButton(
  s,
  x,
  y,
  message
) {
  return btn(
    s,
    x,
    y,
    170,
    52,
    "🤖 " + t("askLeo"),
    0x6d5acb,
    () => {
      leoGuide(
        s,
        message
      );
    },
    16
  );
}