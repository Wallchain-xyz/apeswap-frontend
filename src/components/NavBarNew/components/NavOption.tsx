// Components
import { Flex, Svg } from 'components/uikit'

interface NavOptionProps {
  option: any
}

const NavOption = ({ option }: NavOptionProps) => {
  const { label } = option
  return <Flex sx={{ cursor: 'pointer', bg: 'brown', '&:hover': { bg: 'cyan' } }}>{label}</Flex>
}

export default NavOption
