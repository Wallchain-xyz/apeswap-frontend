import { Text, Modal } from 'components/uikit'
import { Flex, Box } from 'theme-ui'
import Image from 'next/image'

const LHDModal = () => {
  return (
    <Modal open={true} sx={{ height: ['100%', '100%', '515px'], width: ['100%', '100%', '841px'] }}>
      <Flex
        sx={{
          height: '100%',
          flexDirection: ['column', 'column', 'row-reverse'],
          gap: ['20px', '20px', '20px'],
        }}
      >
        <Box
          sx={{
            height: ['30%', '30%', '100%'],
            width: ['100%', '100%', '60%'],
            borderRadius: '25px',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Image src="/images/lhd/ape-pool.svg" alt="ape-pool" fill sx={{ objectFit: 'cover' }} />
        </Box>
        <Box sx={{ width: 'auto', flex: 1 }}>
          <Box sx={{ px: '10px' }}>
            <Flex
              sx={{
                flexDirection: ['row', 'row', 'column'],
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: ['0', '0', '20px'],
              }}
            >
              <Box sx={{ width: ['32px', '32px', '53px'], height: ['46px', '46px', '76px'], position: 'relative' }}>
                <Image src="/images/lhd/liquidity-white.svg" alt="liquidity-icon" fill />
              </Box>
              <Text
                weight="bold"
                sx={{
                  fontSize: ['21px', '21px', '28px'],
                  textAlign: 'center',
                  lineHeight: ['25px', '25px', '34px'],
                }}
              >
                Liquidity Health Dashboard
              </Text>
            </Flex>
            <Box sx={{ textAlign: 'center', marginTop: ['10px', '10px', '15px'] }}>
              <Text sx={{ fontSize: ['12px', '12px'], lineHeight: '15px' }}>
                ApeSwap’s data visualization tool provides insights into the liquidity levels and sustainability of
                cryptocurrency projects.
              </Text>
            </Box>
          </Box>
        </Box>
      </Flex>
    </Modal>
  )
}

export default LHDModal
