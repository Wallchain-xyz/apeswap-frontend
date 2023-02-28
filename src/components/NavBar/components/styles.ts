import { ThemeUIStyleObject } from 'theme-ui'

export const NAV_HEIGHT = 60
export const NAV_MOBILE_DISPLAY = ['flex', 'flex', 'flex', 'flex', 'none']
export const NAV_DESKTOP_DISPLAY = ['none', 'none', 'none', 'none', 'flex']

const styles: Record<
  | 'container'
  | 'menuItemContainer'
  | 'desktopSubMenuContainer'
  | 'desktopSubMenuItem'
  | 'mobileSubMenuContainer'
  | 'mobileSubItemContainer',
  ThemeUIStyleObject
> = {
  container: {
    position: 'fixed',
    zIndex: 99,
    padding: '0px 25px',
    alignContent: 'center',
    justifyContent: 'space-between',
    background: 'navbar',
    width: '100vw',
    height: `${NAV_HEIGHT}px`,
    borderBottom: '2px solid',
    borderColor: 'white3',
  },
  menuItemContainer: {
    position: 'relative',
    cursor: 'pointer',
    height: '100%',
    alignItems: 'center',
    padding: '2px 7.5px 0px 7.5px',
    margin: '0px 22.5px',
    textDecoration: 'none',
    display: NAV_DESKTOP_DISPLAY,
  },
  desktopSubMenuContainer: {
    position: 'absolute',
    top: '100%',
    left: '0px',
    width: '429px',
    minHeight: '316px',
    backgroundColor: 'navbar',
    borderRadius: '0px 0px 30px 30px',
    cursor: 'default',
  },
  desktopSubMenuItem: {
    width: 'fit-content',
    margin: '5px',
    cursor: 'pointer',
    textDecoration: 'none',
    ':hover': { boxShadow: '0px 2px 0px 0px', color: 'text' },
  },
  mobileSubMenuContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0px 20px',
    height: '50px',
    borderBottom: '1px solid',
    borderColor: 'white3',
    cursor: 'pointer',
  },
  mobileSubItemContainer: {
    alignItems: 'center',
    padding: '0px 30px',
    height: '40px',
    background: 'white3',
    cursor: 'pointer',
    ':hover': {
      background: 'white4',
    },
  },
}

export default styles
