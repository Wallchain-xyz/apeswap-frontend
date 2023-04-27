import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'titleContainer'
  | 'titleText'
  | 'detailText'
  | 'btnText'
  | 'cardsContainer', ThemeUIStyleObject> = {
  mainContainer: {
    width: '100%',
    flexDirection: ['column', 'column', 'column', 'row'],
    mt: '30px',
  },
  titleContainer: {
    width: ['100%', '100%', '100%', '50%'],
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleText: {
    fontWeight: 700,
    fontSize: ['16px', '16px', '16px', '30px'],
    lineHeight: ['24px', '24px', '24px', '45px'],
  },
  detailText: {
    fontWeight: 500,
    fontSize: ['12px', '12px', '12px', '16px'],
    lineHeight: ['18px', '18px', '18px', '24px'],
  },
  btnText: {
    fontWeight: 500,
    fontSize: ['12px', '12px', '12px', '16px'],
    lineHeight: ['18px', '18px', '18px', '24px'],
    mr: '10px',
  },
  cardsContainer: {
    width: ['100%', '100%', '100%', '50%'],
    mt: ['15px', '15px', '15px', 0],
    justifyContent: ['space-between', 'space-between', 'space-between', 'flex-start'],
  },
}