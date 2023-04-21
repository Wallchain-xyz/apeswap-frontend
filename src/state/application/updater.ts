import { SupportedChainId } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { BANANA_ADDRESSES } from 'config/constants/addresses'
import BigNumber from 'bignumber.js'
import { useNfaContract, useNfbContract, usePriceGetter } from 'hooks/useContract'
import useDebounce from 'hooks/useDebounce'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useMultipleContractSingleData, useSingleCallResult, useSingleContractMultipleData } from 'lib/hooks/multicall'
import { useEffect, useRef, useState } from 'react'
import { useAppDispatch } from 'state/hooks'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import { supportedChainId } from 'utils/supportedChainId'
import { useCloseModal } from './hooks'
import { setBananaPrice, updateChainId, updateProfileImage } from './reducer'
import { Interface } from 'ethers/lib/utils'
import NFA_ABI from 'config/abi/nonFungibleApes.json'

const NFA_INTERFACE = new Interface(NFA_ABI)

export default function Updater(): null {
  const { account, chainId, provider } = useWeb3React()
  const dispatch = useAppDispatch()
  const windowVisible = useIsWindowVisible()

  const [activeChainId, setActiveChainId] = useState(chainId)

  const closeModal = useCloseModal()
  const previousAccountValue = useRef(account)
  useEffect(() => {
    if (account && account !== previousAccountValue.current) {
      previousAccountValue.current = account
      closeModal()
    }
  }, [account, closeModal])

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

  // Profile picture calls

  const nfaContract = useNfaContract()
  const nfbContract = useNfbContract()

  const [nfaBalanceOf, nfbBalanceOf] = useMultipleContractSingleData(
    [nfaContract?.address, nfbContract?.address],
    NFA_INTERFACE,
    'balanceOf',
    [account],
  )
  const nfaCalls = [...Array(nfaBalanceOf?.result)].map((_, i) => [account, i])
  const nfbCalls = [...Array(nfbBalanceOf?.result)].map((_, i) => [account, i])

  const accountNfas = useSingleContractMultipleData(nfaContract, 'tokenOfOwnerByIndex', nfaCalls)?.[0]
  const accountNfbs = useSingleContractMultipleData(nfbContract, 'tokenOfOwnerByIndex', nfbCalls)?.[0]
  const nfa = accountNfas?.result?.[0].toString()
  const nfb = accountNfbs?.result?.[0].toString()

  useEffect(() => {
    if (nfa) {
      dispatch(
        updateProfileImage({
          profileImage: `https://raw.githubusercontent.com/ApeSwapFinance/non-fungible-apes/main/images/${nfa}.png`,
        }),
      )
    } else if (nfb) {
      dispatch(
        updateProfileImage({
          profileImage: `https://ipfs.io/ipfs/QmYhuJnr3GGUnDGtg6rmSXTgo7FzaWgrriqikfgn5SkXhZ/${nfb}.png`,
        }),
      )
    } else {
      dispatch(updateProfileImage({ profileImage: undefined }))
    }
  }, [nfa, nfb, account, dispatch])

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
