import { Button, Flex, Text } from "components/uikit";
import { useTranslation } from "contexts/Localization";
import useModal from "hooks/useModal";
import ConnectWalletModal from "./ConnectWalletModal";

const ConnectWalletButton = () => {
  const [onPresentWalletConnectModal] = useModal(
    <ConnectWalletModal onDismiss={() => null} />,
    true,
    true,
    "ConnectWalletModal"
  );
  const { t } = useTranslation();
  return (
    <Flex sx={{ height: "100%", alignItems: "center" }}>
      <Button
        onClick={onPresentWalletConnectModal}
        sx={{ height: "32.5px", padding: "10px 10px", alignItems: "center" }}
      >
        <Text size="14px" weight={600} sx={{ mt: "1px" }}>
          {t("Connect")}
        </Text>
      </Button>
    </Flex>
  );
};

export default ConnectWalletButton;
