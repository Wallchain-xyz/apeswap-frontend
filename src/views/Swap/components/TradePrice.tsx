import { Currency, Price } from '@ape.swap/sdk-core'
import { Flex, Text } from 'components/uikit'
import useStablecoinPrice from 'hooks/useStablecoinPrice'
import { useState } from 'react'
import { formatTransactionAmount, priceToPreciseFloat } from 'utils/formatNumbers'
import { parseOutputAmount, toPrecisionAvoidExponential } from '../utils'
import BigNumber from 'bignumber.js'
import { getBNWithDecimals } from '../../../utils/getBalanceNumber'
import { Token } from '@lifi/sdk'

const TradePrice = ({ fromAmount, fromToken, toAmount, toToken }: { fromAmount: string, fromToken: Token, toAmount: string, toToken: Token }) => {
  const [showInverted, setShowInverted] = useState<boolean>(false)

  const {decimals: fromDecimals, symbol: fromSymbol} = fromToken
  const {decimals: toDecimals, symbol: toSymbol} = toToken

  const fromNumber: BigNumber = getBNWithDecimals(fromAmount, fromDecimals) ?? new BigNumber(0);
  const toNumber: BigNumber = getBNWithDecimals(toAmount, toDecimals) ?? new BigNumber(0);
  const price: BigNumber = fromNumber.div(toNumber);
  const invertedPrice: BigNumber = toNumber.div(fromNumber);

  const pricePrecision: string = toPrecisionAvoidExponential(price)
  const invertedPricePrecision: string = toPrecisionAvoidExponential(invertedPrice)

  const label = `1 ${toSymbol.toUpperCase()} = ${pricePrecision} ${fromSymbol.toUpperCase()}`
  const invertedLabel = `1 ${fromSymbol.toUpperCase()} = ${invertedPricePrecision} ${toSymbol.toUpperCase()}`

  return (
    <Flex onClick={() => setShowInverted((prev) => !prev)} sx={{ minWidth: 'fit-content', zIndex: 1 }}>
      <Text size="12px">{showInverted ? label : invertedLabel}</Text>
    </Flex>
  )
}

export default TradePrice
