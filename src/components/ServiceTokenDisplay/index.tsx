import React from 'react'
import { TokenContainer, TokenWrapper } from './styles'
import { Flex, Svg } from 'components/uikit'

interface ServiceTokenDisplayProps {
  token1: string | undefined
  token2?: string
  token3?: string
  token4?: string
  stakeLp?: boolean
  earnLp?: boolean
  noEarnToken?: boolean
  iconFill?: string
  size?: number
  billArrow?: boolean
  dualEarn?: boolean
  tokensMargin?: number
}

const setUrls = (tokenSymbol: string) => {
  return [
    `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol?.toUpperCase()}.svg`,
    `https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/${tokenSymbol?.toUpperCase()}.png`,
  ]
}

const ServiceTokenDisplay: React.FC<ServiceTokenDisplayProps> = ({
  token1,
  token2,
  token3,
  token4,
  iconFill,
  size,
  billArrow,
  stakeLp = false,
  earnLp = false,
  noEarnToken = false,
  dualEarn = false,
  tokensMargin,
}) => {
  const token1Urls = setUrls(token1 || '')
  const token2Urls = token2 ? setUrls(token2) : []
  const token3Urls = token3 ? setUrls(token3) : []
  const token4Urls = token4 ? setUrls(token4) : []

  const LpToken = (
    <Flex sx={{ alignItems: 'center' }}>
      <TokenWrapper size={size} zIndex={5}>
        <TokenContainer zIndex={1} srcs={token1Urls} size={size} />
      </TokenWrapper>
      <TokenWrapper ml={tokensMargin ? tokensMargin : -15} size={size}>
        <TokenContainer srcs={token2Urls} size={size} />
      </TokenWrapper>
    </Flex>
  )

  const StakeTokenEarnToken = (
    <Flex sx={{ alignItems: 'center' }}>
      <TokenWrapper>
        <TokenContainer srcs={token1Urls} size={size} />
      </TokenWrapper>
      <Svg icon="arrow" direction="right" />
      <TokenWrapper>
        <TokenContainer srcs={token2Urls} size={size} />
      </TokenWrapper>
    </Flex>
  )

  const StakeLpEarnToken = (
    <Flex sx={{ alignItems: 'center' }}>
      <TokenWrapper size={size} zIndex={5}>
        <TokenContainer srcs={token1Urls} size={size} />
      </TokenWrapper>
      <TokenWrapper size={size} ml={tokensMargin ? tokensMargin : -15}>
        <TokenContainer srcs={token2Urls} size={size} />
      </TokenWrapper>
      {billArrow ? <Svg icon="arrow" direction="right" /> : <Svg icon="arrow" direction="right" />}
      <TokenWrapper size={size}>
        <TokenContainer srcs={token3Urls} size={size} />
      </TokenWrapper>
    </Flex>
  )
  const StakeLpEarnLp = (
    <Flex sx={{ alignItems: 'center' }}>
      <TokenContainer zIndex={1} srcs={token1Urls} size={size} />
      <TokenContainer ml={tokensMargin ? tokensMargin : -15} srcs={token2Urls} size={size} />
      <Svg icon="arrow" direction="right" width={30} />
      <TokenContainer zIndex={1} srcs={token3Urls} size={size} />
      {token4 !== undefined && <TokenContainer ml={-15} srcs={token4Urls} size={size} />}
    </Flex>
  )
  const DualEarn = (
    <Flex sx={{ alignItems: 'center' }}>
      <TokenWrapper zIndex={5}>
        <TokenContainer zIndex={1} srcs={token1Urls} size={size} />
      </TokenWrapper>
      <TokenWrapper ml={tokensMargin ? tokensMargin : -15} zIndex={1}>
        <TokenContainer srcs={token2Urls} size={size} />
      </TokenWrapper>
      <Svg icon="arrow" direction="right" />
      <TokenWrapper mt={-20} size={25}>
        <TokenContainer srcs={token3Urls} size={25} />
      </TokenWrapper>
      <TokenWrapper mt={18} size={25}>
        <TokenContainer srcs={token4Urls} size={25} />
      </TokenWrapper>
    </Flex>
  )
  const StakeTokenEarnLp = (
    <Flex sx={{ alignItems: 'center' }}>
      <TokenWrapper>
        <TokenContainer srcs={token1Urls} size={size} />
      </TokenWrapper>
      <Svg icon="arrow" direction="right" />
      <TokenWrapper zIndex={5}>
        <TokenContainer zIndex={1} srcs={token2Urls} size={size} />
      </TokenWrapper>
      <TokenWrapper ml={tokensMargin ? tokensMargin : -15}>
        <TokenContainer srcs={token3Urls} size={size} />
      </TokenWrapper>
    </Flex>
  )
  const displayToReturn = () => {
    if (token1 && !token2 && !token3 && !token4) {
      return (
        <Flex sx={{ alignItems: 'center' }}>
          <TokenWrapper size={size}>
            <TokenContainer srcs={token1Urls} size={size} />
          </TokenWrapper>
        </Flex>
      )
    }
    if (stakeLp && earnLp) {
      return StakeLpEarnLp
    }
    if (noEarnToken) {
      return LpToken
    }
    if (dualEarn) {
      return DualEarn
    }
    if (!stakeLp && !earnLp) {
      return StakeTokenEarnToken
    }
    if (stakeLp && !earnLp) {
      return StakeLpEarnToken
    }
    return StakeTokenEarnLp
  }

  return displayToReturn()
}

export default React.memo(ServiceTokenDisplay)
