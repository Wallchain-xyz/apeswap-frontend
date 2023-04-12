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
import { BigNumber } from 'ethers'
import { Flex, IconButton, Modal, Skeleton, Text } from 'components/uikit'
import Claim from 'views/Bonds/actions/Claim'
import { SupportedChainId } from '@ape.swap/sdk-core'
import Image from 'next/image'
import useModal from 'hooks/useModal'

const modalProps = {
  sx: {
    zIndex: 11,
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
  const { token, quoteToken, earnToken, lpToken, index, userOwnedBillsData, userOwnedBillsNftData } = bill
  const userOwnedBill = userOwnedBillsData?.find((b) => billId && parseInt(b.id) === parseInt(billId))
  const userOwnedBillNftData = userOwnedBillsNftData?.find((b) => billId && parseInt(b.tokenId) === parseInt(billId))
  const pending = getBalanceNumber(
    BigNumber.from(userOwnedBill?.payout),
    bill?.earnToken?.decimals?.[chainId as SupportedChainId] ?? 18,
  )?.toFixed(4)
  const pendingUsd = (parseFloat(pending) * (bill?.earnTokenPrice ?? 0))?.toFixed(2)
  const claimable = getBalanceNumber(
    BigNumber.from(userOwnedBill?.pendingRewards),
    bill?.earnToken?.decimals?.[chainId as SupportedChainId] ?? 18,
  )?.toFixed(4)
  const attributes = userOwnedBillNftData?.attributes?.filter((attrib) => BILL_ATTRIBUTES.includes(attrib.trait_type))
  const claimableUsd = (parseFloat(claimable) * (bill?.earnTokenPrice ?? 0))?.toFixed(2)
  const [onPresentTransferBillModal] = useModal(
    <TransferBillModal bill={bill} billId={billId} onDismiss={onDismiss} chainId={chainId} />,
    true,
    true,
    `transferModal${billId}-${index}`,
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
            <Flex alignItems="center" justifyContent="center">
              <BillsImage>
                <Image src="images/bills/bill-nfts.gif" alt="bill-img" height={500} width={500} />
              </BillsImage>
            </Flex>
          )}
          <BillDescriptionContainer width="100%">
            <Flex flexDirection="column">
              <BillTitleContainer>
                <Flex alignItems="center">
                  <ServiceTokenDisplay
                    token1={token.symbol}
                    token2={quoteToken.symbol}
                    token3={earnToken.symbol}
                    billArrow
                    stakeLp
                  />
                  <StyledHeadingText ml="10px" bold>
                    {lpToken.symbol}
                  </StyledHeadingText>
                  <Text ml={10}>#{userOwnedBill?.id}</Text>
                </Flex>
              </BillTitleContainer>
            </Flex>
            <Flex flexDirection="column">
              {attributes
                ? attributes.map((attrib) => {
                    return (
                      <GridTextValContainer key={attrib.value}>
                        <Text fontSize="12px">{attrib?.trait_type}</Text>
                        <Text fontSize="12px" bold>
                          {attrib?.value}
                        </Text>
                      </GridTextValContainer>
                    )
                  })
                : BILL_ATTRIBUTES.map((attrib) => {
                    return (
                      <GridTextValContainer key={attrib}>
                        <Text fontSize="12px">{t(attrib)}</Text>
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
                <StyledButton onClick={onPresentTransferBillModal} buttonSize={'100%'}>
                  {t('Transfer')}
                </StyledButton>
              </Flex>
            </Flex>
          </BillDescriptionContainer>
        </ModalBodyContainer>
        <BillsFooterContainer>
          <BillFooterContentContainer>
            <Flex
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '100%' }}
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
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '100%' }}
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
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              style={{ width: '100%', height: '100%' }}
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
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ width: '100%', margin: '5px' }}
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
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ width: '100%', margin: '5px' }}
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
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ width: '100%', margin: '5px' }}
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
