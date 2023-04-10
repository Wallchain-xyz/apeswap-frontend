import React from 'react'
import { SvgProps, rotation } from './types'

const BillsM3: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, getStyles }) => {
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
    <svg xmlns="http://www.w3.org/2000/svg" width={width || '48'} viewBox="0 0 48 48" fill="none" sx={style}>
      <rect
        x="1"
        y="1.21704"
        width="45.2941"
        height="45.2941"
        rx="22.6471"
        sx={{ fill: 'white4' }}
        stroke={color}
        strokeWidth="2"
      />
      <path
        d="M34 16.0408H13C11.8954 16.0408 11 16.9362 11 18.0408V30.0408C11 31.1453 11.8954 32.0408 13 32.0408H34C35.1046 32.0408 36 31.1453 36 30.0408V18.0408C36 16.9362 35.1046 16.0408 34 16.0408Z"
        fill={color}
      />
      <path
        d="M22.6978 20.6436C22.6978 20.4991 22.8025 20.3625 23.012 20.234C23.2215 20.1054 23.4974 20.0408 23.8398 20.0408C24.1049 20.0408 24.2754 20.104 24.3527 20.2289C24.4076 20.3168 24.4357 20.3981 24.4357 20.4736V20.7562C25.0591 20.8317 25.4922 20.9631 25.7356 21.1513C25.8352 21.2268 25.8844 21.2987 25.8844 21.3677C25.8844 21.6938 25.8167 22.0453 25.6819 22.4215C25.5465 22.7977 25.4156 22.9866 25.2885 22.9866C25.2661 22.9866 25.1946 22.9582 25.0732 22.9016C24.7091 22.72 24.407 22.6285 24.1668 22.6285C23.9267 22.6285 23.7638 22.6539 23.6782 22.704C23.5926 22.7542 23.5498 22.8311 23.5498 22.9343C23.5498 23.0374 23.6105 23.118 23.7319 23.174C23.8532 23.2306 24.0033 23.2793 24.1828 23.3199C24.3623 23.3606 24.5577 23.4282 24.7704 23.5226C24.9825 23.617 25.1799 23.7296 25.3625 23.8617C25.5446 23.9932 25.6966 24.19 25.818 24.45C25.9393 24.7108 26 24.9759 26 25.2453C26 25.5148 25.9776 25.7377 25.9336 25.9135C25.8895 26.0893 25.8135 26.2708 25.7062 26.4597C25.5989 26.6485 25.436 26.8155 25.2176 26.963C24.9997 27.1104 24.7385 27.2186 24.4351 27.2876V27.438C24.4351 27.5825 24.3304 27.719 24.1208 27.8476C23.9113 27.9761 23.6354 28.0408 23.2931 28.0408C23.028 28.0408 22.8568 27.9783 22.7795 27.8527C22.7246 27.7648 22.6965 27.6834 22.6965 27.6079V27.3254C22.3375 27.2876 22.0258 27.2281 21.7614 27.1467C21.2536 26.9898 21 26.8206 21 26.6383C21 26.2868 21.0441 25.9215 21.1322 25.5416C21.2204 25.1618 21.3251 24.9722 21.4465 24.9722C21.4682 24.9722 21.6975 25.0572 22.1338 25.2264C22.5694 25.3957 22.8983 25.4806 23.1187 25.4806C23.339 25.4806 23.4828 25.4538 23.5492 25.4007C23.6156 25.3477 23.6488 25.2707 23.6488 25.1705C23.6488 25.0703 23.5881 24.9838 23.4668 24.9119C23.3454 24.84 23.1934 24.7819 23.0114 24.7376C22.8293 24.6941 22.632 24.6243 22.4193 24.5306C22.2066 24.4362 22.0092 24.3266 21.8272 24.2009C21.6451 24.0753 21.4931 23.8901 21.3717 23.6453C21.2504 23.4006 21.1897 23.1151 21.1897 22.789C21.1897 21.6342 21.6917 20.9602 22.6965 20.7656V20.6429L22.6978 20.6436Z"
        sx={{ fill: 'white4' }}
      />
    </svg>
  )
}

export default BillsM3
