/* =========================================================
   WILD RANGERS ADVENTURE
   LEARNING CENTRE SCENE
========================================================= */

import Phaser from "phaser";
import BaseScene from "./BaseScene.js";
import {
  W,
  H
} from "../config.js";

import {
  t
} from "../systems/locale.js";

import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";
import {
  guideButton
} from "../helpers/effects.js";
import {
  character
} from "../helpers/character.js";


export default class Learning extends
BaseScene {

  constructor() {
    super("Learning");
  }


  create() {

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
      70,
      t("learning"),
      31
    );


    txt(
      this,
      270,
      115,
      t("learningSubtitle"),
      19
    );


    /* -----------------------------------------------------
       WILDLIFE
    ----------------------------------------------------- */

    btn(
      this,
      270,
      160,
      400,
      68,
      `🦁 ${t("wildlife")}`,
      0x35a85b,
      () => {

        fadeScene(
          this,
          "Wildlife"
        );

      },
      22
    );


    /* -----------------------------------------------------
       NATURE
    ----------------------------------------------------- */

    btn(
      this,
      270,
      260,
      400,
      68,
      `🌿 ${t("nature")}`,
      0x3d83c5,
      () => {

        this.showLesson(
          t("natureLesson"),
          t("natureShade")
        );

      },
      22
    );


    /* -----------------------------------------------------
       SAFETY
    ----------------------------------------------------- */

    btn(
      this,
      270,
      360,
      400,
      68,
      `🛡️ ${t("safety")}`,
      0xe5a52f,
      () => {

        this.showLesson(
          t("safetyLesson"),
          t("safetyFact")
        );

      },
      22
    );


    /* -----------------------------------------------------
       RANGER QUIZ
    ----------------------------------------------------- */

    btn(
      this,
      270,
      460,
      400,
      68,
      `🧠 ${t("quiz")}`,
      0xb86ac9,
      () => {

        fadeScene(
          this,
          "RangerQuiz"
        );

      },
      22
    );


    /* -----------------------------------------------------
       LITTLE RANGER
    ----------------------------------------------------- */

    character(
      this,
      "leo",
      270,
      620,
      180
    );


    /* -----------------------------------------------------
       LEARNING TIP
    ----------------------------------------------------- */

    const tip =
      this.add.graphics();

    tip.fillStyle(
      0xffffff,
      0.94
    );

    tip.fillRoundedRect(
      45,
      780,
      450,
      105,
      24
    );


    txt(
      this,
      270,
      815,
      `💡 ${t("learningTip")}`,
      18,
      "#49321f"
    );


    /* -----------------------------------------------------
       ASK LEO
    ----------------------------------------------------- */

   guideButton(
  this,
  270,
  735,
  t("leoLearn")
); 

    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      270,
      935,
      230,
      45,
      t("back"),
      0x3d83c5,
      () => {

        fadeScene(
          this,
          "Park"
        );

      },
      18
    );

  }


  /* -------------------------------------------------------
     SIMPLE LESSON POPUP
  ------------------------------------------------------- */

  showLesson(
    title,
    message
  ) {

    const group =
      this.add.group();


    const shade =
      this.add.rectangle(
        W / 2,
        H / 2,
        W,
        H,
        0x000000,
        0.45
      );

    group.add(
      shade
    );


    const panel =
      this.add.graphics();

    panel.fillStyle(
      0xffffff,
      1
    );

    panel.fillRoundedRect(
      45,
      300,
      450,
      330,
      28
    );

    group.add(
      panel
    );


    const heading =
      txt(
        this,
        270,
        365,
        title,
        25,
        "#49321f"
      );

    group.add(
      heading
    );


    const body =
      txt(
        this,
        270,
        460,
        message,
        19,
        "#49321f"
      );

    group.add(
      body
    );


    const close =
      btn(
        this,
        270,
        570,
        190,
        55,
        t("back"),
        0x3d83c5,
        () => {

          group.destroy(
            true
          );

        },
        19,
        group
      );

    group.add(
      close
    );

  }

}