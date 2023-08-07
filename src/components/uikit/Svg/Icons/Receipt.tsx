import React from 'react'
import { SvgProps, rotation } from './types'

const Caret: React.FC<SvgProps> = ({ direction = 'down', color = 'text', width, getStyles }) => {
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
    <svg width={width || '14'} viewBox="0 0 14 18" fill="none" xmlns="http://www.w3.org/2000/svg" sx={style}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.375 0C12.0712 0 12.7389 0.284462 13.2312 0.790807C13.7234 1.29715 14 1.9839 14 2.69998V17.0999C13.9999 17.2694 13.9533 17.4354 13.8654 17.5789C13.7776 17.7223 13.6522 17.8374 13.5036 17.9107C13.3551 17.9841 13.1894 18.0128 13.0256 17.9935C12.8619 17.9743 12.7068 17.9078 12.5781 17.8019L10.9375 16.4519L9.29688 17.8019C9.1288 17.9404 8.91696 18.0103 8.70192 17.9982C8.48688 17.986 8.28373 17.8928 8.13138 17.7362L7 16.5725L5.86862 17.7362C5.71638 17.8929 5.51329 17.9863 5.29825 17.9986C5.08321 18.0109 4.87131 17.9412 4.70312 17.8028L3.0625 16.4519L1.42188 17.8019C1.29323 17.9078 1.1381 17.9743 0.974365 17.9935C0.810628 18.0128 0.644934 17.9841 0.49636 17.9107C0.347786 17.8374 0.222373 17.7223 0.13456 17.5789C0.0467462 17.4354 0.000102935 17.2694 0 17.0999V2.69998C0 1.9839 0.276562 1.29715 0.768845 0.790807C1.26113 0.284462 1.92881 0 2.625 0H11.375ZM7 8.99995H4.375C4.14294 8.99995 3.92038 9.09477 3.75628 9.26355C3.59219 9.43233 3.5 9.66125 3.5 9.89994C3.5 10.1386 3.59219 10.3676 3.75628 10.5363C3.92038 10.7051 4.14294 10.7999 4.375 10.7999H7C7.23206 10.7999 7.45462 10.7051 7.61872 10.5363C7.78281 10.3676 7.875 10.1386 7.875 9.89994C7.875 9.66125 7.78281 9.43233 7.61872 9.26355C7.45462 9.09477 7.23206 8.99995 7 8.99995ZM9.625 5.39997H4.375C4.15198 5.40022 3.93747 5.48806 3.7753 5.64553C3.61313 5.803 3.51554 6.01822 3.50247 6.24722C3.4894 6.47622 3.56184 6.7017 3.70498 6.87761C3.84812 7.05352 4.05117 7.16657 4.27263 7.19366L4.375 7.19996H9.625C9.84802 7.1997 10.0625 7.11187 10.2247 6.9544C10.3869 6.79693 10.4845 6.5817 10.4975 6.35271C10.5106 6.12371 10.4382 5.89822 10.295 5.72232C10.1519 5.54641 9.94883 5.43336 9.72738 5.40627L9.625 5.39997Z"
        fill="#4D4040"
      />
    </svg>
  )
}

export default Caret
