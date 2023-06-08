import React, { useCallback, useState } from 'react'
import { Button, Flex, Modal, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import Dropdown from './Dropdown'
import ModalHeader from 'components/uikit/Modal/ModalHeader'
import InputSlider from './InputSlider'
import { FilterState, initialFilterValues, setFilterState } from 'state/lhd/reducer'
import { formatDollar } from 'utils/formatNumbers'
import ScoreSlider from './ScoreSlider'
import { Box } from 'theme-ui'
import { useDispatch } from 'react-redux'
import { useLHDFilterValues } from 'state/lhd/hooks'

const modalProps = {
  sx: {
    zIndex: 126,
    overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    width: ['90%', '90%', '425px'],
    maxWidth: '425px',
    minWidth: 'unset',
  },
}

const FilterModal = ({
  handleQueryChange,
  onDismiss,
}: {
  handleQueryChange: (value: string) => void
  onDismiss?: () => void
}) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const filterValues = useLHDFilterValues()
  const [values, setValues] = useState<FilterState>(filterValues)

  const stringHandler = (type: 'totalScore' | 'health' | 'ownership' | 'concentration' | 'mcap' | 'extractable') => {
    if (type === 'mcap' || type === 'extractable') {
      if (values[type].min !== initialFilterValues[type].min || values[type].max !== initialFilterValues[type].max) {
        return `(${formatDollar({ num: values[type].min })}-${formatDollar({ num: values[type].max })})`
      }
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

  const searchAction = () => {
    dispatch(setFilterState(values))
    onDismiss && onDismiss()
  }
  const clearAction = () => {
    //dispatch(addSearchProfiles([]))
    dispatch(setFilterState(initialFilterValues))
    setValues(initialFilterValues)
    handleQueryChange('')
  }

  return (
    <Modal {...modalProps}>
      <ModalHeader>
        <Text sx={{ width: '100%', textAlign: 'center' }}>{t('FILTERS')}</Text>
      </ModalHeader>
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
        <Button sx={{ width: '100%' }} onClick={searchAction}>
          {t('Search')}
        </Button>
      </Flex>
    </Modal>
  )
}

export default FilterModal
