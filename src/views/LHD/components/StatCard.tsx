import React from 'react'
import { Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'

const StatCard = ({ title, value, footerInfo }: {
  title: 'Industry Average' | 'Chain supported' | 'Verified tokens',
  value: string,
  footerInfo: React.ReactNode
}) => {
  const { t } = useTranslation()
  //const icon = Icons[title]
  return (
    <Flex sx={{
      width: '170px',
      height: '174px',
      borderRadius: '10px',
      overflow: 'hidden',
      flexDirection: 'column',
      ml: '20px'
    }}>
      <Flex sx={{ width: '100%', backgroundColor: 'white3', justifyContent: 'center' }}>
        <Text sx={{
          margin: '20px 0',
          fontWeight: 400,
          fontSize: ['10px'],
          lineHeight: ['15px'],
        }}>{t(`${title}`)}</Text>
      </Flex>
      <Flex sx={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white2',
        alignItems: 'center',
        flexDirection: 'column',
      }}>
        <Text sx={{ fontWeight: 700, fontSize: ['55px'], lineHeight: ['83px'] }}>{value}</Text>
        <Text sx={{ weight: 400, fontSize: ['10px'], lineHeight: ['15px'] }}>{footerInfo}</Text>
      </Flex>
    </Flex>
  )
}

export default StatCard
