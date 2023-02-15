import React from 'react'
import { Button as ThemeUIButton, Spinner } from 'theme-ui'
import { ButtonProps, variants, buttonFontSizes, buttonPadding, sizes } from './types'

const Button: React.FC<ButtonProps> = ({
  variant = variants.PRIMARY,
  size = sizes.MEDIUM,
  load,
  children,
  startIcon,
  endIcon,
  fullWidth,
  ...props
}) => {
  let hoverStyle = {
    '&:hover': {
      '&:not([disabled])': {
        borderColor: 'hoveredYellow',
        background: variant === 'primary' && 'hoveredYellow',
      },
      '&:disabled': {},
    },
  }
  if (variant === 'secondary') {
    hoverStyle = {
      '&:hover': {
        '&:not([disabled])': hoverStyle['&:hover']['&:not([disabled])'],
        '&:disabled': {
          color: 'secondaryButtonDisableColor',
          borderColor: 'secondaryButtonDisable',
        },
      },
    }
  }
  if (variant === 'tertiary') {
    hoverStyle = {
      '&:hover': {
        '&:not([disabled])': {
          borderColor: 'primaryBtnDisable',
          background: 'white4',
        },
        '&:disabled': {},
      },
    }
  }
  if (variant === 'success') {
    hoverStyle = {
      '&:hover': {
        '&:not([disabled])': {
          borderColor: 'hoveredSuccess',
          background: 'hoveredSuccess',
        },
        '&:disabled': {},
      },
    }
  }
  if (variant === 'danger') {
    hoverStyle = {
      '&:hover': {
        '&:not([disabled])': {
          borderColor: 'hoveredDanger',
          background: 'hoveredDanger',
        },
        '&:disabled': {},
      },
    }
  }

  return (
    <ThemeUIButton
      {...props}
      variant={variant}
      sx={{
        variant: `buttons.${variant}`,
        textTransform: 'uppercase',
        fontSize: buttonFontSizes[size],
        px: buttonPadding[size].x,
        py: buttonPadding[size].y,
        display: 'flex',
        justifyContent: 'center',
        transition: 'all .3s linear',
        '&:active': {
          transform: 'scale(0.9)',
        },
        ...hoverStyle,
        width: fullWidth ? '100%' : 'max-content',
        color: 'primaryBright',
      }}
    >
      {React.isValidElement(startIcon) && React.cloneElement(startIcon)}
      {children} {load && <Spinner size={15} ml="5px" />}
      {React.isValidElement(endIcon) && React.cloneElement(endIcon)}
    </ThemeUIButton>
  )
}

export default Button
