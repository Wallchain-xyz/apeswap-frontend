import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  'mainContainer' | 'contentContainer' | 'visibleIcon' | 'invisibleIcon',
  ThemeUIStyleObject
> = {
  mainContainer: {
    width: '100%',
    fontSize: ['7px', '10px', '12px', '14px'],
    justifyContent: 'center',
    fontWeight: 200,
    background: 'gradient',
    color: 'white',
    borderRadius: '10px',
    padding: '10px',
    mb: '10px',
    position: 'relative',
    overflow: 'hidden',
  },
  contentContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  visibleIcon: {
    marginRight: '5px',
  },
  invisibleIcon: {
    position: 'absolute',
    left: '-1',
    top: '10',
    opacity: 0.2,
  },
}
