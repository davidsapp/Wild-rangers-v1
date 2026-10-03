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

  /*
   * Real PNG character loader.
   *
   * The old version assumed every image had
   * perfect dimensions. This version protects
   * against missing textures and keeps the
   * character proportional.
   */

  if (!CHARACTERS[key]) {
    return null;
  }

  const texture =
    s.textures.get(key);

  if (
    !texture ||
    texture.key === "__MISSING"
  ) {
    console.warn(
      "Character texture missing:",
      key
    );

    return null;
  }

  const source =
    texture.getSourceImage();

  if (
    !source ||
    !source.width ||
    !source.height
  ) {
    console.warn(
      "Character image has invalid dimensions:",
      key
    );

    return null;
  }

  const im = s.add.image(
    x,
    y,
    key
  );

  /*
   * Scale by height while preserving
   * the original PNG aspect ratio.
   */

  const scale =
    height / source.height;

  im.setScale(scale);

  /*
   * Prevent an extremely wide image
   * from covering the whole screen.
   */

  const maxWidth = 300;

  if (im.displayWidth > maxWidth) {
    const widthScale =
      maxWidth / im.displayWidth;

    im.setScale(
      scale * widthScale
    );
  }

  /*
   * Gentle floating animation.
   */

  const baseY = y;

  s.tweens.add({
    targets: im,
    y: baseY - 5,
    duration:
      1400 + Math.random() * 400,
    yoyo: true,
    repeat: -1,
    ease: "Sine.easeInOut"
  });

  return im;
}