import styled from '@emotion/styled'
import type { ReactNode, KeyboardEvent } from 'react'
import { useState, useRef, useMemo, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import throttle from 'lodash/throttle'
import PaginationControls from './PaginationControls'
import TableHeader from './TableHeader'
import TableBody from './TableBody'
import type { GridDataType } from '../../config/gridConfig'
import { debounce } from 'lodash'

export interface ColumnDefinition<T> {
  header: string
  accessor: keyof T | ((item: T) => ReactNode)
  width?: string
  sortable?: boolean
  filterable?: boolean
}

export interface DetailsFieldRenderer<T> {
  field: keyof T
  render: (value: T[keyof T], item: T) => ReactNode
}

interface GridTableProps<T> {
  data: T[]
  columns: ColumnDefinition<T>[]
  title?: string
  dataType: GridDataType
}

function GridTable<T extends { id: number | string }>({ 
  data, 
  columns, 
  title = 'Grid Table',
  dataType,
}: GridTableProps<T>) {
  const navigate = useNavigate()
  const location = useLocation()
  const tableRef = useRef<HTMLTableElement>(null)

  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null
    direction: 'asc' | 'desc'
  }>({ key: null, direction: 'asc' })
  const [focusedRow, setFocusedRow] = useState<number | null>(null)
  const [filters, setFilters] = useState<Record<string, string>>({})
  const [paginatedData, setPaginatedData] = useState<T[]>([])

  const renderCell = (item: T, accessor: ColumnDefinition<T>['accessor']): ReactNode => {
    if (typeof accessor === 'function') {
      return accessor(item)
    }
    const value = item[accessor]
    return value != null ? String(value) : ''
  }

  const handleSort = (accessor: keyof T) => {
    setSortConfig(current => ({
      key: accessor,
      direction: current.key === accessor && current.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleRowClick = (id: number | string) => {
    navigate(`/details/${id}`, { 
      state: { 
        dataType,
        gridPath: location.pathname
      }
    });
  }

  const handleKeyDown = (e: KeyboardEvent, id: number | string, index: number) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleRowClick(id);
        break;
      case 'ArrowUp':
        e.preventDefault()
        if (index > 0) {
          setFocusedRow(index - 1)
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        if (index < paginatedData.length - 1) {
          setFocusedRow(index + 1)
        }
        break
    }
  }

  const setSearch = useMemo(() => debounce((key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }, 300), [])

  const filteredData = useMemo(() => {
    return data.filter(item => {
      return columns.every(col => {
        if (!col.filterable || typeof col.accessor !== 'string' || !filters[col.accessor]) return true
        const cellValue = item[col.accessor] != null ? String(item[col.accessor]) : ''
        return cellValue.toLowerCase().includes(filters[col.accessor].toLowerCase())
      })
    })
  }, [data, columns, filters])

  const filteredAndSortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      if (!sortConfig.key) return 0
      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]
      if (aValue === bValue) return 0
      if (aValue === null) return 1
      if (bValue === null) return -1
      const comparison = String(aValue).localeCompare(String(bValue))
      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortConfig])

  useEffect(() => {
    const focusIdFromState = location.state?.focusId as string | number | undefined;
    if (focusIdFromState && paginatedData.length > 0) {
      const rowIndex = paginatedData.findIndex(row => String(row.id) === String(focusIdFromState));
      
      if (rowIndex !== -1) {
        setFocusedRow(rowIndex);
        setTimeout(() => {
          const tableBodyElement = tableRef.current?.querySelector('tbody');
          const rowElements = tableBodyElement?.rows;
          if (rowElements && rowElements[rowIndex]) {
            (rowElements[rowIndex] as HTMLElement).focus();
          }
        }, 0);
      }
      navigate(location.pathname, { replace: true, state: { ...location.state, focusId: undefined } });
    }
  }, [location.state, paginatedData, navigate, location.pathname]);

  return (
    <TableContainer>
      <Title id="table-title">{title}</Title>
      <Table 
        ref={tableRef}
        role="grid"
        aria-labelledby="table-title"
        aria-rowcount={paginatedData.length}
        aria-colcount={columns.length}
      >
        <TableHeader 
          columns={columns}
          sortConfig={sortConfig}
          handleSort={handleSort}
          setSearch={setSearch}
        />
        <TableBody
          data={paginatedData}
          columns={columns}
          focusedRow={focusedRow}
          handleRowClick={handleRowClick}
          handleKeyDown={handleKeyDown}
          renderCell={renderCell}
        />
      </Table>
      <PaginationControls
        data={filteredAndSortedData}
        onPageChange={setPaginatedData}
        onPaginationChange={() => {}}
      />
    </TableContainer>
  )
}

const TableContainer = styled.div`
  padding: 2rem;
  font-family: 'Lato', sans-serif;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-family: 'Lato', sans-serif;
`

const Title = styled.h2`
  color: #333;
  margin-bottom: 1rem;
  font-family: 'Lato', sans-serif;
`

export default GridTable 