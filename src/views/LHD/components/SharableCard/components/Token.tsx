import React, { useRef, useEffect, useState } from 'react';
import { Flex, Modal, Button, Text, Svg } from 'components/uikit'
import Image from 'next/image'
import {Bronze, Silver, Gold, Diamond} from './assets/TokenBorder';
import { renderToStaticMarkup } from 'react-dom/server';
import canvg, { Canvg } from 'canvg';
import { ReactSVG } from 'react-svg'; // Importa ReactSVG desde react-svg



// import ReactSVG from 'react-svg';



function Token(data : any) {
    const { imageUrl, score: originalValue = 0, tokenSymbol } = data;
    const score = Math.round((originalValue || 0) * 100);


    async function getImageDataUrl(imgUrl: string): Promise<string> {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    }
    
    const [imageDataUrl, setImageDataUrl] = useState<string | null>(null);

useEffect(() => {
  getImageDataUrl(imageUrl).then(setImageDataUrl).catch(console.error);
}, [imageUrl]);

 
    
    const titleBackground = 
    score <= 40 ? '#451717' : 
    score <= 75 ? '#808080': 
    score <= 90 ? "#C6853E" : '#959EBF' ;



    const Styles = {
        container: {
          overflow:'visible',
          flexDirection:'column',
          justfyContent:'center',
          alignItems:'center'
        },
        image: {
          width: '150px',
          height: '150px',
          marginTop:'21px',
          marginLeft:'21px',
          borderRadius: '50%',
          overflow: 'hidden',
        },
        tokenName:{
            backgroundColor: titleBackground,
            fontWeight:700,
            fontSize:'30px',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            padding:'10px 20px',
            // position:'absolute',
            mt:'-30px',
            ml: '0%',
            transform: 'translate(0%, 0%) matrix(1, 0, -0.2, 1, 0, 0);',
            borderRadius:'25px 8px;',
            color:"white"

        },
        bgToken:{
          width: '152px',
          height: '152px',
          overflow:'hidden',borderRadius:'50%', 
        }
      };
      
      function ImageWithFallback({ src, alt, }: { src: string, alt: string, }) {
        if (src.endsWith('.svg')) {
          return (
            <Flex style={{ position: 'absolute', marginTop: '16px'}}>
              <ReactSVG
                src={src}
                width={120}
                height={120}
                beforeInjection={(svg) => {
                  const titleElement = document.createElement('title');
                  svg.prepend(titleElement);
                }}
              />
            </Flex>
          );
        } else {
          return (
            <Flex style={{ position: 'absolute', marginTop: '16px' }}>
              <img
                src={`${imageUrl}`}
                alt={src}
                width={120}
                height={120}
                style={{
                  borderRadius: '50%',
                }}
              />
            </Flex>
          );
        }
      }

return (
  <Flex
    sx={{
      width: '250px',
      justifyContent: 'center',
      alignItems: 'start',
      
    }}
  >
    <Flex sx={Styles.container}>


<ImageWithFallback
  src={imageDataUrl ?? ''}
  alt={tokenSymbol + ' token.'}
/>


      <img 
      src={"https://res.cloudinary.com/dswmrqgwy/image/upload/v1685375572/lhd/ysYIu7Q_hzbccm.png"}
      alt={tokenSymbol}
      width={120}
      height={120}

      sx={{
        mt:'21px',
        height: '40px',
        width: '40px',
        display: 'block',
        position:'absolute',
        borderRadius:'50%',
      }}>
        </img>
      {score <= 40 ? (
        <Bronze sx={Styles.bgToken} />
      ) : score <= 75 ? (
        <Silver sx={Styles.bgToken} />
      ) : score <= 90 ? (
        <Gold sx={Styles.bgToken} />
      ) : (
        <Diamond sx={Styles.bgToken} />
      )}
      <Text sx={Styles.tokenName}>${tokenSymbol}</Text>
    </Flex>
  </Flex>
);

}


export default Token;
