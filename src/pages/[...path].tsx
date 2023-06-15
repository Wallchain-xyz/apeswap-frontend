export async function getServerSideProps(context: { query: { path: any } }) {
  const { path } = context.query

  if (Array.isArray(path))
    if (path[0] === 'swap') {
      // if (path[0] === 'swap' && path[1] && path[1].length > 0 && path[2] && path[2].length > 0) {
      //   return {
      //     redirect: {
      //       destination: `https://dex.apeswap.finance/swap${path[1] / path[2]}`,
      //       permanent: false,
      //     },
      //   }
      // }
      return {
        redirect: {
          destination: `https://dex.apeswap.finance/swap`,
          permanent: false,
        },
      }
    }
  if (path[0] === 'add-liquidity') {
    return {
      redirect: {
        destination: 'https://dex.apeswap.finance/add-liquidity',
        permanent: false,
      },
    }
  }
  if (path[0] === 'liquidity') {
    return {
      redirect: {
        destination: 'https://dex.apeswap.finance/liquidity',
        permanent: false,
      },
    }
  }
  if (path[0] === 'zap') {
    return {
      redirect: {
        destination: 'https://dex.apeswap.finance/zap',
        permanent: false,
      },
    }
  }
  if (path[0] === 'remove' && path[1] && path[1].length > 0 && path[2] && path[2].length > 0) {
    return {
      redirect: {
        destination: `https://dex.apeswap.finance/remove/${path[1]}/${path[2]}`,
        permanent: false,
      },
    }
  }

  // For all other paths, redirect to the home page.
  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  }
}

export default function Page() {
  // This will never actually be shown, because all paths are redirected.
  return null
}
