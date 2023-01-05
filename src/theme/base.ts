import { MediaQueries } from "./types";

export const breakpointMap: { [key: string]: number } = {
  xs: 370,
  sm: 576,
  md: 852,
  lg: 968,
  xl: 1080,
  xxl: 1200,
};

const mediaQueries: MediaQueries = {
  xs: `@media screen and (min-width: ${breakpointMap.xs}px)`,
  sm: `@media screen and (min-width: ${breakpointMap.sm}px)`,
  md: `@media screen and (min-width: ${breakpointMap.md}px)`,
  lg: `@media screen and (min-width: ${breakpointMap.lg}px)`,
  xl: `@media screen and (min-width: ${breakpointMap.xl}px)`,
  xxl: `@media screen and (min-width: ${breakpointMap.xxl}px)`,
  nav: `@media screen and (min-width: ${breakpointMap.lg}px)`,
};

const baseTheme = {
  initialColorModeName: "light",
  breakpoints: [
    `${breakpointMap.xs}px`,
    `${breakpointMap.sm}px`,
    `${breakpointMap.md}px`,
    `${breakpointMap.lg}px`,
    `${breakpointMap.xl}px`,
  ],
  space: [0, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 48, 64],
  fontSizes: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 48, 64],
  borderWidths: [
    0, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 48, 64,
  ],
  mediaQueries,
  fontWeights: {
    light: 400,
    normal: 600,
    bold: 700,
  },
  fonts: {
    body: "Poppins,sans-serif;",
    titan: "Titan One",
    poppins: "Poppins",
  },
  radii: {
    small: "4px",
    default: "16px",
    normal: "10px",
    card: "32px",
    circle: "50%",
  },
  zIndices: { dropdown: 10, modal: 100 },
  styles: {
    root: {
      fontFamily: "body",
      lineHeight: "body",
      fontWeight: "light",
      letterSpacing: '.45px',
      color: "text",
      bg: "background",
    },
    a: {
      color: "primary",
      textDecoration: "none",
      ":hover": {
        color: "secondary",
        textDecoration: "underline",
      },
    },
    nav: {
      breakpoints: [`@media screen and (min-width: ${breakpointMap.lg}px)`],
    },
    progress: {
      primary: "primary",
      color: "green",
      background: "#DAA628",
      height: "20px",
    },
    hr: {
      background: "dividerColor",
      height: "1px",
      border: "none",
    },
    h1: {
      variant: "text.heading",
      fontSize: "30px",
      lineHeight: "45px",
    },
    h2: {
      variant: "text.heading",
      fontSize: "25px",
      lineHeight: "37px",
    },
    h3: {
      variant: "text.heading",
      fontSize: "22px",
      lineHeight: "33px",
    },
    h4: {
      variant: "text.heading",
      fontSize: "20px",
      lineHeight: "30px",
    },
    h5: {
      variant: "text.heading",
      fontSize: "16px",
      lineHeight: "24px",
    },
    banner: {
      variant: "text.heading",
      fontWeight: "800",
      fontSize: "60px",
      lineHeight: "66px",
    },
  },
};

export default baseTheme;
