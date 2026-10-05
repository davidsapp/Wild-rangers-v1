// =========================================================
// WILD RANGERS ADVENTURE
// MISSION COMPLETE SCENE
// =========================================================

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
  saveProgress
} from "../systems/storage.js";
import {
  startAudio,
  soundWin
} from "../systems/audio.js";

import {
  txt,
  btn,
  fadeScene
} from "../helpers/ui.js";

import {
  character
} from "../helpers/character.js";

import {
  savannah
} from "../helpers/effects.js";


// =========================================================
// MISSION COMPLETE
// =========================================================

class Complete extends BaseScene {

  constructor() {
    super("Complete");
  }


  // =======================================================
  // INITIALIZE
  // =======================================================

  init(data) {

    this.mission =
      data?.mission ?? 0;

  }


  // =======================================================
  // CREATE
  // =======================================================

  create() {

    startAudio();

    savannah(this);


    /*
     * Only award the star once.
     *
     * Replaying a completed mission
     * will not increase the total again.
     */

    let completed =
  getCompleted();

let stars =
  getStars();


    if (
      !completed.includes(
        this.mission
      )
    ) {

      completed.push(
        this.mission
      );

      stars++;


     saveProgress(
  completed,
  stars
); 

    }


    // -----------------------------------------------------
    // WIN SOUND
    // -----------------------------------------------------

    soundWin();


    // -----------------------------------------------------
    // TITLE
    // -----------------------------------------------------

    txt(
      this,
      270,
      170,
      t("finish"),
      30,
      "#fff6c7"
    );


    // -----------------------------------------------------
    // TROPHY
    // -----------------------------------------------------

    const trophy =
      txt(
        this,
        270,
        285,
        "🏆",
        100
      );


    this.tweens.add({
      targets: trophy,
      scale: 1.15,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: "Sine.easeInOut"
    });


    // -----------------------------------------------------
    // CELEBRATION
    // -----------------------------------------------------

    this.celebrate();


    // -----------------------------------------------------
    // MISSION NAME
    // -----------------------------------------------------

    txt(
      this,
      270,
      405,
      t(
        "m" +
        (
          this.mission + 1
        )
      ),
      25
    );


    // -----------------------------------------------------
    // REWARD
    // -----------------------------------------------------

    txt(
      this,
      270,
      480,
      t("reward"),
      23
    );


    // -----------------------------------------------------
    // TOTAL STARS
    // -----------------------------------------------------

    const st =
      txt(
        this,
        270,
        540,
        `⭐ ${t("stars")}: ${stars}`,
        23
      );


    this.tweens.add({
      targets: st,
      scale: 1.08,
      duration: 600,
      yoyo: true,
      repeat: -1
    });


    // -----------------------------------------------------
    // LEO
    // -----------------------------------------------------

    character(
      this,
      "leo",
      270,
      655,
      210
    );


    // -----------------------------------------------------
    // CONTINUE
    // -----------------------------------------------------

    btn(
      this,
      270,
      775,
      340,
      70,
      t("continue"),
      0x35a85b,
      () =>
        fadeScene(
          this,
          "Missions"
        ),
      23
    );


    // -----------------------------------------------------
    // PARK / HUB
    // -----------------------------------------------------

    btn(
      this,
      270,
      865,
      250,
      58,
      t("hub"),
      0x3d83c5,
      () =>
        fadeScene(
          this,
          "Park"
        ),
      20
    );

  }


  // =======================================================
  // CELEBRATION PARTICLES
  // =======================================================

  celebrate() {

    [
      "⭐",
      "✨",
      "🎉",
      "🏆",
      "⭐",
      "✨",
      "🎊",
      "🌟",
      "⭐",
      "🎉"
    ].forEach(
      (e, i) => {

        const x =
          35 +
          Math.random() *
          470;


        const y =
          170 +
          Math.random() *
          600;


        const a =
          txt(
            this,
            x,
            y,
            e,
            25
          );


        a.setAlpha(0);


        this.tweens.add({

          targets: a,

          alpha: 1,

          y:
            y - 100,

          duration: 900,

          delay:
            i * 80,

          yoyo: true,

          ease:
            "Sine.easeOut",

          onComplete: () =>
            a.destroy()

        });

      }
    );

  }

}


// =========================================================
// EXPORT
// =========================================================

export default Complete;