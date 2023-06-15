import Icon from './Icon'

export const icons: { [key: string]: JSX.Element } = {
  '1': <Icon chain={'1'} />, //eth
  '56': <Icon chain={'56'} />, //bsc
  '137': <Icon chain={'137'} />, //matic
  '40': <Icon chain={'40'} />, //telos
  '42161': <Icon chain={'42161'} />, //arbitrum
  '250': <Icon chain={'250'} />, //fantom
  '43114': <Icon chain={'43114'} />, //avalanche
  '128': <Icon chain={'128'} />, //heco
  '10': <Icon chain={'10'} />, //optimism
  '25': <Icon chain={'25'} />, // cronos
  '1285': <Icon chain={'1285'} />, // moonriver
  '1284': <Icon chain={'1284'} />, // moonbeam
  '1088': <Icon chain={'1088'} />, // metis
  '1666600000': <Icon chain={'1666600000'} color="black" />, // harmony
  '42220': <Icon chain={'42220'} />, // celo
  '288': <Icon chain={'288'} color="black" />, // boba
  '100': <Icon chain={'100'} />, // xdai

  // All have 10 or less related assets, not adding icons for now
  // '324': <></>, // zksync
  // '592': <></>, // astar
  // '106': <></>, // velas
  // '321': <></>, // kcc
  // '10000': <></>, // smart bch
  // '42170': <></>, // arbitrum nova
  // '1116': <></>, // core
  // '2222': <></>, //Kava
  // '4689': <></>, // IoTeX
}
