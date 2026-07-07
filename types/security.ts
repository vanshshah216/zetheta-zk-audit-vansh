export interface SecurityMetrics {
  threatLevel: 'critical' | 'high' | 'medium' | 'low'
  activeSessions: number
  failedLogins: number
  apiRequests: number
  blockedRequests: number
  suspiciousActivities: number
  activeDevices: number
  openIncidents: number
}

export interface AuditLog {
  id: string
  timestamp: string
  user: string
  role: 'admin' | 'company' | 'auditor' | 'verifier'
  action: string
  ipAddress: string
  device: string
  location: string
  status: 'success' | 'failed' | 'pending'
}

export interface Session {
  id: string
  device: string
  browser: string
  os: string
  ipAddress: string
  country: string
  lastActive: string
  createdAt: string
}

export interface ApiKey {
  id: string
  name: string
  key: string
  permissions: string[]
  created: string
  lastUsed: string
  expiresAt: string | null
  status: 'active' | 'revoked' | 'expired'
}

export interface TrustedDevice {
  id: string
  name: string
  browser: string
  os: string
  ipAddress: string
  country: string
  fingerprint: string
  lastLogin: string
  addedAt: string
}

export interface Threat {
  id: string
  type: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  timestamp: string
  location: string
  ipAddress: string
  status: 'active' | 'resolved' | 'investigating'
  riskScore: number
}

export interface Incident {
  id: string
  title: string
  severity: 'critical' | 'high' | 'medium' | 'low'
  status: 'open' | 'investigating' | 'resolved' | 'closed'
  assignedTeam: string
  createdAt: string
  updatedAt: string
  description: string
  comments: string[]
  attachments: string[]
}

export interface ComplianceStatus {
  standard: 'SOC 2' | 'ISO 27001' | 'GDPR' | 'PCI DSS'
  status: 'compliant' | 'in_progress' | 'non_compliant'
  progress: number
  lastAudit: string
  nextAudit: string
  certificateUrl?: string
}

export interface SystemLog {
  id: string
  timestamp: string
  type: 'application' | 'authentication' | 'blockchain' | 'api'
  level: 'info' | 'warning' | 'error'
  message: string
  details: string
}

export interface Permission {
  id: string
  name: string
  description: string
}

export interface RolePermissions {
  role: 'company' | 'auditor' | 'verifier' | 'admin'
  permissions: string[]
}

export interface ThreatTrendData {
  timestamp: string
  critical: number
  high: number
  medium: number
  low: number
}

export interface LoginActivity {
  timestamp: string
  successful: number
  failed: number
}

export interface ApiUsageData {
  timestamp: string
  requests: number
  blocked: number
}

export interface DeviceActivityData {
  timestamp: string
  newDevices: number
  activeDevices: number
}
