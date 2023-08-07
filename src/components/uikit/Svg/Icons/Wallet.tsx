import React from 'react'
import { SvgProps, rotation } from './types'

const Wallet: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, height, getStyles }) => {
  const deg: rotation = {
    left: 90,
    up: 180,
    right: 270,
    down: 0,
  }
  const style = getStyles({
    degree: deg[direction as keyof rotation],
    color,
  })

  return (
    <svg
      width={width || '24'}
      height={height || '20'}
      viewBox="0 0 24 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      sx={style}
    >
      <g clipPath="url(#clip0_1645_45175)">
        <path
          d="M23.9997 3.09237V5.7034H16.5218C14.1861 5.7034 12.2935 7.59651 12.2935 9.93165C12.2935 12.2668 14.1861 14.1599 16.5218 14.1599H23.9997V16.778C23.9868 16.8062 23.9663 16.8332 23.9633 16.8625C23.796 18.3482 22.4782 19.8662 20.4225 19.8633C14.8065 19.8557 9.19059 19.8645 3.57464 19.8527C3.16725 19.8516 2.74167 19.7911 2.35659 19.6626C0.903732 19.1777 0.00560267 17.881 0.00325462 16.3207C-0.000267455 13.6962 0.00266761 11.0716 0.00266761 8.44709C0.00266761 6.79935 -0.00437654 5.15102 0.00442864 3.50328C0.0149949 1.63892 1.37452 0.149674 3.22419 0.0381416C4.29842 -0.0258427 5.37911 0.010552 6.45687 0.010552C9.66254 0.00879101 16.793 0.00468192 20.9079 0.00233388C22.6156 0.00115985 23.9997 1.38475 23.9997 3.09237Z"
          fill="#FAFAFA"
        />
        <path
          d="M16.5444 6.92438C16.5367 6.92438 16.5297 6.92438 16.5221 6.92438C14.8708 6.93612 13.5371 8.27803 13.5371 9.93106C13.5371 11.5841 14.8708 12.926 16.5221 12.9377C16.5297 12.9383 16.5367 12.9383 16.5444 12.9383H24V6.9238H16.5444V6.92438ZM16.5444 11.2066C16.5391 11.2072 16.5332 11.2072 16.5279 11.2072H16.5221C15.8206 11.2043 15.2524 10.6343 15.2524 9.93165C15.2524 9.229 15.8206 8.65959 16.5221 8.65666H16.5279C16.5332 8.65666 16.5391 8.65666 16.5444 8.65724C17.2412 8.66546 17.8035 9.23252 17.8035 9.93165C17.8035 10.6308 17.2412 11.1984 16.5444 11.2066Z"
          fill="#FAFAFA"
        />
      </g>
      <defs>
        <clipPath id="clip0_1645_45175">
          <rect width="24" height="19.8633" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Wallet
