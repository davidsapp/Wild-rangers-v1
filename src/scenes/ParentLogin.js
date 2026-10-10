/* =========================================================
   WILD RANGERS ADVENTURE
   PARENT LOGIN SCENE
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
  getParentPin,
  hasParentPin,
  setParentPin
} from "../systems/storage.js";

import {
  btn,
  txt,
  fadeScene
} from "../helpers/ui.js";


export default class ParentLogin
extends BaseScene {

  constructor() {
    super("ParentLogin");
  }


  create() {

    this.pin = "";
    this.parentPin = getParentPin();

    this.setupMode =
      !hasParentPin();

    this.setupStep = 1;
    this.firstPin = "";


    /* -----------------------------------------------------
       BACKGROUND
    ----------------------------------------------------- */

    if (
      this.textures.exists("savannah")
    ) {

      this.add
        .image(W / 2, H / 2, "savannah")
        .setDisplaySize(W, H);

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
      100,
      `🔒 ${t("parent")}`,
      31
    );


    this.instructionText = txt(
      this,
      W / 2,
      155,
      this.setupMode
        ? "Create a new 4-digit parent PIN"
        : t("parentPin"),
      20
    );


    /* -----------------------------------------------------
       PIN DISPLAY
    ----------------------------------------------------- */

    this.pinText = txt(
      this,
      W / 2,
      235,
      "",
      34,
      "#49321f"
    );

    this.updatePinDisplay();


    /* -----------------------------------------------------
       KEYPAD
    ----------------------------------------------------- */

    const numbers = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
      null, 0, "⌫"
    ];


    numbers.forEach((number, index) => {

      if (number === null) {
        return;
      }

      const column = index % 3;
      const row = Math.floor(index / 3);

      const x = 135 + column * 135;
      const y = 350 + row * 100;

      btn(
        this,
        x,
        y,
        105,
        70,
        String(number),
        number === "⌫"
          ? 0xc75c4a
          : 0x3d83c5,
        () => {

          if (number === "⌫") {

            this.pin = this.pin.slice(0, -1);
            this.updatePinDisplay();

            return;
          }

          if (this.pin.length >= 4) {
            return;
          }

          this.pin += String(number);
          this.updatePinDisplay();

          if (this.pin.length === 4) {
            this.checkPin();
          }

        },
        24
      );

    });


    /* -----------------------------------------------------
       ERROR MESSAGE
    ----------------------------------------------------- */

    this.errorText = txt(
      this,
      W / 2,
      765,
      "",
      18,
      "#c75c4a"
    );


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
        fadeScene(this, "Park");
      },
      20
    );

  }


  /* -------------------------------------------------------
     UPDATE PIN DISPLAY
  ------------------------------------------------------- */

  updatePinDisplay() {

    this.pinText.setText(
      "●".repeat(this.pin.length)
    );

  }


  /* -------------------------------------------------------
     RESET PIN ENTRY
  ------------------------------------------------------- */

  resetPinEntry() {

    this.pin = "";
    this.updatePinDisplay();

  }


  /* -------------------------------------------------------
     CHECK OR CREATE PIN
  ------------------------------------------------------- */

  checkPin() {

    if (this.setupMode) {

      if (this.setupStep === 1) {

        this.firstPin = this.pin;
        this.setupStep = 2;

        this.resetPinEntry();

        this.instructionText.setText(
          "Confirm your 4-digit PIN"
        );

        this.errorText.setText("");

        return;
      }

      if (this.pin !== this.firstPin) {

        this.errorText.setText(
          "PINs do not match. Try again."
        );

        this.firstPin = "";
        this.setupStep = 1;

        this.time.delayedCall(1200, () => {

          this.resetPinEntry();

          this.instructionText.setText(
            "Create a new 4-digit parent PIN"
          );

          this.errorText.setText("");

        });

        return;
      }

      setParentPin(this.pin);
      this.parentPin = this.pin;
      this.setupMode = false;

      fadeScene(
        this,
        "ParentDashboard"
      );

      return;
    }


    if (this.pin === this.parentPin) {

      fadeScene(
        this,
        "ParentDashboard"
      );

      return;
    }


    this.errorText.setText(
      t("wrongPin")
    );

    this.time.delayedCall(900, () => {

      this.resetPinEntry();
      this.errorText.setText("");

    });

  }

}