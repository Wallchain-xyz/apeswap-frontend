import React from 'react'
import { Flex, Svg, Text } from 'components/uikit'
import TooltipBubble from 'components/uikit/Tooltip'

const HealthSummaryRow = ({ ttTitle, ttBody, value, circleColor }: {
  ttTitle: string,
  ttBody?: React.ReactNode,
  value: string
  circleColor?: string
}) => {
  return (
    <Flex sx={{ width: '100%', justifyContent: 'space-between' }}>
      <Text sx={{
        fontWeight: 500,
        fontSize: ['10px', '10px', '10px', '12px'],
        lineHeight: ['24px'],
        display: 'flex',
        alignItems: 'center',
      }}>
        {circleColor &&
          (circleColor === '#DF4141' ? (
              <Flex sx={{
                width: '8px',
                height: '8px',
                borderRadius: '15px',
                background: 'white4',
                mr: '3px',
                alignItems: 'center',
              }}>
                <Flex sx={{ width: '100%', height: '2px', backgroundColor: '#DF4141' }} />
              </Flex>
            )
            : (
              <Flex sx={{ width: '8px', height: '8px', borderRadius: '15px', background: circleColor, mr: '3px' }} />
            ))}
        {ttTitle}
        {
          ttBody && (
            <TooltipBubble
              placement='bottomLeft'
              transformTip='translate(0%, 0%)'
              width='180px'
              body={ttBody}>
                    <span sx={{ ml: '5px' }}>
                      <Svg icon='question' width='12px' />
                    </span>
            </TooltipBubble>
          )
        }
      </Text>
      <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], lineHeight: ['24px'] }}>
        {value}
      </Text>
    </Flex>
  )
}

export default HealthSummaryRow