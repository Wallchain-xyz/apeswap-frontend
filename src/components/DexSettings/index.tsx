import { Percent } from '@ape.swap/sdk-core'
import { Flex, Modal, Text } from 'components/uikit'
import Input from 'components/uikit/Input/Input'
import { DEFAULT_DEADLINE_FROM_NOW } from 'config/constants/misc'
import { useState } from 'react'
import {
  useClientSideRouter,
  useExpertModeManager,
  useFlipV3LayoutManager,
  useUserHideClosedPositions,
  useUserSlippageTolerance,
  useUserTransactionTTL,
} from 'state/user/hooks'
import { Switch } from 'theme-ui'

enum SlippageError {
  InvalidInput = 'InvalidInput',
}

enum DeadlineError {
  InvalidInput = 'InvalidInput',
}

const DexSettings = () => {
  const [expertMode, setExpertMode] = useExpertModeManager()
  const [hideClosedPositions, setHideClosedPositions] = useUserHideClosedPositions()
  const [clientSideRouter, setClientSideRouter] = useClientSideRouter()
  const [flipV3Layout, setFlipV3Layout] = useFlipV3LayoutManager()
  const [userSlippageTolerance, setUserSlippageTolerance] = useUserSlippageTolerance()

  const [deadline, setDeadline] = useUserTransactionTTL()

  const [slippageInput, setSlippageInput] = useState('')
  const [slippageError, setSlippageError] = useState<SlippageError | false>(false)

  const [deadlineInput, setDeadlineInput] = useState('')
  const [deadlineError, setDeadlineError] = useState<DeadlineError | false>(false)

  function parseSlippageInput(value: string) {
    // populate what the user typed and clear the error
    setSlippageInput(value)
    setSlippageError(false)

    if (value.length === 0) {
      setUserSlippageTolerance('auto')
    } else {
      const parsed = Math.floor(Number.parseFloat(value) * 100)

      if (!Number.isInteger(parsed) || parsed < 0 || parsed > 5000) {
        setUserSlippageTolerance('auto')
        if (value !== '.') {
          setSlippageError(SlippageError.InvalidInput)
        }
      } else {
        setUserSlippageTolerance(new Percent(parsed, 10_000))
      }
    }
  }

  // const tooLow = userSlippageTolerance !== 'auto' && userSlippageTolerance.lessThan(new Percent(5, 10_000))
  // const tooHigh = userSlippageTolerance !== 'auto' && userSlippageTolerance.greaterThan(new Percent(1, 100))

  function parseCustomDeadline(value: string) {
    // populate what the user typed and clear the error
    setDeadlineInput(value)
    setDeadlineError(false)

    if (value.length === 0) {
      setDeadline(DEFAULT_DEADLINE_FROM_NOW)
    } else {
      try {
        const parsed: number = Math.floor(Number.parseFloat(value) * 60)
        // Three days in seconds
        if (!Number.isInteger(parsed) || parsed < 60 || parsed > 259200) {
          setDeadlineError(DeadlineError.InvalidInput)
        } else {
          setDeadline(parsed)
        }
      } catch (error) {
        console.error(error)
        setDeadlineError(DeadlineError.InvalidInput)
      }
    }
  }

  return (
    <Modal title="Settings" minWidth="300px" maxWidth="95%">
      <Flex sx={{ maxWidth: '100%', width: '380px', flexDirection: 'column' }}>
        <Flex sx={{ flexDirection: 'column', mb: '10px' }}>
          <Text size="18px" margin="10px 0px">
            Slippage Tolerance
          </Text>
          <Flex sx={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Flex
              sx={{
                height: '35px',
                width: '55px',
                borderRadius: '10px',
                background:
                  userSlippageTolerance !== 'auto' && userSlippageTolerance.toFixed(2) === '0.10' ? 'yellow' : 'white3',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSlippageInput('')
                parseSlippageInput('0.1')
              }}
            >
              <Text> 0.1% </Text>
            </Flex>
            <Flex
              sx={{
                height: '35px',
                width: '55px',
                borderRadius: '10px',
                background:
                  userSlippageTolerance !== 'auto' && userSlippageTolerance.toFixed(2) === '0.50' ? 'yellow' : 'white3',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSlippageInput('')
                parseSlippageInput('0.5')
              }}
            >
              <Text> 0.5% </Text>
            </Flex>
            <Flex
              sx={{
                height: '35px',
                width: '55px',
                borderRadius: '10px',
                background:
                  userSlippageTolerance !== 'auto' && userSlippageTolerance.toFixed(2) === '1.00' ? 'yellow' : 'white3',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
              onClick={() => {
                setSlippageInput('')
                parseSlippageInput('1.0')
              }}
            >
              <Text> 1.0% </Text>
            </Flex>
            <Flex sx={{ width: '45%', position: 'relative' }}>
              <Input
                sx={{
                  fontWeight: 700,
                  width: '100%',
                  height: '35px',
                  background: 'white3',
                  border: '0px',
                  ':focus': { outline: 'none' },
                }}
                value={
                  slippageInput.length > 0
                    ? slippageInput
                    : userSlippageTolerance === 'auto'
                    ? ''
                    : userSlippageTolerance.toFixed(2)
                }
                onChange={(e: any) => parseSlippageInput(e.target.value)}
                onBlur={() => {
                  setSlippageInput('')
                  setSlippageError(false)
                }}
                color={slippageError ? 'error' : ''}
              />
              <Flex
                sx={{ position: 'absolute', right: 5, justifyContent: 'center', alignItems: 'center', height: '100%' }}
              >
                <Text weight={700}>%</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex>
          <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px 0px' }}>
            <Text> tx deadline (mins) </Text>
            <Input
              sx={{
                fontWeight: 700,
                width: '45%',
                height: '30px',
                background: 'white3',
                border: '0px',
                ':focus': { outline: 'none' },
              }}
              placeholder={(DEFAULT_DEADLINE_FROM_NOW / 60).toString()}
              value={
                deadlineInput.length > 0
                  ? deadlineInput
                  : deadline === DEFAULT_DEADLINE_FROM_NOW
                  ? ''
                  : (deadline / 60).toString()
              }
              onChange={(e: any) => parseCustomDeadline(e.target.value)}
              onBlur={() => {
                setDeadlineInput('')
                setDeadlineError(false)
              }}
              color={deadlineError ? 'error' : ''}
            />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px 0px' }}>
          <Text> Hide Closed Positions </Text>
          <Flex>
            <Switch onChange={setHideClosedPositions} checked={hideClosedPositions} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px 0px' }}>
          <Text> Auto Router API </Text>
          <Flex>
            <Switch onChange={setClientSideRouter} checked={!clientSideRouter} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px 0px' }}>
          <Text> Expert Mode </Text>
          <Flex>
            <Switch onChange={setExpertMode} checked={expertMode} />
          </Flex>
        </Flex>
        <Flex sx={{ justifyContent: 'space-between', alignItems: 'center', width: '100%', margin: '5px 0px' }}>
          <Text> Flip V3 Layout </Text>
          <Flex>
            <Switch onChange={setFlipV3Layout} checked={flipV3Layout} />
          </Flex>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default DexSettings
