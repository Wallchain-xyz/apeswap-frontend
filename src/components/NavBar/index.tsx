import { ChainId } from "@ape.swap/sdk";
import { Flex, Svg, Text } from "components/uikit";
import { useTranslation } from "contexts/Localization";
import { useState } from "react";
import SubMenu from "./components/SubMenu";
import { configMappedToNetwork } from "./config/chains";
import styles from "./styles";

const NavBar = () => {
  const [hoverLabel, setHoverLabel] = useState<string>("");
  const { t } = useTranslation();
  return (
    <Flex sx={styles.container}>
      <Flex>
        <Svg icon="logo" width="38px" />
        <Flex sx={{ ml: "20px" }}>
          {configMappedToNetwork[ChainId.BSC]?.map(({ label, items }) => {
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
      <Flex>
        <Svg icon="logo" width="38px" />
      </Flex>
    </Flex>
  );
};

export default NavBar;
