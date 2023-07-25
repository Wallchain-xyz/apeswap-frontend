import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box } from 'theme-ui'

// Components
import { Flex, Svg } from 'components/uikit'
import NavOption from './components/NavOption'

// Constants
import { NAV_ITEMS } from './constants'

const NavBarNew = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const scrollHandler = () => {
      window.scrollY > 0 ? setIsScrolled(true) : setIsScrolled(false)
    }
    window.addEventListener('scroll', scrollHandler)
    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  return (
    <Flex
      as="nav"
      sx={{
        justifyContent: 'space-between',
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        px: '40px',
        py: '8px',
        bg: isScrolled ? 'white1' : '',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Link href="/" style={{ width: '35px', height: '35px', display: 'flex', marginRight: '30px' }}>
          <Svg icon="logo" width="35px" />
        </Link>
        <Flex sx={{ gap: '40px' }}>
          {NAV_ITEMS.map((navItem) => {
            return <NavOption key={navItem.label} navItem={navItem} />
          })}
        </Flex>
      </Flex>
      <Flex sx={{ bg: 'magenta', gap: '30px' }}>
        <Box sx={{ bg: 'brown' }}>Chain Selector</Box>
        <Box sx={{ bg: 'brown' }}>Profile</Box>
      </Flex>
    </Flex>
  )
}
export default NavBarNew
