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
========================================================= */

export function savannah(s) {

  const g =
    s.add.graphics();


  /* -------------------------------------------------------
     SKY
  ------------------------------------------------------- */

  g.fillGradientStyle(
    0x65c9ed,
    0x65c9ed,
    0xb2e9f6,
    0xb2e9f6,
    1
  );

  g.fillRect(
    0,
    0,
    W,
    H
  );


  /* -------------------------------------------------------
     SUN
  ------------------------------------------------------- */

  g.fillStyle(
    0xffe36b,
    1
  );

  g.fillCircle(
    440,
    140,
    48
  );


  /* -------------------------------------------------------
     DISTANT HILLS
  ------------------------------------------------------- */

  g.fillStyle(
    0xa7d56c,
    1
  );

  g.fillEllipse(
    100,
    510,
    450,
    230
  );

  g.fillEllipse(
    450,
    500,
    480,
    260
  );


  /* -------------------------------------------------------
     MAIN GRASS
  ------------------------------------------------------- */

  g.fillStyle(
    0x82bd4d,
    1
  );

  g.fillRect(
    0,
    540,
    W,
    420
  );


  /* -------------------------------------------------------
     GRASS SHAPES
  ------------------------------------------------------- */

  g.fillStyle(
    0x6eae42,
    1
  );

  g.fillEllipse(
    70,
    700,
    520,
    280
  );

  g.fillEllipse(
    480,
    740,
    480,
    300
  );


  g.fillStyle(
    0x9bd45a,
    1
  );

  g.fillEllipse(
    260,
    850,
    650,
    250
  );


  /* -------------------------------------------------------
     GRASS DETAILS
  ------------------------------------------------------- */

  for (
    let i = 0;
    i < 14;
    i++
  ) {

    const x =
      20 + i * 42;

    const y =
      900 -
      (i % 4) * 35;


    g.lineStyle(
      3,
      0x4f9837,
      1
    );


    g.beginPath();


    g.moveTo(
      x,
      y
    );


    g.lineTo(
      x - 5,
      y - 18
    );


    g.moveTo(
      x,
      y
    );


    g.lineTo(
      x + 6,
      y - 22
    );


    g.strokePath();

  }

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

  // Make the full-screen shade a true modal.
  // This prevents taps from reaching buttons underneath.
  shade.setInteractive({
    useHandCursor: false
  });

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

  const ok = btn(
    s,
    270,
    555,
    190,
    58,
    t("gotIt"),
    0x35a85b,
    () => {
      // Prevent the same phone tap from firing twice.
      if (ok && !ok.destroyed) {
        ok.disableInteractive();
      }

      // Hide the complete guide immediately.
      overlay.setVisible(false);
      overlay.setActive(false);

      // Stop the guide from being considered active.
      if (s.soundGuideActive) {
        s.soundGuideActive = false;
      }

      // Continue the mission only after GOT IT is pressed.
      if (typeof onClose === "function") {
        onClose();
      }

      // Safely remove the guide.
      if (overlay && !overlay.destroyed) {
        overlay.destroy(true);
      }
    },
    18,
    overlay
  );
  // Keep GOT IT above the full-screen
// modal shade.
overlay.sendToBack(shade);
overlay.bringToTop(ok);

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