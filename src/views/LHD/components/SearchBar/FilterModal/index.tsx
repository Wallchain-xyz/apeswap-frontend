import { useCallback, useState } from 'react'
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import Dropdown from './Dropdown'
import ModalHeader from 'components/uikit/Modal/ModalHeader'
import InputSlider from './InputSlider'
import { FilterState, initialFilterValues, setFilterState } from 'state/lhd/reducer'
import { formatDollar } from 'utils/formatNumbers'
import ScoreSlider from './ScoreSlider'
import { Box } from 'theme-ui'
// import { useDispatch } from 'react-redux'
// import { useLHDFilterValues } from 'state/lhd/hooks'
import ButtonSelector from './ButtonSelector'
import { useRouter } from 'next/router'
import queryString from 'query-string'

// Helpers
import { generateSearchParams, queryStringToObject } from '../helpers'

// Types
import { Filters } from 'utils/types/lhd'

const modalProps = {
  sx: {
    zIndex: 126,
    // overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    width: ['90%', '90%', '425px'],
    maxWidth: '425px',
    minWidth: 'unset',
  },
}

const FilterModal = ({
  handleQueryChange,
  openChains,
  onDismiss,
}: {
  handleQueryChange: (value: string) => void
  openChains?: boolean
  onDismiss?: () => void
}) => {
  const { t } = useTranslation()
  // const dispatch = useDispatch()
  // const filterValues = useLHDFilterValues()
  const router = useRouter()
  const { query: filters } = router
  const parsedFilters = queryString.stringify(filters)
  const [values, setValues] = useState<Required<Filters>>(queryStringToObject(parsedFilters))

  console.log({ values })

  const stringHandler = (
    type: 'totalScore' | 'health' | 'ownership' | 'concentration' | 'mcap' | 'extractable' | 'tags' | 'chains',
  ) => {
    if (type === 'mcap' || type === 'extractable') {
      if (values[type].min !== initialFilterValues[type].min || values[type].max !== initialFilterValues[type].max) {
        return `(${formatDollar({ num: values[type].min })}-${formatDollar({ num: values[type].max })})`
      }
    }
    if (type === 'tags' || type === 'chains') {
      return values[type].join(',')
    }
    if (values[type].min !== initialFilterValues[type].min || values[type].max !== initialFilterValues[type].max) {
      return `(${values[type].min}-${values[type].max})`
    }
    return ''
  }

  const mCapString = stringHandler('mcap')
  const extString = stringHandler('extractable')
  const score = stringHandler('totalScore')
  const health = stringHandler('health')
  const owner = stringHandler('ownership')
  const concen = stringHandler('concentration')
  const scoreString = `${score ? `Score: ${score}` : ''}${health ? ` Strength: ${health}` : ''}${
    owner ? ` Ownership: ${owner}` : ''
  } ${concen ? ` Concentration: ${concen}` : ''}`
  const tagsString = stringHandler('tags')
  const chainsString = stringHandler('chains')

  const handler = useCallback(
    (
      type: 'totalScore' | 'health' | 'ownership' | 'concentration' | 'mcap' | 'extractable',
      obj: 'min' | 'max',
      value: number,
    ) => {
      setValues((prevState) => ({
        ...prevState,
        [type]: {
          ...prevState[type],
          [obj]: value,
        },
      }))
    },
    [],
  )

  const buttonSelectorHandler = useCallback((type: 'tags' | 'chains', value: string[]) => {
    setValues((prevState) => ({
      ...prevState,
      [type]: value,
    }))
  }, [])

  const searchAction = () => {
    // dispatch(setFilterState(values))
    const filterString = generateSearchParams(values)
    router.replace({
      query: filterString,
    })
    onDismiss && onDismiss()
  }
  const clearAction = () => {
    //dispatch(addSearchProfiles([]))
    // dispatch(setFilterState(initialFilterValues))
    setValues(initialFilterValues)
    // const newUrl = `${router.pathname}`
    router.replace({
      query: '',
    })
    handleQueryChange('')
    onDismiss && onDismiss()
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader>
        <Text sx={{ width: '100%', textAlign: 'center' }}>{t('FILTERS')}</Text>
      </ModalHeader>
      <Dropdown
        open={openChains}
        title={t('Chains')}
        values={values['chains'].length > 0 ? `Chains: ${values['chains'].length} selected` : ''}
      >
        <ButtonSelector values={values} handler={buttonSelectorHandler} type="chains" />
      </Dropdown>
      <Dropdown title={t('Tags')} values={values['tags'].length ? `Tags: ${values['tags'].length} selected` : ''}>
        <ButtonSelector values={values} handler={buttonSelectorHandler} type="tags" />
      </Dropdown>
      <Dropdown
        title={t('Liquidity Score')}
        values={scoreString.length > 40 ? `${scoreString.slice(0, 40)}...` : scoreString}
      >
        <ScoreSlider values={values} handler={handler} />
      </Dropdown>
      <Dropdown title={t('Market Cap Range')} values={mCapString}>
        <InputSlider
          minRange={initialFilterValues.mcap.min}
          maxRange={initialFilterValues.mcap.max}
          values={values.mcap}
          setMinValue={(value: number) => handler('mcap', 'min', value)}
          setMaxValue={(value: number) => handler('mcap', 'max', value)}
        />
      </Dropdown>
      <Dropdown title={t('Extractable Liquidity Range')} values={extString}>
        <InputSlider
          minRange={initialFilterValues.extractable.min}
          maxRange={initialFilterValues.extractable.max}
          values={values.extractable}
          setMinValue={(value: number) => handler('extractable', 'min', value)}
          setMaxValue={(value: number) => handler('extractable', 'max', value)}
        />
      </Dropdown>
      <Flex sx={{ width: '100%', mt: '20px' }}>
        <Button
          variant="secondary"
          sx={{ display: 'flex', background: 'lvl1', width: '100%', maxWidth: '123px', mr: '20px' }}
          onClick={clearAction}
        >
          {t('Clear')}
          <Box sx={{ ml: '5px' }}>
            <Svg icon="trash" color="yellow" />
          </Box>
        </Button>
        <Button
          sx={{ width: '100%' }}
          disabled={
            !(
              values.mcap.max >= initialFilterValues.mcap.min &&
              values.mcap.min <= initialFilterValues.mcap.max &&
              values.extractable.max >= initialFilterValues.extractable.min &&
              values.extractable.min <= initialFilterValues.extractable.max
            )
          }
          onClick={searchAction}
        >
          {t('Search')}
        </Button>
      </Flex>
    </Modal>
  )
}

export default FilterModal
