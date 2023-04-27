import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  mainContainer: {
    width: '100%',
    flexDirection: ['column', 'column', 'column', 'row']
  },
  leftContainer: {
    width: ['100%', '100%', 'unset'],
    minWidth: ['', '', '', '460px'],
    background: 'white2',
    borderRadius: '10px',
    padding: '20px',
    alignItems: 'flex-start',
    mr: ['0px', '0px', '0px', '20px'],
  },
  nameBtnContainer: {
    width: '100%',
    alignItems: ['flex-start'],
    flexDirection: ['column', 'column', 'row']
  },
  iconImgCont: {
    minWidth: '25px',
    height: '25px',
    mt: ['2px'],
    background: '#fff',
    borderRadius: '25px',
    alignItems: 'center',
    justifyContent: 'center',
  }
}