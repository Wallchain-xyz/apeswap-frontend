import { Connector } from "@web3-react/types";
import { gnosisSafeConnection, networkConnection } from "utils/connection";
import { Connection } from "utils/connection/types";
import { getConnection } from "utils/connection/utils";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "state/hooks";
import { updateSelectedWallet } from "state/user/reducer";

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly(1);
    } else {
      await connector.activate(1);
    }
  } catch (error) {
    console.debug(`web3-react eager connection error: ${error}`);
  }
}

export default function useEagerConnect() {
  const dispatch = useAppDispatch();

  const selectedWallet = useAppSelector((state) => state.user.selectedWallet);

  let selectedConnection: Connection | undefined;
  if (selectedWallet) {
    try {
      selectedConnection = getConnection(selectedWallet);
    } catch {
      dispatch(updateSelectedWallet({ wallet: undefined }));
    }
  }

  useEffect(() => {
    connect(gnosisSafeConnection.connector);
    connect(networkConnection.connector);

    if (selectedConnection) {
      connect(selectedConnection.connector);
    } // The dependency list is empty so this is only run once on mount
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
}
