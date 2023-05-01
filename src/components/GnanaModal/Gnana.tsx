import React, { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import { useCurrency } from 'hooks/Tokens'
import { Field } from 'state/swap/actions'
import { gnanaStyles } from './styles'
import { useWeb3React } from '@web3-react/core'
import { useThemeUI } from 'theme-ui'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import { SupportedChainId, Token } from '@ape.swap/sdk-core'
import { GNANA_ADDRESSES } from 'config/constants/addresses'
import { useTokenContract, useTreasury } from 'hooks/useContract'
import { useBuyGoldenBanana } from 'views/Gnana/useGoldenBanana'
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import useApproveTransaction from 'views/Gnana/useApproveTransaction'
import ConnectWalletButton from 'components/ConnectWallet'
import { Button, CheckBox, Flex, Svg, Text } from 'components/uikit'
import Dots from 'components/Dots'
import DexPanel from 'components/DexPanel'
import { useTokenAllowance } from 'hooks/useTokenAllowance'

const Gnana = () => {
  const { account, chainId } = useWeb3React()
  const { colorMode } = useThemeUI()
  const isDark = colorMode === 'dark'
  const MAX_BUY = 5000
  const bananaToken = useCurrency(BANANA_ADDRESSES[chainId as SupportedChainId])
  const gnanaToken = useCurrency(GNANA_ADDRESSES[chainId as SupportedChainId])
  const { t } = useTranslation()
  const [unlimitedGnana, setUnlimitedGnanaMinting] = useState<boolean>(false)
  const [unlimited, setUnlimited] = useState(unlimitedGnana)
  const treasuryContract = useTreasury()
  const [processing, setProcessing] = useState(false)
  const [triedMore, setTriedMore] = useState(false)

  const [val, setVal] = useState<string>('0')
  const { handleBuy } = useBuyGoldenBanana()
  const gnanaVal = parseFloat(val) > 0 ? parseFloat(val) * 0.7 : 0
  // const { toastSuccess } = useToast()
  const bananaContract = useTokenContract(BANANA_ADDRESSES[chainId as SupportedChainId])
  const accountBananaBalance = useCurrencyBalance(account, bananaToken ?? undefined)
  const displayMax = unlimited ? 'unlimited' : MAX_BUY
  const fullBananaBalance = accountBananaBalance?.toExact()

  const { tokenAllowance } = useTokenAllowance((bananaToken as Token) ?? undefined, account, treasuryContract?.address)

  const handleSelectMax = useCallback(() => {
    const max = parseInt(fullBananaBalance ?? '0') < MAX_BUY || unlimited ? fullBananaBalance : MAX_BUY
    setVal(max?.toString() ?? '0')
  }, [fullBananaBalance, unlimited, setVal])

  const handleChange = useCallback(
    (val: string) => {
      if (!unlimited && parseInt(val) > MAX_BUY) {
        setTriedMore(true)
        return
      }
      setVal(val)
    },
    [unlimited],
  )

  useEffect(() => {
    setTimeout(() => {
      setTriedMore(false)
    }, 600)
  }, [triedMore])

  const {
    isApproving: isApprovingBanana,
    isApproved: isApprovedBanana,
    handleApprove: handleApproveBanana,
  } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await bananaContract?.allowance(loadedAccount, treasuryContract?.address ?? '')
        const currentAllowance = new BigNumber(response?.toString() ?? '0')
        return currentAllowance.gt(0)
      } catch (error) {
        return false
      }
    },
    onApprove: async () => {
      const trx = await bananaContract?.approve(treasuryContract?.address ?? '', ethers.constants.MaxUint256)
      return await trx?.wait()
    },
    onSuccess: async () => null, // toastSuccess(t('Approved!')),
  })

  const buyGnana = useCallback(async () => {
    try {
      setProcessing(true)
      await handleBuy(val)
      setProcessing(false)
      setVal('0')
    } catch (e) {
      setProcessing(false)
      console.warn(e)
    }
  }, [handleBuy, val])

  const handleCheckBox = useCallback(() => {
    setUnlimited(!unlimited)
    if (!unlimited) setUnlimitedGnanaMinting(true)
    if (unlimited) {
      setUnlimitedGnanaMinting(false)
      setVal('0')
    }
  }, [unlimited, setUnlimitedGnanaMinting])

  const disabled = processing || parseInt(val) === 0 || parseInt(val) > parseInt(fullBananaBalance ?? '0')

  const renderActions = () => {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (parseFloat(tokenAllowance?.toExact() ?? '0') >= parseFloat(val)) {
      return (
        <Button variant="primary" onClick={buyGnana} disabled={disabled} fullWidth>
          {(processing && (
            <>
              {t('LOADING')}
              <Dots />
            </>
          )) ||
            t('CONVERT')}
        </Button>
      )
    }
    if (parseFloat(tokenAllowance?.toExact() ?? '0') < parseFloat(val)) {
      return (
        <Button variant="primary" onClick={handleApproveBanana} disabled={isApprovingBanana} fullWidth>
          {t('APPROVE CONTRACT')}
        </Button>
      )
    }
  }

  return (
    <Flex sx={gnanaStyles.gnanaContainer}>
      <Flex
        sx={{
          ...gnanaStyles.headsUp,
          backgroundColor: (isDark && '#FFB30026') || 'yellow',
          opacity: (isDark && 1) || 0.7,
        }}
      >
        <Flex sx={gnanaStyles.headsUpHeader}>
          <Text as="h1" sx={{ ...gnanaStyles.warningHeader, color: (isDark && 'yellow') || 'primaryBright' }}>
            {t('HEADS UP, APES!')}
          </Text>

          <Flex sx={{ padding: '2px', fontSize: ['14px'] }}>
            <Text sx={gnanaStyles.headsUpDescription}>
              {t(
                'Buying GNANA involves paying a 28% burn fee and a 2% reflect fee for a total cost of 30%. This means that for every 1 BANANA you trade in, you will receive 0.7 GNANA.',
              )}
            </Text>
          </Flex>

          <Button
            variant="text"
            sx={{ ...gnanaStyles.learnMoreBtn, alignItems: 'center' }}
            onClick={() => window.open('https://apeswap.finance/gnana', '_blank')}
          >
            {t('Learn More')} <span sx={{ mr: '5px' }} /> <Svg icon="caret" direction="right" />
          </Button>
        </Flex>
      </Flex>

      <Flex sx={gnanaStyles.transactions}>
        <Flex sx={{ flexDirection: 'column' }}>
          <DexPanel
            value={val}
            panelText="From"
            currency={bananaToken}
            otherCurrency={gnanaToken}
            onUserInput={handleChange}
            fieldType={Field.INPUT}
            handleMaxInput={handleSelectMax}
            onCurrencySelect={() => null}
            disableTokenSelect
          />
          <Text sx={{ color: triedMore ? '#ff0000' : null, fontSize: '12px', fontWeight: 600 }}>
            {t('*Current max conversion is %displayMax%', { displayMax })}
          </Text>
          <Flex sx={gnanaStyles.arrowDownContainer}>
            <Flex sx={gnanaStyles.arrowDown}>
              <Svg icon="arrow" width="8px" color="primaryBright" />
            </Flex>
          </Flex>
          <DexPanel
            value={gnanaVal.toString()}
            panelText="To"
            currency={gnanaToken}
            otherCurrency={bananaToken}
            onUserInput={handleChange}
            fieldType={Field.OUTPUT}
            handleMaxInput={handleSelectMax}
            onCurrencySelect={() => null}
            disabled
            ordersDisabled
            disableTokenSelect
          />
          {/* ToTokenInput */}
          <Flex sx={{ marginTop: '20px', alignItems: 'center' }}>
            <Flex sx={gnanaStyles.checkboxContainer}>
              <CheckBox
                id="checkbox"
                checked={unlimited}
                sx={{ backgroundColor: 'white2' }}
                onChange={handleCheckBox}
              />
            </Flex>
            <Text sx={gnanaStyles.checkboxText}>
              {t('I understand how GNANA works and I want to enable unlimited buy')}
            </Text>
          </Flex>
        </Flex>
        <Flex sx={gnanaStyles.renderActions}>{renderActions()}</Flex>
      </Flex>
    </Flex>
  )
}

export default React.memo(Gnana)
