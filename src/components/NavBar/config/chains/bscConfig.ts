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
        href: '/add-liquidity',
      },
      {
        label: 'Pro Trading',
        href: 'https://pro.apeswap.finance',
      },
      {
        label: 'GNANA',
        href: '/gnana',
      },
    ],
  },
  {
    label: 'Stake',
    items: [
      {
        label: 'Staking Pools',
        href: '/pools',
      },
      {
        label: 'BANANA Maximizers',
        href: '/maximizers',
      },
      {
        label: 'BANANA Farms',
        href: '/farms',
      },
      {
        label: 'Jungle Farms',
        href: '/jungle-farms',
      },
    ],
  },
  {
    label: 'Raise',
    items: [
      {
        label: 'Treasury Bills',
        href: '/treasury-bills',
      },
      {
        label: 'Official IAO',
        href: '/iao',
      },
    ],
  },
  {
    label: 'Collect',
    items: [
      {
        label: 'NFA Collection',
        href: '/nft',
      },
      {
        label: 'NFA Auction',
        href: '/auction',
      },
      {
        label: 'NFA Liquidity',
        href: 'https://liquidcollectibles.io/collection/0x6afc012783e3a6ef8c5f05f8eee2edef6a052ec4',
      },
      {
        label: 'NFB Collection',
        href: 'https://nftkey.app/collections/nfbs/',
      },
      {
        label: 'NFB Liquidity',
        href: 'https://liquidcollectibles.io/collection/0x9f707a412302a3ad64028a9f73f354725c992081',
      },
    ],
  },
  {
    label: 'Lend',
    href: 'https://lending.apeswap.finance/',
  },
  {
    label: 'Explore',
    items: [
      {
        label: 'ApeStats',
        href: '/apestats',
      },
      {
        label: 'Dashboard',
        href: 'protocol-dashboard',
      },
      {
        label: 'Documentation',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: 'Charts',
        href: '/info',
      },
      {
        label: 'Governance',
        href: 'https://discuss.apeswap.finance',
      },
      {
        label: 'Newsletter',
        href: '?modal=newsletter',
      },
    ],
  },
]

export default bscConfig
