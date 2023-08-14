import { ThemeUIStyleObject } from 'theme-ui'
import { MOBILE_DISPLAY } from 'theme/display'

export const styles: Record<
  | 'menuContainer'
  | 'expandedButton'
  | 'container'
  | 'selectContainer'
  | 'searchInput'
  | 'expandedContainer'
  | 'filterChainBtn'
  | 'chainIconCont'
  | 'bondCard'
  | 'mainContent'
  | 'imageCont'
  | 'markets'
  | 'bondInfo'
  | 'buyNow'
  | 'discount'
  | 'discountAmount'
  | 'hoverContainer',
  ThemeUIStyleObject
> = {
  menuContainer: {
    borderRadius: '10px',
    justifyContent: 'space-between',
    padding: '10px 20px',
    zIndex: 2,
    backgroundColor: 'white2',
    minWidth: '300px',
    width: '100%',
    alignItems: 'center',
    flexDirection: ['column', 'column', 'column', 'row'],
    p: ['10px 20px', '10px 20px', '10px 20px', '10px'],
  },
  expandedButton: {
    display: ['flex', 'flex', 'flex', 'none'],
    backgroundColor: 'lvl1',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
    ml: '10px',
  },
  container: {
    width: ['100%', '100%', '100%', 'unset'],
    justifyContent: 'space-between',
    maxWidth: '353px',
    marginTop: ['15px', '15px', '15px', '0'],
  },
  selectContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  searchInput: {
    borderRadius: '10px',
    fontWeight: 800,
    border: 'none',
    width: '100%',
    '@media screen and (min-width: 852px)': {
      width: '120px',
    },
    '@media screen and (min-width: 1000px)': {
      width: '240px',
    },
  },
  expandedContainer: {
    position: 'relative',
    width: '100%',
    justifyContent: 'center',
    overflow: 'hidden',
    display: 'flex',
    flexWrap: 'wrap',
  },
  filterChainBtn: {
    background: 'white3',
    borderRadius: '10px',
    padding: '8px',
    cursor: 'pointer',
    margin: '0px 0px 0px 10px',
  },
  chainIconCont: {
    borderRadius: '18px',
    width: '20px',
    height: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bondCard: {
    position: 'relative',
    cursor: 'pointer',
    ':hover > div:last-of-type': {
      visibility: 'visible',
      opacity: 1,
      transition: 'opacity 0.3s',
      bg: 'white2Opacity09',
      borderRadius: '15px',
      backdropFilter: 'blur(1.5px)',
    },
    width: ['100%', '100%', '100%', 'calc(25% - 9px)'],
    background: 'white2',
    borderRadius: '15px',
    height: ['52px', '52px', '52px', '100px'],
    justifyContent: 'space-between',
    mb: '15px',
    ':not(:first-of-type, :nth-of-type(4n+5))': {
      ml: ['0px', '0px', '0px', '12px'],
    },
  },
  mainContent: {
    width: '100%',
    height: '100%',
  },
  imageCont: {
    alignItems: 'center',
    minWidth: ['32px', '32px', '32px', '40px', '60px'],
  },
  markets: {
    fontWeight: 300,
    fontSize: ['10px', '10px', '10px', '12px'],
    color: 'textDisabled',
    lineHeight: '14px',
  },
  bondInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    px: '15px',
    width: ['120px', '120px', '120px', '80px'],
  },
  buyNow: {
    display: MOBILE_DISPLAY,
    fontSize: '10px',
    fontWeight: 700,
    color: 'yellow',
  },
  discount: {
    fontSize: ['10px', '10px', '10px', '12px'],
    lineHeight: ['14px'],
    fontWeight: 300,
    color: 'textDisabled',
    mr: '5px',
  },
  discountAmount: {
    fontSize: ['12px', '12px', '12px', '14px'],
    lineHeight: '14px',
  },
  hoverContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    visibility: 'hidden',
    opacity: 0,
    transition: 'opacity 0.3s ease',
    cursor: 'pointer',
  },
}
