import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useTranslation } from 'contexts/Localization'
import track from 'utils/track'
import { TokenDisplayAmount } from './types'
import { useWeb3React } from '@web3-react/core'
import { useFetchHomepageTokenStats, useHomepageTokenStats } from 'state/homepage/hooks'
import useInterval from 'lib/hooks/useInterval'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { Flex, Link, Skeleton, Text } from 'components/uikit'
import Image from 'next/image'
import { Container, Title, TokenContainer, TrendingTokensWrapper } from './styles'

const NUMBER_OF_TOKENS_TO_DISPLAY = 6
const TOKEN_DELAY = 10000
const CATEGORIES = ['primary', 'partner', 'trending']

const TrendingTokens: React.FC = () => {
  const { chainId } = useWeb3React()
  const [loadTokens, setLoadTokens] = useState(false)
  const [selectedCat, setSelectedCat] = useState('')
  useFetchHomepageTokenStats(loadTokens, selectedCat)
  const tokens = useHomepageTokenStats()
  const [tokenDisplayRange, setTokenDisplayRange] = useState<TokenDisplayAmount>({
    tokenStartIndex: 0,
    tokenEndIndex: NUMBER_OF_TOKENS_TO_DISPLAY,
  })
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const swapTokens = () => {
    const tokenListLength = tokens?.length || 0
    if (tokenListLength % NUMBER_OF_TOKENS_TO_DISPLAY !== 0) {
      setTokenDisplayRange(tokenDisplayRange)
    } else if (tokenDisplayRange.tokenEndIndex + NUMBER_OF_TOKENS_TO_DISPLAY > tokenListLength) {
      setTokenDisplayRange({
        tokenStartIndex: 0,
        tokenEndIndex: NUMBER_OF_TOKENS_TO_DISPLAY,
      })
    } else {
      setTokenDisplayRange((prev) => ({
        tokenStartIndex: prev.tokenEndIndex,
        tokenEndIndex: tokenDisplayRange.tokenEndIndex + NUMBER_OF_TOKENS_TO_DISPLAY,
      }))
    }
  }
  useInterval(swapTokens, TOKEN_DELAY, false)
  useEffect(() => {
    if (isIntersecting) {
      setLoadTokens(true)
    }
  }, [isIntersecting])

  useEffect(() => {
    if (chainId === SupportedChainId.POLYGON) {
      setSelectedCat('polygon')
    } else if (chainId === SupportedChainId.TLOS) {
      setSelectedCat('telos')
    } else {
      setSelectedCat(CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)])
    }
  }, [chainId])

  return (
    <>
      <div ref={observerRef} />
      <Container>
        <TrendingTokensWrapper sx={{ background: 'white2' }}>
          <Title>
            {t(selectedCat?.charAt(0)?.toUpperCase() + selectedCat?.slice(1))} {t('Tokens')}
          </Title>
          <Flex sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'space-between' }}>
            {tokens ? (
              <>
                {tokens?.slice(tokenDisplayRange.tokenStartIndex, tokenDisplayRange.tokenEndIndex)?.map((token, i) => {
                  return (
                    <TokenContainer
                      href={`/swap/?outputCurrency=${token?.contractAddress}`}
                      key={token?.contractAddress}
                      active={i >= tokenDisplayRange.tokenStartIndex && i < tokenDisplayRange.tokenEndIndex}
                      onClick={() =>
                        track({
                          event: 'tokenClick',
                          chain: chainId,
                          data: {
                            token: token?.tokenTicker,
                            variation: token?.percentChange,
                            category: selectedCat,
                          },
                        })
                      }
                    >
                      <Flex>
                        <Image
                          src={token?.logoUrl}
                          alt={token?.tokenTicker}
                          sx={{
                            height: '36px',
                            width: '36px',
                            borderRadius: '50px',
                          }}
                          height={36}
                          width={36}
                        />
                      </Flex>
                      <Flex sx={{ height: '36px', width: '100px', flexDirection: 'column', ml: '10px' }}>
                        <Flex
                          sx={{ width: '100%', height: '50%', alignItems: 'center', justifyContent: 'space-between' }}
                        >
                          <Text size="12px">{token?.tokenTicker}</Text>
                          <Text size="12px" color={token?.percentChange < 0 ? 'error' : 'success'}>
                            {token?.percentChange > 0 && '+'}
                            <CountUp end={token?.percentChange * 100} decimals={2} duration={1.5} />%
                          </Text>
                        </Flex>
                        <Flex alignItems="center" sx={{ width: '100%', height: '50%' }}>
                          <Text>
                            $
                            <CountUp
                              end={token?.tokenPrice}
                              decimals={token?.tokenPrice > 1 ? 2 : token?.tokenPrice > 0.01 ? 4 : 6}
                              duration={1.5}
                              separator=","
                            />
                          </Text>
                        </Flex>
                      </Flex>
                    </TokenContainer>
                  )
                })}
              </>
            ) : (
              [...Array(NUMBER_OF_TOKENS_TO_DISPLAY)].map((i) => {
                return (
                  <Flex active key={i}>
                    <Flex sx={{ width: '136px' }}>
                      <Skeleton height="50px" width="136px" />
                    </Flex>
                  </Flex>
                )
              })
            )}
          </Flex>
        </TrendingTokensWrapper>
      </Container>
    </>
  )
}

export default React.memo(TrendingTokens)
