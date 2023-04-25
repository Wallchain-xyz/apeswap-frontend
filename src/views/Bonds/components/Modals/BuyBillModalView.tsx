import React, { useState } from 'react'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import {
  ActionButtonsContainer,
  BillDescriptionContainer,
  BillsImage,
  BillTitleContainer,
  ModalBodyContainer,
  StyledHeadingText,
  TopDescriptionText,
} from './styles'
import UserBillModalView from './UserBillModalView'
import { getFirstNonZeroDigits } from 'utils/roundNumber'
import ModalProvider from 'contexts/ModalContext'
import { Flex, IconButton, Modal } from 'components/uikit'
import Buy from 'views/Bonds/actions/Buy'
import { Bills } from 'views/Bonds/types'
import { Image } from 'theme-ui'

const modalProps = {
  sx: {
    overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    width: ['90%'],
    minWidth: 'unset',
    '@media screen and (min-width: 1180px)': {
      maxWidth: '1200px',
      minWidth: '1200px',
      overflow: 'inherit',
    },
    maxWidth: '350px',
  },
}

interface BillModalProps {
  onDismiss: () => void
  bill: Bills
}

const BuyBillModalView: React.FC<BillModalProps> = ({ onDismiss, bill }) => {
  const { t } = useTranslation()
  const { token, quoteToken, earnToken, lpToken, discount, earnTokenPrice } = bill
  const discountEarnTokenPrice =
    earnTokenPrice && earnTokenPrice && earnTokenPrice - earnTokenPrice * (parseFloat(discount ?? '0') / 100)

  const [billId, setBillId] = useState('')
  const [loading, setLoading] = useState(false)
  const vestingTime = getTimePeriods(parseInt(bill.vestingTime ?? '0'), true)

  const onHandleReturnedBillId = async (id: string) => {
    setBillId(id)
  }

  return (
    <ModalProvider>
      {billId ? (
        <UserBillModalView bill={bill} billId={billId} onDismiss={onDismiss} />
      ) : (
        <Modal onDismiss={onDismiss} {...modalProps}>
          <ModalBodyContainer>
            <IconButton
              icon="close"
              color="text"
              variant="transparent"
              onClick={onDismiss}
              sx={{ position: 'absolute', right: '20px', top: '25px', zIndex: 50 }}
            />
            <Flex sx={{ alignItems: 'center', justifyContent: 'center' }}>
              {loading && !billId ? (
                <BillsImage>
                  <Image src={'images/bills/bill-nfts.gif'} alt="bill-img" height={500} width={500} />
                </BillsImage>
              ) : (
                <BillsImage image="images/bills/hidden-bill.jpg" />
              )}
            </Flex>
            <BillDescriptionContainer p="0">
              <Flex sx={{ flexDirection: 'column' }}>
                <BillTitleContainer>
                  <Flex sx={{ alignItems: 'center' }}>
                    <ServiceTokenDisplay
                      token1={token.symbol}
                      token2={quoteToken.symbol}
                      token3={earnToken.symbol}
                      billArrow
                      stakeLp
                    />
                    <Flex sx={{ flexDirection: 'column' }}>
                      <StyledHeadingText ml="10px" bold>
                        {lpToken.symbol}
                      </StyledHeadingText>
                      <TopDescriptionText ml="12px">
                        {t('Vesting Term')}: {`${vestingTime.days}d, ${vestingTime.minutes}h, ${vestingTime.seconds}m`}
                      </TopDescriptionText>
                    </Flex>
                  </Flex>
                </BillTitleContainer>
                <Flex sx={{ flexDirection: 'column' }} mb={10}>
                  <Flex style={{ width: '250px' }}>
                    <TopDescriptionText>
                      {earnToken.symbol} {t('Market Price')}{' '}
                      <span style={{ textDecoration: 'line-through' }}>
                        ${getFirstNonZeroDigits(earnTokenPrice ?? 0)}
                      </span>
                    </TopDescriptionText>
                  </Flex>
                  <Flex sx={{ alignItems: 'center' }}>
                    <ServiceTokenDisplay token1={earnToken.symbol} />
                    <StyledHeadingText ml="10px" bold>
                      ${getFirstNonZeroDigits(discountEarnTokenPrice ?? 0)} ({discount}% Discount)
                    </StyledHeadingText>
                  </Flex>
                </Flex>
              </Flex>
              <Flex sx={{ flexDirection: 'column' }}>
                <ActionButtonsContainer>
                  <Buy
                    bill={bill}
                    onBillId={onHandleReturnedBillId}
                    onTransactionSubmited={(trxSent: any) => setLoading(trxSent)}
                  />
                </ActionButtonsContainer>
              </Flex>
            </BillDescriptionContainer>
          </ModalBodyContainer>
        </Modal>
      )}
    </ModalProvider>
  )
}

export default React.memo(BuyBillModalView)
