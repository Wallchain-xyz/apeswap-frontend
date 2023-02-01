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
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
