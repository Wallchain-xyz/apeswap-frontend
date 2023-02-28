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
    href: 'https://apeswap.finance/farms',
    isNew: false,
  },
  {
    label: 'Bills',
    href: 'https://apeswap.finance/treasury-bills',
    isNew: true,
  },
  {
    label: 'Explore',
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: 'ApeStats',
        href: 'https://apeswap.finance/apestats',
        isNew: false,
      },
      {
        label: 'Dashboard',
        href: 'https://apeswap.finance/protocol-dashboard',
        isNew: false,
      },
      {
        label: 'Documentation',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
        isNew: false,
      },
      {
        label: 'Charts',
        href: 'https://apeswap.finance/info',
        isNew: false,
      },
      {
        label: 'Governance',
        href: 'https://discuss.apeswap.finance',
        isNew: false,
      },
      {
        label: 'Newsletter',
        href: 'https://apeswap.finance/?modal=newsletter',
        isNew: true,
      },
    ],
  },
]

export default maticConfig
