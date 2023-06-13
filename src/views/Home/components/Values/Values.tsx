'use client'
// TODO: When updating homepage remove mobile hook and client
import React, { useEffect, useState } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import useSwiper from 'hooks/useSwiper'
import useIntersectionObserver from 'hooks/useIntersectionObserver'
import { useTranslation } from 'contexts/Localization'
import { getDotPos } from 'utils/getDotPos'
import { ValueCard, ValueImage, ValuesWrapper, ValueText } from './styles'
import { defaultValues } from './defaultValues'
import { Flex, Link, Skeleton, SwiperDots, Text } from 'components/uikit'
import Image from 'next/image'
import useIsMobile from 'hooks/useIsMobile'

const SLIDE_DELAY = 5000
SwiperCore.use([Autoplay])

const Values: React.FC = () => {
  const { swiper, setSwiper } = useSwiper()
  const [activeSlide, setActiveSlide] = useState(0)
  const [loadValues, setLoadValues] = useState(false)
  const { t } = useTranslation()
  const { observerRef, isIntersecting } = useIntersectionObserver()
  const swiperFlag = useIsMobile()

  const slideVal = (index: number) => {
    setActiveSlide(index)
    swiper?.slideTo(defaultValues(t).length + index)
    swiper?.autoplay.start()
  }

  const handleSlide = (event: SwiperCore) => {
    const slideNumber = getDotPos(event.activeIndex, defaultValues(t).length)
    setActiveSlide(slideNumber)
  }

  useEffect(() => {
    if (isIntersecting) {
      setLoadValues(true)
    }
  }, [isIntersecting])

  return (
    <>
      <div ref={observerRef} />
      <ValuesWrapper>
        <ValueText> {t('Our Values')} </ValueText>
        <Flex style={{ width: '100%', justifyContent: 'center' }}>
          {swiperFlag ? (
            <Swiper
              id="valuesSwiper"
              initialSlide={defaultValues(t).length}
              autoplay={{
                delay: SLIDE_DELAY,
                disableOnInteraction: false,
              }}
              loop
              onSwiper={setSwiper}
              spaceBetween={30}
              slidesPerView="auto"
              loopedSlides={defaultValues(t).length}
              centeredSlides
              onSlideChange={handleSlide}
            >
              {defaultValues(t).map((value, i) => {
                return (
                  <SwiperSlide style={{ maxWidth: '338px', minWidth: '338px' }} key={`${value.title}-${i}`}>
                    <ValueCard key={value.title}>
                      {loadValues ? (
                        <Image src={value.logoImg} alt="" width={300} height={300} />
                      ) : (
                        <Skeleton animation="waves" variant="circle" height="200px" width="200px" />
                      )}
                      <Link target="_blank" href={value.link || ''} style={{ fontSize: '25px' }}>
                        {value.title}
                      </Link>
                      <Text sx={{ textAlign: 'center' }}>{value.description}</Text>
                    </ValueCard>
                  </SwiperSlide>
                )
              })}
            </Swiper>
          ) : (
            defaultValues(t).map((value, i) => {
              return (
                <ValueCard key={`${value.title}-${i}`}>
                  {loadValues ? (
                    <ValueImage image={value.logoImg} />
                  ) : (
                    <Skeleton animation="waves" variant="circle" height="200px" width="200px" />
                  )}
                  <Link target="_blank" href={value.link || ''} style={{ fontSize: '25px' }}>
                    {value.title}
                  </Link>
                  <Text sx={{ textAlign: 'center', minHeight: '120px' }}>{value.description}</Text>
                </ValueCard>
              )
            })
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
          {[...Array(defaultValues(t).length)].map((_, i) => {
            return (
              <Flex sx={{ display: ['flex', 'flex', 'flex', 'none'] }} key={`bubbles${i}`}>
                <SwiperDots isActive={i === activeSlide} onClick={() => slideVal(i)} />
              </Flex>
            )
          })}
        </Flex>
      </ValuesWrapper>
    </>
  )
}

export default Values
