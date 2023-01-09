import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWallet";
import { AnimatePresence, motion } from "framer-motion";
import { Flex, Svg } from "components/uikit";
import { useState } from "react";
import { MenuButton } from "theme-ui";
import AccountLoggedInDisplay from "../AccountLoggedInDisplay";
import styles, { NAV_HEIGHT, NAV_MOBILE_DISPLAY } from "../styles";
import SubMenu from "./SubMenu";
import { getNavConfig } from "components/NavBar/config/chains";

const MobileMenu = ({ dropdownFlag }: { dropdownFlag: boolean }) => {
  const { chainId } = useWeb3React();

  return (
    <Flex sx={{ display: NAV_MOBILE_DISPLAY}}>
      <AnimatePresence>
        {dropdownFlag && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{
              position: "absolute",
              top: NAV_HEIGHT,
              left: 0,
              height: "100px",
              width: "100%",
              overflow: "hidden",
              background: "white2",
            }}
          >
            {getNavConfig(chainId).map(({ label, items }) => {
              return <SubMenu label={label} menuItems={items} />;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  );
};

export default MobileMenu;
