import React, { useCallback, useEffect, useState } from 'react'
import { Flex } from 'components/uikit'
import useGetBondsLandingList from 'state/bondsLanding/hooks/useGetBondList'
import { styles } from './styles'
import BondsLandingMenu from './components/BondsLandingMenu'
import { ChainId } from '../../config/constants/chains'
import BondsLandingCards from './components/BondsLandingCards'
import BondsLandingList from './BondsLandingList'
import { useRouter } from 'next/router'

const BondsLanding = () => {
  const { data: bondsLandingList } = useGetBondsLandingList()
  const chainsWithBonds = Object.keys(bondsLandingList ?? {}).filter((key) =>
    Object.values(ChainId).includes(Number(key)),
  )
  const defaultChains = chainsWithBonds.reduce((acc, key) => {
    acc[key] = true // Initialize with false or any default value
    return acc
  }, {} as Record<string, boolean>)

  const [query, setQuery] = useState('')
  const { asPath } = useRouter()
  const historyPath = !asPath.includes('history')
  const [showAvailable, setShowAvailable] = useState(historyPath)
  const [sortOption, setSortOption] = useState('all')
  const [filteredChains, setFilteredChains] = useState<Record<string, boolean>>(defaultChains)

  useEffect(() => {
    if (bondsLandingList && Object.keys(filteredChains).length === 0) {
      // Check if bondsLandingList has a value (i.e., has been loaded from the API)
      const chainsWithBonds = Object.keys(bondsLandingList).filter((key) =>
        Object.values(ChainId).includes(Number(key)),
      )

      const updatedChains = chainsWithBonds.reduce((acc, key) => {
        acc[key] = true
        return acc
      }, {} as Record<string, boolean>)
      setFilteredChains(updatedChains)
    }
  }, [bondsLandingList, filteredChains])

  const onHandleQueryChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }, [])

  return (
    <Flex sx={styles.mainContainer}>
      <BondsLandingCards />
      <BondsLandingMenu
        query={query}
        onHandleQueryChange={onHandleQueryChange}
        chainsWithBonds={chainsWithBonds}
        showAvailable={showAvailable}
        setShowAvailable={setShowAvailable}
        sortOption={sortOption}
        setSortOption={setSortOption}
        filteredChains={filteredChains}
        setFilteredChains={setFilteredChains}
      />
      <BondsLandingList
        query={query}
        sortOption={sortOption}
        filteredChains={filteredChains}
        showAvailable={showAvailable}
      />
    </Flex>
  )
}

export default BondsLanding
