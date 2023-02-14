import { useWeb3React } from '@web3-react/core'
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from 'config/constants/addresses'
import type { TransactionResponse } from '@ethersproject/providers'
import { useState } from 'react'
import { calculateGasMargin } from 'utils/calculateGasMargin'
import { Percent } from '@ape.swap/sdk-core'
import { NonfungiblePositionManager, Position } from '@ape.swap/v3-sdk'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import { useUserSlippageToleranceWithDefault } from 'state/user/hooks'
import { ZERO_PERCENT } from 'config/constants/misc'
import { AddInterface } from './types'
import { Button } from 'components/uikit'

const DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE = new Percent(50, 10_000)

const Add = ({ positionManager, baseCurrency, quoteCurrency, position, outOfRange, noLiquidity }: AddInterface) => {
  const [attemptingTxn, setAttemptingTxn] = useState<boolean>(false)
  const [txHash, setTxHash] = useState<string>('')
  const deadline = useTransactionDeadline()
  const { chainId, provider, account } = useWeb3React()
  const allowedSlippage = useUserSlippageToleranceWithDefault(
    outOfRange ? ZERO_PERCENT : DEFAULT_ADD_IN_RANGE_SLIPPAGE_TOLERANCE,
  )

  async function onAdd() {
    console.log(!chainId || !provider || !account)
    console.log(positionManager, baseCurrency, quoteCurrency)
    if (!chainId || !provider || !account) return

    if (!positionManager || !baseCurrency || !quoteCurrency) {
      return
    }

    if (position && account && deadline) {
      const useNative = baseCurrency.isNative ? baseCurrency : quoteCurrency.isNative ? quoteCurrency : undefined
      const { calldata, value } = NonfungiblePositionManager.addCallParameters(position, {
        slippageTolerance: allowedSlippage,
        recipient: account,
        deadline: deadline.toString(),
        useNative,
        createPool: noLiquidity,
      })

      let txn: { to: string; data: string; value: string } = {
        to: NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId],
        data: calldata,
        value,
      }

      //   if (argentWalletContract) {
      //     const amountA = parsedAmounts[Field.CURRENCY_A]
      //     const amountB = parsedAmounts[Field.CURRENCY_B]
      //     const batch = [
      //       ...(amountA && amountA.currency.isToken
      //         ? [approveAmountCalldata(amountA, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])]
      //         : []),
      //       ...(amountB && amountB.currency.isToken
      //         ? [approveAmountCalldata(amountB, NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId])]
      //         : []),
      //       {
      //         to: txn.to,
      //         data: txn.data,
      //         value: txn.value,
      //       },
      //     ]
      //     const data = argentWalletContract.interface.encodeFunctionData('wc_multiCall', [batch])
      //     txn = {
      //       to: argentWalletContract.address,
      //       data,
      //       value: '0x0',
      //     }
      //   }

      setAttemptingTxn(true)

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
              setAttemptingTxn(false)
              //   addTransaction(response, {
              //     type: TransactionType.ADD_LIQUIDITY_V3_POOL,
              //     baseCurrencyId: currencyId(baseCurrency),
              //     quoteCurrencyId: currencyId(quoteCurrency),
              //     createPool: Boolean(noLiquidity),
              //     expectedAmountBaseRaw: parsedAmounts[Field.CURRENCY_A]?.quotient?.toString() ?? '0',
              //     expectedAmountQuoteRaw: parsedAmounts[Field.CURRENCY_B]?.quotient?.toString() ?? '0',
              //     feeAmount: position.pool.fee,
              //   })
              setTxHash(response.hash)
              //   sendEvent({
              //     category: 'Liquidity',
              //     action: 'Add',
              //     label: [currencies[Field.CURRENCY_A]?.symbol, currencies[Field.CURRENCY_B]?.symbol].join('/'),
              //   })
            })
        })
        .catch((error) => {
          console.error('Failed to send transaction', error)
          setAttemptingTxn(false)
          // we only care if the error is something _other_ than the user rejected the tx
          if (error?.code !== 4001) {
            console.error(error)
          }
        })
    } else {
      return
    }
  }
  return (
    <Button fullWidth onClick={onAdd}>
      Add
    </Button>
  )
}

export default Add
