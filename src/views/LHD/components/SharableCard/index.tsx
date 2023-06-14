import React, { useRef,useEffect, useState }from 'react'
import { Flex, Modal, Button, Text, Svg } from 'components/uikit'
import { TokenAddress } from '../../../../state/lhd/types'
import ChainsIcons from '../FullProfile/components/ChainsIcons'
import Image from 'next/image'
import Token from './components/Token'
import Bar from './components/Bar'
import { Bronze,Silver,Gold,Diamond } from './components/assets/Background'
import { renderToStaticMarkup } from 'react-dom/server';
import { getColor } from 'views/LHD/utils/getColor'
import { FullLogo } from 'components/uikit/Svg/Icons'
import domtoimage from 'dom-to-image';




const modalProps = {
  // sample styles for the modal. This are not checked at all so feel 100% free to change them
  sx: {
    // overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    height:'fit-contnet',
    // minWidth: 'unset',
    width: ['90%'],
    '@media screen and (min-width: 1180px)': {
      maxWidth: '800px',
    },
    maxWidth: '800px',
  },
  title:"Liquidity Health Card",
  
}


interface SharableCardProps {
  tokenSymbol?: string
  tokenImageURL?: string
  totalScore?: number
  healthScore?: number
  concentrationScore?: number
  ownershipScore?: number
  tokenAddresses?: TokenAddress[]
}

const SharableCard = ({
  tokenSymbol,
  tokenImageURL,
  totalScore,
  healthScore,
  concentrationScore,
  ownershipScore,
  tokenAddresses,
}: SharableCardProps) => {
  //put logic and functions here, feel free to create folders and new files within the SharableCard directory
  



  
  const handleShareClick = () => {
    share();
  };
  

  const handleDownloadClick = () => {
    download();
  };
  
  function download() {
    const card = document.getElementById("card");
  
    if (!card) {
      console.error("No se pudo encontrar el elemento card.");
      return;
    }
  
    const maxWidth = 1000; // Ancho máximo deseado
    const cardWidth = card.offsetWidth;
    const scaleFactor = maxWidth / cardWidth;
    const canvasWidth = cardWidth * scaleFactor;
    const canvasHeight = card.offsetHeight * scaleFactor;
  
    const options = {
      width: canvasWidth,
      height: canvasHeight,
      style: {
        backgroundColor: "transparent",
        overflow: "visible",
        transform: `scale(${scaleFactor})`,
        transformOrigin: "top left"
      }
    };
  
    domtoimage
      .toPng(card, options)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${tokenSymbol}-${nameDate}.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error("Error al convertir a PNG:", error);
      });
  }
  

  function share() {
    // const card = document.getElementById('card') ?? {} as HTMLElement;
    if (navigator.share) {
      navigator
        .share({
          title: "ApeSwap's Liquidity Health Dashboard",
          text: `Hey, have you seen the liquidity health of ${tokenSymbol} on ApeSwap? Check it out here!`,
          url: tokenAddresses && tokenAddresses[0] ? `/liquidity-health/56/${tokenAddresses[0].address}` : 'Apeswap.Finance/liquidity-health/'

        })
        .then(() => console.log('Shared'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      const text = `Hey, have you seen the liquidity health of $${tokenSymbol} on @ApeSwap? Check it out here!`;
      const url = tokenAddresses && tokenAddresses[0] ? `Apeswap.Finance/liquidity-health/56/${tokenAddresses[0].address}` : 'Apeswap.Finance/liquidity-health/';
      
      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
      window.open(twitterUrl, '_blank', 'width=696,height=420');
    }
    
  }

  const [containerWidth, setContainerWidth] = useState(0);
  const [cardHeight, setCardHeigth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const cardElement = document.getElementById("cardContainer");
      setContainerWidth(document.getElementById("container")?.clientWidth ?? 0);
      setCardHeigth(cardElement?.clientWidth ?? 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  const maxContainerWidth = 760;
  const maxCardHeight = 400;
  const scaleRatio = containerWidth / maxContainerWidth;
  const heightRatio = (cardHeight * maxCardHeight) / maxContainerWidth;

  const today = new Date();
  const day = today.getDate().toString().padStart(2, '0');
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const year = today.getFullYear();
  
  const formattedDate = `${day} - ${month} - ${year}`;
  const nameDate = `${day}-${month}-${year}`;

    const score = Math.round((totalScore || 0) * 100);
    const color = score <= 40 ? 'white' : 'black';

  return (

    <Modal {...modalProps}
    // prope acá y es lo mismo 
    hideDivider
    >
      <Flex
      id="cardContainer"
      sx={{
        alignItems:'center',
        justifyContent:'center',
        display:'flex',
        overflowX: 'hidden',
        flexDirection:'column',
      }}>

      <Flex 
      sx={{
        display:'block',
        position:'relative',
        borderRadius:'5px',
        overflow: 'hidden',
        height:heightRatio,
        '@media screen and (max-width: 780px)': {
          mb:'20px',
          },

      }}>
      <Flex id='card'sx={{
        overflow:'hidden',
        transformOrigin: 'top',
        transform: `scale(${scaleRatio})`,
        borderRadius:'5px', 
        }}>
        <Flex sx={{ 
          position:'absolute',
          mt:'3.4%',
          ml:'18.5%',
          scale: '2.4',
          }}>
          <ChainsIcons tokenAddresses={tokenAddresses}/>
        </Flex>

          <Flex>
          {score <= 40 ? <Bronze sx={{width: '760px',height: '400px', overflow:'hidden', borderRadius:'5px',}} /> : 
          score <= 75 ? <Silver sx={{width: '760px',height: '400px', overflow:'hidden', borderRadius:'5px',}} /> : 
          score <= 90 ? <Gold sx={{width: '760px',height: '400px', overflow:'hidden', borderRadius:'5px',}}/> : 
          <Diamond sx={{width: '760px',height: '400px', overflow:'hidden', borderRadius:'5px',}}/> }
          </Flex>
    
          <Flex
            sx={{ 
              position:'absolute',
              display:'block', 
              width: '760px',
              height: '400px',
              // background:'rgba(0, 0, 0,  0.5)'
            }}
           >
        <Flex sx={{ 
          position:'absolute',
          flexDirection:'row-reverse',
          justfyContent:'center',
          alignItems:'center',
          width:'180px',
          ml:'calc(100% - 245px)',
          mt:'70px',
          // background:'rgba(0,0,0,0.2)'
        }}>

          <Text
          sx={{ 
            // width:'80px',
            fontSize:'4.7em',
            fontWeight:'800',
            pl:'10px',
            mt:'1px',
            color: getColor(Math.round((totalScore || 0) * 100)),
          }}>
            {score}
          </Text>
          <Text
          sx={{ 
            fontSize:'1.1em',
            fontWeight:'600',
            // width:'10%',
            textAlign:'right',
            // mt:'15px',
            // mr:'10px',
            lineHeight:'18px',
            color:color,
            width:'100px',
          }}
          >LIQUIDITY HEALTH SCORE</Text>
        </Flex>

        {/* Center */}
       
         <Flex
         sx={{
          justifyContent:'space-between',
          alignItems:'center',
          margin:'0 34px',
          mt:'130px',
          mb:'30px',
         }}
         >
          <Token 
            imageUrl={tokenImageURL ?? ""} 
            score={totalScore} 
            tokenSymbol={tokenSymbol} 
          />
        {/* Bars */}
        <Flex
        sx={{
          width:'420px',
          flexDirection:'column',
          justifyContent:'space-between',
          mb:'10px',
          mr:'25px',
          height:'100px',
          // background:'rgba(0, 0, 0,  0.1)'
          
        }}
        >

        <Bar
          property = "STRENGTH "
          value = {healthScore}
          color = {color}
        />
        <Bar
          property = "OWNERSHIP"
          value = {ownershipScore}
          color = {color}
        />
        <Bar
          property = "CONCENTRATION"
          value = {concentrationScore}
          color = {color}
        />
        </Flex>
        
        </Flex>

        {/* APE LOGO */}
        <Flex sx={{
          // mt:'-42px',
          ml:'312px',
          position:'absolute',
        }}>
          <Svg icon="fullLogo" width="135px" />
        </Flex>

        {/* Bottom Text */}
        <Flex sx={{
          justifyContent:'space-between',
          padding: '0 60px',
          marginTop:'76px',
        }}>
          <Text sx={{  color:color, fontSize:'12px', width:'120px', textAlign:'left'}}>EQ-1</Text>
          <Text sx={{ color:color, fontSize:'12px', width:'120px', textAlign:'center'}}>apeswap.click/LHD</Text>
          <Text sx={{ color:color, fontSize:'12px', width:'120px', textAlign:'right'}}>{formattedDate}</Text>
        </Flex>
      </Flex>
      </Flex>

      </Flex>
       <Flex id="container" sx={{width: '100%',height: 0,maxWidth: '760px',}}/>
        
      {/* <Button onClick={handleShareClick}>Share on Twitter</Button> */}
      <Flex
      sx={{
        width: '100%',
        justifyContent:'space-between',
        '@media screen and (max-width: 780px)': {
        flexDirection:'column'
        },
      }}
      >
      <Button sx={{
        m:'20px 0 0',
        width: '49%',
        '@media screen and (max-width: 780px)': {
          width: '100%',
          m:'0px',
        },
      }} onClick={handleDownloadClick}>Download Image</Button>
      <Button sx={{
        m:'20px 0 0',
        width: '49%',
        '@media screen and (max-width: 780px)': {
          width: '100%',
        m:'0px',
        mt:'15px'
        },
        }} onClick={handleShareClick}>Share</Button>
      </Flex>
      </Flex>
    </Modal>
  )
  
}

export default SharableCard
