import React from 'react'
import useGetBondsLandingList from '../../state/bondsLanding/hooks/useGetBondList'
import { Flex } from '../../components/uikit'
import { BondLanding } from '../../state/bondsLanding/types'
import BondCard from './components/BondCard'

export interface BondsLandingListProps {
  query: string
  sortOption?: string
  filteredChains: Record<string, boolean>
  showAvailable: boolean
}

const BondsLandingList: React.FC<BondsLandingListProps> = ({ query, sortOption, filteredChains, showAvailable }) => {
  const { data: bondsLandingList } = useGetBondsLandingList()
  const bondsArray = Object.values(bondsLandingList ?? {})
    ?.flat()
    ?.flatMap((obj) => obj?.bonds)
    ?.filter((bond) => {
      if (!bond || bond?.inactive) return false
      if (showAvailable) return !bond.soldOut
      if (!showAvailable) return bond.soldOut
    })

  const filteredQuery = bondsArray?.filter((obj) => obj?.payoutTokenName?.toUpperCase().includes(query.toUpperCase()))

  const filteredBondsByChain = filteredQuery.filter((obj) => filteredChains[obj.chainId.toString()] === true)

  const sortedBonds = filteredBondsByChain.filter(Boolean).sort((a, b) => {
    switch (sortOption) {
      case 'discount':
        const discountA = a.discount || 0
        const discountB = b.discount || 0
        return discountB - discountA // Sorting in descending order
      case 'initTime':
        const initTimeA = a.initTime || 0
        const initTimeB = b.initTime || 0
        return initTimeA - initTimeB // Sorting in ascending order
      default:
        if (a.payoutTokenName?.toUpperCase() === 'BANANA' && b.payoutTokenName?.toUpperCase() !== 'BANANA') {
          return -1
        } else if (a.payoutTokenName?.toUpperCase() !== 'BANANA' && b.payoutTokenName?.toUpperCase() === 'BANANA') {
          return 1
        }
        const defaultDiscountA = a.discount || 0
        const defaultDiscountB = b.discount || 0
        return defaultDiscountB - defaultDiscountA
    }
  })

  const groupedBonds = sortedBonds?.reduce<Record<string, BondLanding[]>>((acc, obj) => {
    if (!acc[obj.showcaseToken]) {
      acc[obj.showcaseToken] = []
    }
    acc[obj.showcaseToken].push(obj)
    return acc
  }, {})

  return (
    <Flex sx={{ width: '100%', flexWrap: 'wrap', justifyContent: 'flex-start', mt: '20px' }}>
      {Object.keys(groupedBonds)?.map((key) => {
        const bonds = groupedBonds[key]
        if (!bonds) return <></>
        return <BondCard bonds={bonds} key={bonds?.[0]?.billAddress} showAvailable={showAvailable} />
      })}
    </Flex>
  )
}

export default BondsLandingList
