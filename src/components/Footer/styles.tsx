import { ThemeUIStyleObject } from "theme-ui";

// TODO: Figure out media queries
const styles: Record<
  | "container"
  | "columnContainer"
  | "leftColumnContainer"
  | "rightColumnContainer"
  | "iconContainer"
  | "allRightsReserved",
  ThemeUIStyleObject
> = {
  container: {
    alignContent: "center",
    justifyContent: "center",
    border: "1px solid red",
    padding: "80px 10px 100px 10px",
    background: "footer",
    width: "100%",
    minHeight: "560px",
  },
  columnContainer: {
    width: "1200px",
    justifyContent: "space-between",
    border: "1px solid red",
    "@media screen and (max-width: 780px)": {
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      width: "100%",
    },
  },
  leftColumnContainer: {
    flexDirection: "column",
    border: "1px solid red",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: ["475px", "375px", "375px"],
    maxWidth: "375px",
    width: "100%",
  },
  rightColumnContainer: {
    border: "1px solid red",
    maxWidth: "550px",
    width: '100%',
    justifyContent: "space-between",
  },
  iconContainer: {
    height: "42.5px",
    width: "42.5px",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "10px",
    background: "white2",
    cursor: "pointer",
    "&:hover": {
      opacity: 0.8,
    },
  },
  allRightsReserved: {
    color: "primaryBright",
    position: "absolute",
    bottom: ["10px", "20px"],
    left: ["20px", "auto"],
  },
  // linkText: {
  //   "&:hover": {
  //     textDecoration: "underline",
  //   },
  // },
};

export default styles;
