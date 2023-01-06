import React from "react";
import { Button, Flex, Svg, Text } from "components/uikit";
import { useColorMode } from "theme-ui";

const ThemeSwitcher = ({ isMini }: { isMini?: Boolean }) => {
  const [colorMode, setColorMode] = useColorMode();
  const isDark = colorMode === "dark";
  return (
    <Button
      sx={{
        marginRight: isMini && "20px",
        height: "35px",
        "&&": {
          padding: isMini ? "8px" : "3px 12px",
        },
        ".island": {
          fill: isDark ? "gray" : "brown",
        },
        ".moon": {
          fill: isDark ? "gray" : "primaryGray",
        },
      }}
      variant="tertiary"
      onClick={() => setColorMode(isDark ? "light" : "dark")}
    >
      {/* alignItems center is a Safari fix */}
      <Flex>
        {!isMini && (
          <>
            <Svg icon="island" width="20px" key="islandMode" />
            <Text weight="normal" color={isDark ? "gray" : "brown"} mx="4px">
              /
            </Text>
          </>
        )}
        <Svg icon="moon" width="24px" key="nightMode" />
      </Flex>
    </Button>
  );
};

export default ThemeSwitcher;
