import React from 'react'
import { Button as ThemeUIButton, Spinner } from 'theme-ui'
import { ButtonProps, variants, buttonFontSizes, buttonPadding, sizes, buttonLineHeight } from './types'

const Button = ({
  variant = variants.PRIMARY,
  size = sizes.MEDIUM,
  load,
  children,
  startIcon,
  endIcon,
  fullWidth,
  disabled,
  ...props
}: ButtonProps) => {
  let hoverStyle = {
    '&:hover': {
      '&:not([disabled])': {
        borderColor: 'var(--theme-ui-colors-yellow)',
        background: variant === 'primary' && 'var(--theme-ui-colors-yellow)',
        opacity: 0.6,
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
          opacity: 0.6,
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
          opacity: 1,
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
          opacity: 1,
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
          opacity: 1,
        },
        '&:disabled': {},
      },
    }
  }

  return (
    <ThemeUIButton
      variant={variant}
      disabled={disabled}
      sx={{
        variant: `buttons.${variant}`,
        textTransform: 'uppercase',
        fontSize: buttonFontSizes[size],
        lineHeight: buttonLineHeight[size],
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
      }}
      {...props}
    >
      {React.isValidElement(startIcon) && React.cloneElement(startIcon)}
      {children} {load && <Spinner size={16} ml="5px" />}
      {React.isValidElement(endIcon) && React.cloneElement(endIcon)}
    </ThemeUIButton>
  )
}

export default Button
