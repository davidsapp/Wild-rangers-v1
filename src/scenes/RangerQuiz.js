/* =========================================================
   WILD RANGERS ADVENTURE
   RANGER QUIZ SCENE
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
  saveQuizBestScore
} from "../systems/storage.js";
export default class RangerQuiz
extends BaseScene {

  constructor() {
    super("RangerQuiz");
  }


  create() {

    /* -----------------------------------------------------
       QUIZ STATE
    ----------------------------------------------------- */

    this.score = 0;
    this.currentQuestion = 0;

    this.questionGroup =
      this.add.group();

    this.resultGroup = null;


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
       QUIZ DATA
    ----------------------------------------------------- */

    this.quizData = [
      {
        question: t("quizQ1"),

        answers: [
          t("quizQ1A"),
          t("quizQ1B"),
          t("quizQ1C")
        ],

        correct: 0
      },

      {
        question: t("quizQ2"),

        answers: [
          t("quizQ2A"),
          t("quizQ2B"),
          t("quizQ2C")
        ],

        correct: 1
      },

      {
        question: t("quizQ3"),

        answers: [
          t("quizQ3A"),
          t("quizQ3B"),
          t("quizQ3C")
        ],

        correct: 0
      }
    ];


    /* -----------------------------------------------------
       TITLE
    ----------------------------------------------------- */

    txt(
      this,
      W / 2,
      65,
      t("quizTitle"),
      31
    );


    txt(
      this,
      W / 2,
      112,
      t("quizSubtitle"),
      19
    );


    /* -----------------------------------------------------
       QUESTION
    ----------------------------------------------------- */

    this.showQuestion();

  }


  /* -------------------------------------------------------
     SHOW QUESTION
  ------------------------------------------------------- */

  showQuestion() {

    this.questionGroup.clear(
      true,
      true
    );


    const data =
      this.quizData[
        this.currentQuestion
      ];


    /* -----------------------------------------------------
       PROGRESS
    ----------------------------------------------------- */

    const progress =
      txt(
        this,
        W / 2,
        165,
        `${this.currentQuestion + 1} / ${this.quizData.length}`,
        18
      );

    this.questionGroup.add(
      progress
    );


    /* -----------------------------------------------------
       QUESTION PANEL
    ----------------------------------------------------- */

    const panel =
      this.add.graphics();

    panel.fillStyle(
      0xffffff,
      0.95
    );

    panel.fillRoundedRect(
      40,
      205,
      460,
      155,
      25
    );

    this.questionGroup.add(
      panel
    );


    const question =
      txt(
        this,
        W / 2,
        280,
        data.question,
        24,
        "#49321f"
      );

    this.questionGroup.add(
      question
    );


    /* -----------------------------------------------------
       ANSWER BUTTONS
    ----------------------------------------------------- */

    data.answers.forEach(
      (answer, index) => {

        const y =
          450 + index * 105;


        btn(
          this,
          W / 2,
          y,
          390,
          72,
          answer,
          index === 0
            ? 0x35a85b
            : index === 1
              ? 0x3d83c5
              : 0xe5a52f,
          () => {

            this.answer(
              index
            );

          },
          20,
          this.questionGroup
        );

      }
    );


    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      835,
      220,
      55,
      t("back"),
      0x3d83c5,
      () => {

        fadeScene(
          this,
          "Learning"
        );

      },
      19,
      this.questionGroup
    );

  }


  /* -------------------------------------------------------
     ANSWER
  ------------------------------------------------------- */

  answer(
    selected
  ) {

    const data =
      this.quizData[
        this.currentQuestion
      ];


    if (
      selected ===
      data.correct
    ) {

      this.score++;

    }


    this.currentQuestion++;


    if (
      this.currentQuestion >=
      this.quizData.length
    ) {

      this.showResult();

      return;

    }


    this.showQuestion();

  }


  /* -------------------------------------------------------
     RESULT
  ------------------------------------------------------- */

  showResult() {
    saveQuizBestScore(
      this.score
    );
    this.questionGroup.clear(
      true,
      true
    );


    this.resultGroup =
      this.add.group();


    /* -----------------------------------------------------
       RESULT PANEL
    ----------------------------------------------------- */

    const panel =
      this.add.graphics();

    panel.fillStyle(
      0x183d29,
      0.96
    );

    panel.fillRoundedRect(
      45,
      245,
      450,
      410,
      30
    );

    this.resultGroup.add(
      panel
    );


    /* -----------------------------------------------------
       RESULT TITLE
    ----------------------------------------------------- */

    const title =
      txt(
        this,
        W / 2,
        325,
        t("quizGreat"),
        30,
        "#f6d66b"
      );

    this.resultGroup.add(
      title
    );


    /* -----------------------------------------------------
       SCORE
    ----------------------------------------------------- */

    const scoreText =
      t("quizScore")
        .replace(
          "{score}",
          this.score
        )
        .replace(
          "{total}",
          this.quizData.length
        );


    const score =
      txt(
        this,
        W / 2,
        410,
        scoreText,
        25
      );

    this.resultGroup.add(
      score
    );


    /* -----------------------------------------------------
       MESSAGE
    ----------------------------------------------------- */

    const message =
      txt(
        this,
        W / 2,
        480,
        t("quizKeepLearning"),
        19
      );

    this.resultGroup.add(
      message
    );


    /* -----------------------------------------------------
       PLAY AGAIN
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      555,
      300,
      65,
      t("quizPlayAgain"),
      0x2c9b58,
      () => {

        this.score = 0;
        this.currentQuestion = 0;

        this.resultGroup.clear(
          true,
          true
        );

        this.resultGroup = null;

        this.showQuestion();

      },
      20,
      this.resultGroup
    );


    /* -----------------------------------------------------
       BACK
    ----------------------------------------------------- */

    btn(
      this,
      W / 2,
      635,
      220,
      52,
      t("back"),
      0x3d83c5,
      () => {

        fadeScene(
          this,
          "Learning"
        );

      },
      18,
      this.resultGroup
    );

  }

}