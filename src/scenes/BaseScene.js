// =========================================================
// WILD RANGERS ADVENTURE
// BASE SCENE
// =========================================================

import Phaser from "phaser";

import {
  CHARACTERS
} from "../config.js";

import {
  audioControl,
  startAmbient
} from "../systems/audio.js";

// ---------------------------------------------------------
// BASE SCENE
// ---------------------------------------------------------

export default class BaseScene
  extends Phaser.Scene {

  // -------------------------------------------------------
  // CHARACTER ASSETS
  // -------------------------------------------------------

  preload() {
    Object.entries(
      CHARACTERS
    ).forEach(([key, path]) => {

      if (
        !this.textures.exists(key)
      ) {
        this.load.image(
          key,
          path
        );
      }

    });
  }

  // -------------------------------------------------------
  // AUDIO
  // -------------------------------------------------------

  audio() {
    audioControl(this);
    startAmbient();
  }
}