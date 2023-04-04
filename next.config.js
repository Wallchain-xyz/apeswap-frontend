/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: [
      'raw.githubusercontent.com',
      's2.coinmarketcap.com',
      'assets.coingecko.com',
      'tokens.pancakeswap.finance',
      'ipfs.io',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/swap',
        permanent: false,
      },
      {
        source: '/zap',
        destination: '/add-liquidity',
        permanent: false,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
