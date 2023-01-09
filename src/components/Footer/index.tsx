import { LangaugeDropdown } from "components/Langauge";
import NetworkSelector from "components/NetworkSelector";
import ThemeSwitcher from "components/ThemeSwitcher";
import { Flex, Svg, Text } from "components/uikit";
import { useTranslation } from "contexts/Localization";
import {
  ACCESS_LINKS,
  ENGAGE_LINKS,
  SOCIAL_LINKS,
  SUPPORT_LINKS,
} from "./config";
import styles from "./styles";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Flex sx={styles.container}>
      <Flex sx={styles.columnContainer}>
        <Flex sx={styles.leftColumnContainer}>
          <Svg icon="fullLogo" width="240px" />
          <Text color="primaryBright">
            {t(
              `ApeSwap is a multichain DeFi Hub offering an accessible, transparent, and secure experience for everyone.`
            )}
          </Text>
          <Flex sx={{ justifyContent: "space-between", width: "100%", flexWrap: 'wrap' }}>
            <ThemeSwitcher />
            <NetworkSelector />
            <LangaugeDropdown />
          </Flex>
          <Flex
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {SOCIAL_LINKS.map(({ label, href }) => {
              return (
                <Flex sx={styles.iconContainer} key={label}>
                  <Svg icon={label} color="text" />
                </Flex>
              );
            })}
          </Flex>
          <Flex>asds</Flex>
        </Flex>
        <Flex sx={styles.rightColumnContainer}>
          <Flex
            sx={{
              flexDirection: "column",
              height: "200px",
              border: "1px solid red",
              justifyContent: "space-between",
            }}
          >
            <Text color="yellow" size="26px" weight={700}>
              {t("Support")}
            </Text>
            {SUPPORT_LINKS.map(({ label, href }) => {
              return (
                <Text color="primaryBright" key={label}>
                  {t(label)}
                </Text>
              );
            })}
          </Flex>
          <Flex
            sx={{
              flexDirection: "column",
              height: "200px",
              border: "1px solid red",
              justifyContent: "space-between",
            }}
          >
            <Text color="yellow" size="26px" weight={700}>
              {t("Engage")}
            </Text>
            {ENGAGE_LINKS.map(({ label, href }) => {
              return (
                <Text color="primaryBright" key={label}>
                  {t(label)}
                </Text>
              );
            })}
          </Flex>
          <Flex
            sx={{
              flexDirection: "column",
              height: "200px",
              border: "1px solid red",
              justifyContent: "space-between",
            }}
          >
            <Text color="yellow" size="26px" weight={700}>
              {t("Access")}
            </Text>
            {ACCESS_LINKS.map(({ label, href }) => {
              return (
                <Text color="primaryBright" key={label}>
                  {t(label)}
                </Text>
              );
            })}
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
