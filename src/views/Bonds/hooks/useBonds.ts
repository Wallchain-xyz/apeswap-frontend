import { BillVersion, bills } from '@ape.swap/apeswap-lists'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Interface } from 'ethers/lib/utils'
import { useMultipleContractSingleData } from 'lib/hooks/multicall'
import { useMemo } from 'react'
import bondAbi from 'config/abi/bond.json'
import useAllTokenPrices from 'hooks/useAllTokenPrices'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { getFirstNonZeroDigits } from 'utils/roundNumber'
import useUserBonds from './useUserBonds'
import { BondInterface } from 'config/abi/types/Bond'

const BOND_INTERFACE = new Interface(bondAbi) as BondInterface

const useBonds = () => {
  const { chainId } = useWeb3React()
  const tokenPrices = useAllTokenPrices()
  const filteredBonds = useMemo(
    () => bills.filter((bond) => bond.contractAddress[chainId as SupportedChainId]),
    [chainId],
  )
  const bondAddresses = useMemo(
    () => filteredBonds.map((bond) => bond.contractAddress[chainId as SupportedChainId]),
    [chainId, filteredBonds],
  )

  // TODO: Extend the multicall package to have a MultipleContractMultipleData hook
  // In the future contracts should have better read functions or build a lens to not have to call each individual
  const trueBillPriceResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'trueBillPrice')
  const currentDebtResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'currentDebt')
  const currentFeeResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'currentFee')
  const debtDecayResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'debtDecay')
  const debtRatioResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'debtRatio')
  const totalDebtResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'totalDebt')
  const totalPayoutGivenResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'totalPayoutGiven')
  const totalPrincipalBilledResult = useMultipleContractSingleData(
    bondAddresses,
    BOND_INTERFACE,
    'totalPrincipalBilled',
  )
  const billNftResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'billNft')
  const termsResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'terms')

  const maxTotalPayoutResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'maxTotalPayout')
  const getMaxTotalPayoutResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'getMaxTotalPayout')

  const maxPayoutResult = useMultipleContractSingleData(bondAddresses, BOND_INTERFACE, 'maxPayout')

  useUserBonds()

  const bonds = useMemo(() => {
    return filteredBonds.map((bond, index) => {
      const { result: trueBillPrice } = trueBillPriceResult[index]
      const { result: currentDebt } = currentDebtResult[index]
      const { result: currentFee } = currentFeeResult[index]
      const { result: debtDecay } = debtDecayResult[index]
      const { result: debtRatio } = debtRatioResult[index]
      const { result: totalPayoutGiven } = totalPayoutGivenResult[index]
      const { result: totalPrincipalBilled } = totalPrincipalBilledResult[index]
      // Only valid for V1
      const { result: maxTotalPayout } = maxTotalPayoutResult[index]
      // Only valid for V2
      const { result: getMaxTotalPayout } = getMaxTotalPayoutResult[index]
      const { result: billNft } = billNftResult[index]
      const { result: terms } = termsResult[index]
      const { result: maxPayoutTokens } = maxPayoutResult[index]
      const { result: totalDebt } = totalDebtResult[index]
      const lpPrice = tokenPrices?.find(
        (token) => token.address[chainId as SupportedChainId] === bond.lpToken.address[chainId as SupportedChainId],
      )?.price
      const earnTokenPrice = tokenPrices?.find(
        (token) => token.address[chainId as SupportedChainId] === bond.earnToken.address[chainId as SupportedChainId],
      )?.price
      const [controlVariable, vestingTerm, minimumPrice, maxPayout, maxDebt] = terms ? terms : []
      const priceUsd = trueBillPrice?.[0] ? lpPrice && getBalanceNumber(trueBillPrice?.[0]?.toString()) * lpPrice : 0
      const discount = earnTokenPrice && priceUsd && ((earnTokenPrice - priceUsd) / earnTokenPrice) * 100
      const formatedPrice = priceUsd ? getFirstNonZeroDigits(priceUsd) : undefined
      return {
        ...bond,
        price: trueBillPrice?.toString(),
        priceUsd: formatedPrice,
        vestingTime: vestingTerm?.toString(),
        discount: discount?.toFixed(2),
        trueBillPrice: trueBillPrice?.toString(),
        currentDebt: currentDebt?.toString(),
        currentFee: currentFee?.toString(),
        debtDecay: debtDecay?.toString(),
        debtRatio: debtRatio?.toString(),
        totalDebt: totalDebt?.toString(),
        totalPayoutGiven: totalPayoutGiven?.toString(),
        maxTotalPayOut:
          bond.billVersion === BillVersion.V1 ? maxTotalPayout?.toString() : getMaxTotalPayout?.toString(),
        totalPrincipalBilled: totalPrincipalBilled?.toString(),
        controlVariable: controlVariable?.toString(),
        minimumPrice: minimumPrice?.toString(),
        maxPayout: maxPayout?.toString(),
        maxDebt: maxDebt?.toString(),
        billNftAddress: billNft?.toString(),
        earnTokenPrice,
        lpPrice,
        maxPayoutTokens: maxPayoutTokens?.toString(),
      }
    })
  }, [
    trueBillPriceResult,
    totalDebtResult,
    currentDebtResult,
    currentFeeResult,
    debtDecayResult,
    totalPayoutGivenResult,
    totalPrincipalBilledResult,
    billNftResult,
    termsResult,
    debtRatioResult,
    maxPayoutResult,
    maxTotalPayoutResult,
    getMaxTotalPayoutResult,
    tokenPrices,
    filteredBonds,
    chainId,
  ])

  return bonds
}

export default useBonds
