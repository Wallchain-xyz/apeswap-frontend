import { Input as ThemeInput } from 'theme-ui'
import Flex from '../Flex'
import Svg from '../Svg'

const Input = ({ variant, width, ...props }: { variant?: 'search'; width?: string[] } | any) => {
  return variant === 'search' ? (
    <Flex sx={{ position: 'relative', width: width ? width : 'unset' }}>
      <ThemeInput
        {...props}
        sx={{
          background: 'white3',
          border: 'none',
          pl: '10px',
          borderRadius: '10px',
          ':focus': { outline: 'none' },
        }}
      />
      <Flex sx={{ position: 'absolute', right: 5, justifyContent: 'center', height: '100%' }}>
        <Svg icon="search" />
      </Flex>
    </Flex>
  ) : (
    <ThemeInput
      {...props}
      sx={{
        background: 'white3',
        border: 'none',
        pl: '10px',
        borderRadius: '10px',
        ':focus': { outline: 'none' },
      }}
    />
  )
}

export default Input
