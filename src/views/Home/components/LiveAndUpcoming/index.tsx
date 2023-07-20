import { Box } from 'theme-ui'

// Components
import { Text, Flex } from 'components/uikit'

// Hooks
import { useTranslation } from 'contexts/Localization'
import useGetLiveAndUpcoming from 'hooks/queries/useGetLiveAndUpcoming'

const LiveAndUpcoming = () => {
  const { data } = useGetLiveAndUpcoming()
  const { t } = useTranslation()
  console.log({ data })
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
      <Text sx={{ fontSize: ['25px', '25px', '35px'], fontWeight: '500' }}>{t('Live & Upcoming')}</Text>
      <Text
        sx={{
          fontSize: ['12px', '12px', '15px'],
          fontWeight: '500',
          color: '#FFB300',
          opacity: '0.5',
          mt: ['4px', '4px', '8px'],
        }}
      >
        {t('Subscribe to our newsletter >')}
      </Text>
    </Flex>
  )
}

export default LiveAndUpcoming
