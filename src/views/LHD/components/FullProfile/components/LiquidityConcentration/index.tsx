import React from 'react'
import { LiquidityPool, TokenProfile } from 'state/lhd/types'
import { Flex, Svg, Text } from 'components/uikit'
import { useTranslation } from 'contexts/Localization'
import { Box } from 'theme-ui'
import Image from 'next/image'
import { formatDollar } from 'utils/formatNumbers'
import { BLOCK_EXPLORER } from '../../../../../../config/constants/chains'
import { SupportedChainId } from '@ape.swap/sdk-core'
import IconButton from '../IconButton'

const columnWidths = [25, 155, 55, 90, 75, 105, 105, 130]
const mobileColumnWidths = [25, 155, 55, 90, 75, 105, 105, 130]
const desktopMappedColumns = columnWidths.map((width) => `${width}px`).join(' ')
const mobileMappedColumns = mobileColumnWidths.map((width) => `${width}px`).join(' ')

const LiquidityConcentration = ({ fullProfile }: { fullProfile: TokenProfile }) => {
  const { t } = useTranslation()

  const TableHeader = () => {
    const headers = [
      '#',
      'Liquidity Pool',
      'Status',
      'Total Liquidity',
      'Extractable',
      'Chain',
      'Dex',
      'Pair Address',
    ]

    return (
      <Box
        sx={{
          display: 'grid',
          width: 'fit-content',
          gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
          position: 'sticky',
          top: 0,
          background: 'white2',
          zIndex: 10,
          borderColor: 'transparent transparent #ccc transparent',
        }}
      >
        {headers.map((header, index) => (
          <Flex
            key={index}
            sx={{
              padding: '8px',
              position: index === 0 || index === 1 ? 'sticky' : undefined,
              left: index === 0 ? 0 : index === 1 ? 25 : undefined,
              right: index === headers.length - 1 ? 0 : undefined,
              zIndex: index === 0 || index === 1 ? 2 : 1,
              background: 'white2',
              justifyContent: index === 1 ? 'flex-start' : 'center',
            }}
          >
            <Text
              sx={{
                fontWeight: [400, 400, 500],
                fontSize: ['8px', '8px', '10px'],
                color: index === 0 ? undefined : 'textDisabled',
              }}>
              {header}
            </Text>
          </Flex>
        ))}
      </Box>
    )
  }

  const getBlockExplorerURL = (chain: string, address: string) => {
    // @ts-ignore
    if (BLOCK_EXPLORER[chain]) return `${BLOCK_EXPLORER[chain]}/address/${address}`
    return ''
  }

  const TableRow = ({ index, pool }: {
    index: number,
    pool: LiquidityPool
  }) => {

    const tokenLogo1 = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/BANANA.svg'
    const tokenLogo2 = 'https://raw.githubusercontent.com/ApeSwapFinance/apeswap-token-lists/main/assets/BANANA.svg'
    console.log(pool)

    return (
      <Box
        sx={{
          width: 'fit-content',
          display: 'grid',
          background: index % 2 ? 'white3' : 'white2',
          gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
          borderColor: 'transparent transparent #ccc transparent',
          cursor: 'pointer',
        }}
      >
        <Flex
          sx={{
            padding: '8px',
            position: 'sticky',
            left: 0,
            zIndex: 2,
            background: index % 2 ? 'white3' : 'white2',
            justifyContent: 'center',
            height: '40px',
          }}
        >
          <Text sx={{ fontWeight: 300, fontSize: ['12px'], color: 'textDisabled' }}>
            {index + 1}
          </Text>
        </Flex>
        <Flex sx={{
          padding: '8px',
          position: 'sticky',
          left: 25,
          zIndex: 2,
          background: index % 2 ? 'white3' : 'white2',
          height: '40px',
          alignItems: 'center',
        }}>
          <Flex sx={{ position: 'relative', minWidth: ['40px'] }}>
            <Flex sx={{
              minWidth: '24px',
              height: '24px',
              mt: ['2px'],
              mr: ['5px'],
              background: '#fff',
              borderRadius: '25px',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Image src={tokenLogo2}
                     alt={'token img'}
                     width={22}
                     height={22}
                     style={{ borderRadius: '25px' }} />
            </Flex>
            <Flex sx={{
              minWidth: '24px',
              height: '24px',
              mt: ['2px'],
              mr: ['5px'],
              background: '#fff',
              borderRadius: '25px',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              right: '0px',
              zIndex: -1,
            }}>
              <Image src={tokenLogo2}
                     alt={'token img'}
                     width={22}
                     height={22}
                     style={{ borderRadius: '25px' }} />
            </Flex>
          </Flex>
          <Text
            sx={{
              fontWeight: 500,
              fontSize: ['10px', '10px', '10px', '12px'],
              lineHeight: ['18px'],
              ml: '5px',
            }}>
            {pool?.baseToken?.symbol}-{pool?.quoteToken?.symbol}
          </Text>
        </Flex>
        <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
          {
            pool.isHardAssetPair ? (
              <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], color: 'success' }}>
                {t('Valid')}
              </Text>
            ) : (
              <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'], color: 'error' }}>
                {t('Invalid')}
              </Text>
            )
          }
        </Flex>
        <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
          <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'] }}>
            {formatDollar({ num: pool?.pairTotalLiquidityUsd })}
          </Text>
        </Flex>
        <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
          <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'] }}>
            {formatDollar({ num: pool?.pairExtractableLiquidityUsd })}
          </Text>
        </Flex>
        <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
          <Text sx={{ fontWeight: 500, fontSize: ['10px', '10px', '10px', '12px'] }}>
            {pool?.chainId}
          </Text>
        </Flex>
        <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px' }}>
          <Text sx={{
            fontWeight: 500,
            fontSize: ['10px', '10px', '10px', '12px'],
            textTransform: 'capitalize',
            display: 'flex',
            overflow: 'hidden'
          }}>
            {pool?.dex === 'apeswap' && (
              <Flex sx={{ mr: '3px' }}>
                <Svg icon='logo' width={15} />
              </Flex>
            )}
            {pool?.dex}
          </Text>
        </Flex>
        <Flex sx={{ padding: '8px', justifyContent: 'center', height: '40px', alignItems: 'center' }}>
          <Text sx={{ fontWeight: 500, fontSize: '10px' }}>
            {`${pool?.lpAddress.slice(0, 4)}...${pool?.lpAddress.slice(-4)}`}
          </Text>
          <Flex sx={{ ml: '5px' }} onClick={() => navigator.clipboard.writeText(pool?.lpAddress)}>
            <Svg icon='copy' width={10} />
          </Flex>
          <IconButton href={getBlockExplorerURL(pool.chainId, pool.lpAddress)}
                      icon='filledURL'
                      simpleBtn />
        </Flex>
      </Box>
    )
  }


  return (
    <Flex sx={{ width: '100%', flexDirection: 'column', p: '20px 10px 10px 10px' }}>
      <Flex sx={{ width: '100%', justifyContent: 'center' }}>
        <Text sx={{ fontWeight: 600, fontSize: ['18px'], lineHeight: ['32px'] }}>
          {t('Liquidity Concentration')}
        </Text>
      </Flex>
      <Flex sx={{ width: '100%', flexDirection: 'column', overflow: 'auto', height: 'fill-available' }}>
        <TableHeader />
        {
          fullProfile?.liquidityPools.length > 0 && (
            fullProfile.liquidityPools.map((pool, index) => {
              return <TableRow key={`${pool.lpAddress}-${pool.chainId}-${index}`}
                               index={index}
                               pool={pool} />
            })
          )
        }
      </Flex>
    </Flex>
  )
}

export default LiquidityConcentration