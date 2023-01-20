import { FeeAmount } from '@ape.swap/v3-sdk'
import { Button, Flex, Text } from 'components/uikit'
import { useCurrency } from 'hooks/Tokens'
import { PoolState, usePools } from 'hooks/usePools'
import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FEE_AMOUNT_DETAIL } from './constants'

const FeeSelector = ({
  feeAmount,
  currencyIdA,
  currencyIdB,
  onHandleFeeSelect,
}: {
  feeAmount: FeeAmount | undefined
  currencyIdA: string
  currencyIdB: string
  onHandleFeeSelect: (fee: FeeAmount) => void
}) => {
  const [hide, setHide] = useState(true)

  const currencyA = useCurrency(currencyIdA) ?? undefined
  const currencyB = useCurrency(currencyIdB) ?? undefined

  console.log('in here!')
  console.log('in here!')
  console.log('in here!')
  console.log('in here!')
  console.log('in here!')
  console.log('in here!')
  console.log('in here!')
  console.log('in here!')
  console.log('in here!')
  console.log('in here!')

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
      <Flex
        sx={{
          height: '55px',
          borderRadius: '10px',
          background: 'white3',
          width: '100%',
          padding: '10px 20px',
          justifyContent: 'space-between',
          mb: '20px',
        }}
      >
        <Text size="18px" weight={700}>
          {feeAmount && FEE_AMOUNT_DETAIL[feeAmount].label}% fee tier
        </Text>
        <Button size="sm" onClick={() => setHide((prev) => !prev)}>
          <Text sx={{ lineHeight: '20px' }}>{hide ? 'Edit' : 'Hide'}</Text>
        </Button>
      </Flex>
      <AnimatePresence>
        {!hide && (
          <motion.div
            initial={{ opacity: 0, height: '0px', marginBottom: '0px' }}
            animate={{ height: 'fit-content', marginBottom: '20px', opacity: 1 }}
            transition={{ opacity: { duration: 0.2 }, height: { duration: .3 } }}
            exit={{ opacity: 0, height: '0px', marginBottom: '0px' }}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              overflow: 'hidden',
            }}
          >
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
                    background: feeAmount === curFeeAmount ? 'yellow' : 'white3',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '10px 5px',
                    cursor: 'pointer',
                  }}
                  onClick={() => onHandleFeeSelect(curFeeAmount)}
                >
                  <Text size="18px" color={feeAmount === curFeeAmount ? 'primaryBright' : 'text'} weight={700}>
                    {FEE_AMOUNT_DETAIL[curFeeAmount].label}%
                  </Text>
                  <Text
                    size="10px"
                    color={feeAmount === curFeeAmount ? 'primaryBright' : 'text'}
                    weight={400}
                    sx={{ lineHeight: '12px', textAlign: 'center' }}
                  >
                    {FEE_AMOUNT_DETAIL[curFeeAmount].description}
                  </Text>
                  {/* <Text>{poolsByFeeTier[curFeeAmount]}</Text> */}
                  {/* <Text size="12px" weight={500} sx={{ lineHeight: '12px', textAlign: 'center' }}>
                18% selected
              </Text>{' '} */}
                </Flex>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </Flex>
  )
}

export default FeeSelector
