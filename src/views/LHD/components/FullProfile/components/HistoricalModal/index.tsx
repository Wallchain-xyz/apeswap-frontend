import React, { useRef, useEffect, useState, ChangeEvent } from 'react'
import { Flex, Modal, Button, Text, Svg, SelectItem, Select } from 'components/uikit'
import { Box } from 'theme-ui'
import { useTranslation } from '../../../../../../contexts/Localization'

const modalProps = {
  sx: {
    maxHeight: 'calc(100% - 30px)',
    height: '500px',
    width: ['90%'],
    overflow: 'hidden',
    '@media screen and (min-width: 1180px)': {
      maxWidth: '800px',
    },
    maxWidth: '800px',
  },
  title: 'View Historical Data',
}

interface HistoricModalProps {
  onDismiss?: () => void
  onHistoricChange: (value: { text: string; value: string }) => void
}

const HistoricalModal = ({ onDismiss, onHistoricChange }: HistoricModalProps) => {
  const handleClick = () => {
    onHistoricChange(selectedValue)
    onDismiss && onDismiss()
  }

  const { t } = useTranslation()

  const HISTORIC_OPTIONS = [
    {
      text: '14th July 2023',
      value: '2023-07-14',
      label: <Flex sx={{ gap: '3px', fontSize: '12px' }}>14th July 2023</Flex>,
    },
    {
      text: '7th July 2023',
      value: '2023-07-07',
      label: <Flex sx={{ gap: '3px', fontSize: '12px' }}>7th July 2023</Flex>,
    },
    {
      text: '30th June 2023',
      value: '2023-06-30',
      label: <Flex sx={{ gap: '3px', fontSize: '12px' }}>30th June 2023</Flex>,
    },
    {
      text: '23rd June 2023',
      value: '2023-06-23',
      label: <Flex sx={{ gap: '3px', fontSize: '12px' }}>23rd June 2023</Flex>,
    },
    {
      text: '16th June 2023',
      value: '2023-06-16',
      label: <Flex sx={{ gap: '3px', fontSize: '12px' }}>16th June 2023</Flex>,
    },
  ]

  const [selectedValue, setSelectedValue] = useState({ text: '', value: '' })

  const handleSelectChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as string
    const text = HISTORIC_OPTIONS.find((option) => option.value === value)?.text || ''
    setSelectedValue({ text, value })
  }

  return (
    <Modal {...modalProps}>
      <Flex
        id="cardContainer"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Select
          label={<Box sx={{ pl: '10px', fontSize: '12px' }}>{selectedValue.text || 'Choose a date'}</Box>}
          onChange={handleSelectChange}
          sx={{
            zIndex: 11,
            width: ['100%', '100%', '200px'],
            height: '36px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            marginTop: '10px',
            marginBottom: '320px',
          }}
        >
          {HISTORIC_OPTIONS.map(({ label, value }) => (
            <SelectItem value={value} key={value} size="xsm" sx={{ px: '10px' }}>
              {label}
            </SelectItem>
          ))}
        </Select>
        <Button sx={{ width: '100%' }} onClick={handleClick}>
          {t('Show Historic Data')}
        </Button>
      </Flex>
    </Modal>
  )
}

export default HistoricalModal
