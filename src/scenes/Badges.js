/* =========================================================
   WILD RANGERS ADVENTURE
   BADGES SCENE
========================================================= */

import Phaser from "phaser";

import {
  W,
  H
} from "../config.js";

import {
  t,
  stars
} from "../systems/locale.js";

import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";

import {
  character
} from "../helpers/character.js";


export default class Badges extends Phaser.Scene {

  constructor() {
    super("Badges");
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
      W / 2,
      65,
      t("badges"),
      31
    );


    txt(
      this,
      W / 2,
      112,
      t("badgesSubtitle"),
      19
    );


    /* -----------------------------------------------------
       STAR TOTAL
    ----------------------------------------------------- */

    txt(
      this,
      W / 2,
      165,
      `⭐ ${t("stars")}: ${stars}`,
      22
    );


    /* -----------------------------------------------------
       BADGE CARDS
    ----------------------------------------------------- */

    this.badgeCard(
      145,
      275,
      "🌱",
      t("badgeBeginner"),
      t("badgeBeginnerDesc")
    );


    this.badgeCard(
      395,
      275,
      "🦁",
      t("badgeExplorer"),
      t("badgeExplorerDesc")
    );


    this.badgeCard(
      145,
      475,
      "🌟",
      t("badgeStar"),
      t("badgeStarDesc")
    );


    this.badgeCard(
      395,
      475,
      "🧠",
      t("badgeQuiz"),
      t("badgeQuizDesc")
    );


    this.badgeCard(
      145,
      675,
      "🌿",
      t("badgeNature"),
      t("badgeNatureDesc")
    );


    this.badgeCard(
      395,
      675,
      "🏆",
      t("badgeRanger"),
      t("badgeRangerDesc")
    );


    /* -----------------------------------------------------
       LITTLE RANGER
    ----------------------------------------------------- */

    character(
      this,
      "leo",
      270,
      805,
      120
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
     BADGE CARD
  ------------------------------------------------------- */

  badgeCard(
    x,
    y,
    emoji,
    name,
    description
  ) {

    const card =
      this.add.graphics();

    card.fillStyle(
      0xffffff,
      0.94
    );

    card.fillRoundedRect(
      x - 110,
      y - 75,
      220,
      150,
      24
    );


    card.lineStyle(
      3,
      0x49321f,
      0.25
    );

    card.strokeRoundedRect(
      x - 110,
      y - 75,
      220,
      150,
      24
    );


    txt(
      this,
      x,
      y - 42,
      emoji,
      36
    );


    txt(
      this,
      x,
      y + 2,
      name,
      19,
      "#49321f"
    );


    txt(
      this,
      x,
      y + 38,
      description,
      13,
      "#49321f"
    );

  }

}