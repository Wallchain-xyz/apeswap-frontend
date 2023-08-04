import { Currency, CurrencyAmount } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import DexNav from 'components/DexNav'
import { Flex } from 'components/uikit'
import useWrapCallback, { WrapType } from 'hooks/useWrapCallback'
import { useMemo } from 'react'
import { TradeState } from 'state/routing/types'
import { Field } from 'state/swap/actions'
import {
  useDefaultsFromURLSearch,
  useDerivedSwapInfo,
  useSwapActionHandlers,
  useSwapState,
} from 'state/swap/hooks/hooks'
import { maxAmountSpend } from 'utils/maxAmountSpend'
import Actions from './actions'
import LoadingBestRoute from './components/LoadingBestRoute'
import Risk from './components/Risk/Risk'
import SwapSwitchButton from './components/SwapSwitchButton'
import { getBNWithDecimals } from '../../utils/getBalanceNumber'
import RouteDetails from './components/RouteDetails'
import { toPrecisionAvoidExponential } from './utils'
import JSBI from 'jsbi'
import SwapAssetNotice from './components/SwapAssetNotice'
import { KNOWN_REFLECT_ADDRESSES } from './constants'
import OmniChainPanel from '../../components/OmniChain/OmniChainPanel'
import { useCurrencyBalancesWithChain } from '../../hooks/balances/useCurrenciesBalancesWithChain'

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
  } = useWrapCallback(currencies[Field.INPUT]?.currency, currencies[Field.OUTPUT]?.currency, typedValue)

  const showWrap: boolean = wrapType !== WrapType.NOT_APPLICABLE

  const { onSwitchTokens, onCurrencySelection, onUserInput } = useSwapActionHandlers()

  const inputCurrencyAmount =
    currencies?.INPUT?.currency && selectedRoute?.fromAmount
      ? CurrencyAmount.fromRawAmount(currencies?.INPUT?.currency, JSBI.BigInt(selectedRoute?.fromAmount))
      : undefined

  const inputCurrencyBalance = useCurrencyBalancesWithChain(
    account,
    [currencies?.INPUT?.currency ?? undefined],
    currencies?.INPUT?.currency?.chainId,
  )?.[0]

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
        <OmniChainPanel
          panelText="From"
          value={typedValue}
          currency={currencies[Field.INPUT].currency}
          currencyChain={currencies[Field.INPUT].chain}
          onCurrencySelect={(currency, chain) => onCurrencySelection(Field.INPUT, currency, chain)}
          onUserInput={(val) => onUserInput(Field.INPUT, val)}
          handleMaxInput={() => maxInputAmount && onUserInput(Field.INPUT, maxInputAmount.toExact())}
          apiPrice={selectedRoute?.fromAmountUSD}
        />
        <Flex
          sx={{ width: '100%', justifyContent: 'flex-end', height: '50px', alignItems: 'center', position: 'relative' }}
        >
          <SwapSwitchButton onClick={onSwitchTokens} />
          <Risk chainId={currencies[Field.OUTPUT]?.currency?.chainId} currency={currencies[Field.OUTPUT]?.currency} />
        </Flex>
        <OmniChainPanel
          panelText="To"
          onCurrencySelect={(currency, chain) => onCurrencySelection(Field.OUTPUT, currency, chain)}
          value={parsedOutput}
          currency={currencies[Field.OUTPUT]?.currency}
          currencyChain={currencies[Field.OUTPUT]?.chain}
          disabled
          outputPanel={true}
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
