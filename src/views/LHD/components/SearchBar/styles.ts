import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<'searchBarContainer' | 'btn', ThemeUIStyleObject> = {
  searchBarContainer: {
    width: '100%',
    mt: '20px',
    backgroundColor: 'white2',
    padding: '5px',
    borderRadius: '10px',
    justifyContent: 'space-between',
  },
  btn: {
    ml: '10px',
    width: '100%',
    maxWidth: '88px',
    color: 'text',
    fontSize: '10px',
    height: '36px',
    lineHeight: '14px',
    alignItems: 'center',
  }
}


