export interface ObieDoesntUnderstandRoutes {
  status: 'success' | 'pending' | 'failed'
  fromToken: string
  fromChain: number
  fromAmount: string
  fromAmountUsd: string
  toToken: string
  toChain: number
  toAmount: string
  toAmountUsd: string
  date: string
  time: string
  txHash: string
}

export const DUMMY_ROUTES: ObieDoesntUnderstandRoutes[] = [
  {
    status: 'pending',
    fromToken: 'BANANA',
    fromChain: 137,
    fromAmount: '1000',
    fromAmountUsd: '200',
    toToken: 'BNB',
    toAmount: '210',
    toAmountUsd: '100',
    toChain: 56,
    date: 'July 31st, 2023',
    time: '22:00 UTC',
    txHash: '0x3e84b125619d021dbed0b2cc49fa148072d8629c02cabc08f23c7bea316ea875',
  },
  {
    status: 'success',
    fromToken: 'ETH',
    fromChain: 1,
    fromAmount: '0.1',
    fromAmountUsd: '190',
    toAmount: '0.6',
    toAmountUsd: '185',
    toToken: 'BNB',
    toChain: 56,
    date: 'August 2nd, 2023',
    time: '12:00 UTC',
    txHash: '0xf31f7577367b57aebca37fe593f0df8566b2269774716fc24a5d6d47961027a2',
  },
  {
    status: 'success',
    fromToken: 'BANANA',
    fromChain: 137,
    fromAmount: '1000',
    fromAmountUsd: '200',
    toToken: 'BNB',
    toAmount: '210',
    toAmountUsd: '100',
    toChain: 56,
    date: 'July 31st, 2023',
    time: '22:00 UTC',
    txHash: '0x3e84b125619d021dbed0b2cc49fa148072d8629c02cabc08f23c7bea316ea875',
  },
  {
    status: 'failed',
    fromToken: 'ETH',
    fromChain: 1,
    fromAmount: '0.1',
    fromAmountUsd: '190',
    toAmount: '0.6',
    toAmountUsd: '185',
    toToken: 'BNB',
    toChain: 56,
    date: 'August 2nd, 2023',
    time: '12:00 UTC',
    txHash: '0xf31f7577367b57aebca37fe593f0df8566b2269774716fc24a5d6d47961027a2',
  },
]

export const DUMMY_ROUTES_EMPTY: ObieDoesntUnderstandRoutes[] = []
