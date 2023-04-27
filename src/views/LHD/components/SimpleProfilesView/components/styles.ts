import { desktopMappedColumns, mobileMappedColumns } from '../columnsFormat'
import { ThemeUIStyleObject } from 'theme-ui'

export const styles: Record<string, ThemeUIStyleObject> = {
  headerContainer: {
    display: 'grid',
    width: 'fit-content',
    gridTemplateColumns: [mobileMappedColumns, mobileMappedColumns, desktopMappedColumns],
    position: 'sticky',
    top: 0,
    background: 'white2',
    zIndex: 10,
    borderColor: 'transparent transparent #ccc transparent',
    justifyItems: 'center'
  },
  headerText: {
    fontWeight: [400, 400, 500],
    fontSize: ['8px', '8px', '12px'],
  }
}

