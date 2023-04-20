import { Currency, CurrencyAmount, Percent, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { PairState } from 'hooks/useV2Pairs'
import { MergedZap } from './actions'
import JSBI from 'jsbi'
import { BIPS_BASE } from 'config/constants/misc'

// Since a best zap can be null when its the same token we have to check for each possibility
export function mergeBestZaps(
  bestZapOne: any | null,
  bestZapTwo: any | null,
  out1: Currency | undefined,
  out2: Currency | undefined,
  outputPair: [PairState, Pair | null],
  allowedSlippage: Percent | 'auto',
  totalPairSupply: CurrencyAmount<Token> | undefined,
  chainId: SupportedChainId,
): MergedZap | null {
  //   const currencyIn = bestZapOne?.inputAmount.currency || bestZapTwo?.inputAmount.currency
  //   const slippageTolerance = new Percent(JSBI.BigInt(allowedSlippage), BIPS_BASE)

  //   // We need to check if a zap path will wrap to not estimate a route
  //   const inAndOutWrappedOne =
  //     (currencyIn === ETHER && currencyEquals(WETH[chainId], outputCurrencies[0])) ||
  //     (currencyEquals(WETH[chainId], currencyIn) && outputCurrencies[0] === ETHER)
  //   const inAndOutWrappedTwo =
  //     (currencyIn === ETHER && currencyEquals(WETH[chainId], outputCurrencies[1])) ||
  //     (currencyEquals(WETH[chainId], currencyIn) && outputCurrencies[1] === ETHER)

  //   // If the input token and output token are the same we need to handle values differently
  //   const inAndOutAreTheSame1Flag = currencyIn === outputCurrencies[0] || inAndOutWrappedOne
  //   const inAndOutAreTheSame2Flag = currencyIn === outputCurrencies[1] || inAndOutWrappedTwo

  //   // output currencies
  //   const outputCurrencyOne = outputCurrencies[0].wrapped
  //   const outputCurrencyTwo = outputCurrencies[1].wrapped

  //   const halfInput = bestZapOne?.inputAmount || bestZapTwo?.inputAmount
  //   // Since we divide the input by two for each route we add both inputs here
  //   const inputAmount =
  //     bestZapOne && bestZapTwo
  //       ? JSBI.add(bestZapOne.inputAmount.raw, bestZapTwo.inputAmount.raw)
  //       : bestZapOne
  //       ? JSBI.add(bestZapOne.inputAmount.raw, bestZapOne.inputAmount.raw)
  //       : bestZapTwo
  //       ? JSBI.add(bestZapTwo.inputAmount.raw, bestZapTwo.inputAmount.raw)
  //       : JSBI.BigInt(0)

  //   // get best paths for each
  //   const pathOne = bestZapOne ? bestZapOne.route.path : []
  //   const pathTwo = bestZapTwo ? bestZapTwo.route.path : []

  //   // get output amounts
  //   const outputOne = inAndOutAreTheSame1Flag ? halfInput : bestZapOne?.outputAmount
  //   const outputTwo = inAndOutAreTheSame2Flag ? halfInput : bestZapTwo?.outputAmount

  //   // output pairs
  //   const [pairState, pair] = outputPair

  //   const swapOutOne = outputOne
  //   const swapOutTwo = outputTwo

  //   const minSwapOutOne = inAndOutAreTheSame1Flag ? halfInput : bestZapOne?.minimumAmountOut(slippageTolerance)
  //   const minSwapOutTwo = inAndOutAreTheSame2Flag ? halfInput : bestZapTwo?.minimumAmountOut(slippageTolerance)

  //   // Wrap currencies to handle native
  //   const [wOutputOne, wOutputTwo, wMinSwapOutOne, wMinSwapOutTwo] = [
  //     wrappedCurrencyAmount(outputOne, chainId),
  //     wrappedCurrencyAmount(outputTwo, chainId),
  //     wrappedCurrencyAmount(minSwapOutOne, chainId),
  //     wrappedCurrencyAmount(minSwapOutTwo, chainId),
  //   ]

  //   const { priceImpactWithoutFee: priceImpactWithoutFeeOne, realizedLPFee: realizedLPFeeOne } =
  //     computeTradePriceBreakdown(chainId, SmartRouter.APE, bestZapOne)

  //   const { priceImpactWithoutFee: priceImpactWithoutFeeTwo, realizedLPFee: realizedLPFeeTwo } =
  //     computeTradePriceBreakdown(chainId, SmartRouter.APE, bestZapTwo)

  //   // Take the greater price impact as that will be used for the LP value
  //   const totalPriceImpact =
  //     priceImpactWithoutFeeOne && priceImpactWithoutFeeTwo
  //       ? priceImpactWithoutFeeOne.greaterThan(priceImpactWithoutFeeTwo)
  //         ? priceImpactWithoutFeeOne
  //         : priceImpactWithoutFeeTwo
  //       : priceImpactWithoutFeeOne
  //       ? priceImpactWithoutFeeOne
  //       : priceImpactWithoutFeeTwo

  //   // Add fees if swap occurs otherwise use swap
  //   const liquidityProviderFee =
  //     realizedLPFeeOne && realizedLPFeeTwo
  //       ? realizedLPFeeOne?.add(realizedLPFeeTwo)
  //       : realizedLPFeeOne
  //       ? realizedLPFeeOne
  //       : realizedLPFeeTwo

  //   const pairInAmount =
  //     outputCurrencyOne &&
  //     wOutputOne &&
  //     wOutputTwo &&
  //     outputCurrencyTwo &&
  //     pair
  //       ?.priceOf(inAndOutAreTheSame1Flag ? outputCurrencyTwo : outputCurrencyOne)
  //       .quote(inAndOutAreTheSame1Flag ? wOutputTwo : wOutputOne)

  //   const minPairInAmount =
  //     outputCurrencyOne &&
  //     wMinSwapOutOne &&
  //     wMinSwapOutTwo &&
  //     outputCurrencyTwo &&
  //     pair
  //       ?.priceOf(inAndOutAreTheSame1Flag ? outputCurrencyTwo : outputCurrencyOne)
  //       .quote(inAndOutAreTheSame1Flag ? wMinSwapOutTwo : wMinSwapOutOne)
  //       .quotient.toString()

  //   const liquidityMinted =
  //     wOutputOne && wOutputTwo && totalPairSupply && pair?.getLiquidityMinted(totalPairSupply, wOutputOne, wOutputTwo)

  //   const poolTokenPercentage =
  //     liquidityMinted && totalPairSupply
  //       ? new Percent(liquidityMinted.raw, totalPairSupply.add(liquidityMinted).quotient)
  //       : null

  //   return {
  //     currencyIn: {
  //       currency: currencyIn,
  //       inputAmount,
  //     },
  //     currencyOut1: {
  //       outputCurrency: outputCurrencyOne,
  //       outputAmount: outputOne,
  //       minOutputAmount: minSwapOutOne?.raw.toString(),
  //       path: pathOne,
  //     },
  //     currencyOut2: {
  //       outputCurrency: outputCurrencyTwo,
  //       outputAmount: outputTwo,
  //       minOutputAmount: minSwapOutTwo?.raw.toString(),
  //       path: pathTwo,
  //     },
  //     pairOut: {
  //       pair,
  //       pairState,
  //       totalPairSupply,
  //       liquidityMinted,
  //       inAmount: inAndOutAreTheSame1Flag
  //         ? { token1: pairInAmount, token2: swapOutTwo }
  //         : { token1: swapOutOne, token2: pairInAmount },
  //       minInAmount: inAndOutAreTheSame1Flag
  //         ? { token1: minPairInAmount, token2: minSwapOutTwo?.raw.toString() }
  //         : { token1: minSwapOutOne?.raw.toString(), token2: minPairInAmount },
  //       poolTokenPercentage,
  //     },
  //     liquidityProviderFee,
  //     totalPriceImpact,
  //     chainId,
  //   }
  return null
}
