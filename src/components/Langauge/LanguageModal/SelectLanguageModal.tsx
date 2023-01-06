import React, { useContext } from "react";
import { Context } from "contexts/ModalContext";
import { Button, Flex, Modal, Text } from "components/uikit";
import { useTranslation } from "contexts/Localization";
import { languageList } from "config/localization/languages";


const langButton = {
  alignItems: "center",
  justifyContent: "center",
  fontSize: "16px",
  height: "48px",
  letterSpacing: "0.03em",
  padding: "0px 10px",
  marginBottom: "10px",
  opacity: 1,
};

const SelectLanguageModal = () => {
  const { currentLanguage, t, setLanguage } = useTranslation();
  const { handleClose } = useContext(Context);
  return (
    <Modal maxWidth="350px" minWidth="350px" title={t("Language")}>
      <Flex sx={{ height: "auto", flexDirection: "column" }}>
        {languageList.map((lang) => (
          <Button
            sx={langButton}
            fullWidth
            variant={
              currentLanguage.language === lang.language
                ? "tertiary"
                : "secondary"
            }
            onClick={() => {
              setLanguage(lang);
              handleClose();
            }}
          >
            <Text weight="normal" color="text" mr="16px" textAlign="start">
              {lang.language}
            </Text>
          </Button>
        ))}
      </Flex>
    </Modal>
  );
};

export default SelectLanguageModal;
