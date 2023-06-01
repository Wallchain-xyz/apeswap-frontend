import { ChainDetail } from 'state/lhd/types'

// Config can be pulled from API repo if needs to be updated
export const CHAIN_DETAILS: ChainDetail[] = [
  // EVM Compatible Chains
  {
    chainId: '1',
    chainName: 'Ethereum',
    dexscreenerId: 'ethereum',
    coingeckoId: 'ethereum',
    blockExplorer: {
      url: 'https://etherscan.io/',
      type: 'etherscan',
      testToken: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    },
    nodeUrls: [
      {
        url: 'https://ethereum.publicnode.com',
        isArchiveNode: false,
      },
      {
        url: 'https://eth.llamarpc.com',
        isArchiveNode: false,
      },
      {
        url: 'https://eth-rpc.gateway.pokt.network',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '56',
    chainName: 'BNB Chain',
    dexscreenerId: 'bsc',
    coingeckoId: 'binance-smart-chain',
    blockExplorer: {
      url: 'https://bscscan.com/',
      type: 'standard',
      testToken: '0x55d398326f99059ff775485246999027b3197955',
    },
    nodeUrls: [
      {
        url: 'https://bnb.apeswap.dev',
        isArchiveNode: true,
      },
      {
        url: 'https://bsc-dataseed.binance.org',
        isArchiveNode: false,
      },
      {
        url: 'https://bsc-dataseed3.defibit.io',
        isArchiveNode: false,
      },
      {
        url: 'https://bsc-dataseed2.ninicoin.io',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '137',
    chainName: 'Polygon',
    dexscreenerId: 'polygon',
    coingeckoId: 'polygon-pos',
    blockExplorer: {
      url: 'https://polygonscan.com/',
      type: 'standard',
      testToken: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
    },
    nodeUrls: [
      {
        url: 'https://polygon.apeswap.dev/',
        isArchiveNode: true,
      },
      {
        url: 'https://nd-612-180-351.p2pify.com/47c8945a9c47a940f53ebab964a2c585',
        isArchiveNode: true,
      },
      {
        url: 'https://polygon.llamarpc.com',
        isArchiveNode: false,
      },
      {
        url: 'https://polygon-rpc.com ',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '43114',
    chainName: 'Avalanche',
    dexscreenerId: 'avalanche',
    coingeckoId: 'avalanche',
    blockExplorer: {
      url: 'https://snowtrace.io/',
      type: 'standard',
      testToken: '0xB97EF9Ef8734C71904D8002F8b6Bc66Dd9c48a6E',
    },
    nodeUrls: [
      {
        url: 'https://rpc.ankr.com/avalanche',
        isArchiveNode: false,
      },
      {
        url: 'https://avalanche.publicnode.com',
        isArchiveNode: false,
      },
      {
        url: 'https://avalanche-evm.publicnode.com',
        isArchiveNode: false,
      },
      {
        url: 'https://avalanche.blockpi.network/v1/rpc/public',
        isArchiveNode: false,
      },
      {
        url: 'https://avalanche.public-rpc.com',
        isArchiveNode: false,
      },
      {
        url: 'https://avalanche.blockpi.network/v1/rpc/public',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '250',
    chainName: 'Fantom',
    dexscreenerId: 'fantom',
    coingeckoId: 'fantom',
    blockExplorer: {
      url: 'https://ftmscan.com/',
      type: 'standard',
      testToken: '0x04068DA6C83AFCFA0e13ba15A6696662335D5B75',
    },
    nodeUrls: [
      {
        url: 'https://rpc2.fantom.network',
        isArchiveNode: false,
      },
      {
        url: 'https://rpc.fantom.network',
        isArchiveNode: false,
      },
      {
        url: 'https://rpcapi.fantom.network',
        isArchiveNode: false,
      },
      {
        url: 'https://fantom.blockpi.network/v1/rpc/public',
        isArchiveNode: false,
      },
      {
        url: 'https://fantom-mainnet.public.blastapi.io',
        isArchiveNode: false,
      },
      {
        url: 'https://1rpc.io/ftm',
        isArchiveNode: false,
      },
      {
        url: 'https://rpc.ftm.tools',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '128',
    chainName: 'Heco',
    dexscreenerId: 'heco',
    coingeckoId: 'huobi-token',
    blockExplorer: {
      url: 'https://www.hecoinfo.com/en-us/',
      type: 'heco',
      testToken: '0xa71edc38d189767582c38a3145b5873052c3e47a',
    },
    nodeUrls: [
      {
        url: 'https://http-mainnet.hecochain.com',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '42161',
    chainName: 'Arbitrum',
    dexscreenerId: 'arbitrum',
    coingeckoId: 'arbitrum-one',
    blockExplorer: {
      url: 'https://arbiscan.io/',
      type: 'standard',
      testToken: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
    },
    nodeUrls: [
      {
        url: 'https://endpoints.omniatech.io/v1/arbitrum/one/public',
        isArchiveNode: false,
      },
      {
        url: 'https://rpc.ankr.com/arbitrum',
        isArchiveNode: false,
      },
      {
        url: 'https://arbitrum.blockpi.network/v1/rpc/public',
        isArchiveNode: false,
      },
      {
        url: 'https://arb1.arbitrum.io/rpc',
        isArchiveNode: false,
      },
      {
        url: 'https://1rpc.io/arb',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '10',
    chainName: 'Optimism',
    dexscreenerId: 'optimism',
    coingeckoId: 'optimistic-ethereum',
    blockExplorer: {
      url: 'https://optimistic.etherscan.io/',
      type: 'standard',
      testToken: '0x94b008aa00579c1307b0ef2c499ad98a8ce58e58',
    },
    nodeUrls: [
      {
        url: 'https://mainnet.optimism.io',
        isArchiveNode: false,
      },
      {
        url: 'https://endpoints.omniatech.io/v1/op/mainnet/public',
        isArchiveNode: false,
      },
      {
        url: 'https://optimism.blockpi.network/v1/rpc/public',
        isArchiveNode: false,
      },
      {
        url: 'https://optimism-mainnet.public.blastapi.io',
        isArchiveNode: false,
      },
      {
        url: 'https://1rpc.io/op',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '25',
    chainName: 'Cronos',
    dexscreenerId: 'cronos',
    coingeckoId: 'cronos',
    blockExplorer: {
      url: 'https://cronoscan.com/',
      type: 'standard',
      testToken: '0xc21223249CA28397B4B6541dfFaEcC539BfF0c59',
    },
    nodeUrls: [
      {
        url: 'https://evm.cronos.org',
        isArchiveNode: false,
      },
      {
        url: 'https://cronos.blockpi.network/v1/rpc/public',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '1313161554',
    chainName: 'Aurora',
    dexscreenerId: 'aurora',
    coingeckoId: 'aurora',
    blockExplorer: {
      url: 'https://explorer.aurora.dev/',
      type: 'blockscout',
      testToken: '0xb12bfca5a55806aaf64e99521918a4bf0fc40802',
    },
    nodeUrls: [
      {
        url: 'https://endpoints.omniatech.io/v1/aurora/mainnet/public',
        isArchiveNode: false,
      },
      {
        url: 'https://mainnet.aurora.dev',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '1285',
    chainName: 'Moonriver',
    dexscreenerId: 'moonriver',
    coingeckoId: 'moonriver',
    blockExplorer: {
      url: 'https://moonriver.moonscan.io/',
      type: 'standard',
      testToken: '0xe3f5a90f9cb311505cd691a46596599aa1a0ad7d',
    },
    nodeUrls: [
      {
        url: 'https://moonriver.public.blastapi.io',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '1284',
    chainName: 'Moonbeam',
    dexscreenerId: 'moonbeam',
    coingeckoId: 'moonbeam',
    blockExplorer: {
      url: 'https://moonbeam.moonscan.io/',
      type: 'standard',
      testToken: '0x818ec0a7fe18ff94269904fced6ae3dae6d6dc0b',
    },
    nodeUrls: [
      {
        url: 'https://rpc.ankr.com/moonbeam',
        isArchiveNode: false,
      },
      {
        url: 'https://moonbeam.public.blastapi.io',
        isArchiveNode: false,
      },
      {
        url: 'https://1rpc.io/glmr',
        isArchiveNode: false,
      },
      {
        url: 'https://moonbeam.api.onfinality.io/public',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '1088',
    chainName: 'Metis',
    dexscreenerId: 'metis',
    coingeckoId: 'metis-andromeda',
    blockExplorer: {
      url: 'https://andromeda-explorer.metis.io/',
      type: 'blockscout',
      testToken: '0xea32a96608495e54156ae48931a7c20f0dcc1a21',
    },
    nodeUrls: [
      {
        url: 'https://andromeda.metis.io/?owner=1088',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '1666600000',
    chainName: 'Harmony',
    dexscreenerId: 'harmony',
    coingeckoId: 'harmony-shard-0',
    blockExplorer: {
      url: 'https://explorer.harmony.one/',
      type: 'harmony',
      testToken: '0x985458e523db3d53125813ed68c274899e9dfab4',
    },
    nodeUrls: [
      {
        url: 'https://rpc.ankr.com/harmony',
        isArchiveNode: false,
      },
      {
        url: 'https://a.api.s0.t.hmny.io',
        isArchiveNode: false,
      },
      {
        url: 'https://harmony-0-rpc.gateway.pokt.network',
        isArchiveNode: false,
      },
      {
        url: 'https://api.s0.t.hmny.io',
        isArchiveNode: false,
      },
      {
        url: 'https://api.harmony.one',
        isArchiveNode: false,
      },
      {
        url: 'https://harmony-0-rpc.gateway.pokt.network',
        isArchiveNode: false,
      },
      {
        url: 'https://harmony-mainnet.chainstacklabs.com',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '42220',
    chainName: 'Celo',
    dexscreenerId: 'celo',
    coingeckoId: 'celo',
    blockExplorer: {
      url: 'https://celoscan.io/',
      type: 'standard',
      testToken: '0xef4229c8c3250c675f21bcefa42f58efbff6002a',
    },
    nodeUrls: [
      {
        url: 'https://rpc.ankr.com/celo',
        isArchiveNode: false,
      },
      {
        url: 'https://forno.celo.org',
        isArchiveNode: false,
      },
      {
        url: 'https://1rpc.io/celo',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '40',
    chainName: 'Telos',
    dexscreenerId: 'telos',
    coingeckoId: 'telos',
    blockExplorer: {
      url: 'https://www.teloscan.io/',
      type: 'telos',
      testToken: '0x667fd83e24ca1d935d36717d305d54fa0cac991c',
    },
    nodeUrls: [
      {
        url: 'https://mainnet.telos.net/evm',
        isArchiveNode: true,
      },
      {
        url: 'https://rpc1.eu.telos.net/evm',
        isArchiveNode: false,
      },
      {
        url: 'https://api.kainosbp.com/evm',
        isArchiveNode: false,
      },
      {
        url: 'https://rpc1.us.telos.net/evm',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '288',
    chainName: 'Boba',
    dexscreenerId: 'boba',
    coingeckoId: 'boba',
    blockExplorer: {
      url: 'https://bobascan.com/',
      type: 'standard',
      testToken: '0x66a2A913e447d6b4BF33EFbec43aAeF87890FBbc',
    },
    nodeUrls: [
      {
        url: 'https://mainnet.boba.network',
        isArchiveNode: true,
      },
      {
        url: 'https://lightning-replica.boba.network',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '100',
    chainName: 'Gnosis Chain',
    dexscreenerId: 'gnosis',
    coingeckoId: 'xdai',
    blockExplorer: {
      url: 'https://gnosisscan.io/',
      type: 'standard',
      testToken: '0xDDAfbb505ad214D7b80b1f830fcCc89B60fb7A83',
    },
    nodeUrls: [
      {
        url: 'https://rpc.gnosischain.com',
        isArchiveNode: false,
      },
      {
        url: 'https://xdai-rpc.gateway.pokt.network',
        isArchiveNode: false,
      },
      {
        url: 'https://gnosischain-rpc.gateway.pokt.network',
        isArchiveNode: false,
      },
      {
        url: 'https://xdai-rpc.gateway.pokt.network',
        isArchiveNode: false,
      },
      {
        url: 'https://rpc.gnosis.gateway.fm',
        isArchiveNode: false,
      },
      {
        url: 'https://rpc.ankr.com/gnosis',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '1116',
    chainName: 'core',
    dexscreenerId: 'core',
    coingeckoId: 'core',
    blockExplorer: {
      url: 'https://scan.coredao.org/',
      type: 'core',
      testToken: '0x9Ebab27608bD64AFf36f027049aECC69102a0D1e',
    },
    nodeUrls: [
      {
        url: 'https://rpc.coredao.org',
        isArchiveNode: false,
      },
      {
        url: 'https://rpc-core.icecreamswap.com',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '324',
    chainName: 'zkSync',
    dexscreenerId: 'zksync',
    coingeckoId: 'zksync',
    blockExplorer: {
      url: 'https://explorer.zksync.io/',
      type: 'zksync',
      testToken: '0x5AEa5775959fBC2557Cc8789bC1bf90A239D9a91',
    },
    nodeUrls: [
      {
        url: 'https://mainnet.era.zksync.io',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '592',
    chainName: 'Astar',
    dexscreenerId: 'astar',
    coingeckoId: 'astar',
    blockExplorer: {
      url: 'https://blockscout.com/astar/',
      type: 'blockscout',
      testToken: '0x6a2d262D56735DbA19Dd70682B39F6bE9a931D98',
    },
    nodeUrls: [
      {
        url: 'https://evm.astar.network',
        isArchiveNode: false,
      },
      {
        url: 'https://1rpc.io/astr',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '106',
    chainName: 'Velas',
    dexscreenerId: 'velas',
    coingeckoId: 'velas',
    blockExplorer: {
      url: 'https://evmexplorer.velas.com/',
      type: 'blockscout',
      testToken: '0xc111c29A988AE0C0087D97b33C6E6766808A3BD3',
    },
    nodeUrls: [
      {
        url: 'https://explorer.velas.com/rpc',
        isArchiveNode: false,
      },
      {
        url: 'https://evmexplorer.velas.com/rpc',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '321',
    chainName: 'Kucoin',
    dexscreenerId: 'kcc',
    coingeckoId: 'kucoin-community-chain',
    blockExplorer: {
      url: 'https://explorer.kcc.io/',
      type: 'kcc',
      testToken: '0x980a5AfEf3D17aD98635F6C5aebCBAedEd3c3430',
    },
    nodeUrls: [
      {
        url: 'https://rpc-mainnet.kcc.network',
        isArchiveNode: false,
      },
      {
        url: 'https://kcc-rpc.com',
        isArchiveNode: false,
      },
      {
        url: 'https://kcc.mytokenpocket.vip',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '10000',
    chainName: 'Smart BCH',
    dexscreenerId: 'smartbch',
    coingeckoId: 'smartbch',
    blockExplorer: {
      url: 'https://sonar.cash/',
      type: 'blockscout',
      testToken: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
    },
    nodeUrls: [
      {
        url: 'https://smartbch.greyh.at',
        isArchiveNode: false,
      },
      {
        url: 'https://smartbch.fountainhead.cash/mainnet',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '42170',
    chainName: 'Arbitrum Nova',
    dexscreenerId: 'arbitrumnova',
    coingeckoId: 'arbitrum-nova',
    blockExplorer: {
      url: 'https://nova.arbiscan.io/',
      type: 'standard',
      testToken: '0x750ba8b76187092B0D1E87E28daaf484d1b5273b',
    },
    nodeUrls: [
      {
        url: 'https://arbitrum-nova.public.blastapi.io',
        isArchiveNode: false,
      },
      {
        url: 'https://nova.arbitrum.io/rpc',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '4689',
    chainName: 'IoTeX',
    dexscreenerId: 'iotex',
    coingeckoId: 'iotex',
    blockExplorer: {
      url: 'https://iotexscout.io/',
      type: 'iotex',
      testToken: '0xacEE9B11CD4B3f57e58880277aC72c8c41ABe4e4',
    },
    nodeUrls: [
      {
        url: 'https://pokt-api.iotex.io',
        isArchiveNode: false,
      },
    ],
  },
  {
    chainId: '2222',
    chainName: 'Kava',
    dexscreenerId: 'kava',
    coingeckoId: 'kava',
    blockExplorer: {
      url: 'https://explorer.kava.io/',
      type: 'blockscout',
      testToken: '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
    },
    nodeUrls: [
      {
        url: 'https://evm.kava.io',
        isArchiveNode: false,
      },
      {
        url: 'https://evm2.kava.io',
        isArchiveNode: false,
      },
    ],
  },
]
