import React from 'react'

const MoonPayIframe: React.FC<{ manualChainId?: number }> = ({ manualChainId }) => {
  const url = 'https://apeswap.finance/'

  return (
    <iframe
      title="Moonpay topup"
      src={url}
      scrolling="no"
      allow="accelerometer; autoplay; camera; gyroscope; payment"
    />
  )
}

export default MoonPayIframe
