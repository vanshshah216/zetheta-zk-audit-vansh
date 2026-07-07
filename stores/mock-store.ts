/**
 * Central mock state store for the MVP demo.
 * Cross-portal shared state: audit requests, assigned audits, proofs, certificates, verifications.
 */
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

// ─── Types ───────────────────────────────────────────────────────────────────

export type AuditStatus = 'pending' | 'accepted' | 'rejected' | 'in-progress' | 'completed'
export type ProofStatus = 'generating' | 'verified' | 'failed'

export interface MockAuditRequest {
  id: string
  companyId: string
  companyName: string
  auditType: string
  budget: number
  priority: 'low' | 'medium' | 'high' | 'critical'
  deadline: string   // ISO string – safe to serialize
  complianceStandard: string
  description: string
  status: AuditStatus
  documentsCount: number
  industry: string
  createdAt: string
}

export interface MockProof {
  id: string
  auditId: string
  auditName: string
  companyName: string
  status: ProofStatus
  hash: string
  blockchainTxHash: string
  generatedAt: string
  verificationStatus: 'verified' | 'pending'
}

export interface MockCertificate {
  id: string
  proofId: string
  auditId: string
  companyName: string
  auditType: string
  complianceStandard: string
  certificateNumber: string
  issueDate: string
  expiryDate: string
  status: 'issued' | 'revoked'
}

export interface MockVerification {
  id: string
  proofId: string
  proofHash: string
  action: string
  result: 'success' | 'failed'
  timestamp: string
  details: string
  certificateId?: string
  blockchainHash?: string
}

// ─── Default seed data ────────────────────────────────────────────────────────

const now = Date.now()

const SEED_REQUESTS: MockAuditRequest[] = [
  {
    id: 'req-001',
    companyId: 'comp-001',
    companyName: 'TechCorp Solutions',
    auditType: 'Financial Audit',
    budget: 15000,
    priority: 'high',
    deadline: new Date(now + 14 * 864e5).toISOString(),
    complianceStandard: 'ISO27001',
    description: 'Annual compliance audit for financial systems and data handling processes.',
    status: 'pending',
    documentsCount: 24,
    industry: 'Technology',
    createdAt: new Date(now - 2 * 864e5).toISOString(),
  },
  {
    id: 'req-002',
    companyId: 'comp-002',
    companyName: 'Global Finance Inc',
    auditType: 'SOC 2 Type II',
    budget: 22000,
    priority: 'critical',
    deadline: new Date(now + 7 * 864e5).toISOString(),
    complianceStandard: 'SOC2',
    description: 'Full SOC 2 Type II audit covering security, availability, and confidentiality.',
    status: 'pending',
    documentsCount: 45,
    industry: 'Finance',
    createdAt: new Date(now - 864e5).toISOString(),
  },
  {
    id: 'req-003',
    companyId: 'comp-003',
    companyName: 'HealthTech Solutions',
    auditType: 'HIPAA Compliance',
    budget: 18000,
    priority: 'high',
    deadline: new Date(now + 21 * 864e5).toISOString(),
    complianceStandard: 'HIPAA',
    description: 'HIPAA compliance audit focusing on patient data handling and privacy controls.',
    status: 'pending',
    documentsCount: 38,
    industry: 'Healthcare',
    createdAt: new Date(now - 3 * 864e5).toISOString(),
  },
]

const SEED_PROOFS: MockProof[] = [
  {
    id: 'proof-001',
    auditId: 'audit-003',
    auditName: 'ISO 27001 Security Audit',
    companyName: 'RetailMart Corporation',
    status: 'verified',
    hash: '0x7f4e9e8d5c3b2a1f9e8d7c6b5a4f3e2d1c0b9a8f7e6d5c4b3a2f1e0d9c8b7a',
    blockchainTxHash: '0xabc123def456789012345678901234567890123456789012345678901234567',
    generatedAt: new Date(now - 2 * 864e5).toISOString(),
    verificationStatus: 'verified',
  },
  {
    id: 'proof-002',
    auditId: 'audit-004',
    auditName: 'SOC 2 Type II Compliance',
    companyName: 'CloudBase Systems',
    status: 'verified',
    hash: '0x8a7f6e5d4c3b2a1f0e9d8c7b6a5f4e3d2c1b0a9f8e7d6c5b4a3f2e1d0c9b',
    blockchainTxHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
    generatedAt: new Date(now - 5 * 864e5).toISOString(),
    verificationStatus: 'verified',
  },
]

const SEED_CERTS: MockCertificate[] = [
  {
    id: 'cert-001',
    proofId: 'proof-001',
    auditId: 'audit-001',
    companyName: 'TechCorp Solutions',
    auditType: 'ISO 27001',
    complianceStandard: 'ISO27001',
    certificateNumber: 'ISO-2024-001001',
    issueDate: new Date(now - 30 * 864e5).toISOString(),
    expiryDate: new Date(now + 335 * 864e5).toISOString(),
    status: 'issued',
  },
  {
    id: 'cert-002',
    proofId: 'proof-002',
    auditId: 'audit-002',
    companyName: 'Global Finance Inc',
    auditType: 'SOC 2 Type II',
    complianceStandard: 'SOC2',
    certificateNumber: 'SOC2-2024-001002',
    issueDate: new Date(now - 15 * 864e5).toISOString(),
    expiryDate: new Date(now + 350 * 864e5).toISOString(),
    status: 'issued',
  },
]

const SEED_VERIFICATIONS: MockVerification[] = [
  {
    id: 'ver-001',
    proofId: 'proof-001',
    proofHash: '0x8f4c3f9a2b1e7d6c5a4b3c2d1e0f9a8b',
    action: 'Proof Verified',
    result: 'success',
    timestamp: new Date(now - 2 * 3600e3).toISOString(),
    details: 'ZK proof verified on-chain. All validation steps passed.',
    certificateId: 'cert-001',
    blockchainHash: '0xabc123def456789012345678901234567890123456789012345678901234567',
  },
  {
    id: 'ver-002',
    proofId: 'proof-002',
    proofHash: '0x7e3a4b2c5f1d9e8a7c6b5a4d3e2f1g0h',
    action: 'Proof Verified',
    result: 'success',
    timestamp: new Date(now - 5 * 3600e3).toISOString(),
    details: 'All compliance checks passed. Certificate validated.',
    certificateId: 'cert-002',
    blockchainHash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
  },
]

// ─── Store ────────────────────────────────────────────────────────────────────

interface MockStoreState {
  auditRequests: MockAuditRequest[]
  proofs: MockProof[]
  certificates: MockCertificate[]
  verifications: MockVerification[]

  // Auditor actions
  acceptRequest: (id: string) => void
  rejectRequest: (id: string) => void
  addProof: (proof: MockProof) => void
  issueCertificate: (cert: MockCertificate) => void

  // Company actions
  submitAuditRequest: (req: MockAuditRequest) => void

  // Verifier actions
  addVerification: (v: MockVerification) => void

  // Utilities
  getAssignedAudits: () => MockAuditRequest[]
  getCompanyAudits: (companyId: string) => MockAuditRequest[]
  reset: () => void
}

export const useMockStore = create<MockStoreState>()(
  persist(
    (set, get) => ({
      auditRequests: SEED_REQUESTS,
      proofs: SEED_PROOFS,
      certificates: SEED_CERTS,
      verifications: SEED_VERIFICATIONS,

      acceptRequest: (id) =>
        set((s) => ({
          auditRequests: s.auditRequests.map((r) =>
            r.id === id ? { ...r, status: 'accepted' } : r
          ),
        })),

      rejectRequest: (id) =>
        set((s) => ({
          auditRequests: s.auditRequests.map((r) =>
            r.id === id ? { ...r, status: 'rejected' } : r
          ),
        })),

      addProof: (proof) =>
        set((s) => ({ proofs: [proof, ...s.proofs] })),

      issueCertificate: (cert) =>
        set((s) => ({ certificates: [cert, ...s.certificates] })),

      submitAuditRequest: (req) =>
        set((s) => ({ auditRequests: [req, ...s.auditRequests] })),

      addVerification: (v) =>
        set((s) => ({
          verifications: [v, ...s.verifications],
          proofs: s.proofs.map((p) =>
            p.id === v.proofId ? { ...p, status: 'verified', verificationStatus: 'verified' } : p
          ),
        })),

      getAssignedAudits: () =>
        get().auditRequests.filter((r) => r.status === 'accepted'),

      getCompanyAudits: (companyId) =>
        get().auditRequests.filter((r) => r.companyId === companyId),

      reset: () =>
        set({
          auditRequests: SEED_REQUESTS,
          proofs: SEED_PROOFS,
          certificates: SEED_CERTS,
          verifications: SEED_VERIFICATIONS,
        }),
    }),
    {
      name: 'zka-mock-store',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
