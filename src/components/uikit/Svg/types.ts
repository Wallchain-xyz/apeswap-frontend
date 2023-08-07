import { colorProps } from 'theme/types'

export enum icons {
  CARET = 'caret',
  EXTERNAL = 'external',
  HOME = 'home',
  CALCULATOR = 'calculator',
  FARM = 'farm',
  FRAME = 'frame',
  GNANA = 'gnana',
  INFO = 'info',
  MORE = 'more',
  NFA = 'nfa',
  POOL = 'pool',
  ROCKET = 'rocket',
  TRADE = 'trade',
  VAULT = 'vault',
  ELLIPSE = 'ellipse',
  TWITTER = 'twitter',
  SEND = 'send',
  ERROR = 'error',
  CLOSE = 'close',
  COLLAPSE = 'collapse',
  TEXTLOGO = 'textLogo',
  PROFILELIGHT = 'profileLight',
  PROFILEDARK = 'profileDark',
  PROFILEICON = 'profileIcon',
  LOGO = 'logo',
  HAMBURGER = 'hamburger',
  SEARCH = 'search',
  SUCCESS = 'success',
  QUESTION = 'question',
  SETTINGS = 'settings',
  CHART = 'chart',
  BNB_TOKEN = 'bnb_token',
  BANANA_TOKEN = 'banana_token',
  ETH_TOKEN = 'eth_token',
  GNANA_TOKEN = 'gnana_token',
  POLYGON_TOKEN = 'polygon_token',
  TLOS_TOKEN = 'tlos_token',
  BSC_TOKEN = 'bsc_token',
  ARBITRUM_TOKEN = 'arbitrum_token',
  AVAX_TOKEN = 'avax_token',
  OPTIMISM_TOKEN = 'optimism_token',
  FANTOM_TOKEN = 'fantom_token',
  CRONOS_TOKEN = 'cronos_token',
  POLYGONZK_TOKEN = 'polygonzk_token',
  CELO_TOKEN = 'celo_token',
  GNOSIS_TOKEN = 'gnosis_token',
  OKX_TOKEN = 'okx_token',
  DISCORD = 'discord',
  REDDIT = 'reddit',
  MEDIUM = 'medium',
  INSTAGRAM = 'instagram',
  WEBSITE = 'website',
  TELEGRAM = 'telegram',
  ARROW = 'arrow',
  SWAP_ARROWS = 'swapArrows',
  INFO_SOLID = 'infoSolid',
  CANCELLED = 'cancelled',
  SUCCESS_OUTLINE = 'successOutline',
  TRASH = 'trash',
  ZAP_ARROW = 'ZapArrow',
  ZAP_ICON = 'ZapIcon',
  MIGRATE = 'Migrate',
  MESSAGE = 'message',
  POSITIONS = 'Positions',
  MENU_SETTINGS = 'MenuSettings',
  FAV = 'Fav',
  FULL_LOGO = 'fullLogo',
  ISLAND = 'island',
  MOON = 'moon',
  CARD = 'card',
  ACCOUNT_MONKEY = 'accountMonkey',
  LANGUAGE_ICON = 'languageIcon',
  BINANCE_CHAIN = 'binanceChain',
  BITKEEP = 'bitkeep',
  BRAVE = 'brave',
  COINBASE = 'coinbase',
  MATH_WALLET = 'mathWallet',
  METAMASK = 'metamask',
  NABOX = 'nabox',
  ONTO_WALLET = 'ontoWallet',
  SAFE_PAL_WALLET = 'safePalWallet',
  SOCIAL_LOGIN = 'socialLogin',
  TOKEN_POCKET = 'tokenPocket',
  TORUS_WALLET = 'torusWallet',
  TRUST_WALLET = 'trustWallet',
  OKX = 'okx',
  MAD_WALLET = 'madWallet',
  UNSTOPPABLE = 'unstoppable',
  WALLET_CONNECT = 'walletConnect',
  WALLET_IMAGE = 'walletImage',
  COG = 'cog',
  BRIDGE = 'bridge',
  DOCS = 'docs',
  QUIZ = 'quiz',
  PLACEHOLDER_MONKEY = 'placeholderMonkey',
  SWITCH_ARROWS = 'switchArrows',
  COPY = 'copy',
  HAMBURGER_CLOSED = 'hamburgerClosed',
  BILLS_M1 = 'billsM1',
  BILLS_M2 = 'billsM2',
  BILLS_M3 = 'billsM3',
  URL = 'URL',
  BUBBLE = 'bubble',
  AUDIT = 'audit',
  GREEN_SHIELD = 'greenShield',
  CHAIN = 'chain',
  VERIFIED = 'verified',
  TICK_SHIELD = 'tickShield',
  SHARE = 'share',
  FILLED_URL = 'filledURL',
  YELLOW_QUESTION = 'yellowQuestion',
  BANANA_ICON = 'bananaIcon',
  SCROLL_TOP = 'scrollTop',
  EXPLORER = 'explorer',
  LIQUIDITY_ICON = 'liquidity',
  POLYGON_NEW = 'polygonNew',
  FIRE = 'fire',
  NAV_CARET = 'navCaret',
  LOGOUT = 'logout',
  WALLET = 'wallet',
  RECEIPT = 'receipt',
}

export enum directions {
  LEFT = 'left',
  RIGHT = 'right',
  UP = 'up',
  DOWN = 'down',
}

export type iconTypes = `${icons}`
type directionTypes = `${directions}`

export interface SvgProps {
  icon?: iconTypes
  direction?: directionTypes
  color?: colorProps
  width?: string | number
  height?: string | number
  spin?: boolean
  margin?: string
}
