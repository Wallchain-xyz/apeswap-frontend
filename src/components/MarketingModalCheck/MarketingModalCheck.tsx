import React, { useMemo } from 'react'
// import { MarketingModal } from 'components/uikit'
// import { LendingBodies } from 'components/MarketingModalContent/Lending/'
// import CircularModal from 'components/CircularModal'
import { useRouter } from 'next/router'
// import MoonPayModal from 'views/Topup/MoonpayModal'
// import GnanaModal from 'components/GnanaModal'
// import NewsletterModal from 'components/NewsletterModal'
// import SwiperProvider from 'contexts/SwiperProvider'
// import QuestModal from '../MarketingModalContent/Quests/QuestModal'
import { SET_DEFAULT_MODAL_KEY, SHOW_DEFAULT_MODAL_KEY, SET_DEF_MOD_KEY, SHOW_DEF_MOD_KEY } from './constants'
// import { circularRoute } from 'utils'
import Tutorial from 'components/MarketingModals/Tutorial'
import GnanaModal from 'components/GnanaModal'

const MarketingModalCheck = () => {
  const { pathname, replace, query } = useRouter()

  const modalQuery = query.modal

  useMemo(() => {
    if (typeof window !== 'undefined') {
      // Perform localStorage action

      localStorage.removeItem(SHOW_DEFAULT_MODAL_KEY) // remove old key
      localStorage.removeItem(SET_DEFAULT_MODAL_KEY) // remove old key
      //const onHomepage = history.location.pathname === '/'
      const sdmk = localStorage.getItem(SET_DEF_MOD_KEY)
      //const isdm = localStorage.getItem(SHOW_DEF_MOD_KEY)

      // This needs to be fixed but I didnt want to reset users local storage keys
      // Basically first land users wont get the modal until they refresh so I added a showDefaultModalFlag variable
      const isDefaultModalSet = JSON.parse(sdmk as string)
      /*const isShowDefaultModal = JSON.parse(isdm)
    const showDefaultModalFlag = isShowDefaultModal || (!isShowDefaultModal && !isDefaultModalSet)*/

      if (!isDefaultModalSet) {
        localStorage.setItem(SHOW_DEF_MOD_KEY, JSON.stringify('SHOW'))
      }

      /*if (showDefaultModalFlag && onHomepage) {
      history.push({ search: '?modal=tutorial' })
    }*/
    }
  }, [])

  const tutorial = modalQuery === 'tutorial'
  // const lendingRoute = location.search.includes('modal=3')
  // const telosQuestRoute = location.search.includes('modal=telos-quests')
  // const moonpayRoute = modalQuery === 'moonpay'
  const getGnanaRoute = modalQuery === 'gnana'
  // const buyRoute = circularRoute(chainId, location, 'modal=circular-buy')
  // const sellRoute = circularRoute(chainId, location, 'modal=circular-sell')
  // const phRoute = circularRoute(chainId, location, 'modal=circular-ph')
  // const ghRoute = circularRoute(chainId, location, 'modal=circular-gh')
  // const newsletterRoute = modalQuery === 'newsletter'

  const onDismiss = () => {
    replace({
      pathname: pathname,
    })
  }

  return tutorial ? (
    <Tutorial location={pathname} onDismiss={onDismiss} />
  ) : getGnanaRoute ? (
    <GnanaModal onDismiss={onDismiss} />
  ) : (
    <></>
  )
  //  moonpayRoute ? (
  //   <MoonPayModal onDismiss={onDismiss} />
  // ) : newsletterRoute ? (
  //   <NewsletterModal onDismiss={onDismiss} />
  // ) : (
  //   <></>
  // )
}

export default React.memo(MarketingModalCheck)
