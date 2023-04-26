import React, { useCallback, useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'

import { StyledCard, HeaderCard, Header, TokensDisplay, ContentCard, StyledButton, FlexSection } from './styles'
import { Flex } from 'theme-ui'
import { useWeb3React } from '@web3-react/core'
import { getFullDisplayBalance } from 'utils/getBalanceNumber'
import { useTokenBalance } from 'lib/hooks/useCurrencyBalance'
import TokenInput from 'components/TokenInput/TokenInput'
import ConnectWalletButton from 'components/ConnectWallet'
import { Text } from 'components/uikit'
import { GNANA_ADDRESSES } from 'config/constants/addresses'
import { SupportedChainId } from '@ape.swap/sdk-core'
import useApproveTransaction from '../useApproveTransaction'
import { useTokenContract, useTreasury } from 'hooks/useContract'
import { useSellGoldenBanana } from '../useGoldenBanana'
import { useToken } from 'hooks/Tokens'
import { useTokenAllowance } from 'hooks/useTokenAllowance'

interface ReturnCardType {
  fromToken: string
  toToken: string
}

const ReturnCard: React.FC<ReturnCardType> = ({ fromToken, toToken }) => {
  const [val, setVal] = useState('')
  const [processing, setProcessing] = useState(false)
  const { chainId, account } = useWeb3React()
  const treasuryContract = useTreasury()
  // const { toastSuccess } = useToast()
  const valBanana = parseFloat(val) * 0.98
  const { handleSell } = useSellGoldenBanana()
  const gnanaToken = useToken(GNANA_ADDRESSES[chainId as SupportedChainId])
  const goldenBananaBalance = useTokenBalance(account, gnanaToken ?? undefined)
  const goldenBananaContract = useTokenContract(GNANA_ADDRESSES[chainId as SupportedChainId])
  const { tokenAllowance } = useTokenAllowance(gnanaToken ?? undefined, account, treasuryContract?.address)
  const { t } = useTranslation()

  const { isApproving, handleApprove } = useApproveTransaction({
    onRequiresApproval: async (loadedAccount) => {
      try {
        const response = await goldenBananaContract?.allowance(loadedAccount, treasuryContract?.address ?? '')
        const currentAllowance = new BigNumber(response?.toString() ?? '0')
        return currentAllowance.gt(0)
      } catch (error) {
        console.warn(error)
        return false
      }
    },
    onApprove: () => {
      return goldenBananaContract
        ?.approve(treasuryContract?.address ?? '', ethers.constants.MaxUint256)
        .then((trx) => trx.wait())
    },
    onSuccess: async () => {
      null //toastSuccess(t('Approved!'))
    },
  })

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(new BigNumber(goldenBananaBalance?.quotient?.toString() ?? 0))
  }, [goldenBananaBalance])

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      setVal(e.currentTarget.value)
    },
    [setVal],
  )
  const sell = useCallback(async () => {
    try {
      setProcessing(true)
      await handleSell(val)
      setProcessing(false)
    } catch (e) {
      setProcessing(false)
      console.warn(e)
    }
  }, [handleSell, val])

  const disabled = processing || parseInt(val) > parseInt(fullBalance) || parseInt(val) === 0

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <StyledCard>
      <HeaderCard>
        <Header>{t('RETURN')}</Header>
        <TokensDisplay>
          {fromToken} &gt; {toToken}
        </TokensDisplay>
      </HeaderCard>

      <ContentCard>
        <TokenInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={parseFloat(fullBalance).toFixed(2)}
          symbol={fromToken}
        />
        {!account ? (
          <Flex sx={{ margin: '15px 0 10px 0' }}>
            <ConnectWalletButton />
          </Flex>
        ) : parseFloat(tokenAllowance?.toExact() ?? '0') >= parseFloat(val) ? (
          <StyledButton disabled={disabled} variant="primary" margin="10px" onClick={sell}>
            {t('RETURN')}
          </StyledButton>
        ) : (
          <StyledButton margin="10px" disabled={isApproving} onClick={handleApprove}>
            {t('APPROVE CONTRACT')}
          </StyledButton>
        )}

        <FlexSection flexDirection="column" alignItems="center" mb="10px">
          <Text fontSize="16px" fontWeight={700}>
            {t('OUTPUT')} {`${toToken} ${valBanana ? valBanana?.toFixed(3) : 0}`}
          </Text>
          <Text fontSize="12px" fontWeight={500}>
            *After 2% reflect fee
          </Text>
        </FlexSection>
      </ContentCard>
    </StyledCard>
  )
}

export default React.memo(ReturnCard)
