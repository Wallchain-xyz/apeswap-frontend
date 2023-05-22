export const columnWidths = [30, 195, 120, 120, 120, 153, 152, 152, 68]
export const mobileColumnWidths = [30, 185, 62, 65, 55, 70, 70, 70, 43]
export const desktopMappedColumns = columnWidths.map((width) => `${width}px`).join(' ')
export const mobileMappedColumns = mobileColumnWidths.map((width) => `${width}px`).join(' ')
