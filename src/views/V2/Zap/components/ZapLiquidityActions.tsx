import React from 'react'
import { Button, Flex } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from '../styles'
import ZapConfirmationModal from './ZapConfirmationModal'
import { useWeb3React } from '@web3-react/core'
import useModal from 'hooks/useModal'
import ConnectWalletButton from 'components/ConnectWallet'
import { useUserSlippageToleranceWithDefault, useUserZapSlippageTolerance } from 'state/user/hooks'
import { DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE } from 'views/V2/AddLiquidityV2/components/Actions'
import { MergedZap } from 'state/zap/actions'
import { TradeState } from 'state/routing/types'
import { useZapActionHandlers, useZapState } from 'state/zap/hooks'
import { ApprovalState } from 'lib/hooks/useApproval'

interface ZapLiquidityActionsProps {
  handleZap: () => void
  zapInputError: string | undefined
  zapRouteState: TradeState
  zap: MergedZap
  zapErrorMessage: string | undefined
  txHash?: string
  handleDismissConfirmation: () => void
}

const ZapLiquidityActions: React.FC<ZapLiquidityActionsProps> = ({
  zapInputError,
  zap,
  handleZap,
  zapErrorMessage,
  zapRouteState,
  txHash,
  handleDismissConfirmation,
}) => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  // Zap State
  const [ slippage ] = useUserZapSlippageTolerance()
  const { approvalState: zapApprovalState } = useZapState()
  const { onZapApproval } = useZapActionHandlers()

  const [onPresentAddLiquidityModal] = useModal(
    <ZapConfirmationModal
      title={t('Confirm ZAP')}
      zap={zap}
      onDismiss={handleDismissConfirmation}
      txHash={txHash}
      zapErrorMessage={zapErrorMessage}
    />,
    true,
    true,
    'zapConfirmationModal',
  )

  const handleConfirmZap = () => {
    onPresentAddLiquidityModal()
    handleZap()
  }

  const showApproveFlow =
    !zapInputError && (zapApprovalState === ApprovalState.NOT_APPROVED || zapApprovalState === ApprovalState.PENDING)

  const renderAction = () => {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (zapInputError) {
      return (
        <Button fullWidth disabled>
          {zapInputError}
        </Button>
      )
    }
    if (showApproveFlow) {
      return (
        <Flex sx={{ width: '100%' }}>
          <>
            <Button
              onClick={onZapApproval}
              disabled={zapApprovalState !== ApprovalState.NOT_APPROVED}
              load={zapApprovalState === ApprovalState.PENDING}
              fullWidth
              sx={{ padding: '10px 2px' }}
            >
              {zapApprovalState === ApprovalState.PENDING
                ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
                : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
            </Button>
          </>
        </Flex>
      )
    }
    return (
      <Button fullWidth onClick={() => handleConfirmZap()} disabled={zapRouteState === TradeState.LOADING}>
        {t('Zap Liquidity')}
      </Button>
    )
  }

  return <Flex sx={styles.zapActionsContainer}>{renderAction()}</Flex>
}

export default React.memo(ZapLiquidityActions)
