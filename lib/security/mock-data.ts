import {
  AuditLog,
  Session,
  ApiKey,
  TrustedDevice,
  Threat,
  Incident,
  ComplianceStatus,
  SystemLog,
  Permission,
  RolePermissions,
  ThreatTrendData,
  LoginActivity,
  ApiUsageData,
  DeviceActivityData,
  SecurityMetrics,
} from '@/types/security'

export const mockSecurityMetrics: SecurityMetrics = {
  threatLevel: 'medium',
  activeSessions: 12,
  failedLogins: 23,
  apiRequests: 5432,
  blockedRequests: 145,
  suspiciousActivities: 7,
  activeDevices: 8,
  openIncidents: 3,
}

export const mockAuditLogs: AuditLog[] = [
  {
    id: '1',
    timestamp: '2024-07-05 14:32:15',
    user: 'john.doe@company.com',
    role: 'company',
    action: 'Requested Audit',
    ipAddress: '192.168.1.100',
    device: 'MacBook Pro',
    location: 'San Francisco, CA',
    status: 'success',
  },
  {
    id: '2',
    timestamp: '2024-07-05 13:45:22',
    user: 'jane.smith@audit.com',
    role: 'auditor',
    action: 'Generated Proof',
    ipAddress: '203.0.113.45',
    device: 'Windows Desktop',
    location: 'New York, NY',
    status: 'success',
  },
  {
    id: '3',
    timestamp: '2024-07-05 12:20:18',
    user: 'admin@platform.com',
    role: 'admin',
    action: 'Revoked API Key',
    ipAddress: '198.51.100.89',
    device: 'iPad Pro',
    location: 'Austin, TX',
    status: 'success',
  },
  {
    id: '4',
    timestamp: '2024-07-05 11:15:45',
    user: 'verify@verify.com',
    role: 'verifier',
    action: 'Verified Proof',
    ipAddress: '192.0.2.1',
    device: 'iPhone 14',
    location: 'Seattle, WA',
    status: 'success',
  },
  {
    id: '5',
    timestamp: '2024-07-05 10:30:22',
    user: 'unknown@malicious.com',
    role: 'company',
    action: 'Failed Login Attempt',
    ipAddress: '203.0.113.100',
    device: 'Unknown',
    location: 'Moscow, RU',
    status: 'failed',
  },
]

export const mockSessions: Session[] = [
  {
    id: '1',
    device: 'MacBook Pro',
    browser: 'Chrome 126.0',
    os: 'macOS 14.5',
    ipAddress: '192.168.1.100',
    country: 'United States',
    lastActive: '2 minutes ago',
    createdAt: '2024-07-01 09:15:00',
  },
  {
    id: '2',
    device: 'iPhone 14',
    browser: 'Safari 17.5',
    os: 'iOS 17.5',
    ipAddress: '203.0.113.45',
    country: 'United States',
    lastActive: '15 minutes ago',
    createdAt: '2024-07-02 14:20:00',
  },
  {
    id: '3',
    device: 'Windows Desktop',
    browser: 'Firefox 127.0',
    os: 'Windows 11',
    ipAddress: '198.51.100.89',
    country: 'United States',
    lastActive: '1 hour ago',
    createdAt: '2024-07-01 08:00:00',
  },
]

export const mockApiKeys: ApiKey[] = [
  {
    id: '1',
    name: 'Production API Key',
    key: 'demo_api_key_live_001',
    permissions: ['read:audits', 'write:proofs', 'read:reports'],
    created: '2024-01-15 10:20:00',
    lastUsed: '2024-07-05 14:32:15',
    expiresAt: '2025-01-15',
    status: 'active',
  },
  {
    id: '2',
    name: 'Development API Key',
    key: 'demo_api_key_dev_001',
    permissions: ['read:audits', 'write:proofs'],
    created: '2024-03-20 15:45:00',
    lastUsed: '2024-07-04 10:15:22',
    expiresAt: null,
    status: 'active',
  },
  {
    id: '3',
    name: 'Legacy Integration',
    key: 'demo_api_key_dev_001',
    permissions: ['read:audits'],
    created: '2023-06-10 08:00:00',
    lastUsed: '2024-06-15 12:30:00',
    expiresAt: '2024-06-10',
    status: 'expired',
  },
]

export const mockTrustedDevices: TrustedDevice[] = [
  {
    id: '1',
    name: 'Office MacBook',
    browser: 'Chrome 126.0',
    os: 'macOS 14.5',
    ipAddress: '192.168.1.100',
    country: 'United States',
    fingerprint: 'a1b2c3d4e5f6g7h8i9j0k1l2m3n4',
    lastLogin: '2024-07-05 14:32:15',
    addedAt: '2024-06-01 09:00:00',
  },
  {
    id: '2',
    name: 'Personal iPhone',
    browser: 'Safari 17.5',
    os: 'iOS 17.5',
    ipAddress: '203.0.113.45',
    country: 'United States',
    fingerprint: 'x9y8z7w6v5u4t3s2r1q0p9o8n7m6',
    lastLogin: '2024-07-04 18:45:30',
    addedAt: '2024-05-15 14:20:00',
  },
]

export const mockThreats: Threat[] = [
  {
    id: '1',
    type: 'Brute Force Attack',
    severity: 'high',
    description: 'Multiple failed login attempts detected from single IP',
    timestamp: '2024-07-05 13:15:00',
    location: 'Moscow, RU',
    ipAddress: '203.0.113.100',
    status: 'active',
    riskScore: 8.5,
  },
  {
    id: '2',
    type: 'Suspicious Location',
    severity: 'medium',
    description: 'Login from new geographical location',
    timestamp: '2024-07-05 12:45:00',
    location: 'Beijing, CN',
    ipAddress: '192.0.2.50',
    status: 'investigating',
    riskScore: 6.2,
  },
  {
    id: '3',
    type: 'Rate Limit Exceeded',
    severity: 'medium',
    description: 'API rate limit exceeded by 340%',
    timestamp: '2024-07-05 11:30:00',
    location: 'London, UK',
    ipAddress: '198.51.100.200',
    status: 'resolved',
    riskScore: 5.8,
  },
]

export const mockIncidents: Incident[] = [
  {
    id: '1',
    title: 'Unauthorized API Access Attempt',
    severity: 'critical',
    status: 'investigating',
    assignedTeam: 'Security Team',
    createdAt: '2024-07-05 14:00:00',
    updatedAt: '2024-07-05 14:30:00',
    description: 'Multiple failed attempts to access API with revoked keys detected.',
    comments: ['Initial analysis underway', 'Monitoring all related accounts'],
    attachments: ['incident_log_001.pdf', 'threat_analysis.csv'],
  },
  {
    id: '2',
    title: 'Suspicious Device Registration',
    severity: 'high',
    status: 'open',
    assignedTeam: 'Incident Response',
    createdAt: '2024-07-04 16:20:00',
    updatedAt: '2024-07-05 09:15:00',
    description: 'New device registered from unusual location.',
    comments: ['Awaiting user confirmation'],
    attachments: [],
  },
  {
    id: '3',
    title: 'Successful Phishing Campaign Blocked',
    severity: 'medium',
    status: 'resolved',
    assignedTeam: 'Security Team',
    createdAt: '2024-07-02 10:00:00',
    updatedAt: '2024-07-03 15:45:00',
    description: 'Email security system blocked phishing attempt.',
    comments: ['Threat mitigated', 'All users notified'],
    attachments: ['phishing_email.eml'],
  },
]

export const mockComplianceStatus: ComplianceStatus[] = [
  {
    standard: 'SOC 2',
    status: 'compliant',
    progress: 100,
    lastAudit: '2024-01-15',
    nextAudit: '2025-01-15',
    certificateUrl: 'https://example.com/soc2-certificate',
  },
  {
    standard: 'ISO 27001',
    status: 'compliant',
    progress: 100,
    lastAudit: '2023-06-20',
    nextAudit: '2025-06-20',
    certificateUrl: 'https://example.com/iso27001-certificate',
  },
  {
    standard: 'GDPR',
    status: 'in_progress',
    progress: 85,
    lastAudit: '2024-03-10',
    nextAudit: '2024-09-10',
  },
  {
    standard: 'PCI DSS',
    status: 'compliant',
    progress: 100,
    lastAudit: '2024-02-01',
    nextAudit: '2025-02-01',
  },
]

export const mockSystemLogs: SystemLog[] = [
  {
    id: '1',
    timestamp: '2024-07-05 14:45:32',
    type: 'application',
    level: 'info',
    message: 'Audit proof generation completed successfully',
    details: 'Proof ID: APF-2024-07-001, Status: Finalized',
  },
  {
    id: '2',
    timestamp: '2024-07-05 14:40:15',
    type: 'api',
    level: 'warning',
    message: 'API request rate exceeded threshold',
    details: 'Client IP: 192.0.2.100, Rate: 450 req/min (limit: 100)',
  },
  {
    id: '3',
    timestamp: '2024-07-05 14:35:22',
    type: 'authentication',
    level: 'error',
    message: 'Failed authentication attempt blocked',
    details: 'User: unknown@example.com, Location: Moscow, Reason: Invalid credentials',
  },
  {
    id: '4',
    timestamp: '2024-07-05 14:30:00',
    type: 'blockchain',
    level: 'info',
    message: 'Proof anchored to blockchain successfully',
    details: 'Transaction ID: 0x1234567890abcdef, Block: 19456782',
  },
]

export const mockPermissions: Permission[] = [
  { id: '1', name: 'read:audits', description: 'Read audit information' },
  { id: '2', name: 'write:audits', description: 'Create and modify audits' },
  { id: '3', name: 'read:proofs', description: 'Read proof data' },
  { id: '4', name: 'write:proofs', description: 'Generate and modify proofs' },
  { id: '5', name: 'read:reports', description: 'Read compliance reports' },
  { id: '6', name: 'write:reports', description: 'Create and modify reports' },
  { id: '7', name: 'read:settings', description: 'View security settings' },
  { id: '8', name: 'write:settings', description: 'Modify security settings' },
  { id: '9', name: 'read:logs', description: 'View audit logs' },
  { id: '10', name: 'admin', description: 'Full administrator access' },
]

export const mockRolePermissions: RolePermissions[] = [
  {
    role: 'company',
    permissions: ['read:audits', 'write:audits', 'read:proofs', 'read:reports', 'read:settings'],
  },
  {
    role: 'auditor',
    permissions: [
      'read:audits',
      'write:proofs',
      'read:proofs',
      'read:reports',
      'read:settings',
    ],
  },
  {
    role: 'verifier',
    permissions: ['read:audits', 'read:proofs', 'read:reports', 'read:settings'],
  },
  {
    role: 'admin',
    permissions: [
      'read:audits',
      'write:audits',
      'read:proofs',
      'write:proofs',
      'read:reports',
      'write:reports',
      'read:settings',
      'write:settings',
      'read:logs',
      'admin',
    ],
  },
]

export const mockThreatTrend: ThreatTrendData[] = [
  { timestamp: '00:00', critical: 0, high: 2, medium: 4, low: 8 },
  { timestamp: '04:00', critical: 1, high: 3, medium: 5, low: 10 },
  { timestamp: '08:00', critical: 2, high: 5, medium: 7, low: 12 },
  { timestamp: '12:00', critical: 1, high: 4, medium: 6, low: 11 },
  { timestamp: '16:00', critical: 0, high: 3, medium: 5, low: 9 },
  { timestamp: '20:00', critical: 1, high: 2, medium: 4, low: 8 },
  { timestamp: '24:00', critical: 0, high: 1, medium: 3, low: 7 },
]

export const mockLoginActivity: LoginActivity[] = [
  { timestamp: '00:00', successful: 120, failed: 8 },
  { timestamp: '04:00', successful: 85, failed: 5 },
  { timestamp: '08:00', successful: 210, failed: 12 },
  { timestamp: '12:00', successful: 295, failed: 18 },
  { timestamp: '16:00', successful: 340, failed: 22 },
  { timestamp: '20:00', successful: 215, failed: 14 },
  { timestamp: '24:00', successful: 150, failed: 9 },
]

export const mockApiUsage: ApiUsageData[] = [
  { timestamp: '00:00', requests: 450, blocked: 12 },
  { timestamp: '04:00', requests: 320, blocked: 8 },
  { timestamp: '08:00', requests: 680, blocked: 18 },
  { timestamp: '12:00', requests: 950, blocked: 24 },
  { timestamp: '16:00', requests: 1100, blocked: 32 },
  { timestamp: '20:00', requests: 780, blocked: 20 },
  { timestamp: '24:00', requests: 550, blocked: 14 },
]

export const mockDeviceActivity: DeviceActivityData[] = [
  { timestamp: '00:00', newDevices: 2, activeDevices: 8 },
  { timestamp: '04:00', newDevices: 1, activeDevices: 6 },
  { timestamp: '08:00', newDevices: 3, activeDevices: 10 },
  { timestamp: '12:00', newDevices: 4, activeDevices: 12 },
  { timestamp: '16:00', newDevices: 5, activeDevices: 14 },
  { timestamp: '20:00', newDevices: 3, activeDevices: 11 },
  { timestamp: '24:00', newDevices: 2, activeDevices: 9 },
]

export const mockAPI = {
  apiKeys: mockApiKeys,
  getSecurityMetrics: async () => mockSecurityMetrics,
  getAuditLogs: async () => mockAuditLogs,
  getSessions: async () => mockSessions,
  getTrustedDevices: async () => mockTrustedDevices,
  getThreats: async () => mockThreats,
  getIncidents: async () => mockIncidents,
  getCompliance: async () => mockComplianceStatus,
  getSystemLogs: async () => mockSystemLogs,
  getLogs: async () => mockSystemLogs,
  getPermissions: async () => mockPermissions,
  getRolePermissions: async () => mockRolePermissions,
  getThreatTrend: async () => mockThreatTrend,
  getLoginActivity: async () => mockLoginActivity,
  getApiUsage: async () => mockApiUsage,
  getDeviceActivity: async () => mockDeviceActivity,
  terminateSession: async (sessionId: string) => {
    return { success: true }
  },
  generateApiKey: async (name: string) => {
    const newKey: ApiKey = {
      id: (mockApiKeys.length + 1).toString(),
      name,
      key: `demo_api_key_${Math.random().toString(36).substring(2, 25)}`,
      permissions: ['read:audits'],
      created: new Date().toISOString(),
      lastUsed: '',
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
      status: 'active',
    }
    mockApiKeys.push(newKey)
    return newKey
  },
  deleteApiKey: async (keyId: string) => {
    const index = mockApiKeys.findIndex((k) => k.id === keyId)
    if (index > -1) {
      mockApiKeys[index].status = 'revoked'
    }
    return { success: true }
  },
  removeDevice: async (deviceId: string) => {
    return { success: true }
  },
}
