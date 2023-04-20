import React, { useMemo } from 'react'
import { useTranslation } from 'contexts/Localization'
import { useUserZapSlippageTolerance } from '../../state/user/hooks'
import { Button, Flex, Text } from 'components/uikit'
import { Percent } from '@ape.swap/sdk-core'
import { warningSeverity } from 'utils/prices'

interface UpdateSlippageProps {
  priceImpact: number
  updateSlippage: () => void
}

const UpdateSlippage: React.FC<UpdateSlippageProps> = ({ priceImpact, updateSlippage }) => {
  const { t } = useTranslation()
  const [zapSlippage] = useUserZapSlippageTolerance()

  const priceImpactColor = useMemo(() => {
    if (!priceImpact) return undefined
    if (priceImpact < 0) return 'success'
    const severity = warningSeverity(new Percent(priceImpact))
    if (severity < 1) return 'text'
    if (severity < 3) return 'yellow'
    return 'error'
  }, [priceImpact])

  return (
    <Flex
      sx={{
        margin: '15px 0',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Text size="12px" sx={{ lineHeight: '18px' }}>
        {t('This transaction requires a slippage tolerance of ')}
        <Text color={priceImpactColor}>{priceImpactColor}</Text>
        {/* <FormattedPriceImpact priceImpact={new Percent(JSBI.BigInt(priceImpact + 5), JSBI.BigInt(10000))} /> */}
        {'. '}
        {t('After this transaction, slippage tolerance will be reset to ')}
        {zapSlippage.divide(100).toSignificant(2)} {'%.'}
      </Text>
      {priceImpact + 5 > 500 && (
        <Text color="error" size="12px">
          {t('Beware: your transaction may be frontrun')}
        </Text>
      )}
      <Button onClick={updateSlippage} sx={{ minWidth: '100px', marginLeft: '5px' }}>
        {t('Update')}
      </Button>
    </Flex>
  )
}

export default React.memo(UpdateSlippage)
