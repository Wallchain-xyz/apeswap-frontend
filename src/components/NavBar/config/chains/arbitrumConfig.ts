const arbitrumConfig = [
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
        isNew: true,
      },
    ],
  },
  //   {
  //     label: 'Pools',
  //     icon: 'PoolIcon',
  //     href: '/pools',
  //   },
  //   {
  //     label: 'IAO',
  //     icon: 'IfoIcon',
  //     href: '/iao',
  //   },
  //   {
  //     label: 'GNANA',
  //     icon: 'ApeZone',
  //     href: '/gnana',
  //   },
]

export default arbitrumConfig
