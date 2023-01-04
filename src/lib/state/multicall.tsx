import { createMulticall, ListenerOptions } from "@uniswap/redux-multicall";
import { useWeb3React } from "@web3-react/core";
import { useInterfaceMulticall } from "hooks/useContract";
import useBlockNumber from "lib/hooks/useBlockNumber";
import { useMemo } from "react";

const multicall = createMulticall();

export default multicall;

export function MulticallUpdater() {
  const { chainId } = useWeb3React();
  const latestBlockNumber = useBlockNumber();
  const contract = useInterfaceMulticall();
  const listenerOptions: ListenerOptions = useMemo(
    () => ({
      blocksPerFetch: 1,
    }),
    [chainId]
  );

  return (
    <multicall.Updater
      chainId={chainId}
      latestBlockNumber={latestBlockNumber}
      contract={contract}
      listenerOptions={listenerOptions}
    />
  );
}
