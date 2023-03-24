import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Azeret+Mono&display=swap" rel="stylesheet" />
          <link
            href="https://fonts.googleapis.com/css2?family=Titan+One:wght@300;400;600&display=swap"
            rel="stylesheet"
          />
          <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@400;600&display=swap" rel="stylesheet" />
          <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
          <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo.png" />
          <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
          <meta
            name="description"
            content="ApeSwap is a multichain DeFi Hub offering an accessible, transparent, and secure experience for everyone."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, minimum-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="twitter:image" content="https://apeswap.finance/twitter.png" />
          <meta
            name="twitter:description"
            content="Swap, stake, and earn cryptocurrencies, all in one place. Accessible, transparent, and secure for everyone."
          />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="ApeSwap: Your One-Stop, Multichain DeFi Hub" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
