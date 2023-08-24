import React from 'react'
import { Flex, Text } from '../../../components/uikit'
import ServiceTokenDisplay from '../../../components/ServiceTokenDisplay'
import { getFirstNonZeroDigits } from '../../../utils/roundNumber'
import AccountLoggedIn from '../../../components/NavBarNew/components/Account/AccountLoggedIn'
import { useWeb3React } from '@web3-react/core'
import { Bills } from '../../Bonds/types'
import getTimePeriods from '../../../utils/getTimePeriods'

const Header = ({ bill }: { bill: Bills }) => {
  const { account } = useWeb3React()

  const discountEarnTokenPrice =
    bill?.earnTokenPrice &&
    bill?.earnTokenPrice &&
    bill?.earnTokenPrice - bill?.earnTokenPrice * (parseFloat(bill?.discount ?? '0') / 100)
  const vestingTime = getTimePeriods(parseInt(bill?.vestingTime ?? '0'), true)

  return (
    <Flex sx={{ p: '10px 10px 0 10px' }}>
      <Flex sx={{ alignItems: 'flex-start', minWidth: '30px' }}>
        <ServiceTokenDisplay token1={bill?.earnToken?.symbol} />
      </Flex>
      <Flex sx={{ width: '100%', flexDirection: 'column', ml: '10px' }}>
        <Flex sx={{ alignItems: 'center' }}>
          <Text sx={{ fontSize: ['12px', '16px'], fontWeight: 700 }}>
            ${getFirstNonZeroDigits(discountEarnTokenPrice ?? 0)} ({bill?.discount}% Discount)
          </Text>
        </Flex>
        <Text
          sx={{
            fontSize: ['8px', '11px'],
            fontWeight: 400,
            color: 'grey',
            lineHeight: ['8px', '14px'],
          }}
        >
          {bill?.earnToken?.symbol} Market Price{' '}
          <span style={{ textDecoration: 'line-through' }}>${getFirstNonZeroDigits(bill?.earnTokenPrice ?? 0)}</span> |
          Vesting Period: {vestingTime.days}d
        </Text>
      </Flex>
      <Flex sx={{ minWidth: ['40px', '40px', '40px', '112px'], justifyContent: 'flex-end' }}>
        {account && <AccountLoggedIn />}
      </Flex>
    </Flex>
  )
}

export default Header
