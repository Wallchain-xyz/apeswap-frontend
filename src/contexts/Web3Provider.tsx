import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { Connector } from "@web3-react/types";
import React, { useMemo } from "react";
import { listOfConnections } from "utils/connection";
import { Connection } from "utils/connection/types";
import { getConnectionName } from "utils/connection/utils";

const Web3Provider = ({ children }: { children: React.ReactNode }) => {
  const connectors: [Connector, Web3ReactHooks][] = listOfConnections.map(
    ({ hooks, connector }) => [connector, hooks]
  );

  const key = useMemo(
    () =>
      listOfConnections
        .map((connection: Connection) => getConnectionName(connection))
        .join("-"),
    [listOfConnections]
  );

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      {children}
    </Web3ReactProvider>
  );
};

export default Web3Provider;
