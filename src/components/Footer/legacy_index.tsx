// import React from "react";
// import { Link } from "theme-ui";
// // import NetworkButton from "../../widgets/Navbar/NetworkButton";
// import { FooterProps } from "./types";
// import { supportLinks, engageLinks, learnLinks } from "./config";
// import styles, {
//   FlexContainer,
//   Container,
//   PeakingMonkey,
//   PriceLink,
//   IconFlex,
//   LinkskWrapper,
//   LinkColumnFlex,
//   LogoFlex,
//   ButtonFlex,
//   StyledLink,
//   BottomRowContainer,
// } from "./styles";
// import useMatchBreakpoints from "../../hooks/useMatchBreakpoints";
// // import { ThemeSwitcher } from "../ThemeSwitcher";
// import MobileLinks from "./MobileLinks";
// // import trackClick from "../../util/trackClick";
// // import { RunFiatButton } from "../RunFiatButton";
// // import LangSelector from "../LangSelector/LangSelector";
// import { Svg, Flex, Skeleton, Text } from "components/uikit";

// // TODO: Add tracking code back
// //   trackClick(track, event, position, chainId, "discord", "https://apeswap.click/discord")

// const Footer = () => {
//   const { isXxl, isLg, isXl } = useMatchBreakpoints();
//   const isMobile = isXxl === false && isXl === false && isLg === false;
//   const position = "Footer";
//   const event = "socialClick";
//   const bananaPriceUsd = 10;
//   const t = (s: string) => null;

//   return (
//     <>
//       <Container>
//         <FlexContainer>
//           <LogoFlex>
//             <Svg icon="fullLogo" />
//             <Text color="primaryBright" size="16px">
//               {t(
//                 `ApeSwap is a multichain DeFi Hub offering an accessible, transparent, and secure experience for everyone.`
//               )}
//             </Text>
//             <ButtonFlex>
//               {/* <ThemeSwitcher toggleTheme={toggleTheme} isDark={isDark} isMini={false} /> */}
//               {/* <NetworkButton
//                 chainId={chainId}
//                 switchNetwork={switchNetwork}
//                 t={t}
//               />
//               <LangSelector
//                 currentLang={currentLang}
//                 langs={langs}
//                 setLang={setLang}
//               /> */}
//             </ButtonFlex>
//             <IconFlex>
//               <StyledLink
//                 href="https://twitter.com/ape_swap"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Svg icon="twitter" />
//               </StyledLink>
//               <StyledLink
//                 href="https://apeswap.click/discord"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Svg icon="discord" />
//               </StyledLink>
//               <StyledLink
//                 href="https://t.me/ape_swap"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Svg icon="telegram" />
//               </StyledLink>
//               <StyledLink
//                 href="https://www.reddit.com/r/Apeswap/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Svg icon="reddit" />
//               </StyledLink>
//               <StyledLink
//                 href="https://ape-swap.medium.com/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Svg icon="medium" />
//               </StyledLink>
//               <StyledLink
//                 href="https://www.instagram.com/apeswap.finance/"
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <Svg icon="instagram" />
//               </StyledLink>
//             </IconFlex>
//             <BottomRowContainer>
//               <div style={{ marginRight: "21px" }}>
//                 {bananaPriceUsd ? (
//                   <PriceLink
//                     href="https://info.apeswap.finance/token/0x603c7f932ed1fc6575303d8fb018fdcbb0f39a95"
//                     target="_blank"
//                   >
//                     {/* <ApeSwapRoundIcon width="34px" mr="8px" /> */}
//                     <Text
//                       color="primaryBright"
//                       size="18px"
//                       weight={600}
//                     >{`$${bananaPriceUsd.toFixed(3)}`}</Text>
//                   </PriceLink>
//                 ) : (
//                   <Skeleton width={90} height={35} />
//                 )}
//               </div>
//               {/* <RunFiatButton
//                 runFiat={runFiat}
//                 t={t}
//                 track={track}
//                 position={position}
//                 chainId={chainId}
//               /> */}
//             </BottomRowContainer>
//           </LogoFlex>
//           {isMobile ? (
//             <MobileLinks />
//           ) : (
//             <LinkskWrapper>
//               <LinkColumnFlex style={{ width: "200px" }}>
//                 <Text
//                   sx={{
//                     lineHeight: 1.5,
//                   }}
//                   size="22px"
//                   weight="bold"
//                   color="yellow"
//                 >
//                   {t("Support")}
//                 </Text>
//                 {supportLinks.map((link) => {
//                   return (
//                     <a
//                       href={link.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{
//                         marginTop: "15px",
//                         marginBottom: "5px",
//                       }}
//                     >
//                       <Text
//                         sx={styles.linkText}
//                         size="16px"
//                         weight={400}
//                         color="primaryBright"
//                       >
//                         {t(link.label)}
//                       </Text>
//                     </a>
//                   );
//                 })}
//               </LinkColumnFlex>
//               <LinkColumnFlex style={{ width: "240px" }}>
//                 <Text
//                   sx={{
//                     lineHeight: 1.5,
//                   }}
//                   size="22px"
//                   weight="bold"
//                   color="yellow"
//                 >
//                   {t("Engage")}
//                 </Text>
//                 {engageLinks.map((link) => {
//                   return (
//                     <a
//                       href={link.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{
//                         marginTop: "15px",
//                         marginBottom: "5px",
//                       }}
//                     >
//                       <Text
//                         sx={styles.linkText}
//                         size="16px"
//                         weight={400}
//                         color="primaryBright"
//                       >
//                         {t(link.label)}
//                       </Text>
//                     </a>
//                   );
//                 })}
//               </LinkColumnFlex>
//               <LinkColumnFlex style={{ width: "130px" }}>
//                 <Text
//                   sx={{
//                     lineHeight: 1.5,
//                   }}
//                   size="22px"
//                   weight="bold"
//                   color="yellow"
//                 >
//                   {t("Access")}
//                 </Text>
//                 {learnLinks.map((link) => {
//                   return (
//                     <a
//                       href={link.href}
//                       target="_blank"
//                       rel="noopener noreferrer"
//                       style={{
//                         marginTop: "15px",
//                         marginBottom: "5px",
//                       }}
//                     >
//                       <Text
//                         sx={styles.linkText}
//                         size="16px"
//                         weight={400}
//                         color="primaryBright"
//                       >
//                         {t(link.label)}
//                       </Text>
//                     </a>
//                   );
//                 })}
//               </LinkColumnFlex>
//             </LinkskWrapper>
//           )}
//         </FlexContainer>
//         <PeakingMonkey />
//         <Flex
//           sx={{
//             position: "absolute",
//             flexDirection: "column",
//             bottom: "10px",
//             alignitems: "center",
//             justifyContent: "center",
//             height: "fit-content",
//             width: "fit-content",
//             left: ["10px", "auto"],
//           }}
//         >
//           <Text color="primaryBright">{t("©2022 All rights reserved")}</Text>
//           <Flex
//             sx={{
//               alignitems: "center",
//               width: "150px",
//               justifyContent: "center",
//             }}
//           >
//             <Link href="https://apeswap.finance/terms" target="_blank">
//               <Text size="12px" color="primaryBright" sx={styles.linkText}>
//                 Terms
//               </Text>
//             </Link>
//             <Text size="12px" color="primaryBright" margin="0px 10px">
//               {" "}
//               |{" "}
//             </Text>
//             <Link href="https://apeswap.finance/privacy" target="_blank">
//               <Text size="12px" color="primaryBright" sx={styles.linkText}>
//                 Privacy Policy
//               </Text>
//             </Link>
//           </Flex>
//         </Flex>
//       </Container>
//     </>
//   );
// };

// export default Footer;

export const Legacy = () => {
  return null;
};
