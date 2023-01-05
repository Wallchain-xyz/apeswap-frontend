import { useWeb3React } from "@web3-react/core";
import { Flex, Svg } from "components/uikit";
import React, { useCallback } from "react";
import { Text, Card, Button } from "theme-ui";
import ConenctWallet from "../../components/ConnectWallet";

const Home = () => {
  const { account, connector, chainId } = useWeb3React();
  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate();
    }
    connector.resetState();
  }, [connector]);
  return (
    <Flex
      sx={{
        height: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Svg icon='fullLogo' color='body'/>
      <Flex
        sx={{ background: "white3", padding: "20px", borderRadius: "10px" }}
      >
        <ConenctWallet />
      </Flex>
      {account && (
        <>
          <Button onClick={disconnect} margin="10px 0px">
            Press to logout
          </Button>
          <Svg />
          <Text sx={{ color: "black" }}>{account}</Text>
          <Text sx={{ color: "black" }}>
            Connected to network id: {chainId}
          </Text>
        </>
      )}
    </Flex>
  );
};

export default Home;
