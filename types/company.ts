export type AuditStatus = 'pending' | 'in-progress' | 'completed' | 'failed'
export type AuditPriority = 'low' | 'medium' | 'high' | 'critical'
export type ComplianceStandard = 'ISO27001' | 'SOC2' | 'GDPR' | 'HIPAA' | 'PCI-DSS'
export type NotificationCategory = 'system' | 'audits' | 'payments' | 'security' | 'verification'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'

export interface Audit {
  id: string
  title: string
  category: string
  industry: string
  description: string
  status: AuditStatus
  priority: AuditPriority
  assignedAuditor?: string
  createdAt: Date
  deadline?: Date
  progress: number
  budget?: number
  estimatedCost?: number
  completionDate?: Date
  proofGenerated?: boolean
  blockchainTxHash?: string
  certificateId?: string
}

export interface AuditFile {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  url: string
}

export interface Proof {
  id: string
  hash: string
  timestamp: Date
  blockchainStatus: 'pending' | 'confirmed'
  blockchainTxHash?: string
  auditId: string
  downloadUrl: string
}

export interface Certificate {
  id: string
  auditId: string
  complianceStandard: ComplianceStandard
  issueDate: Date
  expiryDate: Date
  pdfUrl: string
}

export interface Payment {
  id: string
  auditId: string
  amount: number
  status: PaymentStatus
  date: Date
  method: string
  description: string
  invoiceUrl?: string
  receiptUrl?: string
}

export interface Notification {
  id: string
  title: string
  message: string
  category: NotificationCategory
  read: boolean
  createdAt: Date
  actionUrl?: string
}

export interface Organization {
  id: string
  name: string
  logo?: string
  industry: string
  employees: number
  website?: string
  address?: string
  contact?: string
  verificationStatus: 'pending' | 'verified' | 'rejected'
  walletAddress?: string
}

export interface DashboardMetrics {
  activeAudits: number
  completedAudits: number
  pendingPayments: number
  complianceScore: number
  proofsGenerated: number
  upcomingDeadlines: number
  monthlyAuditRequests: { month: string; count: number }[]
  complianceTrend: { month: string; score: number }[]
  auditStatusDistribution: { status: AuditStatus; count: number }[]
}
