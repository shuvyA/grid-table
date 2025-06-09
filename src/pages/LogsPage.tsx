import styled from '@emotion/styled';
import { logData, type LogEntry } from '../utils/logData';
import type {
  ColumnDefinition,
  DetailsFieldRenderer,
} from '../components/grid/GridTable';
import GridTable from '../components/grid/GridTable';

// Define columns for the log data grid
const columns: ColumnDefinition<LogEntry>[] = [
  { header: 'ID', accessor: 'id', width: '70px', sortable: true },
  {
    header: 'Timestamp',
    accessor: (item) => new Date(item.timestamp).toLocaleString(),
    width: '220px',
    sortable: true,
  },
  {
    header: 'Level',
    accessor: 'level',
    width: '100px',
    sortable: true,
    filterable: true,
  },
  {
    header: 'Service',
    accessor: 'service',
    width: '150px',
    sortable: true,
    filterable: true,
  },
  { header: 'Message', accessor: 'message', sortable: true, filterable: true },
];

// Define custom renderers for the details view of a log entry
const detailsFieldRenderers: DetailsFieldRenderer<LogEntry>[] = [
  {
    field: 'level',
    render: (value) => (
      <LogLevelBadge level={value as LogEntry['level']}>
        {String(value)}
      </LogLevelBadge>
    ),
  },
  {
    field: 'timestamp',
    render: (value) => new Date(value as string).toUTCString(),
  },
  {
    field: 'payload',
    render: (value) => <pre>{JSON.stringify(value, null, 2)}</pre>,
  },
  {
    field: 'user',
    render: (value) => {
      const user = value as LogEntry['user'];
      return `${user.name} (ID: ${user.id}, IP: ${user.ip})`;
    },
  },
];

// --- Export the configuration for this page ---
export const logsConfig = {
  data: logData,
  columns,
  renderers: detailsFieldRenderers,
  title: 'Application Logs',
};

const LogsPage = () => {
  return (
    <GridTable
      dataType="logs"
      data={logsConfig.data}
      columns={logsConfig.columns}
      title={logsConfig.title}
    />
  );
};

// Styled component for the log level badge
const LogLevelBadge = styled.span<{ level: LogEntry['level'] }>`
  display: inline-block;
  padding: 0.25rem 0.6rem;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 1rem;
  color: #fff;
  background-color: ${(props) => {
    switch (props.level) {
      case 'ERROR':
        return '#d32f2f';
      case 'WARN':
        return '#fbc02d';
      case 'INFO':
        return '#1976d2';
      case 'DEBUG':
        return '#757575';
      default:
        return '#9e9e9e';
    }
  }};
`;
export default LogsPage;
