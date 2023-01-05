import { ThemeUIStyleObject } from "theme-ui";

const styles: Record<string, ThemeUIStyleObject> = {
  subMenuContainer: {
    position: "absolute",
    top: "100%",
    left: "0px",
    width: "429px",
    minHeight: "316px",
    backgroundColor: "navbar",
    borderRadius: "0px 0px 30px 30px",
    cursor: "default",
  },
  subMenuItem: {
    width: "fit-content",
    margin: "5px",
    cursor: "pointer",
    ":hover": { boxShadow: "0px 2px 0px 0px", color: "text" },
  },
};

export default styles;
