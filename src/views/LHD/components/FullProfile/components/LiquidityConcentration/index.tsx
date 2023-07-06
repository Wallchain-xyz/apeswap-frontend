import { TokenProfile } from 'utils/types/lhd'
import { Flex, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { styles } from './styles'
import TableHeader from './Table/TableHeader'
import TableRow from './Table/TableRow'

const LiquidityConcentration = ({ fullProfile }: { fullProfile: TokenProfile }) => {
  const { t } = useTranslation()

  return (
    <Flex sx={styles.mainContainer}>
      <Text sx={styles.title}>{t('Liquidity Concentration')}</Text>
      <Flex sx={styles.tableCont}>
        <TableHeader />
        {fullProfile?.liquidityPools.length > 0 &&
          fullProfile.liquidityPools.map((pool, index) => {
            return <TableRow key={`${pool.lpAddress}-${pool.chainId}-${index}`} index={index} pool={pool} />
          })}
      </Flex>
    </Flex>
  )
}

export default LiquidityConcentration
