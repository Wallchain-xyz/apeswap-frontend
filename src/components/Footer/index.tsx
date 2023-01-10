import { LangaugeDropdown } from "components/Langauge";
import NetworkSelector from "components/NetworkSelector";
import ThemeSwitcher from "components/ThemeSwitcher";
import { Button, Flex, Svg, Text } from "components/uikit";
import { useTranslation } from "contexts/Localization";
import CountUp from "react-countup";
import MobileDropdown from "./components/MobileDropdown";
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
          <Flex
            sx={{
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap",
              height: ["100px", "fit-content"],
            }}
          >
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
          <Flex>
            <Flex sx={{ alignItems: "center" }}>
              <Svg icon="banana_token" width={35} />
              <Text color="primaryBright" ml="7px" weight={600}>
                $
                <CountUp
                  start={0}
                  end={42.0}
                  decimals={2}
                  duration={1}
                  separator=","
                />
              </Text>
            </Flex>
            <Button size="sm" ml="20px">
              {t("Add Funds")}
            </Button>
          </Flex>
        </Flex>
        <Flex sx={styles.rightColumnContainer}>
          <Flex sx={styles.supportLinksContainer}>
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
          <Flex sx={styles.supportLinksContainer}>
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
          <Flex sx={styles.supportLinksContainer}>
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
          <MobileDropdown title="Support" items={SUPPORT_LINKS} />
          <MobileDropdown title="Engage" items={ENGAGE_LINKS} />
          <MobileDropdown title="Access" items={ACCESS_LINKS} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Footer;
