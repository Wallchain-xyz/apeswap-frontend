import { ChangeEvent, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { Button, Flex, Input, Svg, Text } from 'components/uikit'
import { useLHDFilterValues } from 'state/lhd/hooks'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import { useAnimation, motion } from 'framer-motion'
import useModal from 'hooks/useModal'
import FilterModal from './FilterModal'
import { countChangedProperties, generateSearchParams, queryStringToObject } from './helpers'
import useFilterHandler from './FilterModal/useFilterHandler'

const SearchBar = () => {
  const { t } = useTranslation()
  // const filterState = useLHDFilterValues()
  const router = useRouter()
  const { query: filters } = router

  const changedPropertiesCount = countChangedProperties(filters)
  const [searchQueryString, setSearchQueryString] = useState<string>(filters.search ? filters.search.toString() : '')
  const handleQueryChange = useFilterHandler(setSearchQueryString, searchQueryString)

  const [onFilterModal] = useModal(<FilterModal handleQueryChange={handleQueryChange} />)

  //shakes when no results are found
  const controls = useAnimation()
  const startShaking = useCallback(async () => {
    controls.start({
      x: [-5, 5, -5, 5, 0],
      transition: { duration: 0.2, repeat: 2 },
    })
  }, [controls])

  return (
    <Flex sx={styles.searchBarContainer}>
      <motion.div animate={controls} style={{ display: 'inline-block', width: '100%', margin: '0 5px' }}>
        <Input
          placeholder={t('Token name, address, symbol ...')}
          value={searchQueryString}
          variant="search"
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
            <Svg icon="MenuSettings" />
          </Flex>
        }
        onClick={onFilterModal}
      >
        {t('Filters')}
      </Button>
      {changedPropertiesCount > 0 && (
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
          <Text
            sx={{
              fontSize: '8px',
              width: '100%',
              height: '100%',
              display: 'flex',
              lineHeight: '25px',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FAFAFA',
            }}
          >
            {changedPropertiesCount}
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

export default SearchBar
