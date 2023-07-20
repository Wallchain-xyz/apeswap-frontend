import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import { orderBy } from 'lodash'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import track from 'utils/track'
import { getDotPos } from 'utils/getDotPos'
import {
  NewsCard,
  // NewsWrapper,
  SkeletonWrapper,
} from './styles'
import { useRouter } from 'next/router'
import { useWeb3React } from '@web3-react/core'
import { Flex, Skeleton, SwiperDots } from 'components/uikit'
import { useFetchHomepageNews, useHomepageNews } from 'state/homepage/hooks'
import { NewsCardType } from 'state/homepage/types'
import { Box } from 'theme-ui'

const SLIDE_DELAY = 500000000

SwiperCore.use([Autoplay])

const News: React.FC = () => {
  const { push } = useRouter()
  const { chainId } = useWeb3React()
  const [loadImages, setLoadImages] = useState(false)
  useFetchHomepageNews(true)
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
  const newsLength = filterNews?.length || 0
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const { observerRef, isIntersecting } = useIntersectionObserver()

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

  const SwipeNav = ({ handleNav }: { handleNav: () => void }) => {
    return (
      <Flex
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: ['none', 'none', 'flex'],
          height: '100%',
          cursor: 'pointer',
          width: '60px',
          position: 'relative',
        }}
        // onClick={() => swiper?.slidePrev()}
        onClick={handleNav}
      >
        <Image
          src="/images/discover-new-opportunities/caret-right-yellow.svg"
          width={10}
          height={10}
          alt="caret right"
        />
        <Flex
          sx={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '10',
            opacity: '0',
            bg: 'white2Opacity09',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            left: 0,
            cursor: 'pointer',
            transition: 'opacity 0.3s',
            '&:hover': { opacity: '1', backdropFilter: 'blur(1.5px)' },
          }}
        >
          <Image
            src="/images/discover-new-opportunities/caret-right-yellow.svg"
            width={10}
            height={10}
            alt="caret right"
          />
        </Flex>
      </Flex>
    )
  }

  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        maxWidth: '1552px',
        alignSelf: 'center',
      }}
    >
      <SwipeNav handleNav={() => swiper?.slidePrev()} />
      <Flex sx={{ width: '100%', mx: '20px' }}>
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
            lazy
            preloadImages={false}
            onSlideChange={handleSlide}
          >
            {filterNews?.map((news, index) => {
              return (
                <SwiperSlide
                  // style={{ maxWidth: '224px', minWidth: '224px' }}
                  style={{ maxWidth: '264px', minWidth: '264px' }}
                  key={`${index}-${news.id}`}
                  id={`${index}-${news.id}`}
                >
                  <Flex
                    // sx={{ maxWidth: '266px', minWidth: '266px' }}
                    key={`${index}-${news.id}`}
                    id={`${index}-${news.id}`}
                    onClick={() => clickNews(news?.CardLink, news?.isModal)}
                  >
                    <NewsCard
                      index={activeSlide}
                      image={news?.cardImageUrl?.url}
                      key={`${index}-${news.id}`}
                      id={`${index}-${news.id}`}
                      listLength={newsLength}
                      onClick={() => trackBannersClick(index + 1, news?.CardLink, chainId)}
                    />
                  </Flex>
                </SwiperSlide>
              )
            })}
          </Swiper>
        ) : (
          <SkeletonWrapper>
            {[...Array(5)].map((i, index) => {
              return <Skeleton width="266px" height="332.5px" key={`skeleton-${index}`} />
            })}
          </SkeletonWrapper>
        )}
      </Flex>
      <SwipeNav handleNav={() => swiper?.slideNext()} />
    </Flex>
  )
}

export default React.memo(News)
