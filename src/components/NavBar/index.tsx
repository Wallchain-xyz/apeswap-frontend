import useMatchBreakpoints from "hooks/useMatchBreakpoints";
import { useEffect, useState } from "react";
import DesktopMenu from "./components/DesktopMenu";
import MobileMenu from "./components/MobileMenu";

// TODO: Make sure navbar has no jump to it. Figure out a way to display component based on css media rather than hook
const NavBar = () => {
  const [mounted, setMounted] = useState(false);
  const { isTablet, isMobile } = useMatchBreakpoints();
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted && (isMobile || isTablet) ? <MobileMenu /> : <DesktopMenu />;
};

export default NavBar;
