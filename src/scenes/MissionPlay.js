/* =========================================================
   WILD RANGERS ADVENTURE
   MISSION PLAY SCENE
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
  startAudio,
  soundCollect,
  soundCorrect,
  soundWrong,
  soundWin
} from "../systems/audio.js";
import {
  btn,
  txt,
  fadeScene,
  pulse
} from "../helpers/ui.js";

import {
  savannah,
  guideButton,
  leoGuide
} from "../helpers/effects.js";

import {
  character
} from "../helpers/character.js";


export default class MissionPlay
  extends BaseScene {

  constructor() {
    super("MissionPlay");
  }


  init(data) {

    this.idx =
      data?.idx ?? 0;

  }


  create() {

    startAudio();

    savannah(this);

    const n =
      this.idx + 1;


    txt(
      this,
      270,
      48,
      t("m" + n),
      27
    );


    character(
      this,
      "leo",
      95,
      205,
      145
    );


    txt(
      this,
      270,
      310,
      t("task" + n),
      21,
      "#fff6c7"
    );


    guideButton(
      this,
      420,
      205,
      t("leoHint" + n)
    );


    this.feedback =
      txt(
        this,
        270,
        835,
        "",
        20,
        "#fff6c7"
      );


    this.count = 0;

    this.finished = false;


    if (n === 3) {

      this.makeCountQuiz();

    } else if (n === 5) {

      this.makeOrderGame();

    } else if (n === 7) {

      this.makeAnimalWords();

    } else if (n === 9) {

      this.makeTracksQuiz();

    } else {

      this.makeTapGame(n);

    }


    btn(
      this,
      270,
      920,
      220,
      52,
      t("back"),
      0x3d83c5,
      () =>
        fadeScene(
          this,
          "Missions"
        ),
      19
    );

  }


  /* -------------------------------------------------------
     TAP GAMES
  ------------------------------------------------------- */

  makeTapGame(n) {

    let items = [];


    if (n === 1) {

      items = [
        ["🧢", t("hat")],
        ["🗺️", t("mapItem")],
        ["🏅", t("badge")]
      ];

    }


    if (n === 2) {

      items = [
        ["🍌", t("banana")],
        ["🍌", t("banana")],
        ["🍌", t("banana")]
      ];


      character(
        this,
        "mimi",
        400,
        450,
        190
      );

    }


    if (n === 4) {

      items = [
        ["🐾", t("lionClue")],
        ["🟡", t("lionClue")],
        ["🌳", t("lionClue")]
      ];


      character(
        this,
        "kimba",
        400,
        450,
        180
      );

    }


    if (n === 6) {

      items = [
        ["💧", t("water")],
        ["💧", t("water")],
        ["💧", t("water")]
      ];


      character(
        this,
        "tembo",
        400,
        450,
        190
      );

    }


    if (n === 8) {

      items = [
        ["🥫", t("rubbish")],
        ["🧴", t("rubbish")],
        ["🗑️", t("rubbish")]
      ];


      character(
        this,
        "bongo",
        400,
        450,
        180
      );

    }


    if (n === 10) {

      items = [
        ["🧢", t("rangerItem")],
        ["🗺️", t("rangerItem")],
        ["🏅", t("rangerItem")]
      ];

    }


    const spots = [
      {
        x: 105,
        y: 560
      },
      {
        x: 270,
        y: 650
      },
      {
        x: 435,
        y: 560
      }
    ];


    this.status =
      txt(
        this,
        270,
        770,
        `${t("collected")}: 0 / 3`,
        22
      );


    items.forEach(
      (item, i) => {

        const p =
          spots[i];


        const g =
          this.add.graphics();


        g.fillStyle(
          0xffffff,
          1
        );


        g.fillRoundedRect(
          p.x - 55,
          p.y - 55,
          110,
          110,
          18
        );


        txt(
          this,
          p.x,
          p.y - 8,
          item[0],
          42
        );


        txt(
          this,
          p.x,
          p.y + 35,
          item[1],
          13,
          "#315b35"
        );


        this.add
          .rectangle(
            p.x,
            p.y,
            110,
            110,
            0xffffff,
            0
          )
          .setInteractive({
            useHandCursor: true
          })
          .on(
            "pointerdown",
            () => {

              if (
                g.getData(
                  "found"
                ) ||
                this.finished
              ) {
                return;
              }


              startAudio();

              soundCollect();


              g.setData(
                "found",
                true
              );


              g.clear();


              g.fillStyle(
                0x65a84b,
                1
              );


              g.fillRoundedRect(
                p.x - 55,
                p.y - 55,
                110,
                110,
                18
              );


              txt(
                this,
                p.x,
                p.y,
                "✅",
                42
              );


              this.count++;


              this.status.setText(
                `${t("collected")}: ${this.count} / 3`
              );


              this.feedback.setText(
                t("great")
              );


              pulse(
                this,
                this.feedback
              );


              if (
                this.count === 3
              ) {

                this.win();

              }

            }
          );

      }
    );

  }


  /* -------------------------------------------------------
     MISSION 3
     ZEBRA COUNT
  ------------------------------------------------------- */

  makeCountQuiz() {

    character(
      this,
      "zara",
      270,
      445,
      230
    );


    txt(
      this,
      270,
      580,
      "🦓  🦓  🦓  🦓  🦓",
      38
    );


    Phaser.Utils.Array
      .Shuffle([
        3,
        4,
        5,
        6
      ])
      .forEach(
        (a, i) => {

          btn(
            this,
            145 +
              (i % 2) * 250,
            680 +
              Math.floor(
                i / 2
              ) * 90,
            180,
            65,
            String(a),
            0xe5a52f,
            () => {

              if (
                this.finished
              ) {
                return;
              }


              if (
                a === 5
              ) {

                soundCorrect();


                this.feedback.setText(
                  "⭐ " +
                    t("correct")
                );


                pulse(
                  this,
                  this.feedback
                );


                this.win();

              } else {

                soundWrong();


                this.feedback.setText(
                  "💡 " +
                    t("wrong")
                );


                leoGuide(
                  this,
                  t("leoTry")
                );

              }

            },
            28
          );

        }
      );

  }


  /* -------------------------------------------------------
     MISSION 5
     ORDER GAME
  ------------------------------------------------------- */

  makeOrderGame() {

    character(
      this,
      "tembo",
      270,
      270,
      170
    );


    let stones = [
      1,
      2,
      3,
      4
    ];


    Phaser.Utils.Array.Shuffle(
      stones
    );


    this.order = 1;


    this.status =
      txt(
        this,
        270,
        800,
        "0 / 4",
        22
      );


    stones.forEach(
      (num, i) => {

        const x =
          90 +
          (i % 2) * 350;


        const y =
          475 +
          Math.floor(
            i / 2
          ) * 150;


        const g =
          this.add.graphics();


        g.fillStyle(
          0xc2d0d0,
          1
        );


        g.fillEllipse(
          x,
          y,
          115,
          80
        );


        txt(
          this,
          x,
          y,
          String(num),
          28,
          "#315b35"
        );


        this.add
          .rectangle(
            x,
            y,
            120,
            90,
            0xffffff,
            0
          )
          .setInteractive()
          .on(
            "pointerdown",
            () => {

              if (
                this.finished
              ) {
                return;
              }


              startAudio();


              if (
                num === this.order
              ) {

                soundCorrect();


                this.order++;


                txt(
                  this,
                  x,
                  y,
                  "✓",
                  25,
                  "#315b35"
                );


                this.status.setText(
                  `${this.order - 1} / 4`
                );


                this.feedback.setText(
                  "⭐ " +
                    t("great")
                );


                if (
                  this.order === 5
                ) {

                  this.win();

                }

              } else {

                soundWrong();


                this.feedback.setText(
                  "💡 " +
                    t("wrong")
                );


                leoGuide(
                  this,
                  t("leoHint5")
                );

              }

            }
          );

      }
    );

  }


  /* -------------------------------------------------------
     MISSION 7
     ANIMAL WORDS
  ------------------------------------------------------- */

  makeAnimalWords() {

    character(
      this,
      "zara",
      270,
      400,
      180
    );


    txt(
      this,
      270,
      520,
      t("animalsWord"),
      22
    );


    Phaser.Utils.Array
      .Shuffle([
        {
          e: "🦓",
          name: t("zebra"),
          ok: true
        },
        {
          e: "🦁",
          name: t("lion"),
          ok: false
        },
        {
          e: "🐘",
          name: t("elephant"),
          ok: false
        }
      ])
      .forEach(
        (o, i) => {

          btn(
            this,
            270,
            610 +
              i * 90,
            300,
            70,
            `${o.e} ${o.name}`,
            0xe5a52f,
            () => {

              if (
                this.finished
              ) {
                return;
              }


              if (
                o.ok
              ) {

                soundCorrect();


                this.feedback.setText(
                  "⭐ " +
                    t("correct")
                );


                this.win();

              } else {

                soundWrong();


                this.feedback.setText(
                  "💡 " +
                    t("wrong")
                );


                leoGuide(
                  this,
                  t("leoHint7")
                );

              }

            },
            22
          );

        }
      );

  }


  /* -------------------------------------------------------
     MISSION 9
     TRACKS QUIZ
  ------------------------------------------------------- */

  makeTracksQuiz() {

    character(
      this,
      "kimba",
      270,
      385,
      170
    );


    txt(
      this,
      270,
      515,
      "🐾 🐾 🐾",
      42
    );


    txt(
      this,
      270,
      570,
      t("trackQuestion"),
      21
    );


    Phaser.Utils.Array
      .Shuffle([
        {
          e: "🦁",
          name: t("lion"),
          ok: true
        },
        {
          e: "🦓",
          name: t("zebra"),
          ok: false
        },
        {
          e: "🐘",
          name: t("elephant"),
          ok: false
        }
      ])
      .forEach(
        (o, i) => {

          btn(
            this,
            270,
            650 +
              i * 75,
            300,
            60,
            `${o.e} ${o.name}`,
            0xe5a52f,
            () => {

              if (
                this.finished
              ) {
                return;
              }


              if (
                o.ok
              ) {

                soundCorrect();


                this.feedback.setText(
                  "⭐ " +
                    t("correct")
                );


                this.win();

              } else {

                soundWrong();


                this.feedback.setText(
                  "💡 " +
                    t("wrong")
                );


                leoGuide(
                  this,
                  t("leoHint9")
                );

              }

            },
            22
          );

        }
      );

  }


  /* -------------------------------------------------------
     WIN
  ------------------------------------------------------- */

  win() {

    if (
      this.finished
    ) {
      return;
    }


    this.finished = true;


    soundWin();


    this.feedback.setText(
      "🎉 " +
        t("success") +
        " ⭐"
    );


    pulse(
      this,
      this.feedback
    );


    leoGuide(
      this,
      t("leoGreat")
    );


    this.time.delayedCall(
      1600,
      () => {

        fadeScene(
          this,
          "Complete",
          {
            mission: this.idx
          }
        );

      }
    );

  }

}