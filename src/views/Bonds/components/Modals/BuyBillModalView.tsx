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
import { Flex, IconButton, ListTag, Modal } from 'components/uikit'
import Buy from 'views/Bonds/actions/Buy'
import { Bills } from 'views/Bonds/types'
import { ListTagVariants } from 'components/uikit/Tag/types'
import useAddLiquidityModal from 'components/DualAddLiquidity/hooks/useAddLiquidityModal'

const modalProps = {
  sx: {
    zIndex: 200,
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
  const { token, quoteToken, earnToken, lpToken, discount, earnTokenPrice, billType } = bill
  const discountEarnTokenPrice =
    earnTokenPrice && earnTokenPrice && earnTokenPrice - earnTokenPrice * (parseFloat(discount ?? '0') / 100)

  const [billId, setBillId] = useState('')
  const [loading, setLoading] = useState(false)
  const vestingTime = getTimePeriods(parseInt(bill.vestingTime ?? '0'), true)

  const onAddLiquidityModal = useAddLiquidityModal()

  const onHandleReturnedBillId = async (id: string) => {
    setBillId(id)
  }

  return (
    <Flex key={billId} id={billId}>
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
                <BillsImage image={'/images/bills/bill-nfts.gif'} />
              ) : (
                <BillsImage image="images/bills/hidden-bill.jpg" />
              )}
            </Flex>
            <BillDescriptionContainer p="0">
              <Flex sx={{ flexDirection: 'column' }}>
                <BillTitleContainer>
                  <Flex sx={{ mb: '5px' }}>
                    <ListTag variant={billType as ListTagVariants} />
                  </Flex>
                  <Flex sx={{ alignItems: 'center' }}>
                    <ServiceTokenDisplay
                      token1={token.symbol}
                      token2={bill.billType === 'reserve' ? earnToken.symbol : quoteToken.symbol}
                      token3={earnToken.symbol}
                      billArrow
                      stakeLp={billType !== 'reserve'}
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
                    onAddLiquidityModal={onAddLiquidityModal}
                  />
                </ActionButtonsContainer>
              </Flex>
            </BillDescriptionContainer>
          </ModalBodyContainer>
        </Modal>
      )}
    </Flex>
  )
}

export default React.memo(BuyBillModalView)
