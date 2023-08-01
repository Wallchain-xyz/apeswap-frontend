import { Currency, SupportedChainId, Token } from '@ape.swap/sdk-core'
import { useWeb3React } from '@web3-react/core'
import { Flex, Skeleton } from 'components/uikit'
import { useAllTokens, useIsUserAddedToken, useSearchInactiveTokenLists, useToken } from 'hooks/Tokens'
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
import useCurrencyBalance from 'lib/hooks/useCurrencyBalance'
import { isAddress } from 'utils'
import { ChainId } from '../../../../config/constants/chains'

const List = ({
  searchQuery,
  selectedCurrency,
  onCurrencySelect,
  onDismiss,
  selectedChain,
}: {
  searchQuery: string
  selectedCurrency?: Currency | null
  onCurrencySelect: (currency: Currency, chain: SupportedChainId) => void
  onDismiss?: () => void
  selectedChain?: ChainId
}) => {
  const { account } = useWeb3React()
  const [tokenLoaderTimerElapsed, setTokenLoaderTimerElapsed] = useState(false)
  const debouncedQuery = useDebounce(searchQuery, 200)

  const defaultTokens = useAllTokens(selectedChain)
  const [balances, balancesAreLoading] = useAllTokenBalances(selectedChain)

  const searchToken = useToken(debouncedQuery)
  const searchTokenIsAdded = useIsUserAddedToken(searchToken)
  const isAddressSearch = isAddress(debouncedQuery)

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
                if (selectedCurrency?.equals(token)) return true
                return balances[token.address]?.greaterThan(0)
              }
              return true
            })
            .sort(tokenComparator.bind(null, balances))
        : [],
    [balances, balancesAreLoading, debouncedQuery, filteredTokens, selectedCurrency],
  )

  const isLoading = Boolean(balancesAreLoading && !tokenLoaderTimerElapsed)

  const filteredSortedTokens = useSortTokensByQuery(debouncedQuery, sortedTokens)

  const native = useNativeCurrency(selectedChain)
  const nativeBalance = useCurrencyBalance(account, native)
  const wrapped = native.wrapped

  // if no results on main list, show option to expand into inactive
  const filteredInactiveTokens = useSearchInactiveTokenLists(
    filteredTokens.length === 0 || (debouncedQuery.length > 2 && !isAddressSearch) ? debouncedQuery : undefined,
  )

  const searchCurrencies: Currency[] = useMemo(() => {
    const s = debouncedQuery.toLowerCase().trim()
    const natives = (native.equals(wrapped) ? [wrapped] : [native, wrapped]).filter(
      (n) => n.symbol?.toLowerCase()?.indexOf(s) !== -1 || n.name?.toLowerCase()?.indexOf(s) !== -1,
    )
    const tokens = filteredSortedTokens?.filter((t) => !(t?.equals(wrapped) || t?.isNative))
    return searchToken ? [searchToken, ...natives, ...tokens] : [...natives, ...tokens]
  }, [debouncedQuery, filteredSortedTokens, native, wrapped, searchToken])

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
      const currencyIsImported = !!filteredInactiveTokens.find(
        (token) => token.address.toLowerCase() === currency.wrapped.address.toLowerCase(),
      )
      if (balancesAreLoading)
        return (
          <Flex sx={{ ...style, flexDirection: 'column', height: '500px' }}>
            {[...Array(8)].map((i) => {
              return <Skeleton key={i} width="100%" height="50px" animation="waves" sx={{ margin: '2.5px 0px' }} />
            })}
          </Flex>
        )
      return (
        <ListRow
          currency={row}
          isSelected={isSelected}
          searchTokenIsAdded={(searchToken ? searchTokenIsAdded : true) && !currencyIsImported}
          userBalance={
            currency.isToken ? balances[currency.address]?.toSignificant(6) : nativeBalance?.toSignificant(6)
          }
          style={style}
          key={currency.isToken ? currency.address : 'ETHER'}
          onSelect={() => {
            onCurrencySelect(row, row.chainId)
            onDismiss && onDismiss()
          }}
          onDismiss={onDismiss}
        />
      )
    },
    [
      balances,
      balancesAreLoading,
      filteredInactiveTokens,
      nativeBalance,
      searchTokenIsAdded,
      searchToken,
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
    <Flex sx={{ height: '300px', width: '100%', flexDirection: 'column', background: 'white3', borderRadius: '10px' }}>
      <FixedSizeList
        height={500}
        itemSize={55}
        width="100%"
        itemCount={searchCurrencies.length + filteredInactiveTokens.length}
        itemData={[...searchCurrencies, ...filteredInactiveTokens]}
        itemKey={itemKey}
        sx={{
          '::-webkit-scrollbar': {
            width: '8px',
          },
          '::-webkit-scrollbar-thumb': {
            background: 'text',
            borderRadius: '8px',
          },
          '::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 5px',
            color: 'input',
            borderRadius: '10px',
          },
        }}
      >
        {Row}
      </FixedSizeList>
    </Flex>
  )
}

export default List
