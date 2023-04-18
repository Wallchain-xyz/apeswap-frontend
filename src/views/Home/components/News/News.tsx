import React, { useEffect, useState } from 'react'
import { Box } from 'theme-ui'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import { orderBy } from 'lodash'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import track from 'utils/track'
import { getDotPos } from 'utils/getDotPos'
import { Bubble, NewsCard, NewsWrapper, SkeletonWrapper, styles } from './styles'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Skeleton } from 'components/uikit'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useFetchHomepageNews, useHomepageNews } from 'state/homepage/hooks'
import Image from 'next/image'
import { NewsCardType } from 'state/homepage/types'

const SLIDE_DELAY = 5000

SwiperCore.use([Autoplay])

const News: React.FC = () => {
  const { push } = useRouter()
  const { chainId } = useWeb3React()
  const [loadImages, setLoadImages] = useState(false)
  useFetchHomepageNews(loadImages)
  const today = new Date()
  const fetchedNews = useHomepageNews()
  // @ts-ignore
  const sortedNews: NewsCardType[] = fetchedNews ? orderBy(fetchedNews, 'CardPosition') : []
  const filterNews = sortedNews
    ? sortedNews.filter(
        (news) =>
          // @ts-ignore
          (new Date(news.StartTime) <= today && new Date(news.EndTime) > today) || (!news.StartTime && !news.EndTime),
      )
    : []
  //console.log(filterNews)
  const newsLength = filterNews?.length || 0
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()

  const slideNewsNav = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(newsLength + index)
  }

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, newsLength)
    setActiveSlide(slideNumber)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadImages(true)
    }
  }, [isIntersecting])

  const trackBannersClick = (bannerId: number, clickUrl: string, chainIdentifier: string | number | undefined) => {
    track({
      event: 'newsClick',
      chain: chainIdentifier,
      data: {
        banner: bannerId,
        clickUrl,
      },
    })
  }

  const clickNews = (newsUrl: string, isModal: boolean) =>
    isModal ? push({ search: newsUrl }) : window.open(newsUrl, '_blank')

  return (
    <>
      <div ref={observerRef} />
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          width: '100%',
        }}
      >
        <NewsWrapper>
          <Flex sx={{ width: '100%', overflow: 'hidden', justifyContent: 'space-between' }}>
            {filterNews?.length > 0 ? (
              <Swiper
                id="newsSwiper"
                autoplay={{
                  delay: filterNews?.length === 5 ? 10000000 : SLIDE_DELAY,
                  disableOnInteraction: false,
                }}
                loop
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView="auto"
                loopedSlides={newsLength}
                centeredSlides
                resizeObserver
                onSlideChange={handleSlide}
              >
                {filterNews?.map((news, index) => {
                  return (
                    <SwiperSlide style={{ maxWidth: '266px', minWidth: '266px' }} key={news.id}>
                      <Box
                        sx={{ maxWidth: '266px', minWidth: '266px' }}
                        onClick={() => clickNews(news?.CardLink, news?.isModal)}
                      >
                        <NewsCard
                          index={activeSlide}
                          image={news?.cardImageUrl?.url}
                          key={news?.cardImageUrl?.url}
                          listLength={newsLength}
                          onClick={() => trackBannersClick(index + 1, news?.CardLink, chainId)}
                        />
                      </Box>
                    </SwiperSlide>
                  )
                })}
              </Swiper>
            ) : (
              <SkeletonWrapper>
                {[...Array(5)].map((i) => {
                  return <Skeleton width="266px" height="332.5px" key={i} />
                })}
              </SkeletonWrapper>
            )}
          </Flex>
        </NewsWrapper>
        {loadImages && (
          <Flex sx={{ position: 'absolute', bottom: '50px', justifyContent: 'center', alignContent: 'center' }}>
            {[...Array(newsLength)].map((_, i) => {
              return <Bubble isActive={i === activeSlide} onClick={() => slideNewsNav(i)} key={i} />
            })}
          </Flex>
        )}
      </Flex>
    </>
  )
}

export default React.memo(News)
