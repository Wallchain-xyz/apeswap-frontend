import { useTranslation } from 'contexts/Localization'
import React from 'react'
import { Text as ThemeUIText } from 'theme-ui'
import { TextProps, variants } from './types'

const Text: React.FC<TextProps> = ({
  variant = variants.NORMAL,
  weight = variants.NORMAL,
  size,
  children,
  color = 'text',
  ...props
}) => {
  // const { t } = useTranslation()
  // console.log(children)
  // const toTranslate = children?.toString()
  // const translation = () => {
  //   try {
  //     return t(toTranslate ?? '')
  //   } catch (e) {
  //     console.error('could not translate')
  //     return children
  //   }
  // }
  // console.log(toTranslate)
  return (
    <ThemeUIText
      {...props}
      sx={{
        variant: `text.${variant}`,
        color,
        fontWeight: weight,
        fontSize: size,
      }}
    >
      {children}
    </ThemeUIText>
  )
}

export default Text
