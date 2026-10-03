/* =========================================================
   WILD RANGERS ADVENTURE
   PARENT DASHBOARD SCENE
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


export default class ParentDashboard extends Phaser.Scene {

  constructor() {
    super("ParentDashboard");
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
      `👨‍👩‍👧 ${t("parentDashboard")}`,
      29
    );


    txt(
      this,
      W / 2,
      112,
      t("parentDashboardSubtitle"),
      18
    );


    /* -----------------------------------------------------
       PROGRESS
    ----------------------------------------------------- */

    const completed =
      JSON.parse(
        localStorage.getItem(
          "wr_v1_completed"
        ) || "[]"
      );


    const stars =
      Number(
        localStorage.getItem(
          "wr_v1_stars"
        )
      ) || 0;


    const progressPanel =
      this.add.graphics();

    progressPanel.fillStyle(
      0xffffff,
      0.94
    );

    progressPanel.fillRoundedRect(
      45,
      165,
      450,
      190,
      25
    );


    txt(
      this,
      W / 2,
      205,
      `⭐ ${t("stars")}: ${stars}`,
      23,
      "#49321f"
    );


    txt(
      this,
      W / 2,
      255,
      `${t("completed")}: ${completed.length}`,
      21,
      "#49321f"
    );


    txt(
      this,
      W / 2,
      305,
      `${t("missions")}: ${completed.length} / 10`,
      20,
      "#49321f"
    );


    /* -----------------------------------------------------
       CHILD PROGRESS
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      425,
      390,
      70,
      `📊 ${t("progress")}`,
      0x35a85b,
      () => {

        this.showProgress(
          completed,
          stars
        );

      },
      21
    );


    /* -----------------------------------------------------
       CHANGE PIN
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      525,
      390,
      70,
      `🔐 ${t("changePin")}`,
      0x3d83c5,
      () => {

        this.changePin();

      },
      21
    );


    /* -----------------------------------------------------
       RESET PROGRESS
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      625,
      390,
      70,
      `♻️ ${t("resetProgress")}`,
      0xc75c4a,
      () => {

        this.resetProgress();

      },
      21
    );


    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      825,
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
     PROGRESS POPUP
  ------------------------------------------------------- */

  showProgress(
    completed,
    stars
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
      40,
      250,
      460,
      420,
      28
    );

    group.add(
      panel
    );


    const title =
      txt(
        this,
        W / 2,
        315,
        t("progress"),
        27,
        "#49321f"
      );

    group.add(
      title
    );


    const details =
      txt(
        this,
        W / 2,
        430,
        `${t("stars")}: ${stars}\n\n${t("completed")}: ${completed.length}\n\n${t("missions")}: ${completed.length} / 10`,
        21,
        "#49321f"
      );

    group.add(
      details
    );


    btn(
      this,
      W / 2,
      590,
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

  }


  /* -------------------------------------------------------
     CHANGE PIN
  ------------------------------------------------------- */

  changePin() {

    const newPin =
      window.prompt(
        t("enterNewPin")
      );


    if (
      newPin === null
    ) {
      return;
    }


    if (
      !/^\d{4}$/.test(
        newPin
      )
    ) {

      window.alert(
        t("pinMustBeFour")
      );

      return;

    }


    localStorage.setItem(
      "wr_v1_parent_pin",
      newPin
    );


    window.alert(
      t("pinChanged")
    );

  }


  /* -------------------------------------------------------
     RESET PROGRESS
  ------------------------------------------------------- */

  resetProgress() {

    const confirmed =
      window.confirm(
        t("confirmReset")
      );


    if (
      !confirmed
    ) {
      return;
    }


    localStorage.setItem(
      "wr_v1_stars",
      "0"
    );


    localStorage.setItem(
      "wr_v1_completed",
      "[]"
    );


    window.alert(
      t("progressReset")
    );


    this.scene.restart();

  }

}