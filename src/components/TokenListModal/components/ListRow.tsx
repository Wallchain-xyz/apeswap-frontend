import { Currency, Token } from '@ape.swap/sdk-core'
import CurrencyLogo from 'components/CurrencyLogo'
import TokenImportWarning from 'components/TokenImportWarning'
import { Flex, Text } from 'components/uikit'
import useModal from 'hooks/useModal'
import { CSSProperties } from 'theme-ui'

const ListRow = ({
  currency,
  userBalance,
  isSelected,
  otherSelected,
  searchTokenIsAdded,
  style,
  onSelect,
  onDismiss,
}: {
  currency: Currency
  userBalance: string | undefined
  isSelected: boolean
  otherSelected: boolean
  searchTokenIsAdded: boolean
  style: CSSProperties
  onSelect: () => void
  onDismiss: () => void
}) => {
  const [onImportWarningModal] = useModal(
    <TokenImportWarning currency={currency} onDismiss={onDismiss} onSelect={onSelect} />,
    true,
    true,
    'tokenImportWarningModal',
  )

  console.log(searchTokenIsAdded)
  return (
    <Flex
      sx={{
        ...style,
        padding: '10px 15px 10px 10px',
        alignItems: 'center',
        justifyContent: 'space-between',
        cursor: 'pointer',
        opacity: (isSelected || otherSelected) && 0.5,
        ':hover': {
          backgroundColor: 'white3',
        },
      }}
      onClick={() => (searchTokenIsAdded ? onSelect() : (onDismiss(), onImportWarningModal()))}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <CurrencyLogo currency={currency} size={35} />
        <Flex sx={{ flexDirection: 'column', ml: '15px' }}>
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
