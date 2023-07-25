// Types
import { NavItem } from './types'

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Exchange',
    items: [
      {
        itemLabel: 'Swap',
        itemDesc: 'Trade any tokens across several chains.',
        href: '/swap',
        icon: '/images/navbar/swap',
      },
      {
        itemLabel: 'Liquidity',
        itemDesc: 'Provide liquidity to earn trading fees and stake.',
        href: '/zap',
        icon: '/images/navbar/liquidity',
      },
      {
        itemLabel: 'Pro Trading',
        itemDesc: 'Utilize Enhanced trading options & charting.',
        href: 'https://pro.apeswap.finance',
        icon: '/images/navbar/trading',
      },
    ],
  },
  {
    label: 'Bonds',
    href: '/bonds',
  },
  {
    label: 'Liquidity Health',
    href: '/liquidity-health',
  },
  {
    label: 'Staking',
    items: [
      {
        itemLabel: 'Pools',
        itemDesc: 'Stake GNANA or BANANA to earn tokens.',
        href: '/pools',
        icon: '/images/navbar/pools',
      },
      {
        itemLabel: 'Farms',
        itemDesc: 'Stake LP Tokens to earn other tokens.',
        href: '/farms',
        icon: '/images/navbar/farms',
      },
      {
        itemLabel: 'GNANA',
        itemDesc: 'Unlock exclusive ecosystem capabilities.',
        href: '/gnana',
        icon: '/images/navbar/gnana',
      },
    ],
  },
  {
    label: 'More',
    items: [
      {
        itemLabel: 'ApeStats',
        itemDesc: 'View your ApeSwap stats.',
        href: 'https://legacy.apeswap.finance/apestats',
        icon: '/images/navbar/stats',
      },
      {
        itemLabel: 'Protocol Data',
        itemDesc: 'Uncover protcol insights.',
        href: '/protocol-dashboard',
        icon: '/images/navbar/protocol',
      },
      {
        itemLabel: 'Charts',
        itemDesc: 'View DEX information.',
        href: 'https://legacy.apeswap.finance/info',
        icon: '/images/navbar/charts',
      },
      {
        itemLabel: 'Lending',
        itemDesc: 'Borrow and supply assets.',
        href: 'https://lending.apeswap.finance',
        icon: '/images/navbar/lending',
      },
      {
        itemLabel: 'ApeSwap NFTs',
        itemDesc: 'Discover ApeSwap`s NFT Offerings.',
        href: '/nft',
        icon: '/images/navbar/nfts',
      },
      {
        itemLabel: 'Governance',
        itemDesc: 'Participate in DAO decisions.',
        href: 'https://Discuss.apeswap.finance',
        icon: '/images/navbar/governance',
      },
    ],
  },
]
