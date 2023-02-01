import { FeeAmount } from '@ape.swap/v3-sdk'
import { Button, Flex, Svg, Text } from 'components/uikit'
import { useCurrency } from 'hooks/Tokens'
import { PoolState, usePools } from 'hooks/usePools'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FEE_AMOUNT_DETAIL } from './constants'
import { useFeeTierDistribution } from 'hooks/useFeeTierDistribution'

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

  const pools = usePools([
    [currencyA, currencyB, FeeAmount.LOWEST],
    [currencyA, currencyB, FeeAmount.LOW],
    [currencyA, currencyB, FeeAmount.MEDIUM],
    [currencyA, currencyB, FeeAmount.HIGH],
  ])

  // TODO: Add some sort of loading animation and handle error
  const { isLoading, isError, largestUsageFeeTier, distributions } = useFeeTierDistribution(currencyA, currencyB)

  useEffect(() => {
    if (feeAmount || isLoading || isError) {
      return
    }
    if (!largestUsageFeeTier) {
      setHide(false)
    } else {
      setHide(true)
      onHandleFeeSelect(largestUsageFeeTier)
    }
  }, [feeAmount, isLoading, isError, largestUsageFeeTier, onHandleFeeSelect])

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
          alignItems: 'center',
          mb: '20px',
        }}
      >
        <Flex sx={{ flexDirection: 'column' }}>
          <Text size="18px" weight={700}>
            {feeAmount && FEE_AMOUNT_DETAIL[feeAmount].label}% fee tier
          </Text>
          <Text size="10px" weight={500} sx={{ lineHeight: '15px' }}>
            {distributions && feeAmount && distributions[feeAmount]?.toFixed(0)}% Selected
          </Text>
        </Flex>
        <Button size="sm" onClick={() => setHide((prev) => !prev)} sx={{ padding: '2px 10px', height: '30px' }}>
          <Text sx={{ lineHeight: '20px' }}>{hide ? 'Edit' : 'Hide'}</Text>
        </Button>
      </Flex>
      <AnimatePresence>
        {!hide && (
          <motion.div
            initial={{ opacity: 0, height: '0px', marginBottom: '0px' }}
            animate={{ height: 'fit-content', marginBottom: '20px', opacity: 1 }}
            transition={{ opacity: { duration: 0.2 }, height: { duration: 0.3 } }}
            exit={{ opacity: 0, height: '0px', marginBottom: '0px' }}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              overflow: 'hidden',
              padding: '2px 0px',
            }}
          >
            {[FeeAmount.LOWEST, FeeAmount.LOW, FeeAmount.MEDIUM, FeeAmount.HIGH].map((curFeeAmount) => {
              return (
                <Flex
                  key={curFeeAmount}
                  sx={{
                    position: 'relative',
                    flexDirection: 'column',
                    width: '130px',
                    maxWidth: '100%',
                    height: '87px',
                    maxHeight: '100%',
                    background: 'white3',
                    boxShadow: feeAmount === curFeeAmount && '0px 0px 1px 1px',
                    color: 'yellow',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderRadius: '10px',
                    padding: '7.5px 5px',
                    cursor: 'pointer',
                    margin: '0px 2px',
                  }}
                  onClick={() => onHandleFeeSelect(curFeeAmount)}
                >
                  {feeAmount === curFeeAmount && (
                    <Flex sx={{ position: 'absolute', top: '5px', right: '5px' }}>
                      <Svg icon="success" color="yellow" width="15px" />
                    </Flex>
                  )}
                  <Text color="text" size="18px" weight={700}>
                    {FEE_AMOUNT_DETAIL[curFeeAmount].label}%
                  </Text>
                  <Text
                    color="text"
                    size="10px"
                    weight={400}
                    sx={{ lineHeight: '12px', mt: '5px', textAlign: 'center' }}
                  >
                    {FEE_AMOUNT_DETAIL[curFeeAmount].description}
                  </Text>
                  <Text color="text" size="10px" weight={700}>
                    {!distributions ||
                    poolsByFeeTier[curFeeAmount] === PoolState.NOT_EXISTS ||
                    poolsByFeeTier[curFeeAmount] === PoolState.INVALID
                      ? 'Not Created'
                      : distributions
                      ? `${distributions[curFeeAmount]?.toFixed(0)}% select`
                      : 'Not Created'}
                  </Text>
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
