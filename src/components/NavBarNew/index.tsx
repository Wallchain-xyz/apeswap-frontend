import Link from 'next/link'
import { Box } from 'theme-ui'

// Components
import { Flex, Svg } from 'components/uikit'
import NavOption from './components/NavOption'

const NAV_OPTIONS = [
  { label: 'Exchange', items: [{ itemLabel: 'item 1', href: '/item1' }] },
  { label: 'Bills', items: [{ itemLabel: 'item 1', href: '/item1' }] },
  { label: 'Stake', items: [{ itemLabel: 'item 1', href: '/item1' }] },
  { label: 'Explore', items: [{ itemLabel: 'item 1', href: '/item1' }] },
]

const NavBarNew = () => {
  return (
    <Flex
      as="nav"
      sx={{
        justifyContent: 'space-between',
        bg: 'tan',
        position: 'fixed',
        width: '100%',
        zIndex: 100,
        height: '36px',
        px: '40px',
        py: '8px',
      }}
    >
      <Flex sx={{ alignItems: 'center' }}>
        <Link href="/" style={{ width: '35px', height: '35px', display: 'flex', marginRight: '30px' }}>
          <Svg icon="logo" width="35px" />
        </Link>
        <Flex sx={{ bg: 'magenta', gap: '40px' }}>
          {NAV_OPTIONS.map((navOption) => {
            return <NavOption key={navOption.label} option={navOption} />
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
