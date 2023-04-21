import React, { useState, useRef, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import orderBy from 'lodash/orderBy'
import partition from 'lodash/partition'
import { useTranslation } from 'contexts/Localization'
import useBlockNumber from 'lib/hooks/useBlockNumber'
import { usePollPools, usePools } from 'state/pools/hooks'
import Banner from 'components/Banner'
import DisplayPools from './components/DisplayPools'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import ListView404 from 'components/ListView404'
// import HarvestAll from './components/Actions/HarvestAll'
import { FILTER_OPTIONS, SORT_OPTIONS } from './poolsOptions'
import { styles } from './styles'
import { useRouter } from 'next/router'
import { PoolCategory } from '@ape.swap/apeswap-lists'
import { Pool } from 'state/pools/types'
import { getBalanceNumber } from 'utils/getBalanceNumber'
import BigNumber from 'bignumber.js'
import { Flex } from 'components/uikit'
import ListViewMenu from 'components/ListView/ListViewMenu/ListViewMenu'
import { SupportedChainId } from '@ape.swap/sdk-core'
import useIsWindowVisible from 'hooks/useIsWindowVisible'

const NUMBER_OF_POOLS_VISIBLE = 12

const Pools: React.FC = () => {
  const { chainId } = useWeb3React()
  const [stakedOnly, setStakedOnly] = useState(false)
  const [filterOption, setFilterOption] = useState('allTokens')
  const [sortOption, setSortOption] = useState('all')
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [numberOfPoolsVisible, setNumberOfPoolsVisible] = useState(NUMBER_OF_POOLS_VISIBLE)
  const { account } = useWeb3React()
  const { asPath } = useRouter()
  const allPools = usePools(account ?? '')
  //   const { poolTags } = usePoolTags(chainId)
  //   const { poolOrderings } = usePoolOrderings(chainId)
  const { t } = useTranslation()
  const currentBlock = useBlockNumber()
  const windowVisible = useIsWindowVisible()
  const search = windowVisible ? window?.location.search : ''
  const params = new URLSearchParams(search)
  const urlSearchedPool = parseInt(params.get('id') || '')
  const isActive = !asPath.includes('history')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value)
  }

  useEffect(() => {
    const showMorePools = (entries: any) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfPoolsVisible((poolsCurrentlyVisible) => poolsCurrentlyVisible + NUMBER_OF_POOLS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMorePools, {
        rootMargin: '0px',
        threshold: 1,
      })
      // @ts-ignore
      loadMoreObserver.observe(loadMoreRef.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const allNonAdminPools = allPools.filter(
    (pool) => !pool.forAdmins && pool?.poolCategory !== PoolCategory.JUNGLE && pool.sousId !== 999,
  )

  const legacyPool = allPools.find((pool) => pool.sousId === 999)
  const v2Pool = allPools.find((pool) => pool.sousId === 0)

  const curPools = allNonAdminPools.map((pool) => {
    return {
      ...pool,
      isFinished:
        pool.sousId === 0 || pool.sousId === 999
          ? false
          : pool.isFinished || (currentBlock ?? 0) > (pool?.endBlock ?? 0),
    }
  })

  const [finishedPools, openPools] = partition(curPools, (pool) => pool.isFinished)

  const stakedOnlyPools = openPools.filter((pool) => pool.userData && new BigNumber(pool.userData.stakedBalance)?.gt(0))
  const stakedInactivePools = finishedPools.filter(
    (pool) => pool.userData && new BigNumber(pool.userData.stakedBalance)?.gt(0),
  )
  const sousIds = [...stakedOnlyPools, ...stakedInactivePools].map((pool) => {
    return pool.sousId
  })

  const sortPools = (poolsToSort: any) => {
    switch (sortOption) {
      case 'apr':
        return orderBy(poolsToSort, (pool: Pool) => pool.apr, 'desc')
      case 'earned':
        return orderBy(
          poolsToSort,
          (pool: Pool) => {
            if (!pool.userData || !pool.rewardToken?.price) {
              return 0
            }
            return getBalanceNumber(new BigNumber(pool.userData.pendingReward)) * pool.rewardToken?.price
          },
          'desc',
        )
      case 'totalStaked':
        return orderBy(
          poolsToSort,
          (pool: Pool) =>
            getBalanceNumber(new BigNumber(pool?.totalStaked ?? 0)) * (pool.stakingToken?.price ?? 0),
          'desc',
        )
      default:
        return poolsToSort
    }
  }

  const renderPools = () => {
    let chosenPools = isActive ? openPools : [legacyPool, ...finishedPools]
    if (urlSearchedPool) {
      const poolCheck =
        openPools?.find((pool) => {
          return pool.sousId === urlSearchedPool
        }) !== undefined
      if (poolCheck) {
        chosenPools = [
          openPools?.find((pool) => {
            return pool.sousId === urlSearchedPool
          }),
          ...openPools?.filter((pool) => {
            return pool.sousId !== urlSearchedPool
          }),
        ]
      }
    }

    if (stakedOnly) {
      chosenPools = isActive ? stakedOnlyPools : stakedInactivePools
    }
    if (searchQuery) {
      const lowercaseQuery = searchQuery.toLowerCase()
      chosenPools = chosenPools.filter((pool) => pool?.tokenName.toLowerCase().includes(lowercaseQuery))
    }
    if (filterOption !== 'allTokens') {
      chosenPools = chosenPools.filter((pool) => pool?.stakingToken.symbol === filterOption.toUpperCase())
    }

    return sortPools(chosenPools).slice(0, numberOfPoolsVisible)
  }

  return (
    <Flex sx={styles.poolContainer}>
      <Banner banner="pools" link="?modal=tutorial" title={t('Staking Pools')} listViewBreak maxWidth={1130} />
      <Flex sx={styles.poolContent}>
        <Flex sx={{ my: '20px' }}>
          <ListViewMenu
            query={searchQuery}
            onHandleQueryChange={handleChangeQuery}
            setFilterOption={setFilterOption}
            filterOption={filterOption}
            setSortOption={setSortOption}
            sortOption={sortOption}
            checkboxLabel="Staked"
            showOnlyCheckbox={stakedOnly}
            setShowOnlyCheckbox={setStakedOnly}
            toogleLabels={['Active', 'Inactive']}
            filterOptions={FILTER_OPTIONS}
            sortOptions={SORT_OPTIONS}
            actionButton={<></>} // <HarvestAll sousIds={sousIds} />
          />
        </Flex>
        {!AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS.pools.includes(chainId as SupportedChainId) ? (
          <ListView404 product={LIST_VIEW_PRODUCTS.POOLS} />
        ) : (
          <DisplayPools pools={renderPools()} openId={urlSearchedPool} poolTags={null} />
        )}
        <div ref={loadMoreRef} />
      </Flex>
    </Flex>
  )
}

export default React.memo(Pools)
