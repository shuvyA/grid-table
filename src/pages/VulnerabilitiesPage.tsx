import styled from '@emotion/styled';
import GridTable from '../components/grid/GridTable';
import type {
  ColumnDefinition,
  DetailsFieldRenderer,
} from '../components/grid/GridTable';
import { data as vulnerabilityData } from '../utils/data';

const vulnerabilityColumns: ColumnDefinition<any>[] = [
  { header: 'ID', accessor: 'id', width: '60px', sortable: true },
  { header: 'Issue Type', accessor: 'issueType', sortable: true },
  { header: 'Severity', accessor: 'severity', sortable: true },
  { header: 'Component', accessor: 'component', sortable: true },
  {
    header: 'Selector',
    accessor: 'selector',
    sortable: true,
    filterable: true,
  },
  { header: 'Url', accessor: 'url', sortable: true, filterable: true },
];

const vulnerabilityRenderers: DetailsFieldRenderer<any>[] = [
  {
    field: 'severity',
    render: (value) => (
      <SeverityBadge severity={String(value)}>{String(value)}</SeverityBadge>
    ),
  },
  {
    field: 'screenshot',
    render: (value) => <Screenshot src={String(value)} alt="Screenshot" />,
  },
];

export const vulnerabilitiesConfig = {
  data: vulnerabilityData,
  columns: vulnerabilityColumns,
  renderers: vulnerabilityRenderers,
  title: 'Vulnerability Scanner Results',
};

const VulnerabilitiesPage = () => {
  return (
    <GridTable
      dataType="vulnerabilities"
      data={vulnerabilitiesConfig.data}
      columns={vulnerabilitiesConfig.columns}
      title={vulnerabilitiesConfig.title}
    />
  );
};

const SeverityBadge = styled.span<{ severity: string }>`
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: bold;
  background-color: ${(props) =>
    props.severity === 'Critical'
      ? '#ffebee'
      : props.severity === 'Major'
        ? '#fff3e0'
        : '#e8f5e9'};
  color: ${(props) =>
    props.severity === 'Critical'
      ? '#c62828'
      : props.severity === 'Major'
        ? '#ef6c00'
        : '#2e7d32'};
`;

const Screenshot = styled.img`
  max-width: 100%;
  border-radius: 4px;
  margin-top: 0.5rem;
`;

export default VulnerabilitiesPage;
