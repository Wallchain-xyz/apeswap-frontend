import React from 'react'
import { Button, Link, Svg } from '../../../../../components/uikit'

const IconButton = ({ href, icon }: {
  href: string | undefined,
  icon: 'URL' | 'tickShield' | 'twitter' | 'send' | 'discord'
}) => {
  return (
    <Button variant='tertiary'
            disabled={!href}
            sx={{
              background: 'white4',
              padding: '2px 5px',
              borderRadius: '8px',
              mr: '5px',
              height: '19px',
              alignItems: 'center',
              lineHeight: '12px',
            }}>
      {
        href ? (
          <Link href={href ?? ''} target='_blank' sx={{lineHeight: '8px'}}>
            <Svg icon={icon} width={10} color={!href ? 'textDisabled' : 'text'} />
          </Link>
        ) : (
          <Svg icon={icon} width={10} color={!href ? 'textDisabled' : 'text'} />
        )
      }
    </Button>
  )
}

export default IconButton