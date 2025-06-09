import styled from '@emotion/styled'
import type { ReactNode, KeyboardEvent } from 'react'
import type { ColumnDefinition } from './GridTable'

// Types/interfaces
interface TableBodyProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  focusedRow: number | null;
  handleRowClick: (id: number | string) => void;
  handleKeyDown: (e: KeyboardEvent, id: number | string, index: number) => void;
  renderCell: (item: T, accessor: ColumnDefinition<T>['accessor']) => ReactNode;
}

// Component definition
function TableBody<T extends { id: number | string }>(
  { data, columns, focusedRow, handleRowClick, handleKeyDown, renderCell }: TableBodyProps<T>
) {
  return (
    <tbody>
      {data.map((item, index) => (
        <Tr 
          key={item.id} 
          onClick={() => handleRowClick(item.id)}
          onKeyDown={(e) => handleKeyDown(e, item.id, index)}
          role="row"
          tabIndex={0}
          aria-rowindex={index + 1}
          aria-selected={focusedRow === index}
        >
          {columns.map((column, colIndex) => (
            <Td 
              key={colIndex}
              role="gridcell"
              aria-colindex={colIndex + 1}
            >
              {renderCell(item, column.accessor)}
            </Td>
          ))}
        </Tr>
      ))}
    </tbody>
  );
}

// Styled components
const Td = styled.td`
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  color: #131516;
  background: #fff;
  height: 45px;
  min-height: 45px;
  padding: 0 1rem;
  border-bottom: 1px solid #607085;
`

const Tr = styled.tr`
  &:hover {
    background-color: #f8f8f8;
  }

  &:focus-within {
    outline: 2px solid #646cff;
    outline-offset: -2px;
  }
`

// Export default at the end
export default TableBody; 