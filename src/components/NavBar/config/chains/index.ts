import { ChainId } from "@ape.swap/sdk";
import { NavConfig } from "components/NavBar/types";
import bscConfig from "./bscConfig";
import ethConfig from "./ethConfig";
import maticConfig from "./maticConfig";
import tlosConfig from "./tlosConfig";

export const configMappedToNetwork: Record<ChainId, NavConfig[]> = {
  [ChainId.BSC]: bscConfig,
  [ChainId.BSC_TESTNET]: bscConfig,
  [ChainId.MATIC]: maticConfig,
  [ChainId.MATIC_TESTNET]: maticConfig,
  [ChainId.TLOS]: tlosConfig,
  [ChainId.MAINNET]: ethConfig,
};

export const getNavConfig = (chainId: ChainId | undefined): NavConfig[] => {
  if (!chainId) {
    return configMappedToNetwork[ChainId.BSC];
  }
  return configMappedToNetwork[chainId];
};
