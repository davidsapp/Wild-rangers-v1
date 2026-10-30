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
   LAYERED 2D GAMEPLAY SCENERY
========================================================= */

export function savannah(s) {

  // -------------------------------------------------------
  // BACKGROUND LAYER 1: SKY
  // -------------------------------------------------------

  if (s.textures.exists("savannah_sky")) {

    s.add.image(
      0,
      0,
      "savannah_sky"
    )
    .setOrigin(0, 0)
    .setDisplaySize(W, H)
    .setDepth(-50);

  }


  // -------------------------------------------------------
  // BACKGROUND LAYER 2: DISTANT MOUNTAINS
  // -------------------------------------------------------

  if (s.textures.exists("savannah_mountains")) {

    s.add.image(
      0,
      0,
      "savannah_mountains"
    )
    .setOrigin(0, 0)
    .setDisplaySize(W, H)
    .setDepth(-40);

  }


  // -------------------------------------------------------
  // BACKGROUND LAYER 3: SAVANNAH TREES
  // -------------------------------------------------------

  if (s.textures.exists("savannah_trees")) {

    s.add.image(
      0,
      0,
      "savannah_trees"
    )
    .setOrigin(0, 0)
    .setDisplaySize(W, H)
    .setDepth(-30);

  }


  // -------------------------------------------------------
  // BACKGROUND LAYER 4: GRASSLAND
  // -------------------------------------------------------

  if (s.textures.exists("savannah_grassland")) {

    s.add.image(
      0,
      0,
      "savannah_grassland"
    )
    .setOrigin(0, 0)
    .setDisplaySize(W, H)
    .setDepth(-20);

  }


  // -------------------------------------------------------
  // BACKGROUND LAYER 5: FOREGROUND
  // -------------------------------------------------------

  if (s.textures.exists("savannah_foreground")) {

    s.add.image(
      0,
      0,
      "savannah_foreground"
    )
    .setOrigin(0, 0)
    .setDisplaySize(W, H)
    .setDepth(-10);

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