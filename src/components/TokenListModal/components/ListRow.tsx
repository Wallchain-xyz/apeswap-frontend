import { Currency, Token } from '@ape.swap/sdk-core'
import { Flex, Text } from 'components/uikit'
import Image from 'next/image'
import { CSSProperties } from 'theme-ui'

const ListRow = ({
  currency,
  userBalance,
  style,
}: {
  currency: Currency
  userBalance: string | undefined
  style: CSSProperties
}) => {
  return (
    <Flex
      sx={{
        ...style,
        padding: '10px 15px 10px 10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        ':hover': {
          backgroundColor: 'white3',
        },
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Image
          src="https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/BANANA.svg"
          alt={currency.symbol || '...'}
          width={35}
          height={35}
          sx={{ mr: '10px' }}
        />
        <Flex sx={{ flexDirection: 'column' }}>
          <Text weight={600}>{currency.symbol}</Text>
          <Text weight={400} size="12px" sx={{ lineHeight: '12px' }}>
            {currency.name}
          </Text>
        </Flex>
      </Flex>
      <Text weight={600} sx={{ lineHeight: '0px' }}>
        {userBalance}
      </Text>
    </Flex>
  )
}

export default ListRow
