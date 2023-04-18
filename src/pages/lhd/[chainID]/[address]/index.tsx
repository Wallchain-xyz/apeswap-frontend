// pages/lhd/[chainID]/[address]/index.tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageContainer from '../../../../components/PageContainer'
import FullProfile from '../../../../views/LHD/components/FullProfile'

const MultiParamPage = () => {
  const router = useRouter()
  const { chainID, address } = router.query

  useEffect(() => {
    if (chainID && address) {
      // Perform any client-side data fetching or processing based on chainID and address here.
    }
  }, [chainID, address])

  return (
    <PageContainer variant='lhd'>
      <FullProfile chainID={chainID} address={address} />
    </PageContainer>
  )
}

export default MultiParamPage