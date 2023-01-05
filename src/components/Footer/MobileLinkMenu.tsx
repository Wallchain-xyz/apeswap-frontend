import { Text, Flex, Svg } from "components/uikit";
import React, { useState } from "react";
import styles from "./styles";

const MobileLinkMenu: React.FC<{
  title: string;
  items: { label: string; href: string }[];
  border?: boolean;
}> = ({ title, border, items }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      {/* <Dropdown border={border} onClick={() => setOpen((prev) => !prev)}>
        <Text sx={styles.linkText} size="16px" weight={400} color="yellow">
          {title}
        </Text>
        <Svg
          icon="caret"
          width="8px"
          color="primaryBright"
          direction={open ? "down" : "up"}
        />
      </Dropdown> */}
      {open && (
        <Flex
          sx={{
            flexDirection: "column",
            padding: "0px 10px",
            marginBottom: "10px",
          }}
        >
          {items.map((link) => {
            return (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  marginTop: "15px",
                  marginBottom: "5px",
                }}
              >
                <Text
                  sx={styles.linkText}
                  size="16px"
                  weight={400}
                  color="primaryBright"
                >
                  {link.label}
                </Text>
              </a>
            );
          })}
        </Flex>
      )}
    </>
  );
};

MobileLinkMenu.defaultProps = {
  border: false,
};

export default MobileLinkMenu;
