import React, { useEffect, useState } from 'react'
import { useTranslation } from 'contexts/Localization'
import {
  BillDiagramContainer,
  BillGifContainer,
  DescriptionContainer,
  FirstTimeCardContainer,
} from '../UserBillsView/styles'
import { AnimatePresence, motion } from 'framer-motion'
import useDebounce from 'hooks/useDebounce'
import useIsMobile from 'hooks/useIsMobile'
import MobileCard from './MobileCard'
import { useWeb3React } from '@web3-react/core'
import useBonds from 'views/Bonds/hooks/useBonds'
import { Text } from 'components/uikit'
import BillsDiagram from 'components/MarketingModals/Bills/BillsDiagram'
import Image from 'next/image'

const FirstTimeCard = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [loaded, setLoaded] = useState(false)
  const isMobile = useIsMobile()

  const bills = useBonds()
  const ownedBillsAmount = null

  // bills?.flatMap((bill) => {
  //   if (bill?.userOwnedBillsData !== undefined && !loaded) {
  //     setLoaded(true)
  //   }
  //   return bill?.userOwnedBillsData ? bill?.userOwnedBillsData : []
  // }).length

  // logic used to prevent FirstTimeCard to pop up abruptly
  const [showFirstTimeCard, setShowFirstTimeCard] = useState(false)
  const debouncedShowCard = useDebounce(showFirstTimeCard, 1000)
  useEffect(() => {
    setShowFirstTimeCard(!account || (ownedBillsAmount === 0 && loaded))
  }, [account, ownedBillsAmount, loaded])

  return (
    <AnimatePresence>
      {debouncedShowCard && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'fit-content' }}
          transition={{ opacity: { duration: 0.2 } }}
          exit={{ opacity: 0, height: 0 }}
          sx={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            mt: '20px',
          }}
        >
          {isMobile ? (
            <MobileCard />
          ) : (
            <FirstTimeCardContainer>
              <BillGifContainer>
                <Image
                  src="/images/bills/bill-nfts.gif"
                  alt="bill-img"
                  width={800}
                  height={800}
                  sx={{ width: '100%', height: 'auto' }}
                />
              </BillGifContainer>
              <DescriptionContainer>
                <Text fontSize="22px" bold>
                  {t('Tips for buying bonds')}
                </Text>
                <BillDiagramContainer>
                  <BillsDiagram />
                </BillDiagramContainer>
              </DescriptionContainer>
            </FirstTimeCardContainer>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default React.memo(FirstTimeCard)
