/**
 * TODO:
 *
 * - Do we need to strongly type this?
 */
export const COLOR = {
  /** https://flatuicolors.com/palette/cn */
  GRAY: {
    100: "#ffffff",
    200: "#f1f2f6",
    300: "#dfe4ea",
    400: "#ced6e0",
    500: "#a4b0be",
    600: "#747d8c",
    700: "#57606f",
    800: "#2f3542",
  },
  hexToRgb: (hex: string): { r: number; g: number; b: number } | null => {
    //stackoverflow.com/a/5624139
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    // @ts-ignore
    hex = hex.replace(shorthandRegex, function (m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  },
  asRGB: (color: string, id: string) => {
    // @ts-ignore
    const hex = COLOR[color][id];
    const result = COLOR.hexToRgb(hex);
    if (!result) throw new Error("reference error, bad COLOR"); // lol?
    const { r, g, b } = result;
    return `${r}, ${g}, ${b}`;
  },
};
