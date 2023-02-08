import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<
  | 'swapSwitchContainer'
  | 'swapSwitchButton'
  | 'SwapConfirmDisabledInputContainer'
  | 'outerLogoCircle'
  | 'innerLogoCircle'
  | 'dexTradeInfoContainer',
  ThemeUIStyleObject
> = {
  swapSwitchContainer: {
    width: '100%',
    height: '50px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  swapSwitchButton: {
    background: 'yellow',
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    justifyContent: 'center',
    border: '1px solid',
    color: 'primaryBright',
    paddingRight: '1px',
    cursor: 'pointer',
    transition: 'all .3s linear',
    '&:active': {
      transform: 'scale(0.9)',
    },
    // ':hover': buttonHover,
  },
  SwapConfirmDisabledInputContainer: {
    backgroundColor: 'white3',
    borderRadius: '10px',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: '10px',
    height: '60px',
  },
  outerLogoCircle: {
    zIndex: 1,
    height: '30px',
    width: '30px',
    borderRadius: '30px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white2',
    flexDirection: 'column',
  },
  innerLogoCircle: {
    height: '22.5px',
    width: '22.5px',
    borderRadius: '22.5px',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'yellow',
    paddingRight: '.6px',
  },
  dexTradeInfoContainer: {
    border: '2px solid',
    marginTop: '10px',
    borderRadius: '10px',
    borderColor: 'white3',
    background: 'white3',
    padding: '5px 10px',
    width: '100%',
    flexDirection: 'column',
    height: 'fit-content',
    cursor: 'pointer',
    overflow: 'hidden',
  },
}

export default styles
