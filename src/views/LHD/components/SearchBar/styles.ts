import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<'searchBarContainer' | 'btn' | 'filterBtn' | 'filterBtnActive', ThemeUIStyleObject> = {
  searchBarContainer: {
    position: 'relative',
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
    background: 'white3',
  },
  filterBtn: {
    height: '34px',
    background: 'white4',
    fontWeight: '500',
    border: 'none',
  },
  filterBtnActive: {
    height: '34px',
    background: 'inheit',
    fontWeight: '500',
    border: 'none',
  },
}
