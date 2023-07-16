import { useState } from 'react'
import { Grid, Box } from 'theme-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import 'swiper/swiper.min.css'
import { chunk } from 'lodash'

// Components
import { Flex, SwiperDots, Text } from 'components/uikit'
import ListCard from '../ListCard'

// Hooks
import useSwiper from 'hooks/useSwiper'
import { useTranslation } from 'contexts/Localization'

// Utils
import { getDotPos } from 'utils/getDotPos'

// Types
import { TokenDTO } from 'utils/types/homepage'

interface TokensListProps {
  tokens: TokenDTO[]
}

const TokensList = ({ tokens }: TokensListProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { swiper, setSwiper } = useSwiper()
  const { t } = useTranslation()

  const checkArrayLength = (arr: TokenDTO[]): TokenDTO[] => {
    if (arr.length === 12) {
      return arr
    } else {
      const lastItem = arr[arr.length - 1]
      while (arr.length < 12) {
        arr.push(lastItem)
      }
      return arr
    }
  }

  const chunkedTokens = chunk(checkArrayLength(tokens), 4)

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, 2)
    setActiveSlide(slideNumber)
  }

  const slideTo = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

  const getTitle = (index: number) => {
    switch (index) {
      case 0:
        return t('Trending')
      case 1:
        return t('Most Traded')
      default:
        return t('New')
    }
  }

  const renderListCard = (item: TokenDTO, itemIndex: number): JSX.Element => {
    const { tokenTicker, chainId, priceChange24h, tokenPrice } = item
    return (
      <ListCard
        key={`${tokenTicker}${itemIndex}`}
        name={tokenTicker}
        chainId={chainId}
        serviceTokenProps={{ token1: tokenTicker }}
        bg="transparent"
        rightContent={
          <Flex sx={{ flexDirection: 'column', alignItems: 'end' }}>
            <Box
              sx={{
                fontSize: ['10px', '10px', '12px'],
                fontWeight: 'bold',
                color: priceChange24h >= 0 ? 'success' : 'error',
              }}
            >
              {priceChange24h}%
            </Box>
            <Box
              sx={{
                fontSize: ['12px', '12px', '14px'],
                fontWeight: 'bold',
                display: ['flex', 'flex', 'none'],
              }}
            >
              ${String(tokenPrice).slice(0, 6)}
            </Box>
            <Box
              sx={{
                fontSize: ['12px', '12px', '14px'],
                fontWeight: 'bold',
                display: ['none', 'none', 'flex'],
              }}
            >
              ${tokenPrice}
            </Box>
          </Flex>
        }
      />
    )
  }

  const slides = chunkedTokens.map((chunk, index) => {
    return (
      <Grid key={index} sx={{ width: '100%' }} columns="1fr">
        <Flex sx={{ justifyContent: 'center' }}>
          <Text sx={{ fontSize: '12px', fontWeight: '300', color: '#A09F9C' }}>{getTitle(index)}</Text>
        </Flex>
        <Flex sx={{ flexDirection: 'column', gap: '10px', bg: 'white2', borderRadius: '10px' }}>
          {chunk.map((item, itemIndex) => renderListCard(item, itemIndex))}
        </Flex>
      </Grid>
    )
  })

  return (
    <>
      {/* Mobile view starts */}
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          display: ['flex', 'flex', 'none'],
          mt: '30px',
        }}
      >
        <Swiper
          id="tokensListSwiper"
          onSwiper={setSwiper}
          slidesPerView="auto"
          centeredSlides
          lazy
          preloadImages={false}
          onSlideChange={handleSlide}
          style={{ width: '100%' }}
        >
          {slides.map((slide, index) => {
            return (
              <SwiperSlide
                style={{
                  width: '100%',
                  padding: '1px',
                  height: 'fit-content',
                  display: 'flex',
                  justifyContent: 'center',
                }}
                key={index}
              >
                {slide}
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Flex
          sx={{
            position: 'relative',
            width: '95vw',
            maxWidth: '1412px',
            justifyContent: ['center', 'center', 'center', 'flex-start'],
          }}
        >
          <Flex sx={{ mt: '50px' }}>
            {[...Array(slides.length)].map((_, i) => {
              return <SwiperDots isActive={i === activeSlide} onClick={() => slideTo(i)} key={i} />
            })}
          </Flex>
        </Flex>
      </Flex>
      {/* Desktop view starts */}
      <Grid
        columns="1fr 1fr 1fr"
        sx={{
          gridGap: '10px',
          mt: '35px',
          display: ['none', 'none', 'grid'],
        }}
      >
        {chunkedTokens.map((chunk, index) => {
          return (
            <Flex key={index} sx={{ flexDirection: 'column', gap: '15px' }}>
              <Flex sx={{ justifyContent: 'center' }}>
                <Text sx={{ fontSize: '16px', fontWeight: '300', color: '#A09F9C' }}>{getTitle(index)}</Text>
              </Flex>
              <Flex sx={{ flexDirection: 'column', gap: '10px', bg: 'white2', borderRadius: '10px' }}>
                {chunk.map((item, itemIndex) => renderListCard(item, itemIndex))}
              </Flex>
            </Flex>
          )
        })}
      </Grid>
    </>
  )
}

export default TokensList
