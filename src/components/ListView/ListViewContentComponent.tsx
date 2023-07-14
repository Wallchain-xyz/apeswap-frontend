import React from 'react'
import { useTranslation } from '../../contexts/Localization'
import { styles } from './styles'
import { ListViewContentProps } from './types'
import { Flex, ListTag, Skeleton, Svg, Text } from 'components/uikit'
import TooltipBubble from 'components/uikit/Tooltip'

const ListViewContent: React.FC<ListViewContentProps> = ({
  tag,
  title,
  valueIcon,
  toolTip,
  toolTipPlacement,
  toolTipTransform,
  style,
  value2Direction = 'row',
  aprCalculator,
}) => {
  const { t } = useTranslation()
  return (
    <Flex sx={style}>
      <>
        {toolTip ? (
          <Flex sx={{ alignItems: 'center' }}>
            <TooltipBubble
              placement={toolTipPlacement}
              transformTip={toolTipTransform}
              body={<Flex>{t(`${toolTip}`)}</Flex>}
              width="180px"
            >
              <Text sx={styles.titleText}>
                {t(`${title}`)}
                <span sx={{ ml: '5px' }}>
                  <Svg icon="question" width="12px" />
                </span>
              </Text>
            </TooltipBubble>
            {aprCalculator}
          </Flex>
        ) : (
          <Flex sx={{ alignItems: 'center' }}>
            {tag ? (
              <Flex sx={{ mr: '5px' }}>
                <ListTag variant={tag} />
              </Flex>
            ) : (
              <Text sx={styles.titleText}>{title}</Text>
            )}
            {aprCalculator}
          </Flex>
        )}
      </>
      <Flex sx={{ flexDirection: value2Direction }}>{valueIcon && valueIcon}</Flex>
    </Flex>
  )
}

export default React.memo(ListViewContent)
