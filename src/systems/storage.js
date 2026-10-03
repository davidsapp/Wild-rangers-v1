// =========================================================
// WILD RANGERS ADVENTURE
// STORAGE SYSTEM
// =========================================================

export function selectedLeoKey() {
  const chosen =
    Number(
      localStorage.getItem("wr_v1_outfit")
    ) || 0;

  return (
    [
      "leoGreen",
      "leoGolden",
      "leoBlue",
      "leoRed"
    ][chosen] || "leoGreen"
  );
}