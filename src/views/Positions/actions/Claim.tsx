import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { NonfungiblePositionManager } from '@ape.swap/v3-sdk'
import { TransactionResponse } from '@ethersproject/abstract-provider'
import { useWeb3React } from '@web3-react/core'
import { Button } from 'components/uikit'
import { BigNumber } from 'ethers'
import { useV3NFTPositionManagerContract } from 'hooks/useContract'
import { useCallback, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { TransactionType } from 'state/transactions/types'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { currencyId } from 'utils/currencyId'

const Claim = ({
  currency0ForFeeCollectionPurposes,
  currency1ForFeeCollectionPurposes,
  tokenId,
  feeValue0,
  feeValue1,
}: {
  currency0ForFeeCollectionPurposes: Currency | undefined
  currency1ForFeeCollectionPurposes: Currency | undefined
  tokenId: BigNumber | undefined
  feeValue0: CurrencyAmount<Currency> | undefined
  feeValue1: CurrencyAmount<Currency> | undefined
}) => {
  const { account, provider, chainId } = useWeb3React()
  const positionManager = useV3NFTPositionManagerContract()
  const addTransaction = useTransactionAdder()

  const [claimPending, setClaimPending] = useState<boolean>(false)
  const onClaim = useCallback(() => {
    if (
      !currency0ForFeeCollectionPurposes ||
      !currency1ForFeeCollectionPurposes ||
      !chainId ||
      !positionManager ||
      !account ||
      !tokenId ||
      !provider
    )
      return

    setClaimPending(true)

    // we fall back to expecting 0 fees in case the fetch fails, which is safe in the
    // vast majority of cases
    const { calldata, value } = NonfungiblePositionManager.collectCallParameters({
      tokenId: tokenId.toString(),
      expectedCurrencyOwed0: feeValue0 ?? CurrencyAmount.fromRawAmount(currency0ForFeeCollectionPurposes, 0),
      expectedCurrencyOwed1: feeValue1 ?? CurrencyAmount.fromRawAmount(currency1ForFeeCollectionPurposes, 0),
      recipient: account,
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
              .then(() => setClaimPending(false))
              .catch((error) => {
                setClaimPending(false)
                console.error(error)
              })

            // sendEvent({
            //   category: 'Liquidity',
            //   action: 'CollectV3',
            //   label: [currency0ForFeeCollectionPurposes.symbol, currency1ForFeeCollectionPurposes.symbol].join('/'),
            // })

            addTransaction(response, {
              type: TransactionType.COLLECT_FEES,
              currencyId0: currencyId(currency0ForFeeCollectionPurposes),
              currencyId1: currencyId(currency1ForFeeCollectionPurposes),
              expectedCurrencyOwed0: CurrencyAmount.fromRawAmount(currency0ForFeeCollectionPurposes, 0).toExact(),
              expectedCurrencyOwed1: CurrencyAmount.fromRawAmount(currency1ForFeeCollectionPurposes, 0).toExact(),
            })
          })
      })
      .catch((error) => {
        setClaimPending(false)
        console.error(error)
      })
  }, [
    chainId,
    feeValue0,
    feeValue1,
    currency0ForFeeCollectionPurposes,
    currency1ForFeeCollectionPurposes,
    positionManager,
    addTransaction,
    account,
    tokenId,
    provider,
  ])

  return (
    <Button size="sm" onClick={onClaim} load={claimPending} disabled={claimPending}>
      Claim
    </Button>
  )
}

export default Claim
