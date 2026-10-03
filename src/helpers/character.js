// =========================================================
// WILD RANGERS ADVENTURE
// CHARACTER HELPER
// =========================================================

import { CHARACTERS } from "../config.js";
import { selectedLeoKey } from "../systems/storage.js";

export function character(
  s,
  key,
  x,
  y,
  height = 180
) {
  if (key === "leo") {
    key = selectedLeoKey();
  }

  const image = s.add.image(
    x,
    y,
    key
  );

  image.setOrigin(0.5);

  const texture =
    s.textures.get(key);

  if (
    texture &&
    texture.key === key
  ) {
    const source =
      texture.getSourceImage();

    if (
      source &&
      source.height
    ) {
      const scale =
        height /
        source.height;

      image.setScale(scale);
    }
  }

  return image;
}