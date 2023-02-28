import { Currency, Token } from '@ape.swap/sdk-core'
import { TokenInfo } from '@uniswap/token-lists'
import { Skeleton } from 'components/uikit'
import useAssetLogoSource from 'hooks/useAssetLogoSource'
import Image from 'next/image'
import { CSSProperties } from 'theme-ui'

const CurrencyLogo = ({
  currency,
  style,
  size = 30,
}: {
  currency?: Currency
  size?: number
  style?: CSSProperties
}) => {
  const [src, nextSrc] = useAssetLogoSource(
    currency?.wrapped.address,
    currency?.chainId,
    currency?.isNative,
    (currency as TokenInfo)?.logoURI,
  )

  return src ? (
    <Image
      src={src}
      onError={nextSrc}
      alt={currency?.name || ''}
      height={size}
      width={size}
      sx={{ borderRadius: size / 2, ...style }}
    />
  ) : (
    <Skeleton height={size} width={size} sx={{ borderRadius: size / 2, ...style }} animation="waves" />
  )
}

export default CurrencyLogo
