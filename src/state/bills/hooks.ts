import { bills } from '@ape.swap/apeswap-lists'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  fetchBillsPublicDataAsync,
  fetchBillsUserDataAsync,
  fetchSingleBillPublicData,
  fetchUserOwnedBillsDataAsync,
} from '.'
import { Bills } from 'views/Bonds/types'
import { useWeb3React } from '@web3-react/core'
import useAllTokenPrices from 'hooks/useAllTokenPrices'
import { useAppDispatch } from 'state/hooks'
import { AppState } from 'state'
import useRefresh from 'hooks/useRefresh'
import { SupportedChainId } from '@ape.swap/sdk-core'
import { getSupportedChainId } from '../../utils/validateChainId'

export const usePollBills = () => {
  const { chainId } = useWeb3React()
  const dispatch = useAppDispatch()
  const tokenPrices: any = useAllTokenPrices()
  useEffect(() => {
    chainId && dispatch(fetchBillsPublicDataAsync(chainId, tokenPrices))
  }, [dispatch, tokenPrices, chainId])
}

export const usePollSingleBill = (chain?: string, capturedBillAddress?: string) => {
  const dispatch = useAppDispatch()
  const chainId = getSupportedChainId(chain)
  const tokenPrices: any = useAllTokenPrices()

  useEffect(() => {
    if (chainId && capturedBillAddress) {
      dispatch(fetchSingleBillPublicData(chainId, tokenPrices, capturedBillAddress))
    }
  }, [capturedBillAddress, chainId, dispatch, tokenPrices])
}

export const usePollUserBills = (): Bills[] => {
  const { slowRefresh } = useRefresh()
  const dispatch = useAppDispatch()
  const { chainId, account } = useWeb3React()
  useEffect(() => {
    if (account) {
      chainId && dispatch(fetchBillsUserDataAsync(chainId, account))
      chainId && dispatch(fetchUserOwnedBillsDataAsync(chainId, account))
    }
  }, [account, dispatch, slowRefresh, chainId])
  return bills
}

export const useBills = (chain?: SupportedChainId): Bills[] | undefined => {
  const { chainId } = useWeb3React()
  const selectedChain = chain ?? chainId
  const bills = useSelector((state: AppState) => state.bills.data[selectedChain as SupportedChainId])
  return bills
}
