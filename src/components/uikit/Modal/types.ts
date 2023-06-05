import React from 'react'
import { ThemeUIStyleObject } from 'theme-ui'

export interface InternalProps {
  children?: React.ReactNode
  onDismiss?: () => void
  onAnimationComplete?: () => void
  t?: (key: string) => string
  hideDivider?: boolean
}

export interface ModalProps extends InternalProps {
  children: React.ReactNode
  open?: boolean
  title?: string
  zIndex?: string | number
  sx?: ThemeUIStyleObject
}
