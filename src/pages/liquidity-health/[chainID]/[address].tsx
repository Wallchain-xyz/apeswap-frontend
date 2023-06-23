// pages/lhd/[chainID]/[address]/index.tsx
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import PageContainer from '../../../components/PageContainer'
import FullProfile from '../../../views/LHD/components/FullProfile'
import LHDModal from 'views/LHD/components/LHDModal'

// hooks
import { useSelector } from 'react-redux'

import { AppState } from 'state'
import { GetServerSideProps } from 'next'

const MultiParamPage = () => {
  const router = useRouter()
  const { chainID, address } = router.query
  const { isLhdAuth } = useSelector((state: AppState) => state.lhd)

  return (
    <PageContainer variant="lhd" pageParams={`${chainID}_${address}`}>
      <FullProfile chainID={chainID} address={address} />
      <LHDModal isLhdAuthModalOpen={!isLhdAuth} />
    </PageContainer>
  )
}

export default MultiParamPage
