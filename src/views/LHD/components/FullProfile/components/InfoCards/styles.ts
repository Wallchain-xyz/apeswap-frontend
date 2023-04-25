import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'mainContainer'
  | 'cardContainer'
  | 'titleContainer'
  | 'titleText'
  | 'healthRowsContainer',
  ThemeUIStyleObject> = {
  mainContainer: {
    width: '100%',
    flexDirection: 'column',
  },
  cardContainer: {
    width: '100%',
    background: 'white2',
    borderRadius: '10px',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    height: 'fit-content',
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    mt: ['20px'],
  },
  titleText: {
    fontWeight: 600,
    fontSize: ['16px'],
    lineHeight: ['20px'],
  },
  healthRowsContainer: {
    width: '100%',
    mt: ['10px'],
    p: ['20px'],
    flexDirection: 'column',
  },
}