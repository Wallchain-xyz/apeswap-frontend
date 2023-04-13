import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import { useTranslation } from 'contexts/Localization'
import { statsData } from './statsData'
import { Flex, Skeleton, Text } from 'components/uikit'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useFetchHomepageStats, useHomepageStats } from 'state/homepage/hooks'
import { CardWrapper, StyledCard } from './styles'
import { useTheme } from '@emotion/react'
import useIsMobile from 'hooks/useIsMobile'

const StatCards: React.FC = () => {
  const [loadStats, setLoadStats] = useState(false)
  const isMobile = useIsMobile()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { t } = useTranslation()
  const theme = useTheme()
  useFetchHomepageStats(loadStats)
  const rawStats = useHomepageStats()
  const stats = statsData(t).map((stat) => {
    const statId = stat.id
    // @ts-ignore
    return { ...stat, value: rawStats ? rawStats[statId] : null }
  })

  useEffect(() => {
    if (isIntersecting) {
      setLoadStats(true)
    }
  }, [isIntersecting])

  return (
    <>
      <div ref={observerRef} />
      <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <CardWrapper>
          {stats?.map((stat) => {
            return (
              <StyledCard key={stat.id}>
                {!isMobile && (
                  <Flex sx={{ height: '10px', alignItems: 'center', justifyContent: 'center', mb: '20px' }}>
                    <stat.logo fill="text" color="white2" />
                  </Flex>
                )}
                <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <Text sx={{ lineHeight: '20px', textAlign: 'center' }}>{stat.title}</Text>
                </Flex>
                <Flex sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  {stat?.value ? (
                    <Text size="28px" sx={{ lineHeight: '30px' }}>
                      {stat?.title !== t('Partners') && '$'}
                      <CountUp end={stat?.value} decimals={0} duration={1} separator="," />
                    </Text>
                  ) : (
                    <Skeleton width="220px" height="30px" />
                  )}
                </Flex>
              </StyledCard>
            )
          })}
        </CardWrapper>
      </Flex>
    </>
  )
}

export default React.memo(StatCards)
