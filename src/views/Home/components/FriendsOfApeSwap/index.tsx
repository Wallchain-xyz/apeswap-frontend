import { Grid, Box } from 'theme-ui'

// Components
import { Flex, Text } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'

const FriendsOfApeSwap = () => {
  const { t } = useTranslation()

  const friends = new Array(10).fill(1)

  return (
    <Flex
      sx={{
        maxWidth: '1412px',
        width: '95vw',
        flexDirection: 'column',
        alignSelf: 'center',
        mt: ['62px', '62px', '90px'],
      }}
    >
      <Flex sx={{ mb: ['10px', '10px', '35px'], justifyContent: 'center' }}>
        <Text sx={{ fontSize: ['25px', '25px', '35px'], fontWeight: '500' }}>{t('Friends of ApeSwap')}</Text>
      </Flex>
      {/* <Grid
        sx={{
          gridTemplateColumns: 'repeat(auto-fill, minmax(179px, 1fr))',
        }}
      >
        {friends.map((_, index) => (
          <Box key={index} sx={{ bg: 'salmon' }}>
            {index}
          </Box>
        ))}
      </Grid> */}

      <Grid
        sx={{
          gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '1fr 1fr 1fr 1fr 1fr'],
        }}
      >
        {friends.map((_, index) => (
          <Box key={index} sx={{ bg: 'salmon', height: '71px' }}>
            {index}
          </Box>
        ))}
      </Grid>

      {/* <Flex sx={{ flexWrap: 'wrap', justifyContent: 'start', gap: '20px' }}>
        {friends.map((_, index) => (
          <Box key={index} sx={{ bg: 'salmon', width: '180px' }}>
            {index}
          </Box>
        ))}
      </Flex> */}
    </Flex>
  )
}

export default FriendsOfApeSwap
