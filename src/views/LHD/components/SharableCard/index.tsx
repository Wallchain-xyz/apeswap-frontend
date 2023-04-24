import React from 'react'
import { Modal } from 'components/uikit'
import { TokenAddress } from '../../../../state/lhd/types'

const modalProps = {
  // sample styles for the modal. This are not checked at all so feel 100% free to change them
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
      insert sexy jsx code here
    </Modal>
  )
}

export default SharableCard
