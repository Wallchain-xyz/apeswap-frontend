// @ts-nocheck
import { Currency, CurrencyAmount, Percent, SupportedChainId, Token, TradeType, WETH9 } from '@ape.swap/sdk-core'
import { Pair } from '@ape.swap/v2-sdk'
import { PairState } from 'hooks/useV2Pairs'
import { MergedZap } from './actions'
import JSBI from 'jsbi'
import { InterfaceTrade } from 'state/routing/types'
// import { BIPS_BASE } from 'config/constants/misc'
import { computeZapPriceBreakdown } from 'utils/prices'
import { WRAPPED_NATIVE_CURRENCY } from 'config/constants/tokens'
import BigNumber from 'bignumber.js'

// Since a best zap can be null when its the same token we have to check for each possibility
export function mergeBestZaps(
  bestZapOne: InterfaceTrade<Currency, Currency, TradeType> | undefined,
  bestZapTwo: InterfaceTrade<Currency, Currency, TradeType> | undefined,
  out1: Currency | undefined,
  out2: Currency | undefined,
  outputPair: [PairState, Pair | null],
  allowedSlippage: Percent | 'auto',
  totalPairSupply: CurrencyAmount<Token> | undefined,
  chainId: SupportedChainId,
  is0XApi?: boolean,
): MergedZap {
  // if (is0XApi) {
  //   console.log('is0xAPI so', bestZapOne, bestZapTwo)
  //   //TODO: Not sure if matters but might not want to hardcode decimals here
  //   const currencyIn = bestZapOne?.data?.sellTokenAddress
  //     ? {
  //         address: bestZapOne?.data?.sellTokenAddress,
  //         chainId,
  //         isNative: bestZapOne?.isNativeInput,
  //         isToken: true,
  //         decimals: 18,
  //       }
  //     : undefined

  //   const inputAmount =
  //     bestZapOne?.amount && bestZapTwo?.amount
  //       ? JSBI.add(JSBI.BigInt(bestZapOne?.amount), JSBI.BigInt(bestZapTwo?.amount))
  //       : bestZapOne?.amount
  //       ? JSBI.add(JSBI.BigInt(bestZapOne?.amount), JSBI.BigInt(bestZapOne?.amount))
  //       : bestZapTwo?.amount
  //       ? JSBI.add(JSBI.BigInt(bestZapTwo?.amount), JSBI.BigInt(bestZapTwo?.amount))
  //       : JSBI.BigInt(0)

  //   const [pairState, pair] = outputPair

  //   return {
  //     currencyIn: {
  //       currency: currencyIn,
  //       inputAmount: inputAmount,
  //     },
  //     currencyOut1: {
  //       outputCurrency: {
  //         address: bestZapOne?.data?.buyTokenAddress || bestZapOne?.data?.sellTokenAddress,
  //         chainId,
  //         isNative: out1?.isNative,
  //         isToken: true,
  //       },
  //       outputAmount: bestZapOne?.data?.buyAmount,
  //       minOutputAmount: 0,
  //       path: [],
  //     },
  //     currencyOut2: {
  //       outputCurrency: {
  //         address: bestZapTwo?.data?.buyTokenAddress || bestZapOne?.data?.sellTokenAddress,
  //         chainId,
  //         isNative: out2?.isNative,
  //         isToken: true,
  //       },
  //       outputAmount: bestZapTwo?.data?.buyAmount,
  //       minOutputAmount: 0,
  //       path: [],
  //     },
  //     pairOut: {
  //       pair,
  //       pairState,
  //       totalPairSupply,
  //       liquidityMinted: 0,
  //       inAmount: 0,
  //       minInAmount: 0,
  //       poolTokenPercentage: 0,
  //     },
  //     liquidityProviderFee: undefined,
  //     totalPriceImpact: undefined,
  //     chainId,
  //   }
  // }

  let currencyIn
  if (is0XApi) {
    currencyIn = bestZapOne?.data?.sellTokenAddress
      ? {
          address: bestZapOne?.data?.sellTokenAddress,
          chainId,
          isNative: bestZapOne?.isNativeInput,
          isToken: true,
          decimals: 18,
        }
      : undefined
  } else {
    currencyIn = bestZapOne?.inputAmount?.currency || bestZapTwo?.inputAmount?.currency
  }

  const slippageTolerance = allowedSlippage

  // We need to check if a zap path will wrap to not estimate a route
  let inAndOutWrappedOne = currencyIn?.isNative && out1?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId])
  let inAndOutWrappedTwo = currencyIn?.isNative && out2?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId])
  if (!is0XApi) {
    inAndOutWrappedOne =
      (currencyIn?.isNative && out1?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId])) ||
      (currencyIn?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId]) && out1?.isNative)
    inAndOutWrappedTwo =
      (currencyIn?.isNative && out2?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId])) ||
      (currencyIn?.wrapped.equals(WRAPPED_NATIVE_CURRENCY[chainId]) && out2?.isNative)
  }

  // If the input token and output token are the same we need to handle values differently
  const inAndOutAreTheSame1Flag = currencyIn === out1 || inAndOutWrappedOne
  const inAndOutAreTheSame2Flag = currencyIn === out2 || inAndOutWrappedTwo

  // output currencies
  const outputCurrencyOne = out1?.wrapped
  const outputCurrencyTwo = out2?.wrapped

  const halfInput = bestZapOne?.inputAmount || bestZapTwo?.inputAmount
  // Since we divide the input by two for each route we add both inputs here
  let inputAmount
  if (is0XApi) {
    inputAmount =
      bestZapOne?.amount && bestZapTwo?.amount
        ? JSBI.add(JSBI.BigInt(bestZapOne?.amount), JSBI.BigInt(bestZapTwo?.amount))
        : bestZapOne?.amount
        ? JSBI.add(JSBI.BigInt(bestZapOne?.amount), JSBI.BigInt(bestZapOne?.amount))
        : bestZapTwo?.amount
        ? JSBI.add(JSBI.BigInt(bestZapTwo?.amount), JSBI.BigInt(bestZapTwo?.amount))
        : JSBI.BigInt(0)
  } else {
    inputAmount =
      bestZapOne && bestZapTwo
        ? JSBI.add(bestZapOne.inputAmount.quotient, bestZapTwo.inputAmount.quotient)
        : bestZapOne
        ? JSBI.add(bestZapOne.inputAmount.quotient, bestZapOne.inputAmount.quotient)
        : bestZapTwo
        ? JSBI.add(bestZapTwo.inputAmount.quotient, bestZapTwo.inputAmount.quotient)
        : JSBI.BigInt(0)
  }

  // get best paths for each
  const pathOne = bestZapOne ? bestZapOne.routes?.[0].path : []
  const pathTwo = bestZapTwo ? bestZapTwo.routes?.[0].path : []

  // get output amounts
  const outputOne = inAndOutAreTheSame1Flag ? halfInput : bestZapOne?.outputAmount
  const outputTwo = inAndOutAreTheSame2Flag ? halfInput : bestZapTwo?.outputAmount

  // output pairs
  const [pairState, pair] = outputPair

  const swapOutOne = outputOne
  const swapOutTwo = outputTwo

  let minSwapOutOne
  let minSwapOutTwo
  if (is0XApi) {
    minSwapOutOne = { wrapped: 0, quotient: 0 }
    minSwapOutTwo = { wrapped: 0, quotient: 0 }
  } else {
    minSwapOutOne = inAndOutAreTheSame1Flag ? halfInput : bestZapOne?.minimumAmountOut(slippageTolerance)
    minSwapOutTwo = inAndOutAreTheSame2Flag ? halfInput : bestZapTwo?.minimumAmountOut(slippageTolerance)
  }

  // Wrap currencies to handle native
  const [wOutputOne, wOutputTwo, wMinSwapOutOne, wMinSwapOutTwo] = [
    outputOne?.wrapped,
    outputTwo?.wrapped,
    minSwapOutOne?.wrapped,
    minSwapOutTwo?.wrapped,
  ]

  let totalPriceImpact = 0
  let liquidityProviderFee = 0
  if (!is0XApi) {
    const { priceImpactWithoutFee: priceImpactWithoutFeeOne, realizedLPFee: realizedLPFeeOne } =
      computeZapPriceBreakdown(bestZapOne)

    const { priceImpactWithoutFee: priceImpactWithoutFeeTwo, realizedLPFee: realizedLPFeeTwo } =
      computeZapPriceBreakdown(bestZapTwo)

    // Take the greater price impact as that will be used for the LP value
    totalPriceImpact =
      priceImpactWithoutFeeOne && priceImpactWithoutFeeTwo
        ? priceImpactWithoutFeeOne.greaterThan(priceImpactWithoutFeeTwo)
          ? priceImpactWithoutFeeOne
          : priceImpactWithoutFeeTwo
        : priceImpactWithoutFeeOne
        ? priceImpactWithoutFeeOne
        : priceImpactWithoutFeeTwo

    // Add fees if swap occurs otherwise use swap
    liquidityProviderFee =
      realizedLPFeeOne && realizedLPFeeTwo
        ? realizedLPFeeOne?.add(realizedLPFeeTwo)
        : realizedLPFeeOne
        ? realizedLPFeeOne
        : realizedLPFeeTwo
  }

  const pairInAmount =
    outputCurrencyOne &&
    wOutputOne &&
    wOutputTwo &&
    outputCurrencyTwo &&
    pair
      ?.priceOf(inAndOutAreTheSame1Flag ? outputCurrencyTwo : outputCurrencyOne)
      ?.quote(inAndOutAreTheSame1Flag ? wOutputTwo : wOutputOne)

  const minPairInAmount =
    outputCurrencyOne &&
    wMinSwapOutOne &&
    wMinSwapOutTwo &&
    outputCurrencyTwo &&
    pair
      ?.priceOf(inAndOutAreTheSame1Flag ? outputCurrencyTwo : outputCurrencyOne)
      ?.quote(inAndOutAreTheSame1Flag ? wMinSwapOutTwo : wMinSwapOutOne)
      ?.quotient.toString()

  let liquidityMinted
  if (is0XApi) {
    //TODO IMPORTANT: Temporarily hardcoding 0 value so you can buy buy bond.
    //but this shows how much bond is worth I think so needs the right value.
    //Blocked by not being able to get right pair (Only can get V2 rn)
    liquidityMinted = CurrencyAmount.fromRawAmount(
      new Token(chainId, '0x9f1a8caf3c8e94e43aa64922d67dff4dc3e88a42', 18),
      0,
    )
  } else {
    liquidityMinted =
      wOutputOne && wOutputTwo && totalPairSupply && pair?.getLiquidityMinted(totalPairSupply, wOutputOne, wOutputTwo)
  }
  console.log(
    'liquidityMinted',
    liquidityMinted,
    wOutputOne,
    wOutputTwo,
    totalPairSupply,
    pair ?? pair?.getLiquidityMinted(totalPairSupply, wOutputOne, wOutputTwo),
  )

  const poolTokenPercentage =
    liquidityMinted && totalPairSupply
      ? new Percent(liquidityMinted.quotient, totalPairSupply.add(liquidityMinted).quotient)
      : null

  return {
    currencyIn: {
      currency: currencyIn,
      inputAmount,
    },
    currencyOut1: {
      outputCurrency: outputCurrencyOne,
      outputAmount: outputOne,
      minOutputAmount: minSwapOutOne?.quotient.toString(),
      path: pathOne,
    },
    currencyOut2: {
      outputCurrency: outputCurrencyTwo,
      outputAmount: outputTwo,
      minOutputAmount: minSwapOutTwo?.quotient.toString(),
      path: pathTwo,
    },
    pairOut: {
      pair,
      pairState,
      totalPairSupply,
      liquidityMinted,
      inAmount: inAndOutAreTheSame1Flag
        ? { token1: pairInAmount, token2: swapOutTwo }
        : { token1: swapOutOne, token2: pairInAmount },
      minInAmount: inAndOutAreTheSame1Flag
        ? { token1: minPairInAmount, token2: minSwapOutTwo?.quotient.toString() }
        : { token1: minSwapOutOne?.quotient.toString(), token2: minPairInAmount },
      poolTokenPercentage,
    },
    liquidityProviderFee,
    totalPriceImpact,
    chainId,
  }
}
