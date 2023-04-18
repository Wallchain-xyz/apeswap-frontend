import { Flex } from 'components/uikit'
import { styles } from './styles'
import ListViewLayout from 'components/ListView/ListViewLayout'
import { useFarmOrderings, useFarms } from 'state/farms/hooks'
import { useWeb3React } from '@web3-react/core'
import Banner from 'components/Banner'
import ListViewMenu from 'components/ListView/ListViewMenu/ListViewMenu'
import { AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS, LIST_VIEW_PRODUCTS } from 'config/constants/chains'
import { SupportedChainId } from '@ape.swap/sdk-core'
import ListView404 from 'components/ListView404'
import { useEffect, useRef, useState } from 'react'
import { BLUE_CHIPS, NUMBER_OF_FARMS_VISIBLE, SORT_OPTIONS, STABLES } from './constants'
import DisplayFarms from './components/DisplayFarms'
import { Farm, FarmTypes } from 'state/farms/types'
import { orderBy } from 'lodash'
import { useRouter } from 'next/router'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useTranslation } from 'contexts/Localization'
import useBlockNumber from 'lib/hooks/useBlockNumber'

const Farms = () => {
  const { account, chainId } = useWeb3React()
  const currentBlock = useBlockNumber()
  const farms = useFarms(account ?? '')
  const [observerIsSet, setObserverIsSet] = useState(false)
  const [numberOfFarmsVisible, setNumberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)
  const [sortOption, setSortOption] = useState('all')
  const loadMoreRef = useRef<HTMLDivElement>(null)
  const [query, setQuery] = useState('')
  const windowIsVisible = useIsWindowVisible()
  const { search } = windowIsVisible ? window.location : { search: '' }
  const params = new URLSearchParams(search)
  const urlSearchedFarm = '' //parseInt(params?.get('pid'))
  const [stakedOnly, setStakedOnly] = useState(false)
  const { farmOrderings } = useFarmOrderings(chainId as SupportedChainId)
  const { asPath } = useRouter()
  const isActive = !asPath.includes('history')
  const { t } = useTranslation()

  const activeFarms = farms?.filter(
    (farm) =>
      farm.farmType === FarmTypes.MASTER_CHEF_V1 ||
      (farm.farmType === FarmTypes.MASTER_CHEF_V2 && farm.pid !== 0) ||
      (farm.farmType !== FarmTypes.JUNLGE_FARM && farm.multiplier !== '0X') ||
      (farm.farmType === FarmTypes.JUNLGE_FARM && (farm?.endBlock ?? 0) > (currentBlock ?? 0)),
  )
  const inactiveFarms = farms?.filter(
    (farm) =>
      farm.farmType === FarmTypes.MASTER_CHEF_V1 ||
      (farm.farmType === FarmTypes.MASTER_CHEF_V2 && farm.pid === 0) ||
      (farm.farmType !== FarmTypes.JUNLGE_FARM && farm.multiplier === '0X') ||
      (farm.farmType === FarmTypes.JUNLGE_FARM && (farm?.endBlock ?? 0) < (currentBlock ?? 0)),
  )

  console.log(farms)

  const stakedOnlyFarms = activeFarms?.filter((farm) => farm)

  const stakedOnlyInactiveFarms = inactiveFarms?.filter((farm) => farm)

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  useEffect(() => {
    const showMoreFarms = (entries: any) => {
      const [entry] = entries
      if (entry.isIntersecting) {
        setNumberOfFarmsVisible((farmsCurrentlyVisible) => farmsCurrentlyVisible + NUMBER_OF_FARMS_VISIBLE)
      }
    }

    if (!observerIsSet) {
      const loadMoreObserver = new IntersectionObserver(showMoreFarms, {
        rootMargin: '0px',
        threshold: 1,
      })
      // @ts-ignore
      loadMoreObserver.observe(loadMoreRef?.current)
      setObserverIsSet(true)
    }
  }, [observerIsSet])

  const renderFarms = () => {
    let farms = isActive ? activeFarms : inactiveFarms

    // if (urlSearchedFarm) {
    //   const farmCheck =
    //     activeFarms?.find((farm) => {
    //       return farm.pid === urlSearchedFarm
    //     }) !== undefined
    //   if (farmCheck) {
    //     farms = [
    //       activeFarms?.find((farm: Farm) => {
    //         return farm.pid === urlSearchedFarm
    //       }),
    //       ...activeFarms?.filter((farm) => {
    //         return farm.pid !== urlSearchedFarm
    //       }),
    //     ]
    //   }
    // }

    if (stakedOnly) {
      farms = isActive ? stakedOnlyFarms : stakedOnlyInactiveFarms
    }

    if (query) {
      farms = farms?.filter((farm) => {
        return farm.lpStakeTokenSymbol.toUpperCase().includes(query.toUpperCase())
      })
    }

    // TODO: Refactor this to be a helper function outside of this file
    switch (sortOption) {
      case 'all':
        return farmOrderings
          ? orderBy(
              farms,
              (farm: Farm) => farmOrderings.find((ordering: any) => ordering.pid === farm.pid)?.order,
              'asc',
            ).slice(0, numberOfFarmsVisible)
          : farms?.slice(0, numberOfFarmsVisible)
      case 'stables':
        return (
          farms ??
          []
            .filter((farm: Farm) => STABLES.includes(farm.tokenSymbol) && STABLES.includes(farm.quoteTokenSymbol))
            .slice(0, numberOfFarmsVisible)
        )
      case 'apr':
        return orderBy(farms, (farm) => parseFloat(farm.apy ?? '0'), 'desc').slice(0, numberOfFarmsVisible)
      case 'blueChips':
        return (
          farms ??
          []
            .filter((farm: Farm) => BLUE_CHIPS.includes(farm.tokenSymbol) || BLUE_CHIPS.includes(farm.quoteTokenSymbol))
            .slice(0, numberOfFarmsVisible)
        )
      case 'liquidity':
        return orderBy(farms, (farm: Farm) => parseFloat(farm.totalLpStakedUsd ?? '0'), 'desc').slice(
          0,
          numberOfFarmsVisible,
        )
      default:
        return farmOrderings
          ? orderBy(
              farms,
              (farm: Farm) => farmOrderings.find((ordering: any) => ordering.pid === farm.pid)?.order,
              'asc',
            ).slice(0, numberOfFarmsVisible)
          : farms?.slice(0, numberOfFarmsVisible)
    }
  }

  return (
    <Flex sx={styles.farmContainer}>
      <ListViewLayout>
        <Banner banner="banana-farms" link="?modal=tutorial" title={t('Farms')} listViewBreak maxWidth={1130} />
        <Flex sx={{ alignItems: 'center', justifyContent: 'center', mt: '20px' }}>
          <ListViewMenu
            query={query}
            onHandleQueryChange={handleChangeQuery}
            setSortOption={setSortOption}
            sortOption={sortOption}
            checkboxLabel="Staked"
            showOnlyCheckbox={stakedOnly}
            setShowOnlyCheckbox={setStakedOnly}
            toogleLabels={['ACTIVE', 'INACTIVE']}
            sortOptions={SORT_OPTIONS}
            actionButton={
              <></>
              //   <HarvestAllAction pids={hasHarvestPids} disabled={hasHarvestPids.length === 0} v2Flag={true} />
            }
            showMonkeyImage
          />
        </Flex>
        {!AVAILABLE_CHAINS_ON_LIST_VIEW_PRODUCTS[LIST_VIEW_PRODUCTS.FARMS].includes(chainId as SupportedChainId) ? (
          <Flex mt="20px">
            <ListView404 product={LIST_VIEW_PRODUCTS.FARMS} />
          </Flex>
        ) : (
          <DisplayFarms farms={renderFarms() ?? []} farmTags={[]} />
        )}
        <div ref={loadMoreRef} />
      </ListViewLayout>
    </Flex>
  )
}

export default Farms
