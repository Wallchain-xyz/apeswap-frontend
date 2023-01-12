import Homepage from 'components/Homepage'
import Head from 'next/head'

export default function Index() {
  return (
    <>
      <Head>
        <title>Apeswap</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Homepage />
    </>
  )
}
