import { useWeb3React } from "@web3-react/core";
import { Button, Flex, Modal, Text } from "components/uikit";
import { useTranslation } from "contexts/Localization";
import { useCallback } from "react";
import { Link } from "theme-ui";

// TODO: When expanding on this component move it into its on folder in components
const AccountModal = ({ onDismiss }: { onDismiss: () => void }) => {
  const { account, chainId, connector } = useWeb3React();
  const { t } = useTranslation();
  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
  }, [connector]);
  return (
    <Modal minWidth="fit-content" title="Your Wallet">
      <Text size="18px" sx={{ margin: "20px 0px" }}>
        {account}
      </Text>
      <Flex>
        <Link>
          <Text>{t("View on BscScan")}</Text>
        </Link>
        <Text>{t("Copy Address")}</Text>
      </Flex>
      <Button
        onClick={() => {
          disconnect(), onDismiss();
        }}
        sx={{ alignSelf: "center" }}
        variant="secondary"
      >
        Logout
      </Button>
    </Modal>
  );
};

export default AccountModal;
