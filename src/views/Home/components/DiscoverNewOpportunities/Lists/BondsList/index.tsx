import { SupportedChainId } from '@ape.swap/sdk-core'

import { useState } from 'react'
import { Grid, Box } from 'theme-ui'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay } from 'swiper'
import 'swiper/swiper.min.css'
import { chunk } from 'lodash'

// Components
import { Flex, SwiperDots } from 'components/uikit'
import Card from '../../Card'

// Hooks
import useSwiper from 'hooks/useSwiper'

// Utils
import { getDotPos } from 'utils/getDotPos'

// Types
import { BondDTO } from 'utils/types/homepage'

interface BondsListProps {
  bonds: BondDTO[]
}

const BondsList = ({ bonds }: BondsListProps) => {
  const [activeSlide, setActiveSlide] = useState(0)
  const { swiper, setSwiper } = useSwiper()

  const chunkedBonds = chunk(bonds, 4)

  const slides = chunkedBonds.map((chunk, index) => (
    <Grid key={index} sx={{ width: '100%' }} columns="1fr">
      {chunk.map((item, itemIndex) => {
        return <Card item={item} key={`${item.payoutTokenName}${itemIndex}`} />
      })}
    </Grid>
  ))

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, 2)
    setActiveSlide(slideNumber)
  }

  const slideTo = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(index)
  }

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
          id="bondsListSwiper"
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
          mt: '70px',
          display: ['none', 'none', 'grid'],
        }}
      >
        {chunkedBonds.map((chunk, index) => (
          <Flex key={index} sx={{ flexDirection: 'column', gap: '15px' }}>
            {chunk.map((item, itemIndex) => {
              return <Card item={item} key={`${item.payoutTokenName}${itemIndex}`} />
            })}
          </Flex>
        ))}
      </Grid>
    </>
  )
}

export default BondsList
