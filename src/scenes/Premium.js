/* =========================================================
   WILD RANGERS ADVENTURE
   PREMIUM SCENE — EPISODE 1
========================================================= */

import Phaser from "phaser";
import BaseScene from "./BaseScene.js";

import { W, H } from "../config.js";
import { t } from "../systems/locale.js";
import { btn, txt, fadeScene } from "../helpers/ui.js";
import { character } from "../helpers/character.js";


export default class Premium extends BaseScene {

  constructor() {
    super("Premium");
  }

  create() {

    /* BACKGROUND */

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
        0x8a633f
      );

    }


    /* TITLE */

    txt(this, W / 2, 55, t("premiumTitle"), 30);

    txt(this, W / 2, 105, t("premium"), 20);

    txt(this, W / 2, 155, t("premiumText"), 19);


    /* LEO — KEEP EXISTING CHARACTER */

    character(this, "leo", W / 2, 290, 190);


    /* EPISODE 1 PANEL */

    const panel = this.add.graphics();

    panel.fillStyle(0xffffff, 0.94);

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
      t("episodeTitle"),
      21,
      "#49321f"
    );

    txt(
      this,
      W / 2,
      465,
      t("episodeDescription"),
      16,
      "#49321f"
    );


    /* INCLUDED FEATURES */

    const features = [
      "premium_f1",
      "premium_f2",
      "premium_f3",
      "premium_f4"
    ];

    features.forEach((key, index) => {

      txt(
        this,
        W / 2,
        510 + index * 32,
        `⭐ ${t(key)}`,
        15,
        "#49321f"
      );

    });


    /* ONE-TIME PURCHASE PRICE */

    txt(
      this,
      W / 2,
      680,
      t("episodePrice"),
      22,
      "#ffffff"
    );


    /* BUY EPISODE 1 — PAYMENT NOT CONNECTED */

    btn(
      this,
      W / 2,
      745,
      330,
      65,
      t("episodeBuy"),
      0x35a85b,
      () => {
        this.showPremiumMessage();
      },
      17
    );


    /* PAYMENT STATUS */

    txt(
      this,
      W / 2,
      815,
      t("episodePaymentPending"),
      13,
      "#ffffff"
    );


    /* BACK TO PARK */

    btn(
      this,
      W / 2,
      885,
      230,
      58,
      t("back"),
      0x183d29,
      () => {
        fadeScene(this, "Park");
      },
      20
    );

  }


  /* PAYMENT MESSAGE */

  showPremiumMessage() {

    const group = this.add.group();


    const shade = this.add.rectangle(
      W / 2,
      H / 2,
      W,
      H,
      0x000000,
      0.5
    );

    group.add(shade);


    const panel = this.add.graphics();

    panel.fillStyle(0xffffff, 1);

    panel.fillRoundedRect(
      45,
      350,
      450,
      250,
      28
    );

    group.add(panel);


    const message = txt(
      this,
      W / 2,
      440,
      t("episodePaymentPending"),
      18,
      "#49321f"
    );

    group.add(message);


    btn(
      this,
      W / 2,
      535,
      150,
      55,
      t("ok"),
      0x3d83c5,
      () => {
        group.destroy(true);
      },
      20,
      group
    );

  }

}