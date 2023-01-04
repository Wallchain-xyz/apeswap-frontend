import { useWeb3React } from '@web3-react/core'
import React, { useCallback } from 'react'
import { Flex, Text, Card, Button } from 'theme-ui'
import ConenctWallet from '../../components/ConnectWallet'

const Home = () => {
  const { account, connector, chainId } = useWeb3React()
  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
  }, [connector])
  return (
    <Flex
      sx={{
        height: '100vh',
        width: '100%',
        background: 'background',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Card>
        <ConenctWallet />
      </Card>
      {account && (
        <>
          <Button onClick={disconnect} margin="10px 0px">
            Press to logout
          </Button>
          <Text sx={{ color: 'black' }}>{account}</Text>
          <Text sx={{ color: 'black' }}>
            Connected to network id: {chainId}
          </Text>
        </>
      )}
    </Flex>
  )
}

export default Home
