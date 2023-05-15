import React from 'react'
import { Modal, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import MCapRange from './MCapRange'
import { Divider } from 'theme-ui'
import { AnimatePresence, motion } from 'framer-motion'
import Dropdown from './Dropdown'
import ModalHeader from '../../../../../components/uikit/Modal/ModalHeader'

const modalProps = {
  sx: {
    zIndex: 126,
    overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    width: ['90%', '90%', '425px'],
    maxWidth: '425px',
    minWidth: 'unset'
  },
}

const FilterModal = () => {
  const { t } = useTranslation()
  return (
    <Modal {...modalProps}>
      <ModalHeader >
        <Text sx={{width: '100%', textAlign: 'center'}}>
          {t('FILTERS')}
        </Text>
      </ModalHeader>
      <Dropdown title={t('Market Cap Range')}>
        <MCapRange minRange={0} maxRange={100} />
      </Dropdown>
      <Dropdown title={t('Extractable Liquidity Range')}>
        <MCapRange minRange={0} maxRange={100} />
      </Dropdown>
    </Modal>
  )
}

export default FilterModal