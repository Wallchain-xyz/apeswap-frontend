import { Currency, CurrencyAmount, SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import DexPanel from 'components/DexPanel'
import { Flex } from 'components/uikit'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useMemo } from 'react'
import { TradeState } from 'state/routing/types'
import { Field } from 'state/swap/actions'
import { useDefaultsFromURLSearch, useDerivedSwapInfo, useSwapActionHandlers, useSwapState } from 'state/swap/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Actions from './actions'
import LoadingBestRoute from './components/LoadingBestRoute'
import Risk from './components/Risk/Risk'
import SwapSwitchButton from './components/SwapSwitchButton'
import useCurrencyBalance from '../../lib/hooks/useCurrencyBalance'
import { getBNWithDecimals } from '../../utils/getBalanceNumber'
import RouteDetails from './components/RouteDetails'
import { toPrecisionAvoidExponential } from './utils'
import JSBI from 'jsbi'
import { Pricing } from '../../components/DexPanel/types'
import SwapAssetNotice from './components/SwapAssetNotice'
import { KNOWN_REFLECT_ADDRESSES } from './constants'

const Swap = () => {
  useDefaultsFromURLSearch()
  const { account, chainId } = useWeb3React()

  // TODO: Add token warning stuff

  // token warning stuff
  // const [loadedInputCurrency, loadedOutputCurrency] = [
  //   useCurrency(loadedUrlParams?.[Field.INPUT]?.currencyId),
  //   useCurrency(loadedUrlParams?.[Field.OUTPUT]?.currencyId),
  // ]

  // const [dismissTokenWarning, setDismissTokenWarning] = useState<boolean>(false)
  // const urlLoadedTokens: Token[] = useMemo(
  //   () => [loadedInputCurrency, loadedOutputCurrency]?.filter((c): c is Token => c?.isToken ?? false) ?? [],
  //   [loadedInputCurrency, loadedOutputCurrency],
  // )

  // const handleConfirmTokenWarning = useCallback(() => {
  //   setDismissTokenWarning(true)
  // }, [])

  // dismiss warning if all imported tokens are in active lists
  // const defaultTokens = useAllTokens()
  // const importTokensNotInDefault = useMemo(
  //   () =>
  //     urlLoadedTokens &&
  //     urlLoadedTokens
  //       .filter((token: Token) => {
  //         return !(token.address in defaultTokens)
  //       })
  //       .filter((token: Token) => {
  //         // Any token addresses that are loaded from the shorthands map do not need to show the import URL
  //         const supported = supportedChainId(chainId)
  //         if (!supported) return true
  //         return !Object.keys(TOKEN_SHORTHANDS).some((shorthand) => {
  //           const shorthandTokenAddress = TOKEN_SHORTHANDS[shorthand][supported]
  //           return shorthandTokenAddress && shorthandTokenAddress === token.address
  //         })
  //       }),
  //   [chainId, defaultTokens, urlLoadedTokens],
  // )

  // swap state
  const { typedValue } = useSwapState()
  const { routing, currencies, inputError } = useDerivedSwapInfo()
  const { routes, routingState, feeStructure } = routing
  const selectedRoute = routes[0] // hardcoded for the time being

  const routeNotFound = routingState === TradeState.NO_ROUTE_FOUND
  const routeIsLoading = routingState === TradeState.LOADING

  const {
    wrapType,
    execute: onWrap,
    inputError: wrapInputError,
  } = useWrapCallback(currencies[Field.INPUT], currencies[Field.OUTPUT], typedValue)

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers()

  const inputCurrencyAmount =
    currencies?.INPUT && selectedRoute?.fromAmount
      ? CurrencyAmount.fromRawAmount(currencies?.INPUT, JSBI.BigInt(selectedRoute?.fromAmount))
      : undefined
  const inputCurrencyBalance = useCurrencyBalance(account, currencies?.INPUT ?? undefined)

  const maxInputAmount: CurrencyAmount<Currency> | undefined = useMemo(
    () => maxAmountSpend(inputCurrencyBalance),
    [inputCurrencyBalance],
  )

  const outputAmount = getBNWithDecimals(selectedRoute?.toAmount, selectedRoute?.toToken?.decimals)
  const parsedOutput = outputAmount ? toPrecisionAvoidExponential(outputAmount, 6) : ''

  return (
    <Flex sx={{ flexDirection: 'column', gap: '10px' }}>
      {
        // Logic to check if addresses & chain are a known reflect, then show notice
        KNOWN_REFLECT_ADDRESSES.some((reflect) => {
          return (
            reflect.chain === chainId &&
            reflect.address.toLowerCase() === selectedRoute?.fromToken?.address?.toLowerCase()
          )
        }) && <SwapAssetNotice />
      }

      <Flex variant="flex.dexContainer">
        <DexNav />
        <Flex sx={{ margin: '25px 0px', maxWidth: '100%', width: '420px' }} />
        <DexPanel
          panelText="From"
          onCurrencySelect={(currency) => onCurrencySelection(Field.INPUT, currency)}
          onUserInput={(val) => onUserInput(Field.INPUT, val)}
          handleMaxInput={() => maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())}
          value={typedValue}
          currency={currencies[Field.INPUT]}
          otherCurrency={currencies[Field.OUTPUT]}
          pricing={Pricing.LIFI}
          apiPrice={selectedRoute?.fromAmountUSD}
        />
        <Flex
          sx={{ width: '100%', justifyContent: 'flex-end', height: '50px', alignItems: 'center', position: 'relative' }}
        >
          <SwapSwitchButton onClick={onSwitchTokens} />
          <Risk chainId={chainId ?? SupportedChainId.BSC} currency={currencies[Field.OUTPUT]} />
        </Flex>
        <DexPanel
          panelText="To"
          onCurrencySelect={(currency) => onCurrencySelection(Field.OUTPUT, currency)}
          value={parsedOutput}
          currency={currencies[Field.OUTPUT]}
          otherCurrency={currencies[Field.INPUT]}
          disabled
          pricing={Pricing.LIFI}
          apiPrice={selectedRoute?.toAmountUSD}
        />
        {!showWrap && routeIsLoading ? (
          <LoadingBestRoute />
        ) : (
          !routeNotFound && !showWrap && selectedRoute && <RouteDetails route={selectedRoute} fee={feeStructure.fee} />
        )}
        <Actions
          routingState={routingState}
          inputError={inputError}
          selectedRoute={selectedRoute}
          inputCurrencyAmount={inputCurrencyAmount}
          showWrap={showWrap}
          wrapInputError={wrapInputError}
          wrapType={wrapType}
          onWrap={onWrap}
          feeStructure={feeStructure}
        />
      </Flex>
    </Flex>
  )
}
export default Swap
