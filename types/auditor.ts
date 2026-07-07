export type AuditRequestStatus = 'pending' | 'accepted' | 'rejected' | 'completed'
export type ProofStatus = 'generating' | 'generated' | 'verified' | 'failed'
export type CertificateStatus = 'pending' | 'issued' | 'revoked'
export type MessageStatus = 'sent' | 'read'

export interface AuditRequest {
  id: string
  companyId: string
  companyName: string
  logo?: string
  auditType: string
  budget: number
  priority: 'low' | 'medium' | 'high' | 'critical'
  deadline: Date
  complianceStandard: string
  description: string
  status: AuditRequestStatus
  documentsCount: number
  industry: string
  createdAt: Date
}

export interface AssignedAudit {
  id: string
  companyId: string
  companyName: string
  logo?: string
  auditType: string
  status: 'in-progress' | 'review' | 'completed'
  progress: number
  dueDate: Date
  documents: AuditDocument[]
  timeline: AuditTimeline[]
  complianceRequirements: string[]
  estimatedCompletion: Date
  paymentStatus: 'pending' | 'completed'
  paymentAmount: number
}

export interface AuditDocument {
  id: string
  name: string
  type: string
  size: number
  uploadedAt: Date
  status: 'pending' | 'verified' | 'failed'
}

export interface AuditTimeline {
  id: string
  title: string
  description?: string
  timestamp: Date
  status: 'completed' | 'in-progress' | 'pending'
}

export interface ZKProof {
  id: string
  auditId: string
  status: ProofStatus
  hash: string
  witnessHash?: string
  circuitHash?: string
  proofData?: string
  verificationHash?: string
  blockchainTxHash?: string
  generatedAt: Date
  verifiedAt?: Date
  downloadUrl: string
  digitalSignature?: string
}

export interface IssuedCertificate {
  id: string
  proofId: string
  companyId: string
  companyName: string
  auditId: string
  auditType: string
  complianceStandard: string
  certificateNumber: string
  issueDate: Date
  expiryDate: Date
  digitalSignature: string
  status: CertificateStatus
  pdfUrl: string
}

export interface AuditorMessage {
  id: string
  conversationId: string
  companyId: string
  companyName: string
  senderId: 'auditor' | 'company'
  senderName: string
  content: string
  timestamp: Date
  status: MessageStatus
  attachments?: {
    name: string
    url: string
    type: string
  }[]
}

export interface Conversation {
  id: string
  companyId: string
  companyName: string
  logo?: string
  lastMessage: string
  lastMessageTime: Date
  unreadCount: number
  participants: string[]
}

export interface AuditorEarnings {
  currentBalance: number
  pendingAmount: number
  paidAmount: number
  lifetimeEarnings: number
  transactions: EarningTransaction[]
  monthlyRevenue: { month: string; amount: number }[]
}

export interface EarningTransaction {
  id: string
  type: 'audit-completed' | 'certificate-issued' | 'withdrawal' | 'refund'
  amount: number
  status: 'completed' | 'pending'
  date: Date
  description: string
  auditId?: string
}

export interface AuditorAnalytics {
  successRate: number
  averageCompletionTime: number
  proofGenerationTime: number
  auditsCompleted: number
  certificatesIssued: number
  totalEarnings: number
  ratingTrend: { month: string; rating: number }[]
  auditCategories: { category: string; count: number }[]
  revenueData: { month: string; amount: number }[]
  leaderboardPosition: number
  leaderboardTotal: number
}

export interface AuditorProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  skills: string[]
  experience: number
  certifications: string[]
  walletAddress: string
  availability: 'available' | 'busy' | 'unavailable'
  specializations: string[]
  languages: string[]
  verificationStatus: 'pending' | 'verified'
  rating: number
  completedAudits: number
  responseTime: string
}

export interface AuditorDashboardMetrics {
  incomingRequests: number
  assignedAudits: number
  proofsGenerated: number
  completedAudits: number
  pendingReviews: number
  complianceScore: number
  monthlyEarnings: number
  reputationRating: number
  upcomingDeadlines: AssignedAudit[]
  recentActivity: ActivityLog[]
}

export interface ActivityLog {
  id: string
  action: string
  auditId: string
  companyName: string
  timestamp: Date
  icon: string
}

export interface AuditorSettings {
  availability: 'available' | 'busy' | 'unavailable'
  notificationSettings: {
    emailOnNewRequest: boolean
    emailOnMessageReceived: boolean
    emailOnProofGenerated: boolean
    emailOnCertificateIssued: boolean
    pushNotifications: boolean
  }
  security: {
    twoFactorEnabled: boolean
    apiKeysCount: number
  }
  walletSettings: {
    walletAddress: string
    autoWithdraw: boolean
    minimumWithdrawAmount: number
  }
  privacySettings: {
    showProfile: boolean
    showRating: boolean
  }
}
