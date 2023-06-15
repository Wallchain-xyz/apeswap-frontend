const TEMP_APESWAP_URL = process.env.NEXT_PUBLIC_LEGACY_APESWAP_URL

const ethConfig = [
  {
    label: 'Exchange',
    lightIcon: 'ExchangeLightImage',
    darkIcon: 'ExchangeDarkImage',
    items: [
      {
        label: 'Swap',
        href: 'https://dex.apeswap.finance/swap',
        isNew: false,
      },
      {
        label: 'Liquidity',
        href: `https://dex.apeswap.finance/zap`,
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
    label: 'Explore',
    items: [
      {
        label: 'ApeStats',
        href: `${TEMP_APESWAP_URL}/apestats`,
      },
      {
        label: 'Dashboard',
        href: `/protocol-dashboard`,
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
      // {
      //   label: 'Newsletter',
      //   href: '?modal=newsletter',
      // },
    ],
  },
]

export default ethConfig
