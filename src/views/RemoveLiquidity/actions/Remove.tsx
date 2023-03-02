import { Currency, CurrencyAmount, Percent } from '@ape.swap/sdk-core'
import { NonfungiblePositionManager, Position } from '@ape.swap/v3-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import useModal from 'hooks/useModal'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useCallback, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { useIsExpertMode, useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { currencyId } from 'utils/currencyId'
import RemoveLiquidityConfirmation from '../components/RemoveLiquidityConfirmation'

const DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE = new Percent(5, 100)

const Remove = ({
  liquidityValue0,
  liquidityValue1,
  liquidityPercentage,
  positionSDK,
  tokenId,
  feeValue0,
  feeValue1,
  feeAmount,
  inRange,
}: {
  liquidityValue0: CurrencyAmount<Currency> | undefined
  liquidityValue1: CurrencyAmount<Currency> | undefined
  liquidityPercentage: Percent | undefined
  positionSDK: Position | undefined
  tokenId: string | undefined
  feeValue0: CurrencyAmount<Currency> | undefined
  feeValue1: CurrencyAmount<Currency> | undefined
  feeAmount: number | undefined
  inRange: boolean
}) => {
  const { account, chainId, provider } = useWeb3React()
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const addTransaction = useTransactionAdder()
  const positionManager = useV3NFTPositionManagerContract()
  const allowedSlippage = useUserSlippageToleranceWithDefault(DEFAULT_REMOVE_V3_LIQUIDITY_SLIPPAGE_TOLERANCE) // custom from users
  const deadline = useTransactionDeadline() // custom from users settings
  const isExpertMode = useIsExpertMode()
  const [txHash, setTxHash] = useState<string>('')

  const burn = useCallback(async () => {
    setAttemptingTxn(true)
    if (
      !positionManager ||
      !liquidityValue0 ||
      !liquidityValue1 ||
      !deadline ||
      !account ||
      !chainId ||
      !positionSDK ||
      !liquidityPercentage ||
      !provider ||
      !tokenId
    ) {
      return
    }

    // we fall back to expecting 0 fees in case the fetch fails, which is safe in the
    // vast majority of cases
    const { calldata, value } = NonfungiblePositionManager.removeCallParameters(positionSDK, {
      tokenId: tokenId,
      liquidityPercentage,
      slippageTolerance: allowedSlippage,
      deadline: deadline.toString(),
      collectOptions: {
        expectedCurrencyOwed0: feeValue0 ?? CurrencyAmount.fromRawAmount(liquidityValue0.currency, 0),
        expectedCurrencyOwed1: feeValue1 ?? CurrencyAmount.fromRawAmount(liquidityValue1.currency, 0),
        recipient: account,
      },
    })

    const txn = {
      to: positionManager.address,
      data: calldata,
      value,
    }

    provider
      .getSigner()
      .estimateGas(txn)
      .then((estimate) => {
        const newTxn = {
          ...txn,
          gasLimit: calculateGasMargin(estimate),
        }

        return provider
          .getSigner()
          .sendTransaction(newTxn)
          .then((response: TransactionResponse) => {
            provider
              .waitForTransaction(response.hash)
              .then(() => {
                setAttemptingTxn(false)
              })
              .catch((error) => {
                setAttemptingTxn(false)
                console.error(error)
              })
            // sendEvent({
            //   category: 'Liquidity',
            //   action: 'RemoveV3',
            //   label: [liquidityValue0.currency.symbol, liquidityValue1.currency.symbol].join('/'),
            // })
            setTxHash(response.hash)
            addTransaction(response, {
              type: TransactionType.REMOVE_LIQUIDITY_V3,
              baseCurrencyId: currencyId(liquidityValue0.currency),
              quoteCurrencyId: currencyId(liquidityValue1.currency),
              expectedAmountBaseRaw: liquidityValue0.quotient.toString(),
              expectedAmountQuoteRaw: liquidityValue1.quotient.toString(),
            })
          })
      })
      .catch((error) => {
        setAttemptingTxn(false)
        console.error(error)
      })
  }, [
    positionManager,
    liquidityValue0,
    liquidityValue1,
    deadline,
    account,
    chainId,
    feeValue0,
    feeValue1,
    positionSDK,
    liquidityPercentage,
    provider,
    tokenId,
    allowedSlippage,
    addTransaction,
  ])

  const handleDismissConfirmation = useCallback(() => {
    // if there was a tx hash, we want to clear the input
    setTxHash('')
  }, [])

  const [onRemoveLiquidity] = useModal(
    <RemoveLiquidityConfirmation
      feeValue0={feeValue0}
      feeValue1={feeValue1}
      liquidityValue0={liquidityValue0}
      liquidityValue1={liquidityValue1}
      feeAmount={feeAmount}
      inRange={inRange}
      attemptingTxn={attemptingTxn}
      txHash={txHash}
      burn={burn}
      onDismiss={handleDismissConfirmation}
    />,
    true,
    true,
    'removeLiquidityConfirmationModal',
  )

  return (
    <Button
      fullWidth
      sx={{ mt: '10px' }}
      onClick={isExpertMode ? burn : onRemoveLiquidity}
      load={attemptingTxn}
      disabled={attemptingTxn}
    >
      {isExpertMode ? 'Remove' : 'Preview'}
    </Button>
  )
}

export default Remove
