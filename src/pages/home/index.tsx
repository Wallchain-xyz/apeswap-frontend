import { useWeb3React } from '@web3-react/core'
import TokenListModal from 'components/TokenListModal'
import { Flex, Svg } from 'components/uikit'
import { useAllTokens } from 'hooks/Tokens'
import React, { useCallback } from 'react'
import { useCombinedActiveList } from 'state/lists/hooks'
import { Text, Card, Button } from 'theme-ui'
import ConenctWallet from '../../components/ConnectWallet'

const Home = () => {
  const { account, connector, chainId } = useWeb3React()
  console.log(useCombinedActiveList())
  console.log(useAllTokens())
  console.log(chainId)
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}
    >
      <Flex sx={{ background: 'white3', padding: '20px', borderRadius: '10px' }}>
        <ConenctWallet />
      </Flex>
      <TokenListModal />
      {account && (
        <>
          <Button onClick={disconnect} margin="10px 0px">
            Press to logoutsadas dasdasdasdas das dasdasd
          </Button>
          <Svg />
          <Text sx={{ color: 'black' }}>{account}</Text>
          <Text sx={{ color: 'black' }}>Connected to network id: {chainId}</Text>
        </>
      )}
    </Flex>
  )
}

export default Home
