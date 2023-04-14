import React from 'react'
import { FixedSizeList as List } from 'react-window'
import { Box } from 'theme-ui'

const columnWidths = [100, 150, 200, 100, 150, 200, 100, 150]
const tableWidth = columnWidths.reduce((acc, width) => acc + width, 0)
const adjustedTableWidth = tableWidth + 18 // Add 17 pixels to account for the hidden scrollbar

const TableHeader = () => {

  return (
    <Box
      sx={{
        display: 'grid',
        width: adjustedTableWidth,
        gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' '),
        position: 'sticky',
        top: 0,
        background: 'white',
        zIndex: 10,
        border: '1px solid #ccc',
        borderColor: 'transparent transparent #ccc transparent',
      }}
    >
      {['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5', 'Column 6', 'Column 7', 'Column 8'].map((header, index) => (
        <Box
          key={index}
          sx={{
            padding: '8px',
            position: index === 0 || index === 7 ? 'sticky' : undefined,
            left: index === 0 ? 0 : undefined,
            right: index === 7 ? 0 : undefined,
            zIndex: index === 0 || index === 7 ? 2 : 1,
            background: 'white',
          }}
        >
          {header}
        </Box>
      ))}
    </Box>
  )
}

const TableRow = ({ index, style }: { index: any, style: any }) => {
  return (
    <Box
      sx={{
        ...style,
        width: adjustedTableWidth,
        display: 'grid',
        gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(' '),
        border: '1px solid #ccc',
        borderColor: 'transparent transparent #ccc transparent',
      }}
    >
      {Array.from({ length: 8 }).map((_, columnIndex) => (
        <Box
          key={columnIndex}
          sx={{
            padding: '8px',
            position: columnIndex === 0 || columnIndex === 7 ? 'sticky' : undefined,
            left: columnIndex === 0 ? 0 : undefined,
            right: columnIndex === 7 ? 0 : undefined,
            zIndex: columnIndex === 0 || columnIndex === 7 ? 2 : 1,
            background: 'white',
          }}
        >
          {columnIndex === 0 || columnIndex === 7
            ? `Sticky`
            : `Row ${index + 1}`}
        </Box>
      ))}
    </Box>
  )
}

// eslint-disable-next-line react/display-name
const InnerListWrapper = React.forwardRef((props, ref) => {
  //@ts-ignore
  const { children, ...rest } = props;
  return (
    <Box ref={ref} {...rest}>
      <TableHeader />
      <Box>{children}</Box>
    </Box>
  );
});

const MyTable = () => {
  const itemCount = 51; // Increase by 1 to account for the header
  const itemHeight = 40;

  return (
    <Box
      sx={{
        width: '100%',
        overflowY: 'auto',
        position: 'relative',
        mt: '20px'
      }}
    >
      <List
        height={itemHeight * 10}
        itemCount={itemCount}
        itemSize={itemHeight}
        width="100%"
        innerElementType={InnerListWrapper}
      >
        {TableRow}
      </List>
    </Box>
  );
};

export default MyTable;