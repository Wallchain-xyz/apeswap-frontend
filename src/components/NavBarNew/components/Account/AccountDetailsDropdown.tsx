import { useCallback, useState } from 'react'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useTranslation } from 'contexts/Localization'
import { getEtherscanLink } from 'utils'

// Components
import { Flex, Svg, Text, Link } from 'components/uikit'
import NavBarThemeSwitcher from './NavBarThemeSwitcher'

// Hooks
import { useWeb3React } from '@web3-react/core'
import { useThemeUI } from 'theme-ui'
import { useCurrencyBalanceString } from 'lib/hooks/useCurrencyBalance'

// State
import { useAppDispatch } from 'state/hooks'
import { updateSelectedWallet } from 'state/user/reducer'

// Constants
import { CHAIN_PARAMS, NETWORK_ICONS } from 'config/constants/chains'

const AccountDetailsDropdown = ({ isVisible }: { isVisible: boolean }) => {
  const [isSuccessfulCopy, setIsSuccessfulCopy] = useState<boolean>(false)

  const { colorMode } = useThemeUI()
  const dispatch = useAppDispatch()
  const { account, chainId, connector } = useWeb3React()
  const balance = useCurrencyBalanceString(account ?? '')

  const disconnect = useCallback(() => {
    if (connector && connector.deactivate) {
      connector.deactivate()
    }
    connector.resetState()
  }, [connector])

  const handleCopy = () => {
    setIsSuccessfulCopy(true)
    navigator.clipboard.writeText(account || '')
    setTimeout(() => {
      setIsSuccessfulCopy(false)
    }, 1000)
  }

  return (
    <Flex
      sx={{
        display: isVisible ? 'flex' : 'none',
        flexDirection: 'column',
        position: 'absolute',
        top: '35px',
        right: '0px',
        bg: colorMode === 'dark' ? 'rgba(33, 33, 33, 0.85)' : 'rgba(249, 244, 231, 0.95)',
        width: '300px',
        px: '20px',
        py: '20px',
        borderRadius: 'normal',
        backdropFilter: 'blur(15px)',
        gap: '20px',
      }}
    >
      <Flex
        sx={{
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          py: '5px',
          verticalAlign: 'middle',
        }}
      >
        <Flex
          onClick={handleCopy}
          sx={{
            p: '5px',
            borderRadius: '8px',
            cursor: 'pointer',
            '&:hover': { bg: 'white3' },
            verticalAlign: 'middle',
          }}
        >
          <Svg icon="wallet" />
          <Text sx={{ fontWeight: '400', px: '2' }} size="14px">
            {account?.slice(0, 4)}...
            {account?.slice(account?.length - 4, account?.length)}
          </Text>
          <Svg icon={isSuccessfulCopy ? 'success' : 'copy'} width={14} />
        </Flex>
        <Flex sx={{ gap: '10px', alignItems: 'center', justifyContent: 'flex-start' }}>
          <Flex
            sx={{
              width: '25px',
              height: '25px',
              '&:hover': { bg: 'white3' },
              borderRadius: '100px',
              p: '4px',
            }}
          >
            <Link href={getEtherscanLink(account || '', 'address', chainId ?? SupportedChainId.BSC)} target="_blank">
              <Svg icon="explorer" color="text" width={'100%'} />
            </Link>
          </Flex>
          <Flex
            sx={{
              width: '25px',
              height: '25px',
              '&:hover': { bg: 'white3' },
              borderRadius: '100px',
              p: '3px 3px 3px 5px',
            }}
            onClick={() => {
              disconnect(), dispatch(updateSelectedWallet({ wallet: undefined }))
            }}
          >
            <Svg icon="logout" color="text" />
          </Flex>
        </Flex>
      </Flex>

      {/*  */}
      <Flex sx={{ flexDirection: 'column' }}>
        <Text sx={{ fontSize: '12px', lineHeight: '18px' }}>Native Asset Holdings:</Text>
        <Flex
          sx={{
            mt: '6px',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Flex sx={{ alignItems: 'center', justifyContent: 'flex-start' }}>
            <Svg icon={chainId ? NETWORK_ICONS[chainId as SupportedChainId] : 'error'} width="25px" />
            <Text sx={{ ml: '8px' }}>
              {chainId ? CHAIN_PARAMS[chainId as SupportedChainId]?.nativeCurrency?.symbol : 'Not Supported'}
            </Text>
          </Flex>
          <Flex>
            <Text sx={{ ml: '8px' }}>{balance}</Text>
          </Flex>
        </Flex>
      </Flex>

      {/* TODO: Add key account links here */}

      <NavBarThemeSwitcher />
    </Flex>
  )
}

export default AccountDetailsDropdown
