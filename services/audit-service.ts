export interface Audit {
  id: string
  title: string
  description: string
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  type: string
  company: string
  createdAt: Date
  deadline?: Date
  reward?: number
  auditors?: number
  progress?: number
}

export interface Certificate {
  id: string
  auditId: string
  company: string
  issuedAt: Date
  expiresAt: Date
  status: 'valid' | 'expired' | 'revoked'
}

// Mock data
const MOCK_AUDITS: Audit[] = [
  {
    id: 'audit-1',
    title: 'Security Audit - Q1 2024',
    description: 'Comprehensive security assessment',
    status: 'in_progress',
    type: 'Security',
    company: 'Tech Corp',
    createdAt: new Date('2024-01-15'),
    deadline: new Date('2024-03-15'),
    reward: 5000,
    auditors: 3,
    progress: 65,
  },
  {
    id: 'audit-2',
    title: 'Compliance Review',
    description: 'SOC 2 compliance check',
    status: 'pending',
    type: 'Compliance',
    company: 'Finance Inc',
    createdAt: new Date('2024-02-01'),
    deadline: new Date('2024-04-01'),
    reward: 8000,
    auditors: 2,
    progress: 0,
  },
]

const MOCK_CERTIFICATES: Certificate[] = [
  {
    id: 'cert-1',
    auditId: 'audit-1',
    company: 'Tech Corp',
    issuedAt: new Date('2024-01-15'),
    expiresAt: new Date('2025-01-15'),
    status: 'valid',
  },
  {
    id: 'cert-2',
    auditId: 'audit-2',
    company: 'Finance Inc',
    issuedAt: new Date('2023-01-15'),
    expiresAt: new Date('2024-01-15'),
    status: 'expired',
  },
]

export const auditService = {
  async getAudits(): Promise<Audit[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return MOCK_AUDITS
  },

  async getAuditById(id: string): Promise<Audit | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_AUDITS.find(a => a.id === id) || null
  },

  async createAudit(audit: Omit<Audit, 'id' | 'createdAt'>): Promise<Audit> {
    await new Promise(resolve => setTimeout(resolve, 600))
    const newAudit: Audit = {
      ...audit,
      id: `audit-${Date.now()}`,
      createdAt: new Date(),
    }
    MOCK_AUDITS.push(newAudit)
    return newAudit
  },

  async updateAudit(id: string, updates: Partial<Audit>): Promise<Audit | null> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const audit = MOCK_AUDITS.find(a => a.id === id)
    if (!audit) return null
    Object.assign(audit, updates)
    return audit
  },

  async getCertificates(): Promise<Certificate[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return MOCK_CERTIFICATES
  },

  async getCertificateById(id: string): Promise<Certificate | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_CERTIFICATES.find(c => c.id === id) || null
  },
}
