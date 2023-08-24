import React from 'react'
import { Button, Flex } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { ApprovalState, useApproveCallbackFromZap } from 'hooks/useApproveCallback'
import { styles } from '../styles'
import ZapConfirmationModal from './ZapConfirmationModal'
import { useWeb3React } from '@web3-react/core'
import useModal from 'hooks/useModal'
import ConnectWalletButton from 'components/ConnectWallet'
import { useUserSlippageToleranceWithDefault, useUserZapSlippageTolerance } from 'state/user/hooks'
import { DEFAULT_ADD_V2_SLIPPAGE_TOLERANCE } from 'views/V2/AddLiquidityV2/components/Actions'
import { MergedZap } from 'state/zap/actions'
import { TradeState } from 'state/routing/types'
import { SupportedChainId } from '@ape.swap/sdk-core'

// Hooks
import useGetWidoTokenAllowance from 'state/zap/providers/wido/useGetWidoTokenAllowance'
import { ZapVersion } from '@ape.swap/apeswap-lists'

interface ZapLiquidityActionsProps {
  handleZap: () => void
  zapInputError: string | undefined
  zapRouteState: TradeState
  zap: MergedZap
  zapErrorMessage: string | undefined
  txHash?: string
  handleDismissConfirmation: () => void
  isWidoQuoteLoading?: boolean
  shouldUseWido?: boolean
  widoQuote?: any
  inputTokenAddress?: string
  inputTokenDecimals?: number
  toTokenAddress?: string
  zapVersion?: ZapVersion
}

const ZapLiquidityActions: React.FC<ZapLiquidityActionsProps> = ({
  zapInputError,
  zap,
  handleZap,
  zapErrorMessage,
  zapRouteState,
  txHash,
  handleDismissConfirmation,
  isWidoQuoteLoading = false,
  shouldUseWido = false,
  widoQuote,
  inputTokenAddress = '',
  inputTokenDecimals = 18,
  toTokenAddress = '',
  zapVersion = ZapVersion.ZapV1,
}) => {
  const { t } = useTranslation()
  const { account, chainId = SupportedChainId.BSC } = useWeb3React()

  const {
    requiresApproval: requiresApprovalWido,
    approveWidoSpender,
    isApproveWidoSpenderLoading,
  } = useGetWidoTokenAllowance({
    inputTokenAddress,
    inputTokenDecimals,
    toTokenAddress,
    zapVersion,
    toChainId: chainId,
    fromChainId: chainId,
  })

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

  const [allowedSlippage] = useUserZapSlippageTolerance()

  const [approval, approveCallback] = useApproveCallbackFromZap(zap, allowedSlippage)
  const showApproveFlow =
    !zapInputError && (approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING)

  const renderActionOld = () => {
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
      // TODO: Add Wido approval flow here
      return (
        <Flex sx={{ width: '100%' }}>
          <>
            <Button
              onClick={approveCallback}
              disabled={approval !== ApprovalState.NOT_APPROVED}
              load={approval === ApprovalState.PENDING}
              fullWidth
              sx={{ padding: '10px 2px' }}
            >
              {approval === ApprovalState.PENDING
                ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
                : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
            </Button>
          </>
        </Flex>
      )
    }
    return (
      <Button
        fullWidth
        onClick={() => handleConfirmZap()}
        disabled={zapRouteState === TradeState.LOADING || isWidoQuoteLoading}
      >
        {t('Zap Liquidity')}
      </Button>
    )
  }

  const renderAction = () => {
    switch (true) {
      case !account:
        return <ConnectWalletButton />

      case !!zapInputError:
        return (
          <Button fullWidth disabled>
            {zapInputError}
          </Button>
        )
      case shouldUseWido && requiresApprovalWido:
        return (
          <Button
            onClick={() => approveWidoSpender()}
            disabled={isApproveWidoSpenderLoading}
            load={isApproveWidoSpenderLoading}
          >
            {isApproveWidoSpenderLoading
              ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
              : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
          </Button>
        )
      case showApproveFlow && !shouldUseWido:
        return (
          <Flex sx={{ width: '100%' }}>
            <>
              <Button
                onClick={approveCallback}
                disabled={approval !== ApprovalState.NOT_APPROVED}
                load={approval === ApprovalState.PENDING}
                fullWidth
                sx={{ padding: '10px 2px' }}
              >
                {approval === ApprovalState.PENDING
                  ? `${t('Enabling')} ${zap?.currencyIn?.currency?.symbol}`
                  : `${t('Enable')} ${zap?.currencyIn?.currency?.symbol}`}
              </Button>
            </>
          </Flex>
        )

      default:
        return (
          <Button
            fullWidth
            onClick={() => handleConfirmZap()}
            disabled={zapRouteState === TradeState.LOADING || (!widoQuote && shouldUseWido)}
          >
            {t('Zap Liquidity')}
          </Button>
        )
    }
  }

  return <Flex sx={styles.zapActionsContainer}>{renderAction()}</Flex>
}

export default React.memo(ZapLiquidityActions)
