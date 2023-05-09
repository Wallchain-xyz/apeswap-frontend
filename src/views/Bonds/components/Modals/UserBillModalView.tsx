import React from 'react'
import ServiceTokenDisplay from 'components/ServiceTokenDisplay'
import { useTranslation } from 'contexts/Localization'
import {
  BillDescriptionContainer,
  BillFooterContentContainer,
  BillsFooterContainer,
  BillsImage,
  BillTitleContainer,
  GridTextValContainer,
  ModalBodyContainer,
  StyledHeadingText,
  TopDescriptionText,
  Container,
  MobileFooterContainer,
  MobileFooterContentContainer,
} from './styles'
import VestedTimer from '../VestedTimer'
import TransferBillModal from './TransferBillModal'
import { StyledButton } from '../styles'
import { Bills } from 'views/Bonds/types'
import { useWeb3React } from '@web3-react/core'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import { Flex, IconButton, ListTag, Modal, Skeleton, Text } from 'components/uikit'
import Claim from 'views/Bonds/actions/Claim'
import { SupportedChainId } from '@ape.swap/sdk-core'
import Image from 'next/image'
import useModal from 'hooks/useModal'
import { ListTagVariants } from 'components/uikit/Tag/types'

const modalProps = {
  sx: {
    overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    minWidth: 'unset',
    width: ['90%'],
    '@media screen and (min-width: 1180px)': {
      maxWidth: '1200px',
    },
    maxWidth: '350px',
  },
}

interface BillModalProps {
  onDismiss: () => void
  bill: Bills
  billId: string | undefined
}

const BILL_ATTRIBUTES = ['The Legend', 'The Location', 'The Moment', 'The Trend', 'The Innovation']

const BuyBillModalView: React.FC<BillModalProps> = ({ onDismiss, bill, billId }) => {
  const { chainId } = useWeb3React()
  const { t } = useTranslation()
  const { token, quoteToken, earnToken, lpToken, index, userOwnedBillsData, userOwnedBillsNftData, billType } = bill
  const userOwnedBill = userOwnedBillsData?.find((b) => billId && parseInt(b.id) === parseInt(billId))
  const userOwnedBillNftData = userOwnedBillsNftData?.find((b) => billId && parseInt(b.tokenId) === parseInt(billId))
  const pending = getBalanceNumber(
    new BigNumber(userOwnedBill?.payout ?? 0),
    bill?.earnToken?.decimals?.[chainId as SupportedChainId] ?? 18,
  )?.toFixed(4)
  const pendingUsd = (parseFloat(pending) * (bill?.earnTokenPrice ?? 0))?.toFixed(2)
  const claimable = getBalanceNumber(
    new BigNumber(userOwnedBill?.pendingRewards ?? 0),
    bill?.earnToken?.decimals?.[chainId as SupportedChainId] ?? 18,
  )?.toFixed(4)
  const attributes = userOwnedBillNftData?.attributes?.filter((attrib) => BILL_ATTRIBUTES.includes(attrib.trait_type))
  const claimableUsd = (parseFloat(claimable) * (bill?.earnTokenPrice ?? 0))?.toFixed(2)
  const [onPresentTransferBillModal] = useModal(
    <TransferBillModal bill={bill} billId={billId ?? ''} onDismiss={onDismiss} chainId={chainId} />,
    true,
    true,
    `transferModal${billId}-${index}`,
    true,
  )
  return (
    <Modal onDismiss={onDismiss} {...modalProps}>
      <Container>
        <ModalBodyContainer>
          <IconButton
            icon="close"
            color="text"
            variant="transparent"
            onClick={onDismiss}
            sx={{ position: 'absolute', right: '20px', top: '25px' }}
          />
          {userOwnedBillNftData?.image ? (
            <BillsImage image={`${userOwnedBillNftData?.image + '?img-width=720'}`} />
          ) : (
            <Flex sx={{ alignItems: 'center', justifyContnet: 'center' }}>
              <BillsImage image="/images/bills/bill-nfts.gif" />
            </Flex>
          )}
          <BillDescriptionContainer width="100%">
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
                  <StyledHeadingText ml="10px" bold>
                    {lpToken.symbol}
                  </StyledHeadingText>
                  <Text ml={10}>#{userOwnedBill?.id}</Text>
                </Flex>
              </BillTitleContainer>
            </Flex>
            <Flex sx={{ flexDirection: 'column' }}>
              {attributes
                ? attributes.map((attrib) => {
                    return (
                      <GridTextValContainer key={attrib.value}>
                        <Text size="12px" weight={500} sx={{ lineHeight: '12px' }}>
                          {attrib?.trait_type}
                        </Text>
                        <Text size="12px" weight={700} sx={{ lineHeight: '12px' }}>
                          {attrib?.value}
                        </Text>
                      </GridTextValContainer>
                    )
                  })
                : BILL_ATTRIBUTES.map((attrib) => {
                    return (
                      <GridTextValContainer key={attrib}>
                        <Text size="12px">{t(attrib)}</Text>
                        <Skeleton width="150px" />
                      </GridTextValContainer>
                    )
                  })}
            </Flex>
            <Flex sx={{ width: '100%' }}>
              <Flex sx={{ width: '50%', padding: '5px' }}>
                <Claim
                  billAddress={bill.contractAddress[chainId as SupportedChainId] ?? ''}
                  billIds={[billId ?? '0']}
                  pendingRewards={userOwnedBill?.payout ?? '0'}
                  margin={'0'}
                />
              </Flex>
              <Flex sx={{ width: '50%', padding: '5px' }}>
                <StyledButton onClick={onPresentTransferBillModal} buttonSize={'100%'} sx={{ lineHeight: '18px' }}>
                  {t('Transfer')}
                </StyledButton>
              </Flex>
            </Flex>
          </BillDescriptionContainer>
        </ModalBodyContainer>
        <BillsFooterContainer>
          <BillFooterContentContainer>
            <Flex
              sx={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TopDescriptionText width="auto">{t('Fully Vested')}</TopDescriptionText>
              <StyledHeadingText ml="10px" bold>
                <VestedTimer
                  lastBlockTimestamp={userOwnedBill?.lastBlockTimestamp ?? '0'}
                  vesting={userOwnedBill?.vesting ?? '0'}
                  userModalFlag
                />
              </StyledHeadingText>
            </Flex>
          </BillFooterContentContainer>
          <BillFooterContentContainer>
            <Flex
              sx={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TopDescriptionText width="auto">{t('Claimable')}</TopDescriptionText>
              <Flex>
                <ServiceTokenDisplay token1={earnToken.symbol} size={25} />
                <StyledHeadingText ml="10px" bold>
                  {claimable && claimable !== 'NaN' ? (
                    `${claimable} ($${claimableUsd})`
                  ) : (
                    <Skeleton width="150px" height="32.5px" animation="waves" />
                  )}
                </StyledHeadingText>
              </Flex>
            </Flex>
          </BillFooterContentContainer>
          <BillFooterContentContainer>
            <Flex
              sx={{
                width: '100%',
                height: '100%',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TopDescriptionText width="auto">{t('Pending')}</TopDescriptionText>
              <Flex>
                <ServiceTokenDisplay token1={earnToken.symbol} size={25} />
                <StyledHeadingText ml="10px" bold>
                  {pending && pending !== 'NaN' ? (
                    `${pending} ($${pendingUsd})`
                  ) : (
                    <Skeleton width="150px" height="32.5px" animation="waves" />
                  )}
                </StyledHeadingText>
              </Flex>
            </Flex>
          </BillFooterContentContainer>
        </BillsFooterContainer>
        <MobileFooterContainer>
          <MobileFooterContentContainer>
            <Flex
              sx={{
                width: '100%',
                margin: '5px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TopDescriptionText width="auto">{t('Claimable')}</TopDescriptionText>
              <Flex>
                <ServiceTokenDisplay token1={earnToken.symbol} size={20} />
                <StyledHeadingText ml="10px" bold>
                  {claimable && claimable !== 'NaN' ? (
                    `${claimable} ($${claimableUsd})`
                  ) : (
                    <Skeleton width="150px" height="32.5px" animation="waves" />
                  )}
                </StyledHeadingText>
              </Flex>
            </Flex>
            <Flex
              sx={{
                width: '100%',
                margin: '5px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TopDescriptionText width="auto">{t('Pending')}</TopDescriptionText>
              <Flex>
                <ServiceTokenDisplay token1={earnToken.symbol} size={20} />
                <StyledHeadingText ml="10px" bold>
                  {pending && pending !== 'NaN' ? (
                    `${pending} ($${pendingUsd})`
                  ) : (
                    <Skeleton width="150px" height="32.5px" animation="waves" />
                  )}
                </StyledHeadingText>
              </Flex>
            </Flex>
            <Flex
              sx={{
                width: '100%',
                margin: '5px',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <TopDescriptionText width="auto">{t('Fully Vested')}</TopDescriptionText>
              <StyledHeadingText ml="10px" bold>
                <VestedTimer
                  lastBlockTimestamp={userOwnedBill?.lastBlockTimestamp ?? '0'}
                  vesting={userOwnedBill?.vesting ?? '0'}
                  userModalFlag
                />
              </StyledHeadingText>
            </Flex>
          </MobileFooterContentContainer>
        </MobileFooterContainer>
      </Container>
    </Modal>
  )
}

export default React.memo(BuyBillModalView)
