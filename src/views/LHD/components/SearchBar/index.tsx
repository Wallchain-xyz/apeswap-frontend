import React, { ChangeEvent, useEffect, useState, useCallback } from 'react'
import { Button, Flex, Input, Svg } from 'components/uikit'
import { useOnSearchProfiles } from 'state/lhd/hooks'
import { useAppDispatch } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { addSearchProfiles } from 'state/lhd/reducer'
import useDebounce from 'hooks/useDebounce'
import { styles } from './styles'
import { useAnimation, motion } from 'framer-motion'
import useModal from 'hooks/useModal'
import FilterModal from './FilterModal'

const SearchBar = ({ handleNoResults, searchQueryString, setSearchQueryString }: {
  handleNoResults: (value: boolean) => void,
  searchQueryString: string,
  setSearchQueryString: any
}) => {
  const onSearchProfiles = useOnSearchProfiles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const debouncedQueryString = useDebounce(searchQueryString, 1000)
  const [onFilterModal] = useModal(<FilterModal />)

  const handleChange = (searchQuery: string) => {
    setSearchQueryString(searchQuery)
  }

  //shakes when no results are found
  const controls = useAnimation()
  const startShaking = useCallback(async () => {
    controls.start({
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.2, repeat: 2 },
    })
  }, [controls])

  useEffect(() => {
    dispatch(addSearchProfiles([]))
    handleNoResults(false)
    if (debouncedQueryString?.length >= 2) {
      onSearchProfiles(debouncedQueryString).then(res => {
        if (res) {
          handleNoResults(true)
          startShaking()
        }
      })
    }
  }, [debouncedQueryString, dispatch, handleNoResults, onSearchProfiles, startShaking])

  return (
    <Flex sx={styles.searchBarContainer}>
      <motion.div
        animate={controls}
        style={{ display: 'inline-block', width: '100%', margin: '0 5px' }}>
        <Input
          placeholder={t('Token name, address, symbol ...')}
          value={searchQueryString}
          variant='search'
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
          style={{ backgroundColor: 'white2' }}
          sx={{ width: '100%', '::placeholder': { fontSize: '10px', fontWeight: 300 } }}
        />
      </motion.div>
      <Button
        variant='tertiary'
        sx={styles.btn}
        endIcon={
          <Flex sx={{ ml: '5px' }}>
            <Svg icon='MenuSettings' />
          </Flex>}
        onClick={onFilterModal}
      >
        {t('Filters')}
      </Button>
    </Flex>
  )
}

export default SearchBar