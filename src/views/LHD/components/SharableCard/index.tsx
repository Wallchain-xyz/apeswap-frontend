import React, { useRef,useEffect, useState }from 'react'
import { Flex, Modal, Button, Text, Svg } from 'components/uikit'
import { TokenAddress } from '../../../../state/lhd/types'
import ChainsIcons from '../FullProfile/components/ChainsIcons'
import Image from 'next/image'
import Token from './components/Token'
import Bar from './components/Bar'
import html2canvas from 'html2canvas';
import { Bronze,Silver,Gold,Diamond } from './components/assets/Background'
import { renderToStaticMarkup } from 'react-dom/server';
import { getColor } from 'views/LHD/utils/getColor'
import { FullLogo } from 'components/uikit/Svg/Icons'
import domtoimage from 'dom-to-image';

import rasterizeHTML from 'rasterizehtml';

import htmlToImage from 'html-to-image';




const modalProps = {
  // sample styles for the modal. This are not checked at all so feel 100% free to change them
  sx: {
    overflowY: 'auto',
    maxHeight: 'calc(100% - 30px)',
    height:'fit-contnet',
    minWidth: 'unset',
    width: ['90%'],
    '@media screen and (min-width: 1180px)': {
      maxWidth: '10 00px',
    },
    maxWidth: '10 00px',
    alignItems:'center',
    justifyContent:'center',
    display:'flex',
    flexDirection:'column',
    overflowX: 'hidden',
  },
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
    const card = document.getElementById('card');
    
    if (card) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
  
        rasterizeHTML.drawHTML(card.innerHTML, canvas)
        .then(() => {
            const link = document.createElement('a');
            link.download = 'card2.png';
            link.href = canvas.toDataURL('image/png');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch((error) => console.error('Error rasterizing HTML: ', error));
    }
}


  // function download() {
  //   const card = document.getElementById('card') ?? {} as HTMLElement;
  //   html2canvas(card, {
  //     allowTaint: true, //Allow using images from other sources
  //     //  taintTest: false,
  //       useCORS: true,
  //       backgroundColor: null, 
  //     //  scale:2,
  //                 }).then(function (canvas) {
  //     const link = document.createElement('a');
  //     link.download = 'card2.png';
  //     link.href = canvas.toDataURL('image/png');
  //     link.click();
  //   });
    
  // }

  // function download() {
  //   const card = document.getElementById('card') ?? {} as HTMLElement;
  
  //   domtoimage.toPng(card, {
  //     style: {
  //       backgroundColor: 'transparent',
  //       // transform: 'scale(2)', // scale content
  //     },
  //   })
  //     .then((dataUrl) => {
  //       const link = document.createElement('a');
  //       link.download = 'card2.png';
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((error) => {
  //       // console.error('Error al convertir a PNG:', error);
  //     });
  // }  
 
  // function download() {
  //   const card = document.getElementById("card") ?? ({} as HTMLElement);
  //   card.style.borderRadius = "40px";
  //   card.style.overflow = "hidden";

  //   domtoimage
  //     .toPng(card, {
  //       style: {
  //         backgroundColor: "transparent",
  //         // transform: 'scale(2)', // scale content
  //       },
  //     })
  //     .then((dataUrl) => {
  //       const link = document.createElement("a");
  //       link.download = "card2.png";
  //       link.href = dataUrl;
  //       link.click();
  //     })
  //     .catch((error) => {
  //       // console.error('Error al convertir a PNG:', error);
  //     });
  // }
  
  
//   function download() {
//   const card = document.getElementById("card") ?? ({} as HTMLElement);
//   // card.style.borderRadius = "40px";
//   // card.style.overflow = "hidden";

//   const scaleFactor = 2; // Ajusta este valor para cambiar el tamaño de la imagen exportada

//   domtoimage
//     .toPng(card, {
//       style: {
//         backgroundColor: "transparent",
//         transform: `scale(${scaleFactor})`,
//         transformOrigin: "top left",
//         // borderRadius: "40px",
//         // overflow: "hidden",
//       },
//       width: card.clientWidth * scaleFactor,
//       height: card.clientHeight * scaleFactor,
//     })
//     .then((dataUrl) => {
//       const link = document.createElement("a");
//       link.download = `${tokenSymbol} ${nameDate}.png`;
//       link.href = dataUrl;
//       link.click();
//     })
//     .catch((error) => {
//       // console.error('Error al convertir a PNG:', error);
//     });
// }


  
  

  function share() {
    const card = document.getElementById('card') ?? {} as HTMLElement;
    if (navigator.share) {
      navigator
        .share({
          title: 'Custom Title',
          text: 'Custom Text',
          url: 'Apeswap.com/lhd?{TOKEN}',
        })
        .then(() => console.log('Shared'))
        .catch((error) => console.log('Error sharing', error));
    } else {
      console.log('Web Share is not Avaliable in this browser');
    }
  }




  // const containerRef = useRef<HTMLDivElement>(null);
  // const xValueRef = useRef<number>(1);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (containerRef.current) {
  //       const containerWidth = containerRef.current.clientWidth;
  //       xValueRef.current = containerWidth / 600; // Regla de tres
  //       console.log('X value:', xValueRef.current);
  //     }
  //   };

  //   if (containerRef.current) {
  //     handleResize();
  //     window.addEventListener('resize', handleResize);
  //   }
  //   return () => window.removeEventListener('resize', handleResize);
  // }, [containerRef]);










  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      // setContainerWidth(document.getElementById("container").clientWidth);
      setContainerWidth(document.getElementById("container")?.clientWidth ?? 0);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxContainerWidth = 760; // valor máximo permitido para el ancho de "container"
  const scaleRatio = containerWidth / maxContainerWidth;
  console.log(scaleRatio);

  const today = new Date(); // Crear objeto de fecha actual
  const day = today.getDate().toString().padStart(2, '0'); // Obtener día y rellenar con ceros a la izquierda si es necesario
  const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Obtener mes (los meses comienzan en 0, por lo que se suma 1) y rellenar con ceros a la izquierda si es necesario
  const year = today.getFullYear(); // Obtener año
  
  const formattedDate = `${day} - ${month} - ${year}`; // Concatenar los valores con los separadores deseados
  const nameDate = `${day}-${month}-${year}`; // Concatenar los valores con los separadores deseados
  
  // console.log(formattedDate); // Mostrar la fecha formateada en la consola
  





  // const background = 
  //   Math.round((totalScore || 0) * 100) <= 40 ? <Bronze/> : 
  //   Math.round((totalScore || 0) * 100) <= 75 ? <Silver/> : 
  //   Math.round((totalScore || 0) * 100) <= 90 ? <Gold/> : <Diamond/> ;

    // const backgroundImage = `url('data:image/svg+xml;utf8,${encodeURIComponent(
    //   renderToStaticMarkup(background)
    // )}')`;
    
    const score = Math.round((totalScore || 0) * 100);
    const color = score <= 40 ? 'white' : 'black';

  return (
    <Modal {...modalProps} >
      <Flex 
      sx={{
        display:'block',
        position:'relative',
        transform: `scale(${scaleRatio})`,
        transformOrigin: 'center',
        borderRadius:'5px',
        overflow: 'hidden',

      }}>
      <Flex id='card'
      sx={{
        // borderRadius:'40px',
        overflow:'hidden',
        borderRadius:'5px',
      }}
      >
 <Token 
            imageUrl={tokenImageURL ?? ""} 
            score={totalScore} 
            tokenSymbol={tokenSymbol} 
          />
                


        <Flex sx={{ 
          position:'absolute',
          mt:'3.4%',
          ml:'18.5%',
          scale: '2.4',
          }}>
          <ChainsIcons tokenAddresses={tokenAddresses}/>
        </Flex>

          <Flex>
          {score <= 40 ? <Bronze sx={{width: '760px',height: '400px',    overflow:'hidden', borderRadius:'5px',}} /> : 
          score <= 75 ? <Silver sx={{width: '760px',height: '400px',    overflow:'hidden', borderRadius:'5px',}} /> : 
          score <= 90 ? <Gold sx={{width: '760px',height: '400px',    overflow:'hidden', borderRadius:'5px',}}/> : 
          <Diamond sx={{width: '760px',height: '400px',    overflow:'hidden', borderRadius:'5px',}}/> }
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
          mt:'-42px',
          ml:'312px',
          position:'absolute',
        }}>
          <Svg icon="fullLogo" width="135px" />
        </Flex>

        {/* Bottom Text */}
        <Flex sx={{
          justifyContent:'space-between',
          padding: '0 60px',
          marginTop:'36px',
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
      <Button sx={{mt:'20px',}} onClick={handleDownloadClick}>Download Image</Button>
      {/* <Button onClick={captureAndUploadImage}>Upload</Button> */}
    </Modal>
  )
  
}

export default SharableCard
