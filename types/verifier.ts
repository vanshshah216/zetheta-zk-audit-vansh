export type VerificationStatus = 'pending' | 'in-progress' | 'completed' | 'failed' | 'rejected'
export type BlockchainStatus = 'pending' | 'confirmed' | 'failed'
export type CertificateStatus = 'valid' | 'expired' | 'revoked' | 'pending-review'
export type ProofStatus = 'valid' | 'invalid' | 'unverified'

export interface VerificationRequest {
  id: string
  proofId: string
  companyName: string
  auditorName: string
  submittedAt: Date
  status: VerificationStatus
  priority: 'low' | 'medium' | 'high'
  estimatedTime: number // in minutes
  progress: number
  proofHash: string
  transactionHash?: string
}

export interface Proof {
  id: string
  hash: string
  companyName: string
  auditorName: string
  timestamp: Date
  status: ProofStatus
  blockchainStatus: BlockchainStatus
  blockchainHash?: string
  certificateId?: string
  complianceStandard: string
}

export interface Certificate {
  id: string
  number: string
  organization: string
  standard: string
  issueDate: Date
  expiryDate: Date
  status: CertificateStatus
  digitalSignature: string
  verificationStatus: 'verified' | 'pending' | 'failed'
}

export interface BlockchainTransaction {
  hash: string
  block: number
  timestamp: Date
  status: BlockchainStatus
  gasUsed: number
  walletAddress: string
  network: 'ethereum' | 'polygon' | 'arbitrum'
  smartContract: string
  value: string
}

export interface VerificationHistory {
  id: string
  proofId: string
  timestamp: Date
  action: string
  result: 'success' | 'failure'
  details: string
}

export interface VerificationReport {
  id: string
  generatedAt: Date
  totalVerifications: number
  successfulVerifications: number
  failedVerifications: number
  averageTime: number
  complianceScore: number
  topCompanies: string[]
  topAuditors: string[]
}

export interface VerifierProfile {
  id: string
  name: string
  email: string
  organization: string
  verificationLevel: 'basic' | 'intermediate' | 'advanced' | 'expert'
  wallet: string
  languages: string[]
  experience: number // years
  verifiedProofs: number
  successRate: number
  joinedAt: Date
}

export interface VerificationAnalytics {
  successRate: number
  averageVerificationTime: number
  totalVerifications: number
  completedToday: number
  pendingVerifications: number
  failedVerifications: number
  complianceDistribution: Record<string, number>
  monthlyTrend: Array<{ month: string; count: number }>
  topCompanies: Array<{ name: string; count: number }>
  topAuditors: Array<{ name: string; count: number }>
  blockchainActivity: Array<{ timestamp: Date; count: number }>
}
