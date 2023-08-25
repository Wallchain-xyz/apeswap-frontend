import Buy from '../Bonds/actions/Buy'
import { Flex, Text } from '../../components/uikit'
import { Bills } from '../Bonds/types'
import { useBills } from '../../state/bills/hooks'
import { useWeb3React } from '@web3-react/core'
import state from '../../state'
import { APESWAP } from '../../config/constants/lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { BillReferenceData, usePostBillReference } from 'state/bills/usePostBillReference'
import React from 'react'
import Header from './components/Header'
import LaunchBondInfo from './components/LaunchBondInfo'

const BondWidget = ({
  bondAddress,
  chain,
  error,
}: {
  bondAddress: string
  chain: SupportedChainId
  error: boolean
}) => {
  const { chainId } = useWeb3React()
  const bills: Bills[] | undefined = useBills(chain)
  const bill: Bills | undefined = bills?.find((billToSearch) => {
    const address = billToSearch?.contractAddress?.[chain]
    if (address === undefined && bondAddress === undefined) {
      return false // Do not match when both are undefined
    }
    return address?.toUpperCase() === bondAddress?.toUpperCase()
  })
  const isApeListInitialized = typeof state?.getState()?.lists?.byUrl?.[APESWAP]?.current?.tokens?.length === 'number'

  const { mutate: postBillReference, isLoading, isError } = usePostBillReference()
  // TODO: Replace this test code with params from the widget config
  // This can be tested using the following code:
  // <button onClick={handleBuyReference} disabled={isLoading}>Test Post Data</button>
  const billsReference: Partial<BillReferenceData> = {
    chainId,
    transactionHash: '1234',
    referenceId: 'TEST-REF',
  }
  const handleBuyReference = () => {
    postBillReference(billsReference)
  }

  return (
    <Flex
      sx={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {error ? (
        <Text sx={{ textAlign: 'center', fontSize: '12px' }}>
          Error found in the URL config, please get in contact with ApeSwap team
        </Text>
      ) : (
        <Flex
          sx={{
            flexDirection: 'column',
            background: bill ? 'white2' : 'unset',
            borderRadius: '10px',
            overflow: 'hidden',
          }}
        >
          {isApeListInitialized && (
            <>
              {bill ? (
                <>
                  {true && (
                    //TODO: remove this
                    //bill?.billType === 'launch' &&
                    <LaunchBondInfo bill={bill} />
                  )}
                  <Header bill={bill} />
                  <Flex sx={{ p: '10px' }}>
                    <Buy bill={bill} />
                  </Flex>
                </>
              ) : (
                <Text sx={{ textAlign: 'center', fontSize: '12px' }}>Bill not found</Text>
              )}
            </>
          )}
        </Flex>
      )}
    </Flex>
  )
}

export default BondWidget
