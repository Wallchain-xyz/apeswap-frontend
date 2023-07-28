import { NAV_DESKTOP_DISPLAY } from 'components/NavBarNew/styles'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'networkSelectContainer'
  | 'networkSelectorText'
  | 'networkDropdownMainContainer'
  | 'networkOptionContainer'
  | 'networkOptionContent',
  ThemeUIStyleObject
> = {
  networkSelectContainer: {
    cursor: 'pointer',
    '&:hover': { bg: 'navbar' },
    height: '34px',
    padding: '10px',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '7px',
    borderRadius: '6px',
    position: 'relative',
    bg: ['navbar', 'navbar', 'navbar', 'navbar', 'transparent'],
  },
  networkSelectorText: {
    display: NAV_DESKTOP_DISPLAY,
    m: '0px 7.5px',
    lineHeight: '0px',
    fontSize: '14px',
  },
  networkDropdownMainContainer: {
    flexDirection: 'column',
    position: 'absolute',
    top: '35px',
    right: '0px',
    width: ['190px', '190px', '190px', '190px', '220px'],
    px: '15px',
    py: '10px',
    borderRadius: 'normal',
    backdropFilter: 'blur(15px)',
  },
  networkOptionContainer: {
    borderRadius: '10px',
    margin: '5px 0px',
    padding: '0px 10px',
    height: '45px',
    '&:hover': { bg: 'white3' },
  },
  networkOptionContent: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}
