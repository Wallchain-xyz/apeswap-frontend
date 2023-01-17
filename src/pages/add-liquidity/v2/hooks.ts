import { Currency } from '@ape.swap/sdk-core'
import { useRouter } from 'next/router'
import { useCallback } from 'react'
import { currencyId } from 'utils/currencyId'

const useHandleCurrencyASelect = ({ currencyIdB, currencyIdA }: { currencyIdB: string; currencyIdA: string }) => {
  const { push } = useRouter()
  return useCallback(
    (currencyA: Currency) => {
      const newCurrencyIdA = currencyId(currencyA)
      if (newCurrencyIdA === currencyIdB) {
        push(`/add-liquidity/v2/${currencyIdB}/${currencyIdA}`)
      } else {
        push(`/add-liquidity/v2/${newCurrencyIdA}/${currencyIdB}`)
      }
    },
    [currencyIdB, currencyIdA, push],
  )
}

export const useHandleCurrencyBSelect = ({
  currencyIdA,
  currencyIdB,
}: {
  currencyIdA: string
  currencyIdB: string
}) => {
  const { push } = useRouter()
  return useCallback(
    (currencyB: Currency) => {
      const newCurrencyIdB = currencyId(currencyB)
      if (currencyIdA === newCurrencyIdB) {
        if (currencyIdB) {
          push(`/add-liquidity/v2/?currencyIdB=${currencyIdB}/${newCurrencyIdB}`)
        } else {
          push(`/add-liquidity/v2/${newCurrencyIdB}`)
        }
      } else {
        push(`/add-liquidity/v2/${currencyIdA ? currencyIdA : 'ETH'}/${newCurrencyIdB}`)
      }
    },
    [currencyIdB, currencyIdA, push],
  )
}

export default useHandleCurrencyASelect
