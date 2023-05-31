/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    emotion: true,
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false }
    return config
  },
  images: {
    domains: [
      'raw.githubusercontent.com',
      's2.coinmarketcap.com',
      'assets.coingecko.com',
      'tokens.pancakeswap.finance',
      'ipfs.io',
      'res.cloudinary.com',
      'apeswap.mypinata.cloud',
    ],
  },
  async redirects() {
    return [
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
