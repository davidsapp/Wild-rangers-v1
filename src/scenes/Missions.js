/* =========================================================
   WILD RANGERS ADVENTURE
   MISSIONS SCENE
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
  getStars,
  getCompleted
} from "../systems/storage.js";
import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";


export default class Missions extends Phaser.Scene {

  constructor() {
    super("Missions");
  }


  create() {
const stars =
  getStars();

const completed =
  getCompleted();
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
      50,
      t("map"),
      31
    );


    /* -----------------------------------------------------
       STAR COUNT
    ----------------------------------------------------- */

    txt(
      this,
      W / 2,
      95,
      `⭐ ${stars} ${t("stars")}`,
      21
    );


    /* -----------------------------------------------------
       MISSION BUTTONS
    ----------------------------------------------------- */

    for (
      let i = 0;
      i < 10;
      i++
    ) {

      const column =
        i % 2;

      const row =
        Math.floor(
          i / 2
        );


      const x =
        145 +
        column * 250;


      const y =
        190 +
        row * 125;


      const unlocked =
        i === 0 ||
        completed.includes(
          i - 1
        );


      const done =
        completed.includes(
          i
        );


      const icon =
        done
          ? "✅"
          : unlocked
            ? "🌟"
            : "🔒";


      const label =
        `${icon} ${i + 1}. ${t(
          "m" + (i + 1)
        )}`;


      const color =
        done
          ? 0x65a84b
          : unlocked
            ? 0xe5a52f
            : 0x78909c;


      btn(
        this,
        x,
        y,
        220,
        72,
        label,
        color,
        () => {

          if (
            unlocked
          ) {

            fadeScene(
              this,
              "MissionPlay",
              {
                idx: i
              }
            );

          } else {

            this.popup(
              t("locked")
            );

          }

        },
        17
      );

    }


    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      875,
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
     LOCKED MISSION POPUP
  ------------------------------------------------------- */

  popup(
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
      0x183d29,
      0.98
    );

    panel.fillRoundedRect(
      45,
      390,
      450,
      155,
      22
    );

    group.add(
      panel
    );


    const messageText =
      txt(
        this,
        W / 2,
        440,
        message,
        21,
        "#ffffff"
      );

    group.add(
      messageText
    );


    btn(
      this,
      W / 2,
      500,
      130,
      48,
      t("ok"),
      0x35a85b,
      () => {

        group.destroy(
          true
        );

      },
      18,
      group
    );

  }

}