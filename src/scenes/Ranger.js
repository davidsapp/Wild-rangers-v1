/* =========================================================
   WILD RANGERS ADVENTURE
   RANGER CREATION SCENE
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
  getOutfitIndex,
  setOutfitIndex
} from "../systems/storage.js";
import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";

import {
  character
} from "../helpers/character.js";


export default class Ranger extends
BaseScene {

  constructor() {
    super("Ranger");
  }


  create() {

    /* -----------------------------------------------------
       BACKGROUND
    ----------------------------------------------------- */

    if (
      this.textures.exists(
        "ranger_background"
      )
    ) {

      this.add
        .image(
          W / 2,
          H / 2,
          "ranger_background"
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
      t("create"),
      30
    );


    txt(
      this,
      270,
      125,
      t("choose"),
      21
    );


    /* -----------------------------------------------------
       SELECTED OUTFIT
    ----------------------------------------------------- */

   let chosen =
  getOutfitIndex(); 


    /* -----------------------------------------------------
       RANGER CHARACTER
    ----------------------------------------------------- */

    character(
      this,
      "leo",
      270,
      430,
      360
    );


    /* -----------------------------------------------------
       OUTFIT SELECTION
    ----------------------------------------------------- */

    OUTFIT_COLORS.forEach(
      (color, i) => {

        const x =
          90 + i * 120;

        const selected =
          chosen === i;


        const shadow =
          this.add.graphics();

        shadow.fillStyle(
          0x49321f,
          0.25
        );

        shadow.fillCircle(
          x + 3,
          690 + 5,
          34
        );


        const circle =
          this.add.graphics();

        circle.fillStyle(
          color,
          1
        );

        circle.fillCircle(
          x,
          690,
          32
        );


        if (selected) {

          circle.lineStyle(
            5,
            0xffffff,
            1
          );

          circle.strokeCircle(
            x,
            690,
            36
          );

        }


        const hit =
          this.add
            .circle(
              x,
              690,
              40,
              0xffffff,
              0
            )
            .setInteractive({
              useHandCursor: true
            });


        hit.on(
          "pointerdown",
          () => {

           setOutfitIndex(i); 

            this.scene.restart();

          }
        );

      }
    );


    /* -----------------------------------------------------
       CONTINUE
    ----------------------------------------------------- */

    btn(
      this,
      270,
      790,
      390,
      70,
      t("go"),
      0x2c9b58,
      () => {

        fadeScene(
          this,
          "Park"
        );

      },
      25
    );


    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      270,
      875,
      250,
      58,
      t("back"),
      0x3d83c5,
      () => {

        fadeScene(
          this,
          "Home"
        );

      },
      21
    );

  }

}