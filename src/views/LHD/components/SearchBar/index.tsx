import React, { ChangeEvent, useEffect, useCallback } from 'react'
import { Button, Flex, Input, Svg, Text } from 'components/uikit'
import { useLHDFilterValues, useOnFilterProfiles, useOnSearchProfiles } from 'state/lhd/hooks'
import { useAppDispatch } from 'state/hooks'
import { useTranslation } from 'contexts/Localization'
import { addSearchProfiles } from 'state/lhd/reducer'
import useDebounce from 'hooks/useDebounce'
import { styles } from './styles'
import { useAnimation, motion } from 'framer-motion'
import useModal from 'hooks/useModal'
import FilterModal from './FilterModal'
import { countChangedProperties, generateSearchParams } from './helpers'
import { fetchProfilesQuery } from 'state/lhd/actions'

const SearchBar = ({ handleNoResults, searchQueryString, setSearchQueryString }: {
  handleNoResults: (value: boolean) => void,
  searchQueryString: string,
  setSearchQueryString: any
}) => {
  const onSearchProfiles = useOnSearchProfiles()
  const onFilteredProfiles = useOnFilterProfiles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()
  const filterState = useLHDFilterValues()
  const filterString = generateSearchParams(filterState)
  const changedPropertiesCount = countChangedProperties(filterState)
  const debouncedQueryString = useDebounce(searchQueryString, 1000)
  const handleQueryChange = useCallback((searchQuery: string) => {
    setSearchQueryString(searchQuery)
  }, [setSearchQueryString])
  const [onFilterModal] = useModal(<FilterModal handleQueryChange={handleQueryChange}/>)

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

  useEffect(() => {
    dispatch(addSearchProfiles([]))
    handleNoResults(false)
    if (filterString?.length >= 2) {
      onFilteredProfiles(filterString).then(res => {
        if (res) {
          handleNoResults(true)
        }
      })
    }
  }, [dispatch, filterString, handleNoResults, onFilteredProfiles])

  return (
    <Flex sx={styles.searchBarContainer}>
      <motion.div
        animate={controls}
        style={{ display: 'inline-block', width: '100%', margin: '0 5px' }}>
        <Input
          placeholder={t('Token name, address, symbol ...')}
          value={searchQueryString}
          variant='search'
          onChange={(event: ChangeEvent<HTMLInputElement>) => handleQueryChange(event.target.value)}
          style={{ backgroundColor: 'white2' }}
          sx={{ width: '100%', '::placeholder': { fontSize: '10px', fontWeight: 300 } }}
        />
      </motion.div>
      <Button
        variant={changedPropertiesCount === 0 ? 'tertiary' : 'secondary'}
        sx={styles.btn}
        endIcon={
          <Flex sx={{ ml: '5px' }}>
            <Svg icon='MenuSettings' />
          </Flex>}
        onClick={onFilterModal}
      >
        {t('Filters')}
      </Button>
      {
        changedPropertiesCount > 0 && (
          <Flex
            sx={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              zIndex: 10,
              width: '16px',
              height: '16px',
              background: '#FFB300',
              borderRadius: '25px',
            }}
          >
            <Text sx={{
              fontSize: '8px',
              width: '100%',
              height: '100%',
              display: 'flex',
              lineHeight: '25px',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAFAFA'
            }}>
              {changedPropertiesCount}
            </Text>
          </Flex>
        )
      }

    </Flex>
  )
}

export default SearchBar