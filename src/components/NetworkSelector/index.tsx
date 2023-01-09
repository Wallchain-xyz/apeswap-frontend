import { useWeb3React } from "@web3-react/core";
import { Flex, Svg, Text } from "components/uikit";
import { NETWORK_ICONS, NETWORK_LABEL } from "config/constants/chains";
import { useTranslation } from "contexts/Localization";
import useModal from "hooks/useModal";
import { isSupportedChain } from "utils";
import NetworkModal from "./NetworkModal";

const NetworkSelector = () => {
  const { chainId, isActive, connector } = useWeb3React();
  const { t } = useTranslation();
  console.log(isActive);
  console.log(connector);
  const [onPresentWalletConnectModal] = useModal(
    <NetworkModal onDismiss={() => null} />,
    true,
    true,
    "NetworkModal"
  );

  return (
    <Flex variant="flex.navContainer" onClick={onPresentWalletConnectModal}>
      <Svg
        icon={isSupportedChain(chainId) ? NETWORK_ICONS[chainId] : "error"}
        width="25px"
      />
      <Text margin="0px 7.5px" size="15px" sx={{ lineHeight: "0px" }}>
        {isSupportedChain(chainId) ? NETWORK_LABEL[chainId] : t("Unsupported")}{" "}
      </Text>
      <Svg icon="caret" />
    </Flex>
  );
};

export default NetworkSelector;
