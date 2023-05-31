import React from 'react'
import UserBillModalView from './UserBillModalView'
import WarningModal from './WarningModal'
import useModal from 'hooks/useModal'
import { Bills } from 'views/Bonds/types'
import BuyBillModalView from './BuyBillModalView'
import { Button, Flex } from 'components/uikit'
import Image from 'next/image'

interface BillModalProps {
  bill: Bills
  buttonText?: string
  id?: number
  billId?: string
  buttonSize?: string
  buyFlag?: boolean
  billCardImage?: string
  disabled?: boolean
}

const BillModal: React.FC<BillModalProps> = ({
  buttonText,
  bill,
  id,
  buttonSize,
  buyFlag,
  billId,
  billCardImage,
  disabled,
}) => {
  const [onPresentBuyBillsModal] = useModal(
    <BuyBillModalView billIndex={bill.index} onDismiss={() => null} />,
    false,
    false,
    `billsModal${id}`,
  )
  const [onPresentUserBillModal] = useModal(
    <UserBillModalView bill={bill} billId={billId} onDismiss={() => null} />,
    true,
    true,
    `billsModal${bill.billNftAddress}-${billId}`,
  )
  const [onPresentBuyWarning] = useModal(
    <WarningModal bill={bill} onDismiss={() => null} />,
    true,
    true,
    `billsWarningModal${id}`,
  )

  return !billCardImage ? (
    <Button
      onClick={
        buyFlag
          ? parseFloat(bill?.discount ?? '0') < 0
            ? onPresentBuyWarning
            : onPresentBuyBillsModal
          : onPresentUserBillModal
      }
      buttonSize={buttonSize}
      disabled={disabled}
      sx={{
        lineHeight: '20px',
        minWidth: '109px',
        width: ['240px', '240px', '240px', '100%'],
        mt: ['10px', '10px', '10px', '0px'],
      }}
    >
      {buttonText}
    </Button>
  ) : (
    <Flex sx={{ cursor: 'pointer', width: '270px' }} onClick={onPresentUserBillModal}>
      <Image width={720} height={405} alt={'hidden-bill'} src={billCardImage} layout="responsive" />
    </Flex>
  )
}

export default React.memo(BillModal)
