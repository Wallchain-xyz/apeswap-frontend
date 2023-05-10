export const columnWidths = [25, 140, 130, 130, 130, 163, 162, 162, 68]
export const mobileColumnWidths = [25, 140, 70, 65, 65, 80, 80, 80, 48]
export const desktopMappedColumns = columnWidths.map((width) => `${width}px`).join(' ')
export const mobileMappedColumns = mobileColumnWidths.map((width) => `${width}px`).join(' ')