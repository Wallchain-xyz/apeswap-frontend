import useIsMobile from "hooks/useIsMobile";
import useMatchBreakpoints from "hooks/useMatchBreakpoints";
import DesktopMenu from "./components/DesktopMenu";
import MobileMenu from "./components/MobileMenu";

const NavBar = () => {
  const { isTablet } = useMatchBreakpoints();
  return isTablet ? <MobileMenu /> : <DesktopMenu />;
};

export default NavBar;
