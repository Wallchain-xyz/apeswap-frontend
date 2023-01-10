import { ChainId } from "@ape.swap/sdk";
import { useWeb3React } from "@web3-react/core";
import { Flex, Svg, Text } from "components/uikit";
import { NETWORK_ICONS, NETWORK_LABEL } from "config/constants/chains";
import { useTranslation } from "contexts/Localization";
import useModal from "hooks/useModal";
import { useCallback, useState } from "react";
import { Spinner } from "theme-ui";
import { isSupportedChain } from "utils";
import NetworkModal from "./NetworkModal";

const NetworkSelector = () => {
  const { chainId } = useWeb3React();
  const [requestPending, setRequestPending] = useState<boolean>(false);
  const { t } = useTranslation();

  const onSetRequestPending = useCallback((reqFlag: boolean) => {
    setRequestPending(reqFlag);
  }, []);

  const [onPresentWalletConnectModal] = useModal(
    <NetworkModal
      onDismiss={() => null}
      onSetRequestPending={onSetRequestPending}
    />,
    true,
    true,
    "NetworkModal"
  );

  const isSupported = isSupportedChain(chainId);

  return (
    <Flex variant="flex.navContainer" onClick={onPresentWalletConnectModal}>
      {requestPending ? (
        <Spinner size="22px" />
      ) : (
        <Svg
          icon={
            !chainId
              ? NETWORK_ICONS[ChainId.BSC]
              : isSupported
              ? NETWORK_ICONS[chainId]
              : "error"
          }
          width="25px"
        />
      )}
      <Text margin="0px 7.5px" size="15px" sx={{ lineHeight: "0px" }}>
        {requestPending
          ? t("Requesting")
          : !chainId
          ? NETWORK_LABEL[ChainId.BSC]
          : isSupported
          ? NETWORK_LABEL[chainId]
          : t("Unsupported")}{" "}
      </Text>
      <Svg icon="caret" />
    </Flex>
  );
};

export default NetworkSelector;
