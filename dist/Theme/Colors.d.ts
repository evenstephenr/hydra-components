/**
 * TODO:
 *
 * - Do we need to strongly type this?
 */
export declare const COLOR: {
    /** https://flatuicolors.com/palette/cn */
    GRAY: {
        100: string;
        200: string;
        300: string;
        400: string;
        500: string;
        600: string;
        700: string;
        800: string;
    };
    hexToRgb: (hex: string) => {
        r: number;
        g: number;
        b: number;
    } | null;
    asRGB: (color: string, id: string) => string;
};
