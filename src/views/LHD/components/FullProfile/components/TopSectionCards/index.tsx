import { Button, Flex, Svg, Text } from 'components/uikit'
import { Box } from 'theme-ui'
import PriceChange from '../PercentageChange'
import IconButton from '../IconButton'
import ChainsIcons from '../ChainsIcons'
import ProgressBar from '../../../ProgressBar'
import { getColor } from '../../../../utils/getColor'
import { ExternalDataOption, TokenProfile } from 'state/lhd/types'
import useModal from 'hooks/useModal'
import SharableCard from '../../../SharableCard'
import { styles } from './styles'
import { useTranslation } from 'contexts/Localization'
import TokenImage from '../../../../../../components/TokenImage'
import Link from 'next/link'

const TopSectionCards = ({ fullProfile }: { fullProfile: TokenProfile }) => {
  const { t } = useTranslation()
  const firstValidMcap = fullProfile?.mcap.find((input: ExternalDataOption) => input?.amount) as ExternalDataOption
  const [onCreateCard] = useModal(
    <SharableCard
      tokenSymbol={fullProfile?.addressMapping?.tokenSymbol}
      tokenName={fullProfile?.addressMapping?.tokenName}
      tokenImageURL={fullProfile?.addressMapping?.tokenLogoUrl}
      totalScore={fullProfile?.totalScore}
      healthScore={fullProfile?.healthScore}
      concentrationScore={fullProfile?.concentrationScore}
      ownershipScore={fullProfile?.ownershipScore}
      tokenAddresses={fullProfile?.addressMapping.tokenAddresses}
      formulaVersion={fullProfile?.formulaVersion}
    />,
  )
  return (
    <Flex sx={styles.mainContainer}>
      <Flex sx={styles.leftContainer}>
        <Flex sx={{ width: '100%' }}>
          <Flex sx={{ width: '100%', flexDirection: 'column' }}>
            <Flex sx={styles.nameBtnContainer}>
              <Flex>
                <TokenImage url={fullProfile?.addressMapping?.tokenLogoUrl} size={25} />
                <Flex sx={styles.tokenNameCont}>
                  <Text sx={styles.tokenName}>{fullProfile?.addressMapping?.tokenName}</Text>
                  <Text sx={styles.tokenSymbol}>{fullProfile?.addressMapping?.tokenSymbol}</Text>
                </Flex>
                <Box sx={styles.priceChange}>
                  <Text sx={{ fontWeight: 700, fontSize: ['14px'] }}>
                    $
                    {fullProfile?.currentPrice[0]?.amount < 0.00001
                      ? fullProfile?.currentPrice[0]?.amount
                      : fullProfile?.currentPrice[0]?.amount.toFixed(5)}
                    <PriceChange priceChange={fullProfile?.priceChange24hr?.toFixed(2)} />
                  </Text>
                </Box>
              </Flex>
              <Flex sx={styles.buttons}>
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.siteUrl} icon="filledURL" />
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.auditUrls?.[0]} icon="tickShield" />
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.twitterUrl} icon="twitter" />
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.telegramUrl} icon="send" />
                <IconButton href={fullProfile?.addressMapping?.profileLinks?.discordUrl} icon="discord" />
                <IconButton href={fullProfile?.addressMapping?.tokenAddresses[0]?.address} icon="copy" />
              </Flex>
            </Flex>
            <Flex sx={styles.extraInfoCont}>
              <Flex sx={styles.rank}>
                <Text sx={styles.rankText}>
                  {t('Rank #')}
                  {fullProfile?.ranking}
                </Text>
              </Flex>
              <Flex sx={styles.chainsCont}>
                <ChainsIcons tokenAddresses={fullProfile?.addressMapping.tokenAddresses} />
              </Flex>
              <Text sx={styles.marketCap}>
                {t('Market Cap:')} ${Math.round(firstValidMcap?.amount).toLocaleString(undefined)}
              </Text>
            </Flex>
            {fullProfile?.addressMapping?.tags && (
              <Flex sx={styles.tagRow}>
                {fullProfile?.addressMapping?.tags.map((tag: string) => (
                  <Flex key={tag} sx={styles.tag}>
                    <Text sx={styles.tagText}>{tag.replace('_', ' ')}</Text>
                  </Flex>
                ))}
                <Flex sx={styles.tag}>
                  <Link
                    href="https://github.com/ApeSwapFinance/lhd-config"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={styles.tagText}
                  >
                    + Add Tag
                  </Link>
                </Flex>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Flex>
      <Flex sx={styles.scoresCont}>
        <Flex sx={{ width: '100%', flexDirection: 'row' }}>
          <Flex sx={styles.singleScoreCont}>
            <Text sx={styles.scoreTitle}>{t('Strength')}</Text>
            <Text sx={styles.scoreTitle}>{t('Ownership')}</Text>
            <Text sx={styles.scoreTitle}>{t('Concentration')}</Text>
          </Flex>
          <Flex sx={{ flexDirection: 'column', width: '100%' }}>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.round(fullProfile?.healthScore * 100)} position="right" />
            </Flex>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.round(fullProfile?.ownershipScore * 100)} position="right" />
            </Flex>
            <Flex sx={{ height: '20px' }}>
              <ProgressBar value={Math.round(fullProfile?.concentrationScore * 100)} position="right" />
            </Flex>
          </Flex>
          <Flex sx={styles.scoreCont}>
            <Text sx={styles.scoreText}>{t('SCORE')}</Text>
            <Text sx={{ ...styles.scoreNumber, color: getColor(fullProfile.totalScore * 100) }}>
              {Math.round(fullProfile.totalScore * 100)}
            </Text>
          </Flex>
        </Flex>
        <Flex sx={{ mt: ['10px', '10px', '10px', '0px'] }}>
          <Button variant="tertiary" sx={styles.shareCard} onClick={onCreateCard}>
            <Text sx={styles.shareText}>{t('Share')}</Text>
            <Svg icon="share" width={17} color="text" />
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default TopSectionCards
