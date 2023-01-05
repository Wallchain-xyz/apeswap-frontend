import { ChainId } from "@ape.swap/sdk";
import { NavConfig } from "components/NavBar/types";
import bscConfig from "./bscConfig";
import ethConfig from "./ethConfig";
import maticConfig from "./maticConfig";
import tlosConfig from "./tlosConfig";

export const configMappedToNetwork: Partial<Record<ChainId, NavConfig[]>> = {
  [ChainId.BSC]: bscConfig,
  [ChainId.MATIC]: maticConfig,
  [ChainId.TLOS]: tlosConfig,
  [ChainId.MAINNET]: ethConfig,
};
