import { Currency } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'

const DoubleCurrencyLogo = ({
  currency0,
  currency1,
  size = 30,
}: {
  currency0?: Currency
  currency1?: Currency
  size?: number
}) => {
  return (
    <>
      <CurrencyLogo currency={currency0} size={size} style={{ zIndex: 1 }} />
      <CurrencyLogo
        currency={currency1}
        size={size}
        style={{ transform: 'translate(-13px, 0px)', marginRight: '-13px' }}
      />
    </>
  )
}

export default DoubleCurrencyLogo
