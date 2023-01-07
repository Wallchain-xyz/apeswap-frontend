import { ChainId } from "@ape.swap/sdk";
import { useWeb3React } from "@web3-react/core";
import ConnectWalletButton from "components/ConnectWallet";
import { LangSelectorButton } from "components/Langauge";
import Moonpay from "components/Moonpay";
import NetworkSelector from "components/NetworkSelector";
import { Flex, Svg, Text } from "components/uikit";
import { useTranslation } from "contexts/Localization";
import useModal from "hooks/useModal";
import { useState } from "react";
import AccountModal from "./components/AccountModal";
import SubMenu from "./components/SubMenu";
import { getNavConfig } from "./config/chains";
import styles from "./styles";

const NavBar = () => {
  const { chainId, account } = useWeb3React();
  const [hoverLabel, setHoverLabel] = useState<string>("");
  const { t } = useTranslation();
  const [onPresentAccountModal] = useModal(
    <AccountModal onDismiss={() => null} />
  );
  return (
    <Flex sx={styles.container}>
      <Flex>
        <Svg icon="logo" width="38px" />
        <Flex sx={{ ml: "20px" }}>
          {getNavConfig(chainId).map(({ label, items }) => {
            return (
              <Flex
                key={label}
                onMouseEnter={() => setHoverLabel(label)}
                onFocus={() => setHoverLabel(label)}
                onMouseLeave={() => setHoverLabel("")}
                sx={{
                  ...styles.menuItemContainer,
                  ":hover": {
                    boxShadow: !items && `0px 2px 0px 0px`,
                    color: "text",
                  },
                }}
              >
                <Text weight={700}>{t(label)}</Text>
                {hoverLabel === label && items && (
                  <SubMenu label={label} menuItems={items} />
                )}
              </Flex>
            );
          })}
        </Flex>
      </Flex>
      <Flex sx={{ alignItems: "center" }}>
        <LangSelectorButton />
        <Moonpay />
        <NetworkSelector />
        {account ? (
          <Flex variant="flex.navContainer" onClick={onPresentAccountModal}>
            {account.slice(0, 4).toUpperCase()}...
            {account.slice(account.length - 4, account.length).toUpperCase()}
          </Flex>
        ) : (
          <ConnectWalletButton />
        )}
      </Flex>
    </Flex>
  );
};

export default NavBar;
