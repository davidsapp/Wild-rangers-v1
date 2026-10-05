// =========================================================
// WILD RANGERS ADVENTURE
// UI HELPERS
// =========================================================

import { W, H } from "../config.js";

import {
  startAudio,
  soundTap
} from "../systems/audio.js";

// ---------------------------------------------------------
// TEXT
// ---------------------------------------------------------

export function txt(
  s,
  x,
  y,
  str,
  size = 23,
  color = "#fff"
) {
  return s.add.text(x, y, str, {
    fontFamily: "Trebuchet MS,Arial",
    fontSize: size + "px",
    fontStyle: "bold",
    color,
    align: "center",
    wordWrap: {
      width: 460
    },
    stroke: "#49331f",
    strokeThickness: 2
  }).setOrigin(0.5);
}

// ---------------------------------------------------------
// BUTTON
// ---------------------------------------------------------

export function btn(
  s,
  x,
  y,
  w,
  h,
  label,
  color,
  fn,
  size = 22,
  group = null
) {
  const sh = s.add.graphics();

  sh.fillStyle(
    0x49321f,
    0.3
  );

  sh.fillRoundedRect(
    x - w / 2 + 3,
    y - h / 2 + 7,
    w,
    h,
    20
  );

  const wh = s.add.graphics();

  wh.fillStyle(
    0xffffff,
    1
  );

  wh.fillRoundedRect(
    x - w / 2,
    y - h / 2,
    w,
    h,
    20
  );

  const face = s.add.graphics();

  face.fillStyle(
    color,
    1
  );

  face.fillRoundedRect(
    x - w / 2 + 5,
    y - h / 2 + 5,
    w - 10,
    h - 12,
    16
  );

  const lt = txt(
    s,
    x,
    y - 2,
    label,
    size
  );

  const hit = s.add
    .rectangle(
      x,
      y,
      w,
      h,
      0xffffff,
      0
    )
    .setInteractive({
      useHandCursor: true
    });

  hit.on("pointerover", () => {
    s.tweens.add({
      targets: [face, lt],
      scale: 1.03,
      duration: 100
    });
  });

  hit.on("pointerout", () => {
    s.tweens.add({
      targets: [face, lt],
      scale: 1,
      duration: 100
    });
  });

  hit.on("pointerdown", () => {
    startAudio();
    soundTap();

    s.tweens.add({
      targets: [face, lt],
      scale: 0.96,
      duration: 70,
      yoyo: true
    });

    fn();
  });

 if (group) {
  group.addMultiple([
    sh,
    wh,
    face,
    lt,
    hit
  ]);
} 

  return hit;
}

// ---------------------------------------------------------
// POP IN
// ---------------------------------------------------------

export function popIn(
  s,
  o,
  delay = 0
) {
  o.setScale(0.85);
  o.setAlpha(0);

  s.tweens.add({
    targets: o,
    scale: 1,
    alpha: 1,
    duration: 350,
    delay,
    ease: "Back.Out"
  });

  return o;
}

// ---------------------------------------------------------
// PULSE
// ---------------------------------------------------------

export function pulse(s, o) {
  s.tweens.add({
    targets: o,
    scale: 1.06,
    duration: 180,
    yoyo: true,
    ease: "Sine.easeInOut"
  });
}

// ---------------------------------------------------------
// SCENE FADE
// ---------------------------------------------------------

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