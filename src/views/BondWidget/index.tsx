import React, { useCallback } from 'react'
import Buy from '../Bonds/actions/Buy'
import Flex from '../../components/uikit/Flex'
import { Bills } from '../Bonds/types'
import { useBills } from '../../state/bills/hooks'
import { ChainId } from '@ape.swap/sdk'
import { Button, Modal } from '../../components/uikit'
import useModal from '../../hooks/useModal'

const BondWidget = ({
  capturedBillAddress,
  capturedChain,
}: {
  capturedBillAddress: string
  capturedChain: ChainId
}) => {
  const bills: Bills[] | undefined = useBills()
  const bill: Bills | undefined = bills?.find(
    (billToSearch) => billToSearch?.contractAddress?.[capturedChain] === capturedBillAddress,
  )
  const renderBill = useCallback(() => {
    if (!bill) return
    return <Buy bill={bill} />
  }, [bill])

  const [openModal] = useModal(<Modal>{renderBill()}</Modal>)

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Button onClick={openModal}>Click me</Button>
    </Flex>
  )
}

export default BondWidget
