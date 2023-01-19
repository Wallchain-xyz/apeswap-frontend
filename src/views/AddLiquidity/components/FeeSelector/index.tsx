import { FeeAmount } from '@ape.swap/v3-sdk'
import { Flex, Text } from 'components/uikit'
import { useCurrency } from 'hooks/Tokens'
import { PoolState, usePools } from 'hooks/usePools'
import { useMemo } from 'react'
import { FEE_AMOUNT_DETAIL } from './constants'

const FeeSelector = ({
  currencyIdA,
  currencyIdB,
  onHandleFeeSelect,
}: {
  currencyIdA: string
  currencyIdB: string
  onHandleFeeSelect: (fee: FeeAmount) => void
}) => {
  const currencyA = useCurrency(currencyIdA) || undefined
  const currencyB = useCurrency(currencyIdB) || undefined

  const pools = usePools([
    [currencyA, currencyB, FeeAmount.LOWEST],
    [currencyA, currencyB, FeeAmount.LOW],
    [currencyA, currencyB, FeeAmount.MEDIUM],
    [currencyA, currencyB, FeeAmount.HIGH],
  ])

  // const { isLoading, isError, largestUsageFeeTier, distributions } = useFeeTierDistribution(currencyA, currencyB)

  const poolsByFeeTier: Record<FeeAmount, PoolState> = useMemo(
    () =>
      pools.reduce(
        (acc, [curPoolState, curPool]) => {
          acc = {
            ...acc,
            ...{ [curPool?.fee as FeeAmount]: curPoolState },
          }
          return acc
        },
        {
          // default all states to NOT_EXISTS
          [FeeAmount.LOWEST]: PoolState.NOT_EXISTS,
          [FeeAmount.LOW]: PoolState.NOT_EXISTS,
          [FeeAmount.MEDIUM]: PoolState.NOT_EXISTS,
          [FeeAmount.HIGH]: PoolState.NOT_EXISTS,
        },
      ),
    [pools],
  )

  return (
    <Flex sx={{ flexDirection: 'column' }}>
      <Flex sx={{ height: '50px', borderRadius: '10px', background: 'white3', width: '100%' }}>sd</Flex>
      <Flex sx={{ justifyContent: 'space-between', margin: '20px 0px' }}>
        {[FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map((curFeeAmount, i) => {
          return (
            <Flex
              key={curFeeAmount}
              sx={{
                flexDirection: 'column',
                width: '90px',
                maxWidth: '100%',
                height: '85px',
                maxHeight: '100%',
                background: 'white3',
                justifyContent: 'space-around',
                alignItems: 'center',
                borderRadius: '10px',
                padding: '10px 5px',
              }}
              onClick={() => onHandleFeeSelect(curFeeAmount)}
            >
              <Text size="18px" weight={700}>
                {FEE_AMOUNT_DETAIL[curFeeAmount].label}%
              </Text>
              <Text size="10px" weight={400} sx={{ lineHeight: '12px', textAlign: 'center' }}>
                {FEE_AMOUNT_DETAIL[curFeeAmount].description}
              </Text>
              {/* <Text size="12px" weight={500} sx={{ lineHeight: '12px', textAlign: 'center' }}>
                18% selected
              </Text>{' '} */}
            </Flex>
          )
        })}
      </Flex>
    </Flex>
  )
}

export default FeeSelector
