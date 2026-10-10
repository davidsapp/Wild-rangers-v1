// =========================================================
// WILD RANGERS ADVENTURE
// STORAGE SYSTEM
// =========================================================

import {
  OUTFIT_KEYS
} from "../data/characters.js";

// ---------------------------------------------------------
// STARS
// ---------------------------------------------------------

export function getStars() {
  return (
    Number(
      localStorage.getItem(
        "wr_v1_stars"
      )
    ) || 0
  );
}

// ---------------------------------------------------------
// COMPLETED MISSIONS
// ---------------------------------------------------------

export function getCompleted() {
  try {
    return JSON.parse(
      localStorage.getItem(
        "wr_v1_completed"
      ) || "[]"
    );
  } catch (e) {
    return [];
  }
}

// ---------------------------------------------------------
// SAVE PROGRESS
// ---------------------------------------------------------

export function saveProgress(
  completed,
  stars
) {
  localStorage.setItem(
    "wr_v1_completed",
    JSON.stringify(completed)
  );

  localStorage.setItem(
    "wr_v1_stars",
    String(stars)
  );
}

// ---------------------------------------------------------
// PARENT PIN
// ---------------------------------------------------------

export function getParentPin() {
  return (
    localStorage.getItem(
      "wr_v1_parent_pin"
    ) || "1234"
  );
}

export function setParentPin(pin) {
  localStorage.setItem(
    "wr_v1_parent_pin",
    String(pin)
  );
}

// ---------------------------------------------------------
// OUTFIT
// ---------------------------------------------------------

export function getOutfitIndex() {
  return (
    Number(
      localStorage.getItem(
        "wr_v1_outfit"
      )
    ) || 0
  );
}
export function setOutfitIndex(index) {
  localStorage.setItem(
    "wr_v1_outfit",
    String(index)
  );
}
// ---------------------------------------------------------
// SELECTED LEO
// ---------------------------------------------------------

export function selectedLeoKey() {
  const chosen =
    getOutfitIndex();

  return (
    OUTFIT_KEYS[chosen] ||
    "leoGreen"
  );
}

/* ---------------------------------------------------------
   RANGER QUIZ BADGE PROGRESS
--------------------------------------------------------- */

export function getQuizBestScore() {
  return (
    Number(
      localStorage.getItem(
        "wr_v1_quiz_best"
      )
    ) || 0
  );
}

export function saveQuizBestScore(score) {
  const previous =
    getQuizBestScore();

  const next =
    Math.max(
      previous,
      Number(score) || 0
    );

  localStorage.setItem(
    "wr_v1_quiz_best",
    String(next)
  );

  return next;
}
