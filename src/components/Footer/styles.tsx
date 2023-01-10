import { ThemeUIStyleObject } from "theme-ui";

// TODO: Figure out media queries
const styles: Record<
  | "container"
  | "columnContainer"
  | "leftColumnContainer"
  | "rightColumnContainer"
  | "iconContainer"
  | "allRightsReserved"
  | "supportLinksContainer",
  ThemeUIStyleObject
> = {
  container: {
    alignContent: "center",
    justifyContent: "center",
    padding: [
      "20px 20px 100px 20px",
      "20px 20px 100px 20px",
      "80px 20px 100px 20px",
    ],
    background: "footer",
    width: "100%",
    minHeight: "560px",
    borderTop: "2px solid",
    borderColor: "white3",
  },
  columnContainer: {
    width: ["100%", "100%", "100%", "1200px"],
    alignItems: "center",
    justifyContent: ["center", "center", "center", "space-between"],
    flexDirection: ["column", "column", "column", "row"],
  },
  leftColumnContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "375px",
    maxWidth: "375px",
    width: "100%",
    marginBottom: ["20px", "20px", "20px", "0px"],
  },
  rightColumnContainer: {
    maxWidth: "550px",
    width: "100%",
    alignSelf: ["auto", "auto", "auto", "flex-start"],
    flexDirection: ["column", "column", "row"],
    justifyContent: "space-between",
    pt: ["0px", "0px", "0px", "10px"],
    ml: ["0px", "0px", "0px", "50px"],
    marginTop: ["20px", "20px", "20px", "0px"],
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
  supportLinksContainer: {
    flexDirection: "column",
    height: "200px",
    justifyContent: "space-between",
    alignSelf: "flex-start",
    display: ["none", "none", "flex"],
  },
  // linkText: {
  //   "&:hover": {
  //     textDecoration: "underline",
  //   },
  // },
};

export default styles;
