import React, { ChangeEvent, useEffect, useState } from 'react'
import { Button, Flex, Input, Svg } from 'components/uikit'
import { useOnSearchProfiles } from 'state/lhd/hooks'
import { useAppDispatch } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { addSearchProfiles } from 'state/lhd/reducer'
import useDebounce from 'hooks/useDebounce'
import { styles } from './styles'

const SearchBar = () => {
  const onSearchProfiles = useOnSearchProfiles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [queryString, setQueryString] = useState('')
  const debouncedQueryString = useDebounce(queryString, 1000);

  const handleChange = (searchQuery: string) => {
    setQueryString(searchQuery)
  }

  useEffect(() => {
    dispatch(addSearchProfiles([]));
    if (debouncedQueryString?.length >= 2) {
      onSearchProfiles(debouncedQueryString);
    }
  }, [dispatch, debouncedQueryString, onSearchProfiles]);

  return (
    <Flex sx={styles.searchBarContainer}>
      <Input
        placeholder={t('Token name, address, symbol ...')}
        value={queryString}
        variant='search'
        onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
        style={{ backgroundColor: 'white2' }}
        sx={{ width: '100%', '::placeholder': { fontSize: '10px', fontWeight: 300 } }}
      />
      <Button
        variant='tertiary'
        sx={styles.btn}
        endIcon={<Flex sx={{ ml: '5px' }}><Svg icon='MenuSettings' /></Flex>}
      >
        {t('Filters')}
      </Button>
    </Flex>
  )
}

export default SearchBar