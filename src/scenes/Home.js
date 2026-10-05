/* =========================================================
   WILD RANGERS ADVENTURE
   HOME SCENE
========================================================= */

import Phaser from "phaser";
import BaseScene from "./BaseScene.js";
import {
  W,
  H
} from "../config.js";
import {
  t,
  lang,
  setLanguage
} from "../systems/locale.js";

import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";

import {
  character
} from "../helpers/character.js";


export default class Home extends
BaseScene {

  constructor() {
    super("Home");
  }


  create() {

    /* -----------------------------------------------------
       BACKGROUND
    ----------------------------------------------------- */

    if (
      this.textures.exists(
        "home_safari_background"
      )
    ) {

      this.add
        .image(
          W / 2,
          H / 2,
          "home_safari_background"
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
       TITLE PANEL
    ----------------------------------------------------- */

    const titlePanel =
      this.add.graphics();

    titlePanel.fillStyle(
      0x183d29,
      0.92
    );

    titlePanel.fillRoundedRect(
      30,
      28,
      480,
      155,
      28
    );


    txt(
      this,
      W / 2,
      63,
      t("title"),
      34
    );


    txt(
      this,
      W / 2,
      105,
      t("adventure"),
      30,
      "#f6d66b"
    );


    txt(
      this,
      W / 2,
      147,
      t("tagline"),
      18
    );


    /* -----------------------------------------------------
       SELECTED RANGER
    ----------------------------------------------------- */

    character(
      this,
      "leo",
      W / 2,
      470,
      360
    );


    /* -----------------------------------------------------
       WELCOME MESSAGE
    ----------------------------------------------------- */

    const bubble =
      this.add.graphics();

    bubble.fillStyle(
      0xffffff,
      0.96
    );

    bubble.fillRoundedRect(
      55,
      565,
      430,
      75,
      24
    );


    txt(
      this,
      W / 2,
      603,
      t("welcome"),
      22,
      "#49321f"
    );


    /* -----------------------------------------------------
       PARENTS
    ----------------------------------------------------- */

    btn(
      this,
      270,
      680,
      180,
      48,
      "🔒 Parents",
      0x183d29,
      () => {
        fadeScene(
          this,
          "ParentLogin"
        );
      },
      18
    );


    /* -----------------------------------------------------
       START GAME
    ----------------------------------------------------- */

    btn(
      this,
      270,
      755,
      420,
      78,
      t("start"),
      0x2c9b58,
      () => {
        fadeScene(
          this,
          "Ranger"
        );
      },
      27
    );


    /* -----------------------------------------------------
       LANGUAGE BUTTONS
    ----------------------------------------------------- */

    const languages = [
      {
        code: "en",
        label: "EN"
      },
      {
        code: "fr",
        label: "FR"
      },
      {
        code: "es",
        label: "ES"
      }
    ];


    languages.forEach(
      (item, index) => {

        const selected =
          lang === item.code;

        btn(
          this,
          180 + index * 90,
          900,
          75,
          45,
          item.label,
          selected
            ? 0xe5a52f
            : 0x3d83c5,
          () => {
 setLanguage(
  item.code
);

window.location.reload();
          },
          17
        );

      }
    );


    /* -----------------------------------------------------
       FOOTER
    ----------------------------------------------------- */

    txt(
      this,
      W / 2,
      950,
      t("footer"),
      17
    );

  }

}