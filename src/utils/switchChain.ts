import { ChainId } from "@ape.swap/sdk";
import { Connector } from "@web3-react/types";
import { CHAIN_PARAMS } from "config/constants/chains";
import { isSupportedChain } from "utils";
import { networkConnection, walletConnectConnection } from "./connection";

export const switchChain = async (connector: Connector, chainId: ChainId) => {
  if (!isSupportedChain(chainId)) {
    throw new Error(
      `Chain ${chainId} not supported for connector (${typeof connector})`
    );
  } else if (
    connector === walletConnectConnection.connector ||
    connector === networkConnection.connector
  ) {
    await connector.activate(chainId);
  } else {
    const info = CHAIN_PARAMS[chainId];
    const addChainParameter = {
      chainId,
      chainName: info?.chainName,
      rpcUrls: info?.rpcUrls,
      nativeCurrency: info?.nativeCurrency,
      blockExplorerUrls: info?.blockExplorerUrls,
    };
    await connector.activate(addChainParameter);
  }
};
