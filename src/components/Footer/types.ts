// import { TrackHandler } from "../../util/trackClick";
// import { Language } from "../LangSelector/types";

export interface FooterProps {
  chainId: number;
  toggleTheme: (isDark: boolean) => void;
  switchNetwork: (chainId: number) => void;
  isDark: boolean;
  bananaPriceUsd?: number;
  track?: any;
  currentLang: string;
  langs: any[];
  setLang: (lang: any) => void;
  t: (text: string) => string;
  runFiat: () => void;
}

export interface PushedProps {
  isPushed: boolean;
  pushNav: (isPushed: boolean) => void;
}
