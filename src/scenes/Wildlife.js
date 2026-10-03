/* =========================================================
   WILD RANGERS ADVENTURE
   WILDLIFE BOOK SCENE
========================================================= */

import Phaser from "phaser";

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
  character
} from "../helpers/character.js";


export default class Wildlife extends Phaser.Scene {

  constructor() {
    super("Wildlife");
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
      65,
      t("wildlife"),
      31
    );

    txt(
      this,
      270,
      112,
      t("wildlifeSubtitle"),
      19
    );


    /* -----------------------------------------------------
       WILDLIFE CARDS
    ----------------------------------------------------- */

    this.animalCard(
      145,
      220,
      "🐘",
      t("elephant"),
      t("elephantFact")
    );

    this.animalCard(
      395,
      220,
      "🦁",
      t("lion"),
      t("lionFact")
    );

    this.animalCard(
      145,
      450,
      "🦒",
      t("giraffe"),
      t("giraffeFact")
    );

    this.animalCard(
      395,
      450,
      "🦓",
      t("zebra"),
      t("zebraFact")
    );

    this.animalCard(
      145,
      680,
      "🐆",
      t("cheetah"),
      t("cheetahFact")
    );

    this.animalCard(
      395,
      680,
      "🦛",
      t("hippo"),
      t("hippoFact")
    );


    /* -----------------------------------------------------
       LITTLE RANGER
    ----------------------------------------------------- */

    character(
      this,
      "leo",
      270,
      805,
      130
    );


    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      270,
      925,
      230,
      55,
      t("back"),
      0x3d83c5,
      () => {

        fadeScene(
          this,
          "Park"
        );

      },
      20
    );

  }


  /* -------------------------------------------------------
     ANIMAL CARD
  ------------------------------------------------------- */

  animalCard(
    x,
    y,
    emoji,
    name,
    fact
  ) {

    const card =
      this.add.graphics();

    card.fillStyle(
      0xffffff,
      0.94
    );

    card.fillRoundedRect(
      x - 110,
      y - 80,
      220,
      160,
      24
    );


    card.lineStyle(
      3,
      0x49321f,
      0.25
    );

    card.strokeRoundedRect(
      x - 110,
      y - 80,
      220,
      160,
      24
    );


    txt(
      this,
      x,
      y - 43,
      emoji,
      38
    );


    txt(
      this,
      x,
      y + 2,
      name,
      21,
      "#49321f"
    );


    txt(
      this,
      x,
      y + 43,
      fact,
      14,
      "#49321f"
    );

  }

}