const tlosConfig = [
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
        href: '/zap',
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
    href: '/farms',
    isNew: false,
  },
  {
    label: 'Bills',
    href: '/treasury-bills',
    isNew: false,
  },
  {
    label: 'Explore',
    lightIcon: 'MoreLightImage',
    darkIcon: 'MoreDarkImage',
    items: [
      {
        label: 'ApeStats',
        href: '/apestats',
        isNew: false,
      },
      {
        label: 'Dashboard',
        href: 'protocol-dashboard',
        isNew: false,
      },
      {
        label: 'Documentation',
        href: 'https://apeswap.gitbook.io/apeswap-finance/',
        isNew: false,
      },
      {
        label: 'Charts',
        href: '/info',
        isNew: false,
      },
      {
        label: 'Governance',
        href: 'https://discuss.apeswap.finance',
        isNew: false,
      },
      {
        label: 'Newsletter',
        href: '?modal=newsletter',
        isNew: true,
      },
    ],
  },
]

export default tlosConfig
