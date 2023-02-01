import PageContainer from 'components/PageContainer'
import { BigNumber } from 'ethers'
import { useRouter } from 'next/router'
import AddLiquidity from 'views/AddLiquidity'
import { useV3PositionFromTokenId } from 'hooks/useV3Positions'
import { useV3DerivedMintInfo, useV3MintState } from 'state/mint/v3/hooks'

const AddLiquidityPage = () => {
  const { query } = useRouter()
  // TODO: Default to whatever pair we want
  const [currencyIdA, currencyIdB, feeAmountFromUrl, tokenId] = (query.currency as string[]) || ['', '', '', '']
  // check for existing position if tokenId in url

  return (
    <PageContainer style={{ justifyContent: 'center', marginTop: '100px' }}>
      <AddLiquidity
        currencyIdA={currencyIdA}
        currencyIdB={currencyIdB}
        feeAmountFromUrl={feeAmountFromUrl}
        tokenId={tokenId}
      />
    </PageContainer>
  )
}

export default AddLiquidityPage
