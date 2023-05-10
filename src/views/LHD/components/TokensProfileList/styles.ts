import { desktopMappedColumns, mobileMappedColumns } from './columnsFormat'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<
  | 'headerContainer'
  | 'headerText'
  | 'tableContainer'
  | 'tableRowContainer'
  | 'indexCol'
  | 'indexText'
  | 'nameCol'
  | 'nameText'
  | 'usdCol'
  | 'barCol'
  | 'barContainer'
  | 'scoreCol',
  ThemeUIStyleObject> = {
  headerContainer: {
    display: 'grid',
    width: 'fit-content',
    gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
    position: 'sticky',
    top: 0,
    background: 'white2',
    zIndex: 10,
    borderColor: 'transparent transparent #ccc transparent',
    justifyItems: 'center',
  },
  headerText: {
    fontWeight: [400, 400, 500],
    fontSize: ['8px', '8px', '12px'],
  },
  tableContainer: {
    width: ['100vw', '100vw', '100%'],
    overflowY: 'auto',
    position: 'relative',
    mt: '20px',
    ml: ['-20px', '-20px', 0],
    borderRadius: '10px',
    '::-webkit-scrollbar': {
      height: '3px',
      background: 'white3',
      width: '98%',

    },
    '::-webkit-scrollbar-thumb': {
      background: 'textDisabled',
      borderRadius: '8px',
    },
    '::-webkit-scrollbar-track': {
      background: 'white3',
      color: 'input',
      borderRadius: '10px',
    },
  },
  tableRowContainer: {
    width: 'fit-content',
    display: 'grid',
    gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
    borderColor: 'transparent transparent #ccc transparent',
    cursor: 'pointer',
  },
  indexCol: {
    padding: '8px',
    position: 'sticky',
    left: 0,
    zIndex: 2,
    justifyContent: 'center',
    height: '40px',
    minWidth: '25px'
  },
  indexText: {
    fontWeight: 300,
    fontSize: ['12px'],
    color: 'textDisabled',
  },
  nameCol: {
    padding: '8px',
    position: 'sticky',
    left: 25,
    zIndex: 2,
    height: '40px',
    minWidth: '140px',
    alignItems: 'center',
  },
  nameText: {
    fontWeight: 500,
    fontSize: ['10px', '10px', '10px', '12px'],
    lineHeight: ['18px'],
    ml: '5px',
  },
  usdCol: {
    padding: '8px',
    justifyContent: 'center',
    height: '40px',
    fontWeight: 400,
    fontSize: ['10px', '10px', '10px', '12px'],
  },
  barCol: {
    width: '100%',
    justifyContent: 'center',
  },
  barContainer: {
    padding: '8px',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40px',
    minWidth: ['80px', '80px', '133px'],
  },
  scoreCol: {
    padding: '8px',
    position: 'sticky',
    right: 0,
    zIndex: 2,
    justifyContent: 'center',
    height: '40px',
  },
}

