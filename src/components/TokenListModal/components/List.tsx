import { Currency, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex, Skeleton } from 'components/uikit'
import { useAllTokens } from 'hooks/Tokens'
import useDebounce from 'hooks/useDebounce'
import { useAllTokenBalances } from 'lib/hooks/useAllTokenBalances'
import { getTokenFilter } from 'lib/hooks/useTokenList/filtering'
import { tokenComparator } from 'lib/hooks/useTokenList/sorting'
import { FixedSizeList } from 'react-window'
import { useCallback, useMemo, useState } from 'react'
import { UserAddedToken } from 'state/user/types'
import ListRow from './ListRow'
import { CSSProperties } from 'theme-ui'

const List = ({
  searchQuery,
  onCurrencySelect,
  onDismiss,
}: {
  searchQuery: string
  onCurrencySelect: (currency: Currency) => void
  onDismiss: () => void
}) => {
  const { chainId } = useWeb3React()
  const debouncedQuery = useDebounce(searchQuery, 200)
  const defaultTokens = useAllTokens()
  const [balances, balancesAreLoading] = useAllTokenBalances()
  console.log(balances)
  const filteredTokens: Token[] = useMemo(() => {
    return Object.values(defaultTokens).filter(getTokenFilter(debouncedQuery))
  }, [defaultTokens, debouncedQuery])
  const sortedTokens: Token[] = useMemo(
    () =>
      !balancesAreLoading
        ? filteredTokens
            .filter((token) => {
              // If there is no query, filter out unselected user-added tokens with no balance.
              if (!debouncedQuery && token instanceof UserAddedToken) {
                // if (selectedCurrency?.equals(token) || otherSelectedCurrency?.equals(token)) return true
                return balances[token.address]?.greaterThan(0)
              }
              return true
            })
            .sort(tokenComparator.bind(null, balances))
        : [],
    [balances, balancesAreLoading, debouncedQuery, filteredTokens],
  )

  const Row = useCallback(
    ({ data, index, style }: { data: Token[]; index: number; style: CSSProperties }) => {
      const row = data[index]
      if (balancesAreLoading)
        return (
          <Flex sx={style}>
            <Skeleton width="100%" height="50px" animation="waves" />
          </Flex>
        )
      return (
        <ListRow
          currency={row}
          userBalance={balances[row.address]?.toSignificant(6)}
          key={row.address}
          style={style}
          onSelect={() => {
            onCurrencySelect(row), onDismiss()
          }}
        />
      )
    },
    [balances, balancesAreLoading, onCurrencySelect, onDismiss],
  )

  const itemKey = useCallback((index: number, data: Token[]) => {
    const currency = data[index] as Token
    return currency.address
  }, [])

  return (
    <Flex sx={{ height: '500px', width: '100%', overflowY: 'scroll', flexDirection: 'column' }}>
      <FixedSizeList
        height={500}
        itemSize={60}
        width="100%"
        itemCount={sortedTokens.length}
        itemData={sortedTokens}
        itemKey={itemKey}
      >
        {Row}
      </FixedSizeList>
    </Flex>
  )
}

export default List
