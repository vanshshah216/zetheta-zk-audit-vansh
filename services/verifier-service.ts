export interface Verification {
  id: string
  proofId: string
  verifier: string
  status: 'pending' | 'verified' | 'rejected'
  verifiedAt?: Date
  notes: string
}

export interface VerifierStats {
  verifications: number
  verified: number
  rejected: number
  avgTime: number
}

const MOCK_VERIFICATIONS: Verification[] = [
  {
    id: 'ver-1',
    proofId: 'proof-1',
    verifier: 'Alex Verifier',
    status: 'verified',
    verifiedAt: new Date('2024-02-10'),
    notes: 'All checks passed successfully',
  },
  {
    id: 'ver-2',
    proofId: 'proof-2',
    verifier: 'Alex Verifier',
    status: 'pending',
    notes: 'Under review',
  },
]

const MOCK_VERIFIER_STATS: VerifierStats = {
  verifications: 87,
  verified: 82,
  rejected: 5,
  avgTime: 2.4,
}

export const verifierService = {
  async getVerifications(): Promise<Verification[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return MOCK_VERIFICATIONS
  },

  async getVerificationById(id: string): Promise<Verification | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_VERIFICATIONS.find(v => v.id === id) || null
  },

  async getVerifierStats(): Promise<VerifierStats> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_VERIFIER_STATS
  },

  async verifyProof(proofId: string, notes: string): Promise<Verification> {
    await new Promise(resolve => setTimeout(resolve, 600))
    const verification: Verification = {
      id: `ver-${Date.now()}`,
      proofId,
      verifier: 'Current Verifier',
      status: 'verified',
      verifiedAt: new Date(),
      notes,
    }
    MOCK_VERIFICATIONS.push(verification)
    return verification
  },

  async rejectProof(proofId: string, notes: string): Promise<Verification> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const verification: Verification = {
      id: `ver-${Date.now()}`,
      proofId,
      verifier: 'Current Verifier',
      status: 'rejected',
      notes,
    }
    MOCK_VERIFICATIONS.push(verification)
    return verification
  },
}
