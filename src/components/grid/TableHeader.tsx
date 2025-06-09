import styled from '@emotion/styled';
import type { ColumnDefinition } from './GridTable';
import type { ThHTMLAttributes } from 'react';

// Types/interfaces
interface TableHeaderProps<T> {
  columns: ColumnDefinition<T>[];
  sortConfig: { key: keyof T | null; direction: 'asc' | 'desc' };
  handleSort: (accessor: keyof T) => void;
  setSearch: (key: string, value: string) => void;
}

// Component definition
function TableHeader<T extends { id: number | string }>({
  columns,
  sortConfig,
  handleSort,
  setSearch,
}: TableHeaderProps<T>) {
  return (
    <thead>
      <tr role="row">
        {columns.map((column, index) => {
          const isSorted = sortConfig.key === column.accessor;
          const accessor = column.accessor;

          return (
            <Th
              key={index}
              width={column.width}
              sortable={column.sortable}
              isSorted={isSorted}
              onClick={() =>
                column.sortable && typeof accessor === 'string'
                  ? handleSort(accessor)
                  : undefined
              }
              role="columnheader"
              aria-sort={
                isSorted
                  ? sortConfig.direction === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : undefined
              }
              tabIndex={column.sortable ? 0 : -1}
              onKeyDown={(e) => {
                if (
                  (e.key === 'Enter' || e.key === ' ') &&
                  column.sortable &&
                  typeof accessor === 'string'
                ) {
                  e.preventDefault();
                  handleSort(accessor);
                }
              }}
            >
              <Container>
                {column.header}
                {column.sortable && (
                  <SortIcon
                    direction={isSorted ? sortConfig.direction : undefined}
                    aria-hidden="true"
                  />
                )}
                {column.filterable && typeof accessor === 'string' && (
                  <FilterInput
                    type="text"
                    aria-label={`Filter ${column.header}`}
                    placeholder={`Filter...`}
                    onChange={(e) => {
                      e.stopPropagation();
                      setSearch(accessor, e.target.value);
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === 'Enter') {
                        handleSort(accessor);
                      }
                    }}
                  />
                )}
              </Container>
            </Th>
          );
        })}
      </tr>
    </thead>
  );
}

// Styled components
const Th = styled.th<
  {
    width?: string;
    sortable?: boolean;
    isSorted?: boolean;
  } & ThHTMLAttributes<HTMLTableCellElement>
>`
  background-color: ${({ isSorted }) => (isSorted ? '#435060' : '#607085')};
  color: #fff;
  font-size: 12px;
  font-family: 'Lato', sans-serif;
  text-transform: uppercase;
  height: 45px;
  min-height: 45px;
  padding: 0 1rem;
  text-align: left;
  border-bottom: 1px solid #607085;
  width: ${(props) => props.width || 'auto'};
  cursor: ${(props) => (props.sortable ? 'pointer' : 'default')};
  user-select: none;
  position: relative;

  &:hover {
    background-color: ${({ isSorted }) => (isSorted ? '#435060' : '#4d5a6a')};
  }

  &:focus {
    outline: 2px solid #646cff;
    outline-offset: -2px;
  }
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const FilterInput = styled.input`
  width: 90%;
  margin-top: 0.25rem;
  padding: 0.3rem 0.5rem;
  font-size: 12px;
  height: 26px;
  border: 1px solid #ccc;
  border-radius: 16px;
  box-sizing: border-box;
  background: #fff;
  color: #131516;
  font-family: 'Lato', sans-serif;
`;

const SortIcon = styled.span<{ direction?: 'asc' | 'desc' }>`
  margin-left: 0.5rem;
  color: #fff;
  &::after {
    content: ${(props) =>
      props.direction === 'asc'
        ? '"↑"'
        : props.direction === 'desc'
          ? '"↓"'
          : '"↕"'};
  }
`;

// Export default at the end
export default TableHeader;
