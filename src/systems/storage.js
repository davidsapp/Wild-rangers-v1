// =========================================================
// WILD RANGERS ADVENTURE
// STORAGE SYSTEM
// =========================================================

import { OUTFIT_KEYS } from "../data/characters.js";

export function selectedLeoKey() {
  const chosen =
    Number(
      localStorage.getItem("wr_v1_outfit")
    ) || 0;

  return (
    OUTFIT_KEYS[chosen] ||
    "leoGreen"
  );
}