import React from 'react'

export interface InternalProps {
  children: React.ReactNode
  onDismiss?: () => void
  onAnimationComplete?: () => void
  t?: (key: string) => string
}

export interface ModalProps extends InternalProps {
  children: React.ReactNode
  open?: boolean
  minWidth?: string
  maxWidth?: string
  paddingWidth?: string
  title?: string
  zIndex?: string | number
}

export interface ModalTheme {
  background: string
}

export interface InjectedProps {
  handleClose?: () => void
}
