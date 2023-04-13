import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import SwiperCore from 'swiper'
import useSwiper from 'hooks/useSwiper'
import { useTranslation } from 'contexts/Localization'
import { useFetchHomepageLaunchCalendar, useHomepageLaunchCalendar } from 'state/homepage/hooks'
import { useTheme } from '@emotion/react'
import { Flex, Skeleton, Text } from 'components/uikit'
import Image from 'next/image'
import {
  Bubble,
  CalendarImg,
  ColorWrap,
  LaunchCalendarWrapper,
  LaunchCard,
  LaunchText,
  SkeletonWrapper,
} from './styles'

const LaunchCalendar: React.FC = () => {
  const [loadNews, setLoadNews] = useState(false)
  const today = new Date()
  today.setHours(today.getHours() - 6)
  useFetchHomepageLaunchCalendar(loadNews)
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const launchCal = useHomepageLaunchCalendar()
  const sortLaunch = launchCal?.filter((launch) => new Date(launch.launchTime) > today)
  const launchCalLength = sortLaunch?.length || 0
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const { t } = useTranslation()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

  const handleSlide = (event: SwiperCore) => {
    setActiveSlide(event.activeIndex)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadNews(true)
    }
  }, [isIntersecting])

  return (
    <>
      <div ref={observerRef} />
      <ColorWrap>
        <LaunchCalendarWrapper>
          <LaunchText bold>{t('Launch Calendar')}</LaunchText>
          <Flex sx={{ width: '100%', overflow: 'hidden', justifyContent: 'space-around' }}>
            {sortLaunch ? (
              <Swiper
                id="launchSwiper"
                initialSlide={0}
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                resizeObserver
                centeredSlides
                onSlideChange={handleSlide}
                breakpoints={{
                  480: {
                    centeredSlides: false,
                  },
                }}
              >
                {sortLaunch?.map((launch, i) => {
                  const date = new Date(launch.launchTime)
                  const slide = (
                    <SwiperSlide
                      style={{ maxWidth: '219px', minWidth: '219px' }}
                      key={`${launch?.textLine1}-${launch?.launchTime}`}
                    >
                      <LaunchCard>
                        <Flex sx={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                          <Text size="30px" mb='10px'>
                            {date.getUTCDate()} {date.toUTCString().split(' ')[2]}
                          </Text>
                          <Text size="12px">
                            {date.getUTCHours()}:{date?.getUTCMinutes() === 0 ? '00' : date?.getUTCMinutes()} UTC
                          </Text>
                        </Flex>
                        <Flex
                          sx={{
                            display: 'flex',
                            mt: '10px',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            flexDirection: 'row',
                          }}
                        >
                          <CalendarImg image={launch.image1?.url} />
                          {launch?.image2 && <CalendarImg image={launch.image2?.url} />}
                        </Flex>
                        <Flex
                          sx={{
                            display: 'flex',
                            mt: '10px',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                        >
                          <Text>{launch.textLine1}</Text>
                          {launch?.textLine2 && <Text>{launch.textLine2}</Text>}
                          {launch?.textLine3 && <Text>{launch.textLine3}</Text>}
                        </Flex>
                      </LaunchCard>
                    </SwiperSlide>
                  )

                  if (i === launchCalLength - 1) {
                    return (
                      <>
                        {slide}
                        <SwiperSlide style={{ maxWidth: '219px', minWidth: '219px' }} key={`${launch?.textLine1}-${i}`}>
                          <Flex>
                            <Flex sx={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                              {/* <QuestionMark fill={theme.colors.text} /> */}
                            </Flex>
                          </Flex>
                        </SwiperSlide>
                      </>
                    )
                  }
                  return slide
                })}
              </Swiper>
            ) : (
              <SkeletonWrapper>
                {[...Array(6)].map((i) => {
                  return <Skeleton width="219px" height="219px" key={i} />
                })}
              </SkeletonWrapper>
            )}
          </Flex>
          <Flex
            sx={{
              position: 'absolute',
              bottom: '35px',
              left: '0',
              width: '100%',
              justifyContent: 'center',
              alignContent: 'center',
            }}
          >
            {[...Array(launchCalLength + 1)].map((_, i) => {
              return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} key={i} />
            })}
          </Flex>
        </LaunchCalendarWrapper>
      </ColorWrap>
    </>
  )
}

export default LaunchCalendar
