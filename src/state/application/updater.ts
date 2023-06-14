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
import { setBananaPrice, updateChainId, updateProfileImage } from './reducer'
import { useGetProfilePic } from './hooks'

export default function Updater(): null {
  const { account, chainId, provider } = useWeb3React()
  const dispatch = useAppDispatch()
  const windowVisible = useIsWindowVisible()

  const [activeChainId, setActiveChainId] = useState(chainId)

  useEffect(() => {
    if (provider && chainId && windowVisible) {
      setActiveChainId(chainId)
    }
  }, [dispatch, chainId, provider, windowVisible])

  const debouncedChainId = useDebounce(activeChainId, 100)

  useEffect(() => {
    const chainId = debouncedChainId ? supportedChainId(debouncedChainId) ?? null : null
    dispatch(updateChainId({ chainId }))
  }, [dispatch, debouncedChainId])

  const profileImage = useGetProfilePic()

  useEffect(() => {
    if (profileImage) {
      dispatch(updateProfileImage({ profileImage: profileImage }))
    } else {
      dispatch(updateProfileImage({ profileImage: undefined }))
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

  return null
}
