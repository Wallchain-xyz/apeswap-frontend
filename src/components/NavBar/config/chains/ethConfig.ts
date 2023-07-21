const TEMP_APESWAP_URL = process.env.NEXT_PUBLIC_LEGACY_APESWAP_URL

const ethConfig = [
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
    ],
  },
  {
    label: 'Liquidity Health',
    href: `/liquidity-health`,
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

export default ethConfig
