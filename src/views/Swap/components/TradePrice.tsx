import { Currency, Price } from '@ape.swap/sdk-core'
import { Flex, Text } from 'components/uikit'
import useStablecoinPrice from 'hooks/useStablecoinPrice'
import { useState } from 'react'
import { formatTransactionAmount, priceToPreciseFloat } from 'utils/formatNumbers'

const TradePrice = ({ price }: { price: Price<Currency, Currency> | undefined }) => {
  const [showInverted, setShowInverted] = useState<boolean>(false)

  const usdcPrice = useStablecoinPrice(showInverted ? price?.baseCurrency : price?.quoteCurrency)

  let formattedPrice: string
  try {
    formattedPrice = showInverted
      ? formatTransactionAmount(priceToPreciseFloat(price))
      : formatTransactionAmount(priceToPreciseFloat(price?.invert()))
  } catch (error) {
    formattedPrice = '0'
  }

  const label = showInverted ? `${price?.quoteCurrency?.symbol}` : `${price?.baseCurrency?.symbol} `
  const labelInverted = showInverted ? `${price?.baseCurrency?.symbol} ` : `${price?.quoteCurrency?.symbol}`

  const text = `${'1 ' + labelInverted + ' = ' + formattedPrice ?? '-'} ${label}`

  return (
    <Flex onClick={() => setShowInverted((prev) => !prev)} sx={{ width: 'fit-content', zIndex: 1 }}>
      <Text size="14px">{text}</Text>
    </Flex>
  )
}

export default TradePrice
