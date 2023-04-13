import React from 'react'
import { useTranslation } from 'contexts/Localization'
import { Content, RightText, InnerTextButton } from './styles'
import { Flex, Svg, Text } from 'components/uikit'

const BillsDiagram: React.FC = () => {
  const { t } = useTranslation()

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Content>
        <span
          sx={{
            display: 'flex',
            mr: '15px',
            color: 'text',
            border: '3px solid',
            borderRadius: '25px',
            height: '50px',
            width: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Svg icon="billsM1" width={50} />
        </span>
        <RightText>
          {t(
            'The token discount is calculated based on several variables: token price, LP price, time, supply, and demand.',
          )}
        </RightText>
      </Content>
      <Content>
        <span
          sx={{
            display: 'flex',
            mr: '15px',
            color: 'text',
            border: '3px solid',
            borderRadius: '25px',
            height: '50px',
            width: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          <Svg icon="billsM2" width={50} />
        </span>
        <RightText>{t('Use Zap ⚡ to purchase a Bond with a single token or create an LP.')}</RightText>
      </Content>
      <Content>
        <span
          sx={{
            display: 'flex',
            mr: '15px',
            color: 'text',
            border: '3px solid',
            borderRadius: '25px',
            height: '50px',
            width: '50px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {' '}
          <Svg icon="billsM3" width={50} />
        </span>
        <RightText>{t('To mint a full color NFT, purchase a Bond with a value of $25 or more.')}</RightText>
      </Content>
      <Flex sx={{ margin: '22px 0 0 0', '@media screen and (min-width: 852px)': { margin: '22px 0 0 63px' } }}>
        <Text size="12px" weight={500}>
          <span sx={{ transform: 'translate(0px, 3px)', mr: '5px' }}>
            <Svg icon="error" width="15px" color='text' />
          </span>
          {t('ApeSwap Bonds have a limited supply and will sell out. Check out the ')}
          <InnerTextButton
            href="https://apeswap.gitbook.io/apeswap-finance/product-and-features/raise/treasury-bills"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('documentation')}
          </InnerTextButton>
          {t(' for more information.')}
        </Text>
      </Flex>
    </Flex>
  )
}

export default BillsDiagram
