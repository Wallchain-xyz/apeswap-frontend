import React from 'react'

import { PrivacyProps } from './types'
import styles, { dynamicStyles } from './styles'
import { Flex, Svg, Text } from 'components/uikit'
import useMatchBreakpoints from 'hooks/useMatchBreakpoints'
import TooltipBubble from 'components/uikit/Tooltip'

const Privacy: React.FC<PrivacyProps> = ({ isModal, t }) => {
  const { isMobile, isTablet } = useMatchBreakpoints()
  const isMd = isTablet

  return (
    <Flex sx={dynamicStyles.privacy({ isModal })}>
      <a href="https://apeswap.finance/privacy" target="_blank" rel="noopener noreferrer">
        <Text sx={styles.privacyLink}>{t('We respect your privacy')}</Text>
      </a>
      <TooltipBubble
        placement={(isMobile && !isMd && 'topRight') || 'topLeft'}
        body={
          <Text>
            ApeSwap will only use your email address for the sole purpose of marketing newsletters. Your personal
            information will not be shared with any third party.
          </Text>
        }
        transformTip={(isMobile && !isMd && 'translate(12%, 0)') || 'translate(-6%, 0%)'}
        width={(isMobile && !isMd && '200px') || '260px'}
      >
        <Svg icon="question" width={isMobile ? '12px' : '14px'} />
      </TooltipBubble>
    </Flex>
  )
}

export default Privacy
