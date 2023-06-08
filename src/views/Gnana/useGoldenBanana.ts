import { useCallback } from 'react'
import { useTreasury } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import track from 'utils/track'
import { useBananaPrice, useToastError } from 'state/application/hooks'
import { Treasury } from 'config/abi/types'

export const buy = async (contract: Treasury | null, amount: string) => {
  try {
    return contract?.buy(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).then((tx) => {
      return tx.hash
    })
  } catch (err) {
    return console.warn(err)
  }
}

export const sell = async (contract: Treasury | null, amount: string) => {
  try {
    return contract?.sell(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString()).then((tx) => {
      return tx.hash
    })
  } catch (err) {
    return console.warn(err)
  }
}

export const useSellGoldenBanana = () => {
  const treasuryContract = useTreasury()
  const bananaPrice = useBananaPrice()

  const handleSell = useCallback(
    async (amount: string) => {
      try {
        const txHash = await sell(treasuryContract, amount)
        track({
          event: 'gnana',
          chain: 56,
          data: {
            amount,
            cat: 'sell',
            usdAmount: parseFloat(amount) * parseFloat(bananaPrice ?? '0'),
          },
        })
        return txHash
      } catch (e) {
        return false
      }
    },
    [bananaPrice, treasuryContract],
  )

  return { handleSell }
}

export const useBuyGoldenBanana = () => {
  const treasuryContract = useTreasury()
  const bananaPrice = useBananaPrice()
  const toastError = useToastError()

  const handleBuy = useCallback(
    async (amount: string) => {
      try {
        return await buy(treasuryContract, amount)
          .then(() =>
            track({
              event: 'gnana',
              chain: 56,
              data: {
                amount,
                cat: 'buy',
                usdAmount: parseFloat(amount) * parseFloat(bananaPrice ?? '0'),
              },
            }),
          )
          .catch((e) => {
            toastError(e)
          })
      } catch (e) {
        return false
      }
    },
    [bananaPrice, toastError, treasuryContract],
  )

  return { handleBuy }
}
