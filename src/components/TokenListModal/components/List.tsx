import { Currency, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex, Skeleton } from 'components/uikit'
import { useAllTokens, useIsUserAddedToken, useToken } from 'hooks/Tokens'
import useDebounce from 'hooks/useDebounce'
import { useAllTokenBalances } from 'lib/hooks/useAllTokenBalances'
import { getTokenFilter } from 'lib/hooks/useTokenList/filtering'
import { tokenComparator, useSortTokensByQuery } from 'lib/hooks/useTokenList/sorting'
import { FixedSizeList } from 'react-window'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { UserAddedToken } from 'state/user/types'
import ListRow from './ListRow'
import { CSSProperties } from 'theme-ui'
import useNativeCurrency from 'lib/hooks/useNativeCurrency'
import useCurrencyBalance, { useNativeCurrencyBalances } from 'lib/hooks/useCurrencyBalance'

const List = ({
  searchQuery,
  selectedCurrency,
  otherSelectedCurrency,
  showCommonBases,
  disableNonToken,
  onCurrencySelect,
  onDismiss,
}: {
  searchQuery: string
  selectedCurrency?: Currency | null
  otherSelectedCurrency?: Currency | null
  showCommonBases?: boolean
  showCurrencyAmount?: boolean
  disableNonToken?: boolean
  onCurrencySelect: (currency: Currency) => void
  onDismiss: () => void
}) => {
  const { chainId, account } = useWeb3React()
  const [tokenLoaderTimerElapsed, setTokenLoaderTimerElapsed] = useState(false)
  const debouncedQuery = useDebounce(searchQuery, 200)
  const defaultTokens = useAllTokens()
  const [balances, balancesAreLoading] = useAllTokenBalances()
  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)
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
                if (selectedCurrency?.equals(token) || otherSelectedCurrency?.equals(token)) return true
                return balances[token.address]?.greaterThan(0)
              }
              return true
            })
            .sort(tokenComparator.bind(null, balances))
        : [],
    [balances, balancesAreLoading, debouncedQuery, filteredTokens, otherSelectedCurrency, selectedCurrency],
  )

  const isLoading = Boolean(balancesAreLoading && !tokenLoaderTimerElapsed)

  const filteredSortedTokens = useSortTokensByQuery(debouncedQuery, sortedTokens)

  const native = useNativeCurrency()
  const nativeBalance = useCurrencyBalance(account, native)
  const wrapped = native.wrapped

  const searchCurrencies: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()

    const tokens = filteredSortedTokens.filter((t) => !(t.equals(wrapped) || (disableNonToken && t.isNative)))
    const natives = (disableNonToken || native.equals(wrapped) ? [wrapped] : [native, wrapped]).filter(
      (n) => n.symbol?.toLowerCase()?.indexOf(s) !== -1 || n.name?.toLowerCase()?.indexOf(s) !== -1,
    )

    return searchToken ? [searchToken, ...natives, ...tokens] : [...natives, ...tokens]
  }, [debouncedQuery, filteredSortedTokens, wrapped, disableNonToken, native, searchToken])

  // Timeout token loader after 3 seconds to avoid hanging in a loading state.
  useEffect(() => {
    const tokenLoaderTimer = setTimeout(() => {
      setTokenLoaderTimerElapsed(true)
    }, 3000)
    return () => clearTimeout(tokenLoaderTimer)
  }, [])

  const Row = useCallback(
    ({ data, index, style }: { data: Currency[]; index: number; style: CSSProperties }) => {
      const row: Currency = data[index]
      const currency = row
      const isSelected = Boolean(currency && selectedCurrency && selectedCurrency.equals(currency))
      const otherSelected = Boolean(currency && otherSelectedCurrency && otherSelectedCurrency.equals(currency))
      if (balancesAreLoading)
        return (
          <Flex sx={{ ...style, flexDirection: 'column', height: '500px' }}>
            {[...Array(8)].map((i) => {
              return <Skeleton key={i} width="100%" height="100px" animation="waves" sx={{ margin: '2.5px 0px' }} />
            })}
          </Flex>
        )
      return (
        <ListRow
          currency={row}
          isSelected={isSelected}
          otherSelected={otherSelected}
          searchTokenIsAdded={searchToken ? searchTokenIsAdded : true}
          userBalance={
            currency.isToken ? balances[currency.address]?.toSignificant(6) : nativeBalance?.toSignificant(6)
          }
          style={style}
          key={currency.isToken ? currency.address : 'ETHER'}
          onSelect={() => {
            onCurrencySelect(row), onDismiss()
          }}
          onDismiss={onDismiss}
        />
      )
    },
    [
      balances,
      balancesAreLoading,
      nativeBalance,
      searchTokenIsAdded,
      searchToken,
      otherSelectedCurrency,
      selectedCurrency,
      onCurrencySelect,
      onDismiss,
    ],
  )

  const itemKey = useCallback((index: number, data: Currency[]) => {
    const currency = data[index] as Token
    return currency.isToken ? currency.address : 'ETHER'
  }, [])

  return (
    <Flex sx={{ height: '500px', width: '100%', overflowY: 'scroll', flexDirection: 'column' }}>
      <FixedSizeList
        height={500}
        itemSize={60}
        width="100%"
        itemCount={searchCurrencies.length}
        itemData={searchCurrencies}
        itemKey={itemKey}
      >
        {Row}
      </FixedSizeList>
    </Flex>
  )
}

export default List
