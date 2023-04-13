import { Text, useThemeUI } from 'theme-ui'
import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { styles, FlexImage, LearnMoreArrow, FlexSkeleton } from './styles'
import { BannerTypes, ColorProps } from './types'
import { Button, Flex } from 'components/uikit'
import { useRouter } from 'next/router'
import useProgressiveImage from 'hooks/useProgressiveImage'

const Banner: React.FC<{
  banner: BannerTypes
  link: string
  title?: string
  children?: React.FC
  listViewBreak?: boolean
  margin?: string
  titleColor?: ColorProps
  maxWidth?: number
}> = ({ banner, children, title, listViewBreak, margin, titleColor, link, maxWidth = 1200 }) => {
  const { push } = useRouter()
  const { colorMode } = useThemeUI()
  const { t } = useTranslation()
  const loaded = useProgressiveImage(`../images/banners/${banner}-${colorMode === 'dark' ? 'night' : 'day'}.svg`)

  const openBannerLink = (bannerLink: string) => {
    bannerLink.includes('modal') ? push({ search: bannerLink }) : window.open(bannerLink, '_blank')
  }

  // Media breaks are used until tablet mode on list view is designed
  return (
    <Flex
      sx={{
        ...styles.flexPrimary,
        margin,
      }}
    >
      {loaded ? (
        <FlexImage sx={{ backgroundImage: `url(${loaded})` }} maxWidth={maxWidth} listViewBreak={listViewBreak} />
      ) : (
        <FlexSkeleton maxWidth={maxWidth} listViewBreak={listViewBreak} />
      )}
      <Flex sx={{ ...styles.titleContainer }}>
        <Text
          sx={{
            ...styles.titleText,
            color: titleColor || 'text',
            '@media screen and (min-width: 500px) and (max-width: 851px)': {
              fontSize: listViewBreak ? '25px' : '5vw',
              lineHeight: listViewBreak ? '25px' : '5vw',
            },
          }}
        >
          {title?.toUpperCase()}
        </Text>
        <Button
          variant="text"
          onClick={() => openBannerLink(link)}
          sx={{
            ...styles.learnText,
            color: titleColor || 'text',

            '&&&:hover': {
              textDecoration: 'none',
              color: titleColor || 'text',
            },
          }}
        >
          {link.includes('?modal') ? t('Tutorial') : t('Learn More')} <LearnMoreArrow color={titleColor || 'text'} />
        </Button>
      </Flex>
      {children}
    </Flex>
  )
}

export default Banner
