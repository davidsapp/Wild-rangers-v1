/* =========================================================
   WILD RANGERS ADVENTURE
   PARK HUB SCENE
========================================================= */

import Phaser from "phaser";
import BaseScene from "./BaseScene.js";
import {
  W,
  H,
  OUTFIT_COLORS
} from "../config.js";

import {
  t
} from "../systems/locale.js";

import {
  getStars
} from "../systems/storage.js";
import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";

import {
  character
} from "../helpers/character.js";


export default class Park extends
BaseScene {

  constructor() {
    super("Park");
  }

create() {

  const stars =
    getStars();
  

    /* -----------------------------------------------------
       BACKGROUND
    ----------------------------------------------------- */

    if (
      this.textures.exists(
        "savannah"
      )
    ) {

      this.add
        .image(
          W / 2,
          H / 2,
          "savannah"
        )
        .setDisplaySize(
          W,
          H
        );

    } else {

      this.add
        .rectangle(
          W / 2,
          H / 2,
          W,
          H,
          0x9bdc78
        );

    }


    /* -----------------------------------------------------
       TITLE
    ----------------------------------------------------- */

    txt(
      this,
      270,
      75,
      t("hub"),
      31
    );


    txt(
      this,
      270,
      120,
      t("hubWelcome"),
      20
    );


    /* -----------------------------------------------------
       SELECTED RANGER
    ----------------------------------------------------- */

    character(
      this,
      "leo",
      270,
      330,
      260
    );


    /* -----------------------------------------------------
       STAR COUNT
    ----------------------------------------------------- */

    txt(
      this,
      270,
      475,
      `⭐ ${t("stars")}: ${stars}`,
      23
    );


    /* -----------------------------------------------------
       MISSIONS
    ----------------------------------------------------- */

    btn(
      this,
      155,
      590,
      240,
      90,
      `🌟 ${t("missions")}`,
      0x35a85b,
      () => {

        fadeScene(
          this,
          "Missions"
        );

      },
      21
    );


    /* -----------------------------------------------------
       ANIMALS
    ----------------------------------------------------- */

    btn(
      this,
      405,
      590,
      220,
      90,
      `🦓 ${t("animals")}`,
      0xe5a52f,
   () => {

    fadeScene(
    this,
    "Wildlife"
  );

},
21
);


    /* -----------------------------------------------------
       LEARNING
    ----------------------------------------------------- */

    btn(
      this,
      155,
      715,
      240,
      90,
      `📚 ${t("learn")}`,
      0x3d83c5,
      () => {

   fadeScene(
    this,
    "Learning"
  );

},
21
); 

    /* -----------------------------------------------------
       BADGES
    ----------------------------------------------------- */

    btn(
      this,
      405,
      715,
      220,
      90,
      `🏅 ${t("badges")}`,
      0xb86ac9,
      () => {

   fadeScene(
    this,
    "Badges"
  );

},
21
); 

    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      270,
      865,
      240,
      60,
      t("back"),
      0x3d83c5,
      () => {

        fadeScene(
          this,
          "Home"
        );

      },
      20
    );

  }


  /* -------------------------------------------------------
     COMING SOON NOTICE
  ------------------------------------------------------- */

  notice() {

    const panel =
      this.add.graphics();

    panel.fillStyle(
      0x183d29,
      0.95
    );

    panel.fillRoundedRect(
      65,
      370,
      410,
      180,
      25
    );


    txt(
      this,
      270,
      425,
      t("soon"),
      27
    );


    btn(
      this,
      270,
      500,
      180,
      50,
      t("back"),
      0x3d83c5,
      () => {

        panel.destroy();

        this.scene.restart();

      },
      18
    );

  }

}