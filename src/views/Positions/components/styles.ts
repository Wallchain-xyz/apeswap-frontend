import { ThemeUIStyleObject } from 'theme-ui'

export const MOBILE_DISPLAY = ['flex', 'flex', 'flex', 'flex', 'flex', 'none']
export const DESKTOP_DISPLAY = ['none', 'none', 'none', 'none', 'none', 'flex']

const styles: Record<'subContainer' | 'positionCardContainer', ThemeUIStyleObject> = {
  subContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    background: 'white4',
    borderRadius: '10px',
    padding: '7.5px 10px',
  },
  positionCardContainer: {
    minHeight: '80px',
    background: 'white3',
    borderRadius: '10px',
    justifyContent: 'center',
    padding: '10px',
    margin: '5px 0px',
    flexDirection: 'column',
    cursor: 'pointer',
    color: 'yellow',
  },
}

export default styles
