const TEMP_APESWAP_URL = process.env.NEXT_PUBLIC_LEGACY_APESWAP_URL
import { NavConfig } from 'components/NavBar/types'

const bscConfig: NavConfig[] = [
  {
    label: 'Exchange',
    items: [
      {
        label: 'Swap',
        href: '/swap',
      },
      {
        label: 'Liquidity',
        href: '/zap',
      },
      {
        label: 'Pro Trading',
        href: 'https://pro.apeswap.finance',
      },
      {
        label: 'GNANA',
        href: `/gnana`,
      },
    ],
  },
  {
    label: 'Bonds',
    href: '/bonds',
  },
  {
    label: 'Liquidity Health',
    href: `/liquidity-health`,
  },
  {
    label: 'Staking',
    items: [
      {
        label: 'Pools',
        href: `/pools`,
      },
      {
        label: 'Farms',
        href: `/farms`,
      },
      {
        label: 'Maximizers',
        href: `https://legacy.apeswap.finance/maximizers`,
      },
    ],
  },
  {
    label: 'More',
    items: [
      {
        label: 'ApeStats',
        href: `${TEMP_APESWAP_URL}/apestats`,
      },
      {
        label: 'Protocol Data',
        href: `/protocol-dashboard`,
      },
      {
        label: 'Charts',
        href: `${TEMP_APESWAP_URL}/info`,
      },
      {
        label: 'Lend',
        href: 'https://lending.apeswap.finance/',
      },
      {
        label: 'ApeSwap NFTs',
        href: '/nft',
      },
      {
        label: 'Governance',
        href: 'https://discuss.apeswap.finance',
      },
    ],
  },
]

export default bscConfig
