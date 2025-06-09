import styled from '@emotion/styled'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import type { ReactNode } from 'react'
import { gridConfig, type GridDataType } from '../../config/gridConfig'

// No props or generics needed, this component is now self-sufficient
function RowDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const location = useLocation()

  // Show an error if state or dataType is missing
  if (!location.state?.dataType) {
    return (
      <DetailsContainer>
        <DetailsTitle>Navigation Error</DetailsTitle>
        <p>This page was accessed without the necessary context. Please return to a grid and click a row.</p>
        <BackButton onClick={() => navigate('/')}>
          ← Go to Home
        </BackButton>
      </DetailsContainer>
    )
  }

  // Get the config using the dataType from state
  const { dataType, gridPath } = location.state
  const config = gridConfig[dataType as GridDataType]
  
  // The 'any' cast here is a pragmatic choice because the config object
  // holds different data types. We rely on the structure of our config.
  const item = (config.data as any[]).find(d => String(d.id) === String(id))


  if (!item) {
    return (
      <DetailsContainer>
        <DetailsTitle>Item Not Found</DetailsTitle>
        <p>The requested item could not be found in the dataset.</p>
        <BackButton onClick={() => navigate(gridPath || '/')}>
          ← Back to Grid
        </BackButton>
      </DetailsContainer>
    )
  }

  // Back button should now use the gridPath from state to return to the correct grid
  const handleBackClick = () => {
    navigate(gridPath || '/', { state: { focusId: id } })
  }

  const renderField = (key: string, value: any): ReactNode => {
    const renderer = config.renderers.find((r: any) => r.field === key)
    if (renderer) {
      return renderer.render(value, item)
    }

    // Default rendering for different types
    if (value === null || value === undefined) {
      return <EmptyValue>-</EmptyValue>
    }

    if (typeof value === 'string') {
      return value
    }

    if (typeof value === 'number' || typeof value === 'boolean') {
      return String(value)
    }

    if (typeof value === 'object') {
      return <pre>{JSON.stringify(value, null, 2)}</pre>
    }

    return String(value)
  }

  return (
    <DetailsContainer>
      <BackButton 
        onClick={handleBackClick}
        aria-label="Back to Grid. The previously selected row will be focused."
      >
        ← Back to Grid
      </BackButton>
      <DetailsContent>
        <DetailsTitle>Details for Item {id}</DetailsTitle>
        <DetailsGrid>
          {Object.entries(item).map(([key, value]) => (
            <DetailsRow key={key}>
              <DetailsLabel>{key}</DetailsLabel>
              <DetailsValue>
                {renderField(key, value)}
              </DetailsValue>
            </DetailsRow>
          ))}
        </DetailsGrid>
      </DetailsContent>
    </DetailsContainer>
  )
}

// Styled components
const DetailsContainer = styled.div`
  padding: 2rem;
  font-family: 'Lato', sans-serif;
`

const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  color: #343a40;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  padding: 0.5rem 1rem;
  margin-bottom: 1.5rem;
  border-radius: 0.25rem;
  transition: background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, color 0.15s ease-in-out;

  &:hover {
    background-color: #e9ecef;
    border-color: #ced4da;
    color: #212529;
    text-decoration: none;
  }

  &:focus {
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(100, 108, 255, 0.25);
  }
`

const DetailsContent = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  padding: 2.5rem;
`

const DetailsTitle = styled.h2`
  color: #212529;
  margin-top: 0;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  font-weight: 600;
  border-bottom: 1px solid #e9ecef;
  padding-bottom: 1rem;
`

const DetailsGrid = styled.div`
  display: grid;
  gap: 1.25rem;
`

const DetailsRow = styled.div`
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 1rem;
  align-items: start;
  padding: 0.75rem 0;
  border-bottom: 1px solid #f1f3f5;

  &:last-child {
    border-bottom: none;
  }
`

const DetailsLabel = styled.div`
  font-weight: 600;
  color: #495057;
  text-transform: capitalize;
  font-size: 0.95rem;
  line-height: 1.5;
`

const DetailsValue = styled.div`
  color: #343a40;
  line-height: 1.6;
  font-size: 0.95rem;
  word-break: break-word;

  pre {
    background: #f8f9fa;
    border: 1px solid #e9ecef;
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, Courier, monospace;
    font-size: 0.875em;
    line-height: 1.5;
    margin: 0.5rem 0 0 0;
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
  
  .badge {
    display: inline-block;
    padding: 0.35em 0.65em;
    font-size: .75em;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: .25rem;
  }
`

const EmptyValue = styled.span`
  color: #6c757d;
  font-style: italic;
`

export default RowDetails