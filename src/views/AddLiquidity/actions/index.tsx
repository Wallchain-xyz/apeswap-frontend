import { Button, Flex } from 'components/uikit'
import Add from './Add'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { AddInterface } from './types'
import { Field } from 'state/mint/v3/actions'
import { NONFUNGIBLE_POSITION_MANAGER_ADDRESSES } from 'config/constants/addresses'
import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import Approval from './Approval'

interface ActionsInterface extends AddInterface {}

const Actions = (props: ActionsInterface) => {
  const { chainId, account } = useWeb3React()
  const { parsedAmounts, errorMessage, invalidRange } = props

  const isValid = !errorMessage && !invalidRange

  // check whether the user has approved the router on the tokens
  const [approvalA, approveACallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_A],
    chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined,
  )
  const [approvalB, approveBCallback] = useApproveCallback(
    parsedAmounts[Field.CURRENCY_B],
    chainId ? NONFUNGIBLE_POSITION_MANAGER_ADDRESSES[chainId] : undefined,
  )
  // we need an existence check on parsed amounts for single-asset deposits
  const showApprovalA = approvalA !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_A]
  const showApprovalB = approvalB !== ApprovalState.APPROVED && !!parsedAmounts[Field.CURRENCY_B]

  console.log(approvalA, approvalB, isValid)
  return (
    <Flex sx={{ mt: '10px' }}>
      {!account ? (
        <ConnectWalletButton />
      ) : errorMessage ? (
        <Button fullWidth disabled>
          {errorMessage}
        </Button>
      ) : (approvalA === ApprovalState.NOT_APPROVED ||
          approvalA === ApprovalState.PENDING ||
          approvalB === ApprovalState.NOT_APPROVED ||
          approvalB === ApprovalState.PENDING) &&
        isValid ? (
        <Approval
          approvalA={approvalA}
          approvalB={approvalB}
          showApprovalA={showApprovalA}
          showApprovalB={showApprovalB}
          approveACallback={approveACallback}
          approveBCallback={approveBCallback}
          {...props}
        />
      ) : (
        <Add {...props} />
      )}
    </Flex>
  )
}

export default Actions
