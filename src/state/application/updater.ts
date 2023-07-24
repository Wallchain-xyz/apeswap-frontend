import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import BigNumber from 'bignumber.js'
import { usePriceGetter } from 'hooks/useContract'
import useDebounce from 'hooks/useDebounce'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useSingleCallResult } from 'lib/hooks/multicall'
import { useEffect, useState } from 'react'
import { useAppDispatch } from 'state/hooks'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { supportedChainId } from 'utils/supportedChainId'
import { setBananaPrice, setChainId, setAccount, setProfileImage } from './reducer'
import { useGetProfilePic } from './hooks'
import { updateSelectedNetwork } from '../user/reducer'
import { NETWORK_LABEL } from '../../config/constants/chains'
import useSelectChain from '../../hooks/useSelectChain'
import { useGetIsLhdAuth } from 'state/lhd/hooks'
import { setWeb3Provider } from './web3ProviderSingleton'

export default function Updater(): null {
  const { account, chainId, provider } = useWeb3React()
  const dispatch = useAppDispatch()
  const windowVisible = useIsWindowVisible()
  const { getIsLhdAuth } = useGetIsLhdAuth()

  const [activeChainId, setActiveChainId] = useState(chainId)

  useEffect(() => {
    if (provider && chainId && windowVisible) {
      setActiveChainId(chainId)
    }
  }, [dispatch, chainId, provider, windowVisible])

  useEffect(() => {
    dispatch(setAccount({ account }))
  }, [account, dispatch])

  useEffect(() => {
    setWeb3Provider(provider || null)
  }, [provider])

  const debouncedChainId = useDebounce(activeChainId, 100)
  const selectChain = useSelectChain()

  useEffect(() => {
    const { search } = windowVisible ? window.location : { search: '' }
    const params = new URLSearchParams(search)
    const paramChainId = params.get('chain')
    if (paramChainId && windowVisible) {
      const removeChainParamUrl = windowVisible ? window?.location?.href?.split('?chain')[0] : ''
      if (paramChainId.toLowerCase() === NETWORK_LABEL[SupportedChainId.BSC]?.toLowerCase()) {
        selectChain(SupportedChainId?.BSC).then(() => {
          window.history.pushState({}, document.title, removeChainParamUrl)
        })
      }
      if (paramChainId.toLowerCase() === NETWORK_LABEL[SupportedChainId.POLYGON]?.toLowerCase()) {
        selectChain(SupportedChainId?.POLYGON).then(() => {
          window.history.pushState({}, document.title, removeChainParamUrl)
        })
      }
      if (paramChainId.toLowerCase() === NETWORK_LABEL[SupportedChainId.MAINNET]?.toLowerCase()) {
        selectChain(SupportedChainId?.MAINNET).then(() => {
          window.history.pushState({}, document.title, removeChainParamUrl)
        })
      }
      if (paramChainId.toLowerCase() === NETWORK_LABEL[SupportedChainId.ARBITRUM_ONE]?.toLowerCase()) {
        selectChain(SupportedChainId?.ARBITRUM_ONE).then(() => {
          window.history.pushState({}, document.title, removeChainParamUrl)
        })
      }
    }
  }, [windowVisible, selectChain])

  useEffect(() => {
    const chainId2 = debouncedChainId ? supportedChainId(debouncedChainId) ?? null : null
    dispatch(setChainId({ chainId: chainId2 }))
    dispatch(updateSelectedNetwork({ chainId: chainId2 }))
  }, [dispatch, debouncedChainId])

  const profileImage = useGetProfilePic()

  useEffect(() => {
    if (profileImage) {
      dispatch(setProfileImage({ profileImage: profileImage }))
    } else {
      dispatch(setProfileImage({ profileImage: undefined }))
    }
  }, [profileImage, account, dispatch])

  const priceGetter = usePriceGetter()
  const { result: bananaPrice } = useSingleCallResult(priceGetter, 'getPrice', [
    BANANA_ADDRESSES[chainId || SupportedChainId.BSC],
    0,
  ])

  const price = getBalanceNumber(new BigNumber(bananaPrice?.toString() || '0'))

  useEffect(() => {
    if (price) {
      dispatch(setBananaPrice(price))
    }
  }, [dispatch, price])

  useEffect(() => {
    getIsLhdAuth()
  }, [getIsLhdAuth])

  return null
}
