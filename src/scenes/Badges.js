/* =========================================================
   WILD RANGERS ADVENTURE
   BADGES SCENE
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
  getStars,
  getCompleted,
  getQuizBestScore
} from "../systems/storage.js";

import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";

import {
  character
} from "../helpers/character.js";


export default class Badges extends BaseScene {

  constructor() {
    super("Badges");
  }


  create() {

    const stars = getStars();
    const completed = getCompleted();
    const quizBest = getQuizBestScore();

    // Check which badges have been earned.
    const mission1 = completed.includes(0);

    const missions2to4 =
      completed.includes(1) &&
      completed.includes(2) &&
      completed.includes(3);

    const fiveStars = stars >= 5;

    const quizChampion = quizBest >= 3;

    const mission8 = completed.includes(7);

    const allMissions = Array.from(
      { length: 10 },
      (_, index) => index
    ).every(index => completed.includes(index));


    /* -----------------------------------------------------
       BACKGROUND
    ----------------------------------------------------- */

    if (this.textures.exists("savannah")) {

      this.add
        .image(W / 2, H / 2, "savannah")
        .setDisplaySize(W, H);

    } else {

      this.add.rectangle(
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
      t("badgeBeginnerDesc"),
      mission1
    );

    this.badgeCard(
      395,
      275,
      "🦁",
      t("badgeExplorer"),
      t("badgeExplorerDesc"),
      missions2to4
    );

    this.badgeCard(
      145,
      475,
      "🌟",
      t("badgeStar"),
      t("badgeStarDesc"),
      fiveStars
    );

    this.badgeCard(
      395,
      475,
      "🧠",
      t("badgeQuiz"),
      t("badgeQuizDesc"),
      quizChampion
    );

    this.badgeCard(
      145,
      675,
      "🌿",
      t("badgeNature"),
      t("badgeNatureDesc"),
      mission8
    );

    this.badgeCard(
      395,
      675,
      "🏆",
      t("badgeRanger"),
      t("badgeRangerDesc"),
      allMissions
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
        fadeScene(this, "Park");
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
    description,
    earned
  ) {

    const card = this.add.graphics();

    // Green for earned badges, pale grey for locked badges.
    card.fillStyle(
      earned ? 0xd9f5c8 : 0xe4e4e4,
      0.96
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
      earned ? 0x388b35 : 0x777777,
      0.65
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
      earned ? emoji : "🔒",
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
      y + 35,
      description,
      12,
      "#49321f"
    );


    txt(
      this,
      x,
      y + 60,
      earned ? t("earned") : t("lockedBadge"),
      12,
      earned ? "#24752b" : "#666666"
    );

  }

}