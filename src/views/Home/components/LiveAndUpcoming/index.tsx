import { Box } from 'theme-ui'

// Components
import { Text, Flex, Button } from 'components/uikit'
import NewsModal from 'components/NewsLetter/NewsModal'

// Constants
import { mailChimpUrl } from 'config/constants/api'

// Hooks
import { useTranslation } from 'contexts/Localization'
import useGetLiveAndUpcoming from 'hooks/queries/useGetLiveAndUpcoming'
import useModal from 'hooks/useModal'

const LiveAndUpcoming = () => {
  const { data } = useGetLiveAndUpcoming()
  const { t } = useTranslation()

  const [onPresentModal] = useModal(<NewsModal mailChimpUrl={mailChimpUrl} />, false, false, 'newsModal')

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
      <Button
        onClick={onPresentModal}
        variant="text"
        sx={{
          fontSize: ['12px', '12px', '15px'],
          fontWeight: '500',
          color: '#FFB300',
          opacity: '0.5',
          textTransform: 'initial',
          pl: '0px',
        }}
      >
        {t('Subscribe to our newsletter >')}
      </Button>
    </Flex>
  )
}

export default LiveAndUpcoming
