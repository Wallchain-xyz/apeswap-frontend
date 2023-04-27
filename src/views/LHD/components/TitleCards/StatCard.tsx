import React from 'react'
import { Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { Box } from 'theme-ui'

const StatCard = ({ title, value, footerInfo }: {
  title: 'Industry Average' | 'Chain supported' | 'Verified tokens',
  value: string,
  footerInfo: React.ReactNode
}) => {
  const { t } = useTranslation()
  const Icons = {
    ['Industry Average']: <Svg icon='greenShield' />,
    ['Chain supported']: <Svg icon='chain' />,
    ['Verified tokens']: <Svg icon='verified' />,
  }

  const icon = Icons[title]
  return (
    <Flex sx={{
      width: ['94px', '94px', '110px', '170px'],
      height: ['87px', '87px', '87px', '174px'],
      borderRadius: '10px',
      overflow: 'hidden',
      flexDirection: 'column',
      ml: ['0','0','0','20px'],
    }}>
      <Flex sx={{ width: '100%', backgroundColor: 'white3', justifyContent: 'center', alignItems: 'center' }}>
        <Flex>
          <Box sx={{ mr: '5px' }}>
            {icon}
          </Box>
        </Flex>
        <Text sx={{
          margin: ['5px 0', '5px 0', '5px 0', '20px 0'],
          fontWeight: 400,
          fontSize: ['10px'],
          lineHeight: ['10px', '10px', '10px', '15px'],
          width: ['min-content', 'min-content', 'min-content', 'fit-content'],
          color: 'textDisabled',
        }}>
          {t(`${title}`)}
        </Text>
      </Flex>
      <Flex sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white2',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <Text sx={{
          fontWeight: 700,
          fontSize: ['20px', '20px', '20px', '55px'],
          lineHeight: ['30px', '30px', '30px', '83px'],
        }}>{value}</Text>
        <Text sx={{ weight: 400, fontSize: ['8px', '8px', '8px', '10px'], lineHeight: ['15px'] }}>{footerInfo}</Text>
      </Flex>
    </Flex>
  )
}

export default StatCard
