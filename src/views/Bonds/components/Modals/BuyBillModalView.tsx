import React, { useState } from 'react'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import getTimePeriods from 'utils/getTimePeriods'
import { useTranslation } from 'contexts/Localization'
import {
  ActionButtonsContainer,
  BillDescriptionContainer,
  BillTitleContainer,
  ModalBodyContainer,
  StyledHeadingText,
  TopDescriptionText,
} from './styles'
import UserBillModalView from './UserBillModalView'
import { getFirstNonZeroDigits } from 'utils/roundNumber'
import { Flex, ListTag, Modal } from 'components/uikit'
import Buy from 'views/Bonds/actions/Buy'
import { BillsInfoAndConfig } from 'views/Bonds/types'
import { ListTagVariants } from 'components/uikit/Tag/types'
import { useBills } from 'state/bills/hooks'
import Image from 'next/image'
import ModalHeader from 'components/uikit/Modal/ModalHeader'

interface BillModalProps {
  onDismiss?: () => void
  billIndex: number
}

const BuyBillModalView: React.FC<BillModalProps> = ({ onDismiss, billIndex }) => {
  const { t } = useTranslation()
  const bills: BillsInfoAndConfig[] | undefined = useBills()
  const bill = bills?.find((billToSearch) => billToSearch.index === billIndex)
  const discountEarnTokenPrice =
    bill?.earnTokenPrice &&
    bill?.earnTokenPrice &&
    bill?.earnTokenPrice - bill?.earnTokenPrice * (parseFloat(bill?.discount ?? '0') / 100)

  const [billId, setBillId] = useState('')
  const [loading, setLoading] = useState(false)
  const vestingTime = getTimePeriods(parseInt(bill?.vestingTime ?? '0'), true)

  const onHandleReturnedBillId = async (id: string) => {
    setBillId(id)
  }

  return billId && bill ? (
    <UserBillModalView bill={bill} billId={billId} onDismiss={onDismiss} />
  ) : (
    <Modal
      onDismiss={onDismiss}
      sx={{
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
      }}
    >
      <ModalHeader hideDivider />
      <ModalBodyContainer>
        <Flex
          sx={{
            alignItems: 'center',
            justifyContent: 'center',
            maxWidth: '606px',
            '@media screen and (min-width: 1180px)': {
              minWidth: '606px',
            },
          }}
        >
          <Image
            width={2300}
            height={1350}
            alt={'hidden-bill'}
            placeholder="empty"
            src={loading && !billId ? '/images/bills/bill-nfts.gif' : '/images/bills/hidden-bill.jpg'}
            layout="responsive"
          />
        </Flex>
        <BillDescriptionContainer p="0">
          <Flex sx={{ flexDirection: 'column' }}>
            <BillTitleContainer>
              <Flex sx={{ mb: '5px' }}>
                <ListTag variant={bill?.billType as ListTagVariants} />
              </Flex>
              <Flex sx={{ alignItems: 'center' }}>
                <ServiceTokenDisplay
                  token1={bill?.token?.symbol}
                  token2={bill?.billType === 'reserve' ? bill?.earnToken?.symbol : bill?.quoteToken?.symbol}
                  token3={bill?.earnToken?.symbol}
                  billArrow
                  stakeLp={bill?.billType !== 'reserve'}
                />
                <Flex sx={{ flexDirection: 'column' }}>
                  <StyledHeadingText ml="10px">{bill?.lpToken.symbol}</StyledHeadingText>
                  <TopDescriptionText ml="12px">
                    {t('Vesting Term')}: {`${vestingTime.days}d, ${vestingTime.minutes}h, ${vestingTime.seconds}m`}
                  </TopDescriptionText>
                </Flex>
              </Flex>
            </BillTitleContainer>
            <Flex sx={{ flexDirection: 'column' }} mb={10}>
              <Flex style={{ width: '250px' }}>
                <TopDescriptionText>
                  {bill?.earnToken?.symbol} {t('Market Price')}{' '}
                  <span style={{ textDecoration: 'line-through' }}>
                    ${getFirstNonZeroDigits(bill?.earnTokenPrice ?? 0)}
                  </span>
                </TopDescriptionText>
              </Flex>
              <Flex sx={{ alignItems: 'center' }}>
                <ServiceTokenDisplay token1={bill?.earnToken?.symbol} />
                <StyledHeadingText ml="10px">
                  ${getFirstNonZeroDigits(discountEarnTokenPrice ?? 0)} ({bill?.discount}% Discount)
                </StyledHeadingText>
              </Flex>
            </Flex>
          </Flex>
          <Flex sx={{ flexDirection: 'column' }}>
            <ActionButtonsContainer>
              {bill && (
                <Buy
                  bill={bill}
                  onBillId={onHandleReturnedBillId}
                  onTransactionSubmitted={(trxSent: any) => setLoading(trxSent)}
                />
              )}
            </ActionButtonsContainer>
          </Flex>
        </BillDescriptionContainer>
      </ModalBodyContainer>
    </Modal>
  )
}

export default React.memo(BuyBillModalView)
