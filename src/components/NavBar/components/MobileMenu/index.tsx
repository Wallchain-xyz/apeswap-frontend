import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWallet";
import { AnimatePresence, motion } from "framer-motion";
import { Flex, Svg } from "components/uikit";
import { useState } from "react";
import { MenuButton } from "theme-ui";
import AccountLoggedInDisplay from "../AccountLoggedInDisplay";
import styles from "../styles";
import SubMenu from "./SubMenu";
import { getNavConfig } from "components/NavBar/config/chains";

const MobileMenu = () => {
  const { account, chainId } = useWeb3React();
  const [dropdownFlag, setDropdownFlag] = useState(false);

  return (
    <>
      <Flex sx={styles.container}>
        <Flex>
          <Svg icon="logo" width="38px" />
        </Flex>
        <Flex sx={{ alignItems: "center" }}>
          {account ? <AccountLoggedInDisplay /> : <ConnectWalletButton />}
          <MenuButton onClick={() => setDropdownFlag((prev) => !prev)} />
        </Flex>
      </Flex>
      <AnimatePresence>
        {dropdownFlag && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "fit-content" }}
            transition={{ opacity: { duration: 0.2 } }}
            exit={{ height: 0 }}
            sx={{
              position: "absolute",
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
    </>
  );
};

export default MobileMenu;
