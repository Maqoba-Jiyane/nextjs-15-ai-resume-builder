export function ptToPx(pt: number, dpi = 96) {
  return pt * (dpi / 72);
}
