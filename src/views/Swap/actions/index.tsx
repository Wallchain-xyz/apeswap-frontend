import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { useERC20PermitFromTrade } from 'hooks/useERC20Permit'
import { TradeState } from 'state/routing/types'
import Swap from './Swap'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { Button, Flex } from 'components/uikit'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import Approval from './Approval'
import { WrapInputError, WrapType } from 'hooks/useWrapCallback'
import { Route } from '@lifi/sdk'

const Actions = ({
  routingState,
  inputError,
  selectedRoute,
  showWrap,
  wrapType,
  wrapInputError,
  onWrap,
  inputCurrencyAmount
}: {
  routingState?: TradeState
  inputError?: string
  selectedRoute: Route | undefined
  showWrap: boolean | undefined
  wrapInputError: WrapInputError | undefined
  wrapType: WrapType | undefined
  onWrap: (() => Promise<void>) | undefined
  inputCurrencyAmount: CurrencyAmount<Currency> | undefined
}) => {
  const { account } = useWeb3React()
  const transactionDeadline = useTransactionDeadline()
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(inputCurrencyAmount)

  const {
    state: signatureState,
    signatureData,
    gatherPermitSignature,
  } = useERC20PermitFromTrade(inputCurrencyAmount, transactionDeadline)

  const showApproveFlow =
    (!inputError && approvalState === ApprovalState.NOT_APPROVED) || approvalState === ApprovalState.PENDING

  return (
    <Flex mt="10px">
      {!account ? (
        <ConnectWalletButton />
      ) : (inputError || routingState === TradeState.NO_ROUTE_FOUND) && !showWrap ? (
        <Button fullWidth disabled>
          {routingState === TradeState.NO_ROUTE_FOUND ? 'No Route Found' : inputError}
        </Button>
      ) : showApproveFlow ? (
        <Approval
          signatureState={signatureState}
          approvalState={approvalState}
          gatherPermitSignature={gatherPermitSignature}
          approveCallback={approveCallback}
        />
      ) : (
        <Swap
          routingState={routingState}
          selectedRoute={selectedRoute}
          showWrap={showWrap}
          wrapInputError={wrapInputError}
          wrapType={wrapType}
          onWrap={onWrap}
        />
      )}
    </Flex>
  )
}

export default Actions
