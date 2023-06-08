import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { useERC20PermitFromTrade } from 'hooks/useERC20Permit'
import { InterfaceTrade, TradeState } from 'state/routing/types'
import Swap from './Swap'
import { ApprovalState, useApproveCallbackFromTrade } from 'hooks/useApproveCallback'
import { ReactNode } from 'react'
import { Button, Flex, Text } from 'components/uikit'
import useTransactionDeadline from 'hooks/useTransactionDeadline'
import Approval from './Approval'
import { WrapInputError, WrapType } from 'hooks/useWrapCallback'

const Actions = ({
  tradeState,
  swapInputError,
  trade,
  allowedSlippage,
  recipient,
  stablecoinPriceImpact,
  showWrap,
  wrapType,
  wrapInputError,
  onWrap,
}: {
  tradeState: TradeState
  swapInputError: ReactNode
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
  recipient: string | null
  stablecoinPriceImpact: Percent | null
  showWrap: boolean | undefined
  wrapInputError: WrapInputError | undefined
  wrapType: WrapType | undefined
  onWrap: (() => Promise<void>) | undefined
}) => {
  const { account } = useWeb3React()
  const transactionDeadline = useTransactionDeadline()
  const [approvalState, approveCallback] = useApproveCallbackFromTrade(trade, allowedSlippage)

  const {
    state: signatureState,
    signatureData,
    gatherPermitSignature,
  } = useERC20PermitFromTrade(trade, allowedSlippage, transactionDeadline)

  const showApproveFlow =
    (!swapInputError && approvalState === ApprovalState.NOT_APPROVED) || approvalState === ApprovalState.PENDING

  return (
    <Flex sx={{ mt: '10px' }}>
      {!account ? (
        <ConnectWalletButton />
      ) : (swapInputError || tradeState === TradeState.NO_ROUTE_FOUND) && !showWrap ? (
        <Button fullWidth disabled>
          {tradeState === TradeState.NO_ROUTE_FOUND ? 'No Route Found' : swapInputError}
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
          tradeState={tradeState}
          trade={trade}
          allowedSlippage={allowedSlippage}
          signatureData={signatureData}
          recipient={recipient}
          stablecoinPriceImpact={stablecoinPriceImpact}
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
