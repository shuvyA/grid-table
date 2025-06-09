import { vulnerabilitiesConfig } from '../pages/VulnerabilitiesPage';
import { logsConfig } from '../pages/LogsPage';

export const gridConfig = {
  vulnerabilities: vulnerabilitiesConfig,
  logs: logsConfig,
};

// Define a type for our config keys for type safety
export type GridDataType = keyof typeof gridConfig;
