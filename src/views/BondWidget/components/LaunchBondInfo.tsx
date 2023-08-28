import React from 'react'
import { Bills } from '../../Bonds/types'
import { Flex, Text } from '../../../components/uikit'
import { formatTime, isFutureTime } from '../../../utils/timeHelpers'
import Countdown from './Countdown'

const LaunchBondInfo = ({ bill }: { bill: Bills }) => {
  const dummyBill = {
    bannerURL: 'https://pad.chaingpt.org/images/landing/landing-bg.png',
    earnToken: {
      symbol: 'CGPT',
    },
    projectSummary:
      'ChainGPT 🤖 #1 ranked AI infrastructure for Blockchain, Crypto & Web3. 🔥Unleash the power of Blockchain AI with ChainGPT. Powered by $CGPT token.',
    launchTimeISOString: '2023-09-01T23:30:00Z',
  }
  return (
    <Flex
      sx={{
        width: '100%',
        flexDirection: 'column',
        minHeight: '100px',
        justifyContent: 'center',
      }}
    >
      {dummyBill.bannerURL ? (
        <img
          src={dummyBill.bannerURL}
          alt="banner img"
          style={{ width: '100%', minHeight: '100px', maxHeight: '100px', objectFit: 'cover' }}
        />
      ) : (
        <Text
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'center',
            fontSize: '24px',
            fontWeight: 700,
          }}
        >
          {dummyBill.earnToken.symbol}
        </Text>
      )}
      <Flex sx={{ p: '10px 10px 0 10px', justifyContent: 'center' }}>
        <Text
          sx={{
            textAlign: 'center',
            fontSize: ['16px'],
            fontWeight: 700,
            maxWidth: ['unset', 'unset', 'unset', '80%'],
          }}
        >
          {dummyBill.projectSummary}
        </Text>
      </Flex>
      <Text
        sx={{
          color: 'yellow',
          textAlign: 'center',
          fontSize: ['10px'],
          fontWeight: 700,
          lineHeight: '18px',
        }}
      >
        {isFutureTime(dummyBill.launchTimeISOString) ? formatTime(dummyBill.launchTimeISOString) : 'Live!'}
      </Text>
      {isFutureTime(dummyBill.launchTimeISOString) && (
        <Flex sx={{ flexDirection: 'column' }}>
          <Text
            sx={{
              textAlign: 'center',
              fontSize: ['12px'],
              fontWeight: 700,
            }}
          >
            {dummyBill.earnToken.symbol} Launch Bond Countdown
          </Text>
          <Countdown targetTime={dummyBill.launchTimeISOString} />
        </Flex>
      )}
    </Flex>
  )
}

export default LaunchBondInfo
