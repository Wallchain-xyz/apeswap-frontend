import React from "react";
import { SvgProps, icons, iconTypes } from "./types";
import { dynamicStyles } from "./styles";
import {
  Caret,
  External,
  Home,
  Calculator,
  Farm,
  Frame,
  Gnana,
  Info,
  More,
  NFA,
  Pool,
  Rocket,
  Trade,
  Vault,
  Ellipse,
  Twitter,
  Send,
  Error,
  Close,
  Collapse,
  TextLogo,
  ProfileLight,
  ProfileDark,
  ProfileIcon,
  Logo,
  Hamburger,
  Search,
  Question,
  Success,
  Settings,
  Chart,
  Discord,
  Reddit,
  Medium,
  Instagram,
  Website,
  Arrow,
  SwapArrows,
  InfoSolid,
  SuccessOutline,
  Trash,
  Cancelled,
  ZapArrow,
  ZapIcon,
  Migrate,
  Message,
  Positions,
  MenuSettings,
  Fav,
  FullLogo,
  Telegram,
  Island,
  Moon,
} from "./Icons";
import { BSC, BANANA, BNB, ETH, GNANA, POLYGON, TLOS } from "./tokens";
import {
  BinanceChain,
  Bitkeep,
  Brave,
  Coinbase,
  MathWallet,
  Metamask,
  Nabox,
  OntoWallet,
  SafePalWallet,
  SocialLogin,
  TokenPocket,
  TorusWallet,
  TrustWallet,
  Unstoppable,
  WalletConnect,
} from "./walletIcons";
import { IconStyles } from "./Icons/types";

const Svg = ({ icon, ...props }: any) => {
  const getStyles = ({ degree, color, margin }: IconStyles) =>
    dynamicStyles.generic({
      degree,
      color,
      margin,
    });
  if (icon === icons.SUCCESS_OUTLINE) {
    return <SuccessOutline {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TRASH) {
    return <Trash {...props} getStyles={getStyles} />;
  }
  if (icon === icons.CANCELLED) {
    return <Cancelled {...props} getStyles={getStyles} />;
  }
  if (icon === icons.INFO_SOLID) {
    return <InfoSolid {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ARROW) {
    return <Arrow {...props} getStyles={getStyles} />;
  }
  if (icon === icons.SWAP_ARROWS) {
    return <SwapArrows {...props} getStyles={getStyles} />;
  }
  if (icon === icons.CARET) {
    return <Caret {...props} getStyles={getStyles} />;
  }
  if (icon === icons.WEBSITE) {
    return <Website {...props} getStyles={getStyles} />;
  }
  if (icon === icons.EXTERNAL) {
    return <External {...props} getStyles={getStyles} />;
  }
  if (icon === icons.HOME) {
    return <Home {...props} getStyles={getStyles} />;
  }
  if (icon === icons.CALCULATOR) {
    return <Calculator {...props} getStyles={getStyles} />;
  }
  if (icon === icons.FARM) {
    return <Farm {...props} getStyles={getStyles} />;
  }
  if (icon === icons.FRAME) {
    return <Frame {...props} getStyles={getStyles} />;
  }
  if (icon === icons.GNANA) {
    return <Gnana {...props} getStyles={getStyles} />;
  }
  if (icon === icons.INFO) {
    return <Info {...props} getStyles={getStyles} />;
  }
  if (icon === icons.MORE) {
    return <More {...props} getStyles={getStyles} />;
  }
  if (icon === icons.NFA) {
    return <NFA {...props} getStyles={getStyles} />;
  }
  if (icon === icons.POOL) {
    return <Pool {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ROCKET) {
    return <Rocket {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TRADE) {
    return <Trade {...props} getStyles={getStyles} />;
  }
  if (icon === icons.VAULT) {
    return <Vault {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ELLIPSE) {
    return <Ellipse {...props} getStyles={getStyles} />;
  }
  if (icon === icons.COLLAPSE) {
    return <Collapse {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TEXTLOGO) {
    return <TextLogo {...props} getStyles={getStyles} />;
  }
  if (icon === icons.PROFILELIGHT) {
    return <ProfileLight {...props} getStyles={getStyles} />;
  }
  if (icon === icons.PROFILEDARK) {
    return <ProfileDark {...props} getStyles={getStyles} />;
  }
  if (icon === icons.PROFILEICON) {
    return <ProfileIcon {...props} getStyles={getStyles} />;
  }
  if (icon === icons.LOGO) {
    return <Logo {...props} getStyles={getStyles} />;
  }
  if (icon === icons.HAMBURGER) {
    return <Hamburger {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TWITTER) {
    return <Twitter {...props} getStyles={getStyles} />;
  }
  if (icon === icons.SEND) {
    return <Send {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ERROR) {
    return <Error {...props} getStyles={getStyles} />;
  }
  if (icon === icons.CLOSE) {
    return <Close {...props} getStyles={getStyles} />;
  }
  if (icon === icons.SEARCH) {
    return <Search {...props} getStyles={getStyles} />;
  }
  if (icon === icons.SUCCESS) {
    return <Success {...props} getStyles={getStyles} />;
  }
  if (icon === icons.QUESTION) {
    return <Question {...props} getStyles={getStyles} />;
  }
  if (icon === icons.SETTINGS) {
    return <Settings {...props} getStyles={getStyles} />;
  }
  if (icon === icons.CHART) {
    return <Chart {...props} getStyles={getStyles} />;
  }
  if (icon === icons.BNB_TOKEN) {
    return <BNB {...props} getStyles={getStyles} />;
  }
  if (icon === icons.BANANA_TOKEN) {
    return <BANANA {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ETH_TOKEN) {
    return <ETH {...props} getStyles={getStyles} />;
  }
  if (icon === icons.GNANA_TOKEN) {
    return <GNANA {...props} getStyles={getStyles} />;
  }
  if (icon === icons.POLYGON_TOKEN) {
    return <POLYGON {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TLOS_TOKEN) {
    return <TLOS {...props} getStyles={getStyles} />;
  }
  if (icon === icons.BSC_TOKEN) {
    return <BSC {...props} getStyles={getStyles} />;
  }
  if (icon === icons.DISCORD) {
    return <Discord {...props} getStyles={getStyles} />;
  }
  if (icon === icons.REDDIT) {
    return <Reddit {...props} getStyles={getStyles} />;
  }
  if (icon === icons.MEDIUM) {
    return <Medium {...props} getStyles={getStyles} />;
  }
  if (icon === icons.INSTAGRAM) {
    return <Instagram {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ZAP_ICON) {
    return <ZapIcon {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ZAP_ARROW) {
    return <ZapArrow {...props} getStyles={getStyles} color="white" />;
  }
  if (icon === icons.MIGRATE) {
    return <Migrate {...props} getStyles={getStyles} />;
  }
  if (icon === icons.MESSAGE) {
    return <Message {...props} getStyles={getStyles} />;
  }
  if (icon === icons.POSITIONS) {
    return <Positions {...props} getStyles={getStyles} />;
  }
  if (icon === icons.MENU_SETTINGS) {
    return <MenuSettings {...props} getStyles={getStyles} />;
  }
  if (icon === icons.FAV) {
    return <Fav {...props} getStyles={getStyles} />;
  }
  if (icon === icons.FULL_LOGO) {
    return <FullLogo {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TELEGRAM) {
    return <Telegram {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ISLAND) {
    return <Island {...props} getStyles={getStyles} />;
  }
  if (icon === icons.MOON) {
    return <Moon {...props} getStyles={getStyles} />;
  }

  // Wallet Icons
  if (icon === icons.BINANCE_CHAIN) {
    return <BinanceChain {...props} getStyles={getStyles} />;
  }
  if (icon === icons.BITKEEP) {
    return <Bitkeep {...props} getStyles={getStyles} />;
  }
  if (icon === icons.BRAVE) {
    return <Brave {...props} getStyles={getStyles} />;
  }
  if (icon === icons.COINBASE) {
    return <Coinbase {...props} getStyles={getStyles} />;
  }
  if (icon === icons.MATH_WALLET) {
    return <MathWallet {...props} getStyles={getStyles} />;
  }
  if (icon === icons.METAMASK) {
    return <Metamask {...props} getStyles={getStyles} />;
  }
  if (icon === icons.NABOX) {
    return <Nabox {...props} getStyles={getStyles} />;
  }
  if (icon === icons.ONTO_WALLET) {
    return <OntoWallet {...props} getStyles={getStyles} />;
  }
  if (icon === icons.SAFE_PAL_WALLET) {
    return <SafePalWallet {...props} getStyles={getStyles} />;
  }
  if (icon === icons.SOCIAL_LOGIN) {
    return <SocialLogin {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TOKEN_POCKET) {
    return <TokenPocket {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TORUS_WALLET) {
    return <TorusWallet {...props} getStyles={getStyles} />;
  }
  if (icon === icons.TRUST_WALLET) {
    return <TrustWallet {...props} getStyles={getStyles} />;
  }
  if (icon === icons.UNSTOPPABLE) {
    return <Unstoppable {...props} getStyles={getStyles} />;
  }
  if (icon === icons.WALLET_CONNECT) {
    return <WalletConnect {...props} getStyles={getStyles} />;
  }
  return null;
};

export default Svg;
