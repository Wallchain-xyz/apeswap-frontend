import React, { useRef, useEffect } from 'react';
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
            <Flex style={{ position: 'absolute', marginTop: '21px', width:'150px', height:'150px'}}>
              <ReactSVG
                src={src}
                sx={{width:'150px', height:'150px'}}
                beforeInjection={(svg) => {
                  svg.setAttribute('width', '150');
                  svg.setAttribute('height', '150');
                  svg.style.width = '100px';
                  svg.style.height = '100px';
                  svg.style.borderRadius = '50%';
                  svg.style.overflow = 'hidden';
                  
                  const titleElement = document.createElement('title');
                  // titleElement.textContent = alt;
                  svg.prepend(titleElement);
                }}
              />
            </Flex>
          );
        } else {
          return (
            <Flex style={{ position: 'absolute', marginTop: '21px' }}>
              <img
                src={src}
                alt={alt}
                // width={width}
                // height={height}
                style={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                  width:'110px',
                  height:'110px',
                }}
              />
              {/* <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                style={{
                  borderRadius: '50%',
                  overflow: 'hidden',
                }}
              /> */}
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
        src={imageUrl ?? ''}
        alt={tokenSymbol + ' token.'}
        // width={100} // Aquí ajustamos las dimensiones
        // height={100}
      />

      {/* <Image 
      src={imageUrl}
      alt={tokenSymbol}
      width={192}
      height={192}

      sx={{
        mt:'21px',
        height: '150px',
        width: '150px',
        background: `url(${imageUrl})`,
        display: 'block',
        position:'absolute',
        backgroundSize:'cover',
        borderRadius:'50%',
        // ml:'500px',
      }}>

      </Image> */}

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
