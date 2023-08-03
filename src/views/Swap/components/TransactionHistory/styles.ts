import { ThemeUIStyleObject } from 'theme-ui'

const styles: Record<'historicalTxContainer' | 'emptyHistoryContainer' | 'statusContainer', ThemeUIStyleObject> = {
  historicalTxContainer: {
    height: '150px',
    flexDirection: 'column',
    bg: 'white3',
    borderRadius: '10px',
    py: '6px',
    px: '10px',
    gap: '8px',
    position: 'relative',
    ':hover': {
      bg: 'white4',
    },
  },
  emptyHistoryContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    gap: '10px',
  },
  statusContainer: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },
}

export default styles
