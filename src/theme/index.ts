import type { Theme } from "theme-ui";
import Colors from "./colors";

export const theme: Theme = {
  colors: { ...Colors },
  fonts: {
    body: "system-ui, sans-serif",
    heading: '"Avenir Next", sans-serif',
    monospace: "Menlo, monospace",
  },
  cards: {
    primary: {
      background: "skyblue",
      borderRadius: "10px",
      padding: "20px",
      display: "flex",
      flexDirection: "column",
    },
  },
  buttons: {
    primary: {
      cursor: "pointer",
      color: "background",
      bg: "primary",
      "&:hover": {
        bg: "text",
      },
    },
    secondary: {
      color: "background",
      bg: "secondary",
    },
  },
};
