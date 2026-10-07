import BaseScene from "./BaseScene.js";
import { txt, btn } from "../helpers/ui.js";
import { character } from "../helpers/character.js";
import { fadeScene, savannah } from "../helpers/effects.js";
import { t } from "../systems/locale.js";

export default class Wildlife extends BaseScene {
  constructor() {
    super("Wildlife");

    this.page = 0;
    this.animals = [];
    this.pageObjects = [];
    this.swipeStartX = 0;
    this.swipeStartY = 0;
  }

  create() {
    this.audio();
    savannah(this);

    this.page = 0;

    this.animals = [
      {
        key: "tembo",
        emoji: "🐘",
        name: t("temboName"),
        fact: t("factElephant")
      },
      {
        key: "kimba",
        emoji: "🦁",
        name: t("lionCub"),
        fact: t("factLion")
      },
      {
        key: "zuri",
        emoji: "🦒",
        name: t("giraffe"),
        fact: t("factGiraffe")
      },
      {
        key: "zara",
        emoji: "🦓",
        name: t("zaraName"),
        fact: t("factZebra")
      },
      {
        key: "chase",
        emoji: "🐆",
        name: t("cheetah"),
        fact: t("factCheetah")
      },
      {
        key: "bongo",
        emoji: "🦛",
        name: t("hippo"),
        fact: t("factHippo")
      }
    ];

    this.buildBook();
    this.setupSwipe();
  }

  buildBook() {
    this.pageObjects.forEach((obj) => {
      if (obj && !obj.destroyed) {
        obj.destroy();
      }
    });

    this.pageObjects = [];

    /*
     * BOOK HEADER
     */
    const title = txt(
      this,
      270,
      50,
      t("wildlife"),
      31,
      "#fff6c7"
    );

    const subtitle = txt(
      this,
      270,
      95,
      t("animalFriends"),
      20
    );

    const instruction = txt(
  this,
  270,
  130,
  t("wildlifeInstruction"),
  15,
  "#fff6c7"
);

    this.pageObjects.push(
      title,
      subtitle,
      instruction
    );

    /*
     * BOOK PAGE
     */
    const shadow = this.add.graphics();

    shadow.fillStyle(0x49321f, 0.35);
    shadow.fillRoundedRect(
      27,
      180,
      486,
      610,
      28
    );

    const page = this.add.graphics();

    page.fillStyle(0xfffdf2, 1);
    page.fillRoundedRect(
      25,
      175,
      490,
      610,
      28
    );

    /*
     * BOOK SPINE
     */
    const spine = this.add.graphics();

    spine.fillStyle(0xd7c79e, 1);
    spine.fillRoundedRect(
      38,
      190,
      12,
      580,
      6
    );

    /*
     * CURRENT ANIMAL
     */
    const animal = this.animals[this.page];

    const animalImage = character(
      this,
      animal.key,
      270,
      390,
      300
    );

    const animalName = txt(
      this,
      270,
      565,
      animal.name,
      26,
      "#315b35"
    );

    const emoji = txt(
      this,
      270,
      610,
      animal.emoji,
      42
    );

    const factLabel = txt(
      this,
      270,
      655,
      "🌿",
      25,
      "#d08b16"
    );

    const fact = txt(
      this,
      270,
      710,
      animal.fact,
      18,
      "#315b35"
    );

    /*
     * PAGE NUMBER
     */
    const pageNumber = txt(
      this,
      270,
      755,
      `${this.page + 1} / ${this.animals.length}`,
      16,
      "#777"
    );

    this.pageObjects.push(
      shadow,
      page,
      spine,
      animalImage,
      animalName,
      emoji,
      factLabel,
      fact,
      pageNumber
    );

    /*
     * PREVIOUS BUTTON
     */
    if (this.page > 0) {
      const previous = btn(
        this,
        105,
        845,
        150,
        55,
        "‹ " + t("previous"),
        0x3d83c5,
        () => {
          this.previousPage();
        },
        17
      );

      this.pageObjects.push(previous);
    }

    /*
     * NEXT BUTTON
     */
    if (this.page < this.animals.length - 1) {
      const next = btn(
        this,
        435,
        845,
        150,
        55,
        t("next") + " ›",
        0x35a85b,
        () => {
          this.nextPage();
        },
        17
      );

      this.pageObjects.push(next);
    }

    /*
     * BACK TO PARK
     */
        const back = btn(
      this,
      270,
      925,
      170,
      45,
      t("back"),
      0x3d83c5,
      () => {
        fadeScene(this, "Park");
      },
      16
    );

    // Keep BACK above all book/page objects
    back.setDepth(1000);

    if (back._buttonParts) {
      back._buttonParts.forEach((part) => {
        if (part && part.setDepth) {
          part.setDepth(1000);
        }
      });
    }
  }

  setupSwipe() {
    this.input.on(
      "pointerdown",
      (pointer) => {
        this.swipeStartX = pointer.x;
        this.swipeStartY = pointer.y;
      }
    );

    this.input.on(
      "pointerup",
      (pointer) => {
        const dx = pointer.x - this.swipeStartX;
        const dy = pointer.y - this.swipeStartY;

        /*
         * Ignore vertical scrolling-style movement.
         */
        if (Math.abs(dy) > 110) {
          return;
        }

        /*
         * Require a real horizontal swipe.
         */
        if (Math.abs(dx) < 60) {
          return;
        }

        if (dx < 0) {
          this.nextPage();
        } else {
          this.previousPage();
        }
      }
    );
  }

  nextPage() {
    if (this.page >= this.animals.length - 1) {
      return;
    }

    this.changePage(this.page + 1);
  }

  previousPage() {
    if (this.page <= 0) {
      return;
    }

    this.changePage(this.page - 1);
  }

  changePage(newPage) {
    if (newPage < 0 || newPage >= this.animals.length) {
      return;
    }

    if (this.page === newPage) {
      return;
    }

    this.page = newPage;

    this.pageObjects.forEach((obj) => {
      if (
        obj &&
        obj.scene &&
        !obj.destroyed
      ) {
        obj.setAlpha(0);
      }
    });

    this.buildBook();

    this.pageObjects.forEach((obj) => {
      if (
        obj &&
        obj.scene &&
        !obj.destroyed
      ) {
        obj.setAlpha(0);

        this.tweens.add({
          targets: obj,
          alpha: 1,
          duration: 220,
          ease: "Sine.easeOut"
        });
      }
    });
  }
}