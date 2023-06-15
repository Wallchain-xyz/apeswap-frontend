import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import React, { useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import VestedTimer from '../VestedTimer'
import { TopDescriptionText } from './styles'
import { Bills } from 'views/Bonds/types'
import { CheckBox, Flex, Input, Modal, Text } from 'components/uikit'
import Transfer from 'views/Bonds/actions/Transfer'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import { SupportedChainId } from '@ape.swap/sdk-core'

interface TransferBillModalProps {
  onDismiss?: () => void
  bill: Bills
  billId: string
  chainId?: SupportedChainId
}

const TransferBillModal: React.FC<TransferBillModalProps> = ({ onDismiss, bill, billId, chainId }) => {
  const { t } = useTranslation()
  const [confirmSend, setConfirmSend] = useState(false)
  const [toAddress, setToAddress] = useState('')
  const { earnToken, lpToken, billNftAddress, userOwnedBillsData } = bill
  const userOwnedBill = userOwnedBillsData?.find((b) => parseInt(b.id) === parseInt(billId))
  const pending =
    chainId &&
    getBalanceNumber(new BigNumber(userOwnedBill?.payout ?? 0), bill?.earnToken?.decimals?.[chainId] ?? 18)?.toFixed(4)
  return (
    <Modal onDismiss={onDismiss} title="Transfer Bond" zIndex={130}>
      <Flex mt="30px">
        <Text weight={700}> {t('Transferring')}: </Text>
      </Flex>
      <Flex mt="30px" sx={{ flexDirection: 'column', alignItems: 'center' }} mr="10px">
        <Text bold size="25px">
          {lpToken.symbol} #{userOwnedBill?.id}
        </Text>
        <Flex mt="5px">
          <Flex mr="20px" sx={{ flexDirection: 'column' }}>
            <TopDescriptionText textAlign="center">{t('Vesting time')}</TopDescriptionText>
            <VestedTimer
              lastBlockTimestamp={userOwnedBill?.lastBlockTimestamp ?? '0'}
              vesting={userOwnedBill?.vesting ?? '0'}
              transferModalFlag
            />
          </Flex>
          <Flex ml="20px" sx={{ flexDirection: 'column' }}>
            <TopDescriptionText textAlign="center">{t('Pending')}</TopDescriptionText>
            <Flex>
              <ServiceTokenDisplay token1={earnToken.symbol} size={20} />
              <Text bold ml="5px">
                {pending}
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Flex mt="30px" sx={{ flexDirection: 'column' }}>
        <Text bold>{t('Receiving Address')}:</Text>
        <Input
          mt="10px"
          size="lg"
          placeholder={t('Paste the address here')}
          value={toAddress}
          onChange={(e: any) => setToAddress(e.target.value)}
          style={{ width: '345px', border: 'none' }}
        />
      </Flex>
      <Text mt="30px" size="12px" style={{ color: 'rgba(223, 65, 65, 1)' }}>
        <Text bold style={{ color: 'rgba(223, 65, 65, 1)' }} size="13px">
          {t('WARNING')}
        </Text>
        {t('When transfering the NFT all pending rewards will also be transfered to the receiver address.')}
      </Text>
      <Flex mt="20px" onClick={() => setConfirmSend((prev) => !prev)} sx={{ cursor: 'pointer', alignItems: 'center' }}>
        <CheckBox checked={confirmSend} />
        <Text ml="10px" size="12px">
          {t('I understand the new wallet gains ownership of all unclaimed assets.')}
        </Text>
      </Flex>
      <Flex sx={{ justifyContent: 'center' }} mt="15px">
        <Transfer billNftAddress={billNftAddress ?? ''} billId={billId} toAddress={toAddress} disabled={!confirmSend} />
      </Flex>
    </Modal>
  )
}

export default React.memo(TransferBillModal)
