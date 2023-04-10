const TEMP_APESWAP_URL = process.env.NEXT_PUBLIC_LEGACY_APESWAP_URL 

const maticConfig = [
  {
    label: 'Exchange',
    lightIcon: 'ExchangeLightImage',
    darkIcon: 'ExchangeDarkImage',
    items: [
      {
        label: 'Swap',
        href: '/swap',
        isNew: false,
      },
      {
        label: 'Liquidity',
        href: '/add-liquidity',
        isNew: false,
      },
      {
        label: 'Pro Trading',
        href: 'https://pro.apeswap.finance',
        isNew: false,
      },
    ],
  },
  {
    label: 'Farms',
    href: `${TEMP_APESWAP_URL}/farms`,
    isNew: false,
  },
  {
    label: 'Bonds',
    href: `${TEMP_APESWAP_URL}/bonds`,
    isNew: true,
  },
  {
    label: 'Explore',
    items: [
      {
        label: 'ApeStats',
        href: `${TEMP_APESWAP_URL}/apestats`,
      },
      {
        label: 'Dashboard',
        href: `${TEMP_APESWAP_URL}/protocol-dashboard`,
      },
      {
        label: 'Documentation',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
      },
      {
        label: 'Charts',
        href: `${TEMP_APESWAP_URL}/info`,
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

export default maticConfig
