import React from "react";
import { Button, Flex, Svg, Text } from "components/uikit";
import { useColorMode } from "theme-ui";

const ThemeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Button
      sx={{
        height: "35px",
        alignItems: "center",
        "&&": {
          padding: "3px 12px",
        },
      }}
      variant="tertiary"
      onClick={() => setColorMode(isDark ? "light" : "dark")}
    >
      <Flex>
        <Svg
          icon="island"
          width="20px"
          key="islandMode"
          color={isDark ? "gray" : "brown"}
        />
        <Text
          weight={400}
          color={isDark ? "text" : "brown"}
          size="27px"
          margin="1px 5px 0px 6px"
        >
          /
        </Text>
        <Svg
          icon="moon"
          width="24px"
          key="nightMode"
          color={isDark ? "text" : "gray"}
        />
      </Flex>
    </Button>
  );
};

export default ThemeSwitcher;
