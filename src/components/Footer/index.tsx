import ThemeSwitcher from "components/ThemeSwitcher";
import { Flex, Svg, Text } from "components/uikit";
import styles from "./styles";

const Footer = () => {
  const t = (s: string) => s;
  return (
    <Flex sx={styles.container}>
      <Flex sx={styles.leftColumnContainer}>
        <Svg icon="fullLogo" width="240px" />
        <Text color="primaryBright">
          {t(
            `ApeSwap is a multichain DeFi Hub offering an accessible, transparent, and secure experience for everyone.`
          )}
        </Text>
        <Flex
          sx={{
            width: "100%",
            justifyContent: "space-between",
            alignitems: "center",
          }}
        >
          <Flex sx={styles.iconContainer}>
            <Svg icon="twitter" color="text" />
          </Flex>
          <Flex sx={styles.iconContainer}>
            <Svg icon="medium" color="text" />
          </Flex>
          <Flex sx={styles.iconContainer}>
            <Svg icon='telegram' color="text" />
          </Flex>
          <Flex sx={styles.iconContainer}>
            <Svg icon="discord" color="text" />
          </Flex>
          <Flex sx={styles.iconContainer}>
            <Svg icon="medium" color="text" />
          </Flex>
          <Flex sx={styles.iconContainer}>
            <Svg icon="instagram" color="text" />
          </Flex>
        </Flex>
        <ThemeSwitcher />
      </Flex>
    </Flex>
  );
};

export default Footer;
