import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  mainContainer: {
    mt: '30px',
    width: '100%',
    flexDirection: 'column',
  },
  topContainer: {
    width: '100%',
    justifyContent: 'space-between'
  },
  back: {
    fontSize: ['12px', '12px', '12px', '14px'],
    lineHeight: '20px',
    display: 'flex',
    alignItems: 'center',
  },
  lastUpdated: {
    fontWeight: 300,
    fontSize: ['10px', '10px', '10px', '12px'],
    color: 'textDisabled',
  },


}