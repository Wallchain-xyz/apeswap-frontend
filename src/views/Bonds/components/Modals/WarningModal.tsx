import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import { StyledButton } from '../styles'
import BuyBillModalView from './BuyBillModalView'
import useModal from 'hooks/useModal'
import { CheckBox, Flex, IconButton, Modal, Svg, Text } from 'components/uikit'

interface TransferBillModalProps {
  onDismiss: () => void
  bill?: any
}

const WarningModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill }) => {
  const [confirmBuy, setConfirmBuy] = useState(false)
  const { t } = useTranslation()
  const { index } = bill
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView bill={bill} onDismiss={() => null} />,
    true,
    true,
    `billsModal${index}`,
    true
  )

  return (
    <Modal onDismiss={onDismiss} maxWidth="385px" minWidth="320px">
      <Flex sx={{ alignItems: 'center', justifyContent: 'center' }} mt="10px">
        <IconButton
          icon="close"
          color="text"
          variant="transparent"
          onClick={onDismiss}
          sx={{ position: 'absolute', right: '20px', top: '25px' }}
        />
        <Text bold fontSize="35px">
          <Svg icon="error" width="25px" color="error" />
          <span sx={{ margin: '0px 10px' }}>{t('WARNING')}</span>
          <Svg icon="error" width="25px" color="error" />
        </Text>
      </Flex>
      <Flex mt="30px" mb="30px" sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <Flex sx={{ flexDirection: 'column' }}>
          <Flex>
            <Text style={{ fontWeight: 600 }}>
              The {bill.earnToken.symbol} you recieve from this {bill.token.symbol}-{bill.quoteToken.symbol} ApeSwap
              Bond at a <span style={{ color: 'rgba(223, 65, 65, 1)' }}>{bill.discount}%</span> discount rate is priced
              at <span style={{ textDecoration: 'underline' }}>${bill?.priceUsd}</span>, which is higher than the
              current market rate of{' '}
              <span style={{ textDecoration: 'underline' }}>${bill?.earnTokenPrice?.toFixed(3)} </span>
            </Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="20px" onClick={() => setConfirmBuy((prev) => !prev)} sx={{ cursor: 'pointer', alignItems: 'center' }}>
        <CheckBox checked={confirmBuy} />
        <Text ml="10px" fontSize="12px" bold>
          {t(
            'I understand that I am purchasing %billToken% at a price above the current market rate, and would like to continue.',
            { billToken: bill.earnToken.symbol },
          )}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'center' }} mt={15}>
        <StyledButton onClick={onPresentBuyBillsModal} disabled={!confirmBuy}>
          {t('Continue')}
        </StyledButton>
      </Flex>
    </Modal>
  )
}

export default React.memo(WarningModal)
