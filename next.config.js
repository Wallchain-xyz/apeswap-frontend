/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  images: {
    domains: [
      'raw.githubusercontent.com',
      's2.coinmarketcap.com',
      'assets.coingecko.com',
      'tokens.pancakeswap.finance',
      'ipfs.io',
      'res.cloudinary.com',
    ],
  },
  async redirects() {
    return [
      {
        source: '/zap',
        destination: '/add-liquidity',
        permanent: false,
      },
      {
        source: '/migrate',
        destination: '/add-liquidity',
        permanent: false,
      },
    ]
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
