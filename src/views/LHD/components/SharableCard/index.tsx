import React, { useRef, useEffect, useState } from 'react'
import { Flex, Modal, Button, Text, Svg } from 'components/uikit'
import { TokenAddress } from '../../../../state/lhd/types'
import ChainsIcons from '../FullProfile/components/ChainsIcons'
import Image from 'next/image'
import Token from './components/Token'
import Bar from './components/Bar'
import { Bronze, Silver, Gold, Diamond } from './components/assets/Background'
import { renderToStaticMarkup } from 'react-dom/server'
import { getColor } from 'views/LHD/utils/getColor'
import { FullLogo } from 'components/uikit/Svg/Icons'
import domtoimage from 'dom-to-image'
import { useRouter } from 'next/router'
import axios from 'axios'

const modalProps = {
  // sample styles for the modal. This are not checked at all so feel 100% free to change them
  sx: {
    maxHeight: 'calc(100% - 30px)',
    height: 'fit-contnet',
    width: ['90%'],
    '@media screen and (min-width: 1180px)': {
      maxWidth: '800px',
    },
    maxWidth: '800px',
  },
  title: 'Liquidity Health Card',
}

interface SharableCardProps {
  tokenSymbol?: string
  tokenName?: string
  tokenImageURL?: string
  totalScore?: number
  healthScore?: number
  concentrationScore?: number
  ownershipScore?: number
  tokenAddresses?: TokenAddress[]
  formulaVersion?: string
}

const SharableCard = ({
  tokenSymbol,
  tokenImageURL,
  tokenName,
  totalScore,
  healthScore,
  concentrationScore,
  ownershipScore,
  tokenAddresses,
  formulaVersion,
}: SharableCardProps) => {
  //put logic and functions here, feel free to create folders and new files within the SharableCard directory

  const handleClick = (type: 'download' | 'share') => {
    processShare(type)
  }

  // Automatic Upload function here to create it with domtoimage

  // function uploadImageToHosting(imageBlob) {
  //   // Aquí debes agregar el código para subir el Blob de imagen al servicio de alojamiento deseado.
  //   // Esto variará dependiendo del servicio de alojamiento que utilices.
  //   // Consulta la documentación del servicio de alojamiento para obtener más detalles sobre cómo subir imágenes.

  //   // Ejemplo ficticio de subida a un servicio de alojamiento:
  //   const uploadURL = 'https://example.com/upload'; // URL de la API de subida del servicio de alojamiento
  //   const formData = new FormData();
  //   formData.append('image', imageBlob, 'generated-image.png');

  //   fetch(uploadURL, {
  //     method: 'POST',
  //     body: formData
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       console.log('La imagen se ha subido correctamente.');
  //       // Aquí puedes realizar acciones adicionales después de la subida exitosa.
  //     } else {
  //       console.error('Error al subir la imagen:', response.status, response.statusText);
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error al subir la imagen:', error);
  //   });
  // }

  // // Ejemplo de uso con dom-to-image:
  // const elementToCapture = document.getElementById('elementId'); // El elemento del DOM que deseas capturar como imagen

  // domtoimage.toBlob(elementToCapture)
  //   .then((imageBlob) => {
  //     uploadImageToHosting(imageBlob);
  //   })
  //   .catch((error) => {
  //     console.error('Error al generar la imagen:', error);
  //   });

  function processShare(type: 'download' | 'share') {
    const card = document.getElementById('card')

    if (!card) {
      console.error('No se pudo encontrar el elemento card.')
      return
    }

    const maxWidth = 1000 // Width of the image
    const cardWidth = card.offsetWidth
    const scaleFactor = maxWidth / cardWidth
    const canvasWidth = cardWidth * scaleFactor
    const canvasHeight = card.offsetHeight * scaleFactor

    const options = {
      width: canvasWidth,
      height: canvasHeight,
      style: {
        backgroundColor: 'transparent',
        overflow: 'visible',
        transform: `scale(${scaleFactor})`,
        transformOrigin: 'top left',
      },
    }

    domtoimage
      .toPng(card, options)
      .then(async (dataUrl) => {
        if (type === 'download') {
          const link = document.createElement('a')
          link.download = `${tokenSymbol}-${nameDate}.png`
          link.href = dataUrl
          link.click()
        } else if (type === 'share') {

          const response = await fetch(dataUrl);
          const blob = await response.blob();

          let formData = new FormData()
          formData.append('file', blob, `lhd_share_${tokenAddresses![0].chainId}_${tokenAddresses![0].address}`)

          const result = await axios.post(
            `https://lhd-temp-api.herokuapp.com/liquidity-health-dashboard/createShareImage`,
            formData,
            { headers: { 'Content-Type': 'multipart/form-data' } },
          )

          share()
        }
      })
      .catch((error) => {
        console.error('Error al convertir a PNG:', error)
      })
  }

  const { asPath, pathname } = useRouter()
  const randomNumber = Math.floor(100000 + Math.random() * 900000)

  const today = new Date()
  const monthNames = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
  const month = monthNames[today.getMonth()].toUpperCase()
  const day = today.getDate().toString().padStart(2, '0')
  const year = today.getFullYear()
  const month2 = today.getMonth()
  const hour = today.getHours().toString().padStart(2, '0')
  const minute = today.getMinutes().toString().padStart(2, '0')

  const dateParam = `${year}${month2}${day}${hour}${minute}`
  const score = Math.round((totalScore || 0) * 100)

  const goodScore = `${tokenName} has a Liquidity Health Score of ${score}/100!\nHealthy liquidity indicates that a project is well-prepared for the future.\nDive into the full Liquidity Health Report, DYOR, and gain the upper hand, here!👇 $${tokenSymbol} #${tokenName?.replace(
    /\s/g,
    '',
  )}`

  const badScore = `${tokenName} has a Liquidity Health Score of ${score}/100!\nHolding a token with poor liquidity health may be risky.\nDive into the full Liquidity Health Report, DYOR, and gain the upper hand, here! 👇 \n $${tokenSymbol} #${tokenName?.replace(
    /\s/g,
    '',
  )}`

  const message = score >= 70 ? goodScore : badScore
  const color = score <= 40 ? 'white' : 'black'

  function share() {
    if (navigator.share) {
      navigator
        .share({
          title: "ApeSwap's Liquidity Health Dashboard",
          text: `${message}`,
          url: `${asPath}?d=${dateParam}`,
        })
        .then(() => console.log('Shared'))
        .catch((error) => console.log('Error sharing', error))
    } else {
      const text = `${message}`
      // const url = `ApeSwap.Finance${asPath}?d=${dateParam}`
      const url = `https://frontend-git-feat-lhd-ape-swap-finance.vercel.app${asPath}?d=${dateParam}`

      const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(
        url,
      )}`
      window.open(twitterUrl, '_blank', 'width=696,height=420')
    }
  }

  //CARD PROPORTIONAL RESIZING
  const [containerWidth, setContainerWidth] = useState(0)
  const [cardHeight, setCardHeigth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const cardElement = document.getElementById('cardContainer')
      setContainerWidth(document.getElementById('container')?.clientWidth ?? 0)
      setCardHeigth(cardElement?.clientWidth ?? 0)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxContainerWidth = 760
  const maxCardHeight = 400
  const scaleRatio = containerWidth / maxContainerWidth
  const heightRatio = (cardHeight * maxCardHeight) / maxContainerWidth

  const formattedDate = `${day} ${month} ${year}`
  const nameDate = `${day}-${month}-${year}`

  return (
    <Modal {...modalProps}>
      <Flex
        id="cardContainer"
        sx={{
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          overflowX: 'hidden',

          flexDirection: 'column',
        }}
      >
        <Flex
          sx={{
            display: 'block',
            position: 'relative',
            borderRadius: '5px',
            overflow: 'hidden',
            height: heightRatio,
            '@media screen and (max-width: 780px)': {
              mb: '20px',
            },
          }}
        >
          <Flex
            id="card"
            sx={{
              overflow: 'hidden',
              transformOrigin: 'top',
              transform: `scale(${scaleRatio})`,
              borderRadius: '5px',
            }}
          >
            <Flex
              sx={{
                position: 'absolute',
                mt: '3.4%',
                ml: '18.5%',
                scale: '2.4',
              }}
            >
              <ChainsIcons tokenAddresses={tokenAddresses} />
            </Flex>

            <Flex>
              {score <= 40 ? (
                <Bronze sx={{ width: '760px', height: '400px', overflow: 'hidden', borderRadius: '5px' }} />
              ) : score <= 75 ? (
                <Silver sx={{ width: '760px', height: '400px', overflow: 'hidden', borderRadius: '5px' }} />
              ) : score <= 90 ? (
                <Gold sx={{ width: '760px', height: '400px', overflow: 'hidden', borderRadius: '5px' }} />
              ) : (
                <Diamond sx={{ width: '760px', height: '400px', overflow: 'hidden', borderRadius: '5px' }} />
              )}
            </Flex>

            <Flex
              sx={{
                position: 'absolute',
                display: 'block',
                width: '760px',
                height: '400px',
                // background:'rgba(0, 0, 0,  0.5)'
              }}
            >
              <Flex
                sx={{
                  position: 'absolute',
                  flexDirection: 'row-reverse',
                  justfyContent: 'center',
                  alignItems: 'center',
                  width: '180px',
                  ml: 'calc(100% - 245px)',
                  mt: '70px',
                  // background:'rgba(0,0,0,0.2)'
                }}
              >
                <Text
                  sx={{
                    // width:'80px',
                    fontSize: '4.7em',
                    fontWeight: '800',
                    pl: '10px',
                    mt: '1px',
                    color: getColor(Math.round((totalScore || 0) * 100)),
                  }}
                >
                  {score}
                </Text>
                <Text
                  sx={{
                    fontSize: '1.1em',
                    fontWeight: '600',
                    // width:'10%',
                    textAlign: 'right',
                    // mt:'15px',
                    // mr:'10px',
                    lineHeight: '18px',
                    color: color,
                    width: '100px',
                  }}
                >
                  LIQUIDITY HEALTH SCORE
                </Text>
              </Flex>

              {/* Center */}

              <Flex
                sx={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0 34px',
                  mt: '130px',
                  mb: '30px',
                }}
              >
                <Token imageUrl={tokenImageURL ?? ''} score={totalScore} tokenSymbol={tokenSymbol} />
                {/* Bars */}
                <Flex
                  sx={{
                    width: '420px',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    mb: '10px',
                    mr: '25px',
                    height: '100px',
                    // background:'rgba(0, 0, 0,  0.1)'
                  }}
                >
                  <Bar property="STRENGTH " value={healthScore} color={color} />
                  <Bar property="OWNERSHIP" value={ownershipScore} color={color} />
                  <Bar property="CONCENTRATION" value={concentrationScore} color={color} />
                </Flex>
              </Flex>

              {/* APE LOGO */}
              <Flex
                sx={{
                  // mt:'-42px',
                  ml: '312px',
                  position: 'absolute',
                }}
              >
                <Svg icon="fullLogo" width="135px" />
              </Flex>

              {/* Bottom Text */}
              <Flex
                sx={{
                  justifyContent: 'space-between',
                  padding: '0 60px',
                  marginTop: '76px',
                }}
              >
                <Text sx={{ color: color, fontSize: '12px', width: '120px', textAlign: 'left' }}>{formulaVersion}</Text>
                <Text sx={{ color: color, fontSize: '12px', width: '120px', textAlign: 'center' }}>
                  apeswap.click/LHD
                </Text>
                <Text sx={{ color: color, fontSize: '12px', width: '120px', textAlign: 'right' }}>{formattedDate}</Text>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        <Flex id="container" sx={{ width: '100%', height: 0, maxWidth: '760px' }} />

        {/* <Button onClick={handleShareClick}>Share on Twitter</Button> */}
        <Flex
          sx={{
            width: '100%',
            justifyContent: 'space-between',
            '@media screen and (max-width: 780px)': {
              flexDirection: 'column',
            },
          }}
        >
          <Button
            sx={{
              m: '20px 0 0',
              width: '49%',
              '@media screen and (max-width: 780px)': {
                width: '100%',
                m: '0px',
              },
            }}
            onClick={() => handleClick('download')}
          >
            Download Image
          </Button>
          <Button
            sx={{
              m: '20px 0 0',
              width: '49%',
              '@media screen and (max-width: 780px)': {
                width: '100%',
                m: '0px',
                mt: '15px',
              },
            }}
            onClick={() => handleClick('share')}
          >
            Share
          </Button>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default SharableCard
