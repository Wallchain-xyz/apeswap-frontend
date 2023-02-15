import { useWeb3React } from '@web3-react/core'
import ConnectWalletButton from 'components/ConnectWallet'
import { Currency, Percent, TradeType } from '@ape.swap/sdk-core'
import { SignatureData } from 'hooks/useERC20Permit'
import { InterfaceTrade } from 'state/routing/types'
import Swap from './Swap'

const Actions = ({
  trade,
  allowedSlippage,
  signatureData,
  recipient,
  stablecoinPriceImpact,
}: {
  trade: InterfaceTrade<Currency, Currency, TradeType> | undefined
  allowedSlippage: Percent
  signatureData: SignatureData | null
  recipient: string | null
  stablecoinPriceImpact: Percent | null
}) => {
  const { account } = useWeb3React()
  return !account ? (
    <ConnectWalletButton />
  ) : (
    <Swap
      trade={trade}
      allowedSlippage={allowedSlippage}
      signatureData={signatureData}
      recipient={recipient}
      stablecoinPriceImpact={stablecoinPriceImpact}
    />
  )
}

export default Actions
