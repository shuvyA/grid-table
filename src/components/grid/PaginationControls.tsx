import { useState, useMemo, useEffect } from 'react'
import type { ChangeEvent } from 'react'
import styled from '@emotion/styled'

// Types
interface PaginationControlsProps<T> {
  data: T[]
  onPageChange: (data: T[]) => void
  onPaginationChange: (page: number, pageSize: number, totalPages: number, totalItems: number) => void
}

// Component
function PaginationControls<T>({ 
  data, 
  onPageChange, 
  onPaginationChange 
}: PaginationControlsProps<T>) {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Calculate pagination values
  const total = data.length
  const totalPages = Math.max(1, Math.ceil(total / pageSize))

  // Calculate paginated data
  const paginatedData = useMemo(() => {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    return data.slice(start, end)
  }, [data, page, pageSize])

  // Notify parent of changes
  useEffect(() => {
    onPageChange(paginatedData)
  }, [paginatedData, onPageChange])

  useEffect(() => {
    onPaginationChange(page, pageSize, totalPages, total)
  }, [page, pageSize, totalPages, total, onPaginationChange])

  // Handlers
  const goToPage = (newPage: number) => {
    setPage(Math.max(1, Math.min(newPage, totalPages)))
  }

  const handlePageSizeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value))
    setPage(1) // Reset to first page on size change
  }

  return (
    <PaginationContainer>
      <div>
        <label htmlFor="pageSizeSelect">Rows per page: </label>
        <PageSizeSelect id="pageSizeSelect" value={pageSize} onChange={handlePageSizeChange}>
          {[10, 20, 50, 100].map(size => (
            <option key={size} value={size}>{size}</option>
          ))}
        </PageSizeSelect>
      </div>

      <PaginationButtonsWrapper>
        <PageButton 
          onClick={() => goToPage(page - 1)} 
          disabled={page === 1}
          aria-label="Previous page"
        >
          &lt;
        </PageButton>
        {Array.from({ length: totalPages }, (_, i) => (
          <PageButton
            key={i + 1}
            active={page === i + 1}
            onClick={() => goToPage(i + 1)}
            aria-label={`Go to page ${i + 1}`}
            aria-current={page === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </PageButton>
        ))}
        <PageButton 
          onClick={() => goToPage(page + 1)} 
          disabled={page === totalPages}
          aria-label="Next page"
        >
          &gt;
        </PageButton>
      </PaginationButtonsWrapper>

      <PageInfo>
        Page {page} of {totalPages} ({total} items)
      </PageInfo>
    </PaginationContainer>
  )
}

// Styled components
const PaginationContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  gap: 1.5rem;
  padding: 1rem 0;
`

const PaginationButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0 auto; // Center the buttons if the container wraps
`

const PageSizeSelect = styled.select`
  padding: 0.3rem 0.8rem;
  font-size: 0.9rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: white;
`

const PageInfo = styled.div`
  font-size: 0.9rem;
  color: #666;
`

const PageButton = styled.button<{ active?: boolean }>`
  background: ${props => props.active ? '#646cff' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 0.3rem 0.8rem;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${props => props.active ? '#646cff' : '#f0f0f0'};
  }

  &:focus-visible {
    outline: 2px solid #646cff;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export default PaginationControls
