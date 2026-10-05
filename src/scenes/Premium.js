/* =========================================================
   WILD RANGERS ADVENTURE
   PREMIUM SCENE
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
  character
} from "../helpers/character.js";


export default class Premium extends
BaseScene {

  constructor() {
    super("Premium");
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
          0x8a633f
        );

    }


    /* -----------------------------------------------------
       TITLE
    ----------------------------------------------------- */

    txt(
      this,
      W / 2,
      55,
      t("premiumTitle"),
      30
    );


    txt(
      this,
      W / 2,
      105,
      t("premium"),
      20
    );


    /* -----------------------------------------------------
       LEAD TEXT
    ----------------------------------------------------- */

    txt(
      this,
      W / 2,
      155,
      t("premiumText"),
      19
    );


    /* -----------------------------------------------------
       LEO
    ----------------------------------------------------- */

    character(
      this,
      "leo",
      W / 2,
      290,
      190
    );


    /* -----------------------------------------------------
       PLUS FEATURES
    ----------------------------------------------------- */

    const panel =
      this.add.graphics();

    panel.fillStyle(
      0xffffff,
      0.94
    );

    panel.fillRoundedRect(
      40,
      390,
      460,
      250,
      26
    );


    txt(
      this,
      W / 2,
      425,
      t("plusPlan"),
      23,
      "#49321f"
    );


    const features = [
      "premium_f1",
      "premium_f2",
      "premium_f3",
      "premium_f4"
    ];


    features.forEach(
      (key, index) => {

        txt(
          this,
          W / 2,
          475 + index * 42,
          `⭐ ${t(key)}`,
          16,
          "#49321f"
        );

      }
    );


    /* -----------------------------------------------------
       MONTHLY PLAN
    ----------------------------------------------------- */

    btn(
      this,
      160,
      710,
      215,
      65,
      `${t("monthly")}\n${t("monthlyPrice")}`,
      0x35a85b,
      () => {

        this.showPremiumMessage();

      },
      16
    );


    /* -----------------------------------------------------
       YEARLY PLAN
    ----------------------------------------------------- */

    btn(
      this,
      380,
      710,
      215,
      65,
      `${t("yearly")}\n${t("yearlyPrice")}`,
      0xe5a52f,
      () => {

        this.showPremiumMessage();

      },
      16
    );


    /* -----------------------------------------------------
       FREE PLAN
    ----------------------------------------------------- */

    txt(
      this,
      W / 2,
      790,
      t("freePlan"),
      17,
      "#ffffff"
    );


    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      885,
      230,
      58,
      t("back"),
      0x183d29,
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
     PREMIUM MESSAGE
  ------------------------------------------------------- */

  showPremiumMessage() {

    const group =
      this.add.group();


    const shade =
      this.add.rectangle(
        W / 2,
        H / 2,
        W,
        H,
        0x000000,
        0.5
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
      350,
      450,
      250,
      28
    );

    group.add(
      panel
    );


    const message =
      txt(
        this,
        W / 2,
        440,
        t("premiumSoon"),
        21,
        "#49321f"
      );

    group.add(
      message
    );


    btn(
      this,
      W / 2,
      535,
      150,
      55,
      t("ok"),
      0x3d83c5,
      () => {

        group.destroy(
          true
        );

      },
      20,
      group
    );

  }

}