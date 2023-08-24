import { useEffect, useState } from 'react'
import { getCountdownString } from '../../../utils/timeHelpers'
import { Text } from 'components/uikit'
import { Flex } from '../../../components/uikit'

const Countdown = ({ targetTime }: { targetTime: string }) => {
  const [countdown, setCountdown] = useState(getCountdownString(targetTime))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCountdown(getCountdownString(targetTime))
    }, 15)

    // Cleanup if the component is unmounted
    return () => {
      clearInterval(intervalId)
    }
  }, [targetTime]) // Dependency on targetTime so if it changes, the countdown resets.

  return (
    <Flex sx={{ width: '100%', justifyContent: 'center' }}>
      <Text sx={{ fontSize: ['10px'], minWidth: '100px', lineHeight: '14px' }}>{countdown}</Text>
    </Flex>
  )
}

export default Countdown
