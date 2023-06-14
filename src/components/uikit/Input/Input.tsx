import { Input as ThemeInput, InputProps as ThemeInputProps, Box } from 'theme-ui'
import { Text } from 'components/uikit'
import Flex from '../Flex'
import Svg from '../Svg'

type variant = 'search' | 'password' | 'text'
type inputStatus = 'default' | 'error' | 'success'
type color = 'gray' | 'red' | 'green'

type ColorSchemeMap = Record<inputStatus, color>

const colorScheme: ColorSchemeMap = {
  default: 'gray',
  error: 'red',
  success: 'green',
}
interface InputProps extends ThemeInputProps {
  variant?: variant
  width?: any
  status?: inputStatus
}

const Input = ({ variant = 'text', width, status = 'default', ...props }: InputProps) => {
  switch (variant) {
    case 'search':
      return (
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
      )

    case 'password':
      const statusColor = colorScheme[status]
      return (
        <Flex sx={{ width: width ? width : '100%', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
          <ThemeInput
            {...props}
            type="password"
            sx={{
              background: 'white3',
              border: 'none',
              borderBottom: `2px solid ${statusColor}`,
              color: statusColor,
              pl: '10px',
              borderRadius: '10px',
              ':focus': { outline: 'none' },
            }}
          />
          <Text sx={{ fontSize: '10px', color: statusColor, visibility: status === 'default' ? 'hidden' : 'visible' }}>
            {status === 'error' ? 'Wrong Password' : 'Correct Password'}
          </Text>
        </Flex>
      )

    default:
      return (
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
}

export default Input
