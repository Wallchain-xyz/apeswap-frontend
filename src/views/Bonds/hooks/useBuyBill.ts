import { useCallback } from 'react'
import track from 'utils/track'
import { useBillType } from './useBillType'
import { useWeb3React } from '@web3-react/core'
import { useBondContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'

const DEFAULT_SLIPPAGE = 102 // Maximum of 2% slippage when buying Bill
// Buy a Bill
const useBuyBill = (
  billAddress: string,
  amount: string,
  lpPrice: number,
  price: string,
  slippage = DEFAULT_SLIPPAGE,
) => {
  const { chainId, account } = useWeb3React()
  const bondContract = useBondContract(billAddress)
  const billType: string | undefined = useBillType(billAddress)
  const usdAmount: number = parseFloat(amount) * lpPrice
  const maxPrice = new BigNumber(price).times(slippage).div(100)
  // TODO: Error handling .. etc
  const handleBuyBill = useCallback(async () => {
    console.log('HERERERE')
    console.log('HERERERE')
    console.log('HERERERE')
    console.log('HERERERE')
    console.log('HERERERE')
    console.log('HERERERE')

    console.log(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    console.log(maxPrice.toFixed(0))
    const tx = await bondContract.deposit(
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
      maxPrice.toFixed(0),
      account ?? '',
    )
    track({
      event: billType ?? '',
      chain: chainId,
      data: {
        cat: 'buy',
        address: bondContract?.address,
        amount,
        usdAmount,
      },
    })
    return tx
  }, [bondContract, amount, account, chainId, billType, usdAmount, maxPrice])

  return { onBuyBill: handleBuyBill }
}

export default useBuyBill
