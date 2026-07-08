export interface Profile {
  id: string
  email: string
  role: 'audited' | 'auditor' | 'investor'
  company_name: string | null
  created_at: string
  updated_at?: string
}

export interface AuditRequest {
  id: string
  company_id: string
  company_name: string
  audit_type: string
  budget: number
  priority: 'low' | 'medium' | 'high' | 'critical'
  deadline: string
  compliance_standard: string
  description: string
  status: 'pending' | 'in-progress' | 'accepted' | 'completed' | 'rejected' | 'failed'
  documents_count: number
  industry: string
  assigned_auditor_id: string | null
  created_at: string
  updated_at?: string
}

export interface Proof {
  id: string
  audit_id: string
  audit_name: string
  company_name: string
  status: 'verified' | 'failed' | 'pending'
  hash: string
  blockchain_tx_hash: string | null
  generated_at: string
  verification_status: 'verified' | 'failed' | 'pending'
  created_at: string
  updated_at?: string
}

export interface Certificate {
  id: string
  audit_id: string
  company_id: string
  company_name: string
  audit_type: string
  issue_date: string
  expiry_date: string
  compliance_standard: string
  status: 'active' | 'expired' | 'revoked'
  verification_hash: string
  created_at: string
  updated_at?: string
}

export interface VerificationHistory {
  id: string
  proof_id: string
  action: string
  details: string
  result: 'success' | 'failure'
  timestamp: string
  created_at: string
  updated_at?: string
}

export interface Notification {
  id: string
  user_id: string
  type: string
  title: string
  message: string
  read: boolean
  created_at: string
  updated_at?: string
}

export interface Payment {
  id: string
  company_id: string
  audit_id: string
  amount: number
  status: 'pending' | 'completed' | 'failed'
  date: string
  description: string
  created_at: string
  updated_at?: string
}
