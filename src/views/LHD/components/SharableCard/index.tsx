import React from 'react'
import { Flex, Modal } from 'components/uikit'
import { TokenAddress } from '../../../../state/lhd/types'
import ChainsIcons from '../FullProfile/components/ChainsIcons'
import Image from 'next/image'

const modalProps = {
  // sample styles for the modal. This are not checked at all so feel 100% free to change them
  sx: {
    // overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    minWidth: 'unset',
    width: ['90%'],
    '@media screen and (min-width: 1180px)': {
      maxWidth: '1200px',
    },
    maxWidth: '350px',
  },
}

interface SharableCardProps {
  tokenSymbol?: string
  tokenImageURL?: string
  totalScore?: number
  healthScore?: number
  concentrationScore?: number
  ownershipScore?: number
  tokenAddresses?: TokenAddress[]
}

const SharableCard = ({
  tokenSymbol,
  tokenImageURL,
  totalScore,
  healthScore,
  concentrationScore,
  ownershipScore,
  tokenAddresses,
}: SharableCardProps) => {
  //put logic and functions here, feel free to create folders and new files within the SharableCard directory

  return (
    <Modal {...modalProps}>
      <Flex sx={{ width: '100%', height: '30px' }}>
        <Flex
          sx={{
            minWidth: '25px',
            height: '25px',
            mt: ['2px'],
            mr: ['5px'],
            background: 'red',
            borderRadius: '25px',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Image
            src={tokenImageURL ?? ''}
            alt={'token img'}
            width={39}
            height={39}
            style={{
              width: '93%',
              height: '93%',
              borderRadius: '25px',
            }}
          />
        </Flex>
        {tokenSymbol}
        <ChainsIcons tokenAddresses={tokenAddresses} />
      </Flex>
    </Modal>
  )
}

export default SharableCard
