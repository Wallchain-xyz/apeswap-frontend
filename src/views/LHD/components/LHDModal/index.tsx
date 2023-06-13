import Modal from '../../../../components/uikit/Modal'
import { Flex, Box } from 'theme-ui'

const LHDModal = ({}) => {
  return (
    <Modal open={true} sx={{ height: ['100%', '100%', '515px'], width: ['100%', '100%', '841px'] }}>
      <Flex
        sx={{
          height: '100%',
          flexDirection: ['column', 'column', 'row-reverse'],
          gap: ['10px', '10px', '20px'],
        }}
      >
        <Box
          sx={{
            backgroundColor: 'red',
            height: ['30%', '30%', '100%'],
            width: ['100%', '100%', '60%'],
            borderRadius: '25px',
          }}
        >
          TOP/RIGHT
        </Box>
        <Box sx={{ backgroundColor: 'blue', width: 'auto', flex: 1 }}>BOTTOM/LEFT</Box>
      </Flex>
    </Modal>
  )
}

export default LHDModal
