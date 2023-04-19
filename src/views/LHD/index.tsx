import React, { ChangeEvent, useEffect, useState } from 'react'
import { useLoadInitialProfiles, useOnSearchProfiles } from '../../state/lhd/hooks'
import { useAppDispatch } from '../../state/hooks'
import { addSearchProfiles } from '../../state/lhd/reducer'
import { Button, Flex, Input, Link, Svg, Text } from '../../components/uikit'
import ListViewLayout from '../../components/ListView/ListViewLayout'
import { useTranslation } from '../../contexts/Localization'
import StatCard from './components/StatCard'
import MyTable from './components/Table'
import { Box } from 'theme-ui'

const LHD = () => {
  useLoadInitialProfiles()
  const onSearchProfiles = useOnSearchProfiles()
  const dispatch = useAppDispatch()
  const { t } = useTranslation()

  const [queryString, setQueryString] = useState('')

  const handleChange = (searchQuery: string) => {
    setQueryString(searchQuery)
  }

  useEffect(() => {
    dispatch(addSearchProfiles([]))
    const delayDebounceFn = setTimeout(async () => {
      if (queryString?.length >= 2) {
        onSearchProfiles(queryString)
      }
    }, 1000)
    return () => clearTimeout(delayDebounceFn)
  }, [dispatch, queryString, onSearchProfiles])

  return (
    <Flex sx={{
      position: 'relative',
      top: '30px',
      width: '100%',
      mb: '100px',
      justifyContent: 'center',
      flexDirection: 'column',
    }}>
      <ListViewLayout>
        <Flex sx={{ width: '100%', flexDirection: ['column','column','row'] }}>
          <Flex sx={{
            width: ['100%', '100%', '50%'],
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
            <Flex sx={{ width: '100%' }}>
              <Text sx={{
                fontWeight: 700,
                fontSize: ['30px'],
                lineHeight: ['45px'],
              }}>{t('Liquidity Health Dashboard')}</Text>
            </Flex>
            <Flex sx={{ width: '100%', mt: '10px' }}>
              <Text sx={{ fontWeight: 500, fontSize: ['16px'], lineHeight: ['24px'] }}>
                {t('Apeswap’s data visualization tool that provides insights into the liquidity levels and sustainability of cryptocurrency projects.')}
              </Text>
            </Flex>
            <Flex sx={{ width: '100%', mt: '10px' }}>
              <Link href=''>
                <Text sx={{ fontWeight: 500, fontSize: ['16px'], lineHeight: ['24px'], mr: '10px' }}>Learn More</Text>
              </Link>
              <Link href=''>
                <Text sx={{ fontWeight: 500, fontSize: ['16px'], lineHeight: ['24px'] }}>Improve your score</Text>
              </Link>
            </Flex>
          </Flex>
          <Flex sx={{
            width: ['100%', '100%', '50%'],
          }}>
            <StatCard
              title='Industry Average'
              value={'60'}
              footerInfo={<>+0,45% on the last 7 days</>}
            />
            <StatCard
              title='Chain supported'
              value={'19'}
              footerInfo={<>See which chains</>}
            />
            <StatCard
              title='Verified tokens'
              value={'235'}
              footerInfo={<>+0,45% on the last 7 days</>}
            />
          </Flex>
        </Flex>
        <Flex sx={{
          width: '100%',
          mt: '20px',
          backgroundColor: 'white2',
          padding: '5px',
          borderRadius: '10px',
          justifyContent: 'space-between',
        }}>
          <Input
            placeholder={t('Search by token name, address, symbol ...')}
            value={queryString}
            variant='search'
            onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
            style={{backgroundColor: 'white2'}}
            sx={{width: '100%', '::placeholder': { fontSize: '10px', fontWeight: 300 } }}
          />
          <Button
            variant='tertiary'
            sx={{
              ml: '10px',
              width: '100%',
              maxWidth: '88px',
              color: 'text',
              fontSize: '10px',
              height: '36px',
              lineHeight: '14px',
              alignItems: 'center',
          }}
            endIcon={<Flex sx={{ml: '5px'}}><Svg icon="MenuSettings"/></Flex>}
          >
            {t('Filters')}
          </Button>
        </Flex>
        <MyTable />
      </ListViewLayout>
    </Flex>
  )
}

export default LHD