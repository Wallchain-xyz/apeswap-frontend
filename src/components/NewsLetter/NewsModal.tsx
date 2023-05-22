import { Flex, Modal, Text } from 'components/uikit'
import React from 'react'
import { Box } from 'theme-ui'
import Newsletter from '.'
import { styles, modalProps } from './styles'
import { NewsModalProps } from './types'

const NewsModal: React.FC<NewsModalProps> = ({ onDismiss, mailChimpUrl, isNewsModal }) => {
  return (
    <Modal zIndex={10} onDismiss={onDismiss} {...modalProps}>
      <Flex className="newsletter-modal-con">
        <Flex>
          <Text width={22} onClick={onDismiss} sx={{ cursor: 'pointer', position: 'absolute', right: '20px' }}>
            X
          </Text>
        </Flex>
        <Flex sx={styles.modalBody}>
          <Box sx={styles.showApe} />
          <Newsletter mailChimpUrl={mailChimpUrl} />
        </Flex>
      </Flex>
    </Modal>
  )
}

export default NewsModal
