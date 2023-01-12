import React, { useState } from 'react'
import MoonPayIframe from './MoonFrame'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { NETWORK_LABEL } from 'config/constants/chains'
import { useTranslation } from 'contexts/Localization'
import { useWeb3React } from '@web3-react/core'
import { CheckBox, Flex, Modal, Text } from 'components/uikit'
import { ModalProps } from 'components/uikit/Modal/types'

// Supported chains for moonpay
const SUPPORTED_CHAINS = [SupportedChainId.BSC, SupportedChainId.MAINNET, SupportedChainId.POLYGON]

export default function MoonPayModal({ onDismiss }: { onDismiss: () => void }) {
  const [accept, setAccept] = useState(false)
  const { t } = useTranslation()
  const { chainId } = useWeb3React()
  const modalProps = {
    style: {
      zIndex: 10,
      overflowY: 'auto',
      maxHeight: 'calc(100% - 30px)',
    },
    sx: {
      minWidth: '437px',
      '@media screen and (max-width: 437px)': {
        minWidth: '95%',
      },
      maxWidth: '437px',
    },
  }
  return (
    <Modal title="Buy crypto with MoonPay" onDismiss={onDismiss} {...modalProps}>
      {!SUPPORTED_CHAINS.includes(56) ? (
        <Flex sx={{ margin: '10px 0px', flexDirection: 'column' }}>
          <Text>
            {`${NETWORK_LABEL[56]} is unsupported by MoonPay. Assets purchased will be sent to other chains, depending on the asset.`}{' '}
          </Text>
          <Flex sx={{ margin: '20px 10px' }}>
            <Text size="14px">{t('Would you still like to purchase crypto with fiat?')}</Text>
            {'  '}
            <CheckBox
              sx={{
                ml: '10px',
                borderRadius: '8px',
                backgroundColor: 'white3',
                'input:checked ~ &': {
                  backgroundColor: 'yellow',
                },
              }}
              checked={accept}
              onChange={() => {
                setAccept((prev) => !prev)
              }}
            />
          </Flex>
          {accept && <MoonPayIframe />}
        </Flex>
      ) : (
        <MoonPayIframe />
      )}
    </Modal>
  )
}
