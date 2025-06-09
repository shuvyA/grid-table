export interface LogEntry {
  id: number;
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  service: string;
  message: string;
  payload: Record<string, any>;
  user: {
    id: string;
    name: string;
    ip: string;
  };
}

export const logData: LogEntry[] = [
  {
    id: 101,
    timestamp: '2023-10-27T10:00:00Z',
    level: 'INFO',
    service: 'auth-service',
    message: 'User login successful',
    payload: { userId: 'user-abc-123', sessionDuration: 3600 },
    user: { id: 'user-abc-123', name: 'Alice', ip: '192.168.1.10' },
  },
  {
    id: 102,
    timestamp: '2023-10-27T10:05:15Z',
    level: 'WARN',
    service: 'payment-gateway',
    message: 'API key is nearing expiration',
    payload: { apiKeyId: 'key-xyz-789', expiryDate: '2023-11-01T00:00:00Z' },
    user: { id: 'system', name: 'System', ip: '127.0.0.1' },
  },
  {
    id: 103,
    timestamp: '2023-10-27T10:10:30Z',
    level: 'ERROR',
    service: 'api-main',
    message: 'Failed to connect to database',
    payload: { error: 'ETIMEOUT', dbHost: 'db.prod.internal' },
    user: { id: 'system', name: 'System', ip: '127.0.0.1' },
  },
  {
    id: 104,
    timestamp: '2023-10-27T10:12:00Z',
    level: 'DEBUG',
    service: 'auth-service',
    message: 'Token verification requested',
    payload: { token: 'jwt-token-...', permissions: ['read', 'write'] },
    user: { id: 'user-def-456', name: 'Bob', ip: '192.168.1.25' },
  },
  {
    id: 105,
    timestamp: '2023-10-27T10:15:45Z',
    level: 'INFO',
    service: 'payment-gateway',
    message: 'Payment processed successfully',
    payload: { transactionId: 'txn_1A2B3C4D', amount: 99.99, currency: 'USD' },
    user: { id: 'user-ghi-789', name: 'Charlie', ip: '10.0.0.5' },
  },
  {
    id: 106,
    timestamp: '2023-10-27T10:20:00Z',
    level: 'ERROR',
    service: 'auth-service',
    message: 'User entered invalid credentials',
    payload: { attempt: 3, maxAttempts: 5 },
    user: { id: 'user-jkl-012', name: 'David', ip: '172.16.0.10' },
  },
  {
    id: 107,
    timestamp: '2023-10-27T10:25:00Z',
    level: 'DEBUG',
    service: 'api-main',
    message: 'Cache miss for key: products:all',
    payload: { key: 'products:all', cacheLayer: 'redis' },
    user: { id: 'system', name: 'System', ip: '127.0.0.1' },
  },
  {
    id: 108,
    timestamp: '2023-10-27T10:30:00Z',
    level: 'WARN',
    service: 'api-main',
    message: 'High latency detected on endpoint /v1/users',
    payload: { latencyMs: 1200, thresholdMs: 500 },
    user: { id: 'system', name: 'System', ip: '127.0.0.1' },
  },
  {
    id: 109,
    timestamp: '2023-10-27T10:35:10Z',
    level: 'INFO',
    service: 'auth-service',
    message: 'User logout',
    payload: { userId: 'user-abc-123' },
    user: { id: 'user-abc-123', name: 'Alice', ip: '192.168.1.10' },
  },
  {
    id: 110,
    timestamp: '2023-10-27T10:40:20Z',
    level: 'INFO',
    service: 'ui-worker',
    message: 'Asset pre-compilation complete',
    payload: { assets: 125, duration: '45s' },
    user: { id: 'deploy-bot', name: 'Deploy Bot', ip: '127.0.0.1' },
  },
  {
    id: 111,
    timestamp: '2023-10-27T10:45:00Z',
    level: 'ERROR',
    service: 'email-service',
    message: 'SMTP server connection refused',
    payload: { host: 'smtp.example.com', port: 587 },
    user: { id: 'system', name: 'System', ip: '127.0.0.1' },
  },
  {
    id: 112,
    timestamp: '2023-10-27T10:50:00Z',
    level: 'INFO',
    service: 'api-main',
    message: 'New user registered',
    payload: { userId: 'user-mno-345', source: 'web' },
    user: { id: 'user-mno-345', name: 'Frank', ip: '198.51.100.2' },
  },
  {
    id: 125,
    timestamp: '2023-10-27T11:55:00Z',
    level: 'INFO',
    service: 'auth-service',
    message: 'Password reset requested',
    payload: { userId: 'user-xyz-987' },
    user: { id: 'user-xyz-987', name: 'Zoe', ip: '203.0.113.50' },
  },
];
