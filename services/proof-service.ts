export interface Proof {
  id: string
  title: string
  description: string
  auditId: string
  type: string
  status: 'pending' | 'verified' | 'rejected'
  createdAt: Date
  verifiedAt?: Date
}

// Mock data
const MOCK_PROOFS: Proof[] = [
  {
    id: 'proof-1',
    title: 'Security Proof 1',
    description: 'First proof of security measures',
    auditId: 'audit-1',
    type: 'Security',
    status: 'verified',
    createdAt: new Date('2024-01-20'),
    verifiedAt: new Date('2024-01-25'),
  },
  {
    id: 'proof-2',
    title: 'Security Proof 2',
    description: 'Second proof of security measures',
    auditId: 'audit-1',
    type: 'Security',
    status: 'pending',
    createdAt: new Date('2024-02-01'),
  },
]

export const proofService = {
  async getProofs(): Promise<Proof[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return MOCK_PROOFS
  },

  async getProofsByAudit(auditId: string): Promise<Proof[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_PROOFS.filter(p => p.auditId === auditId)
  },

  async getProofById(id: string): Promise<Proof | null> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_PROOFS.find(p => p.id === id) || null
  },

  async createProof(proof: Omit<Proof, 'id' | 'createdAt'>): Promise<Proof> {
    await new Promise(resolve => setTimeout(resolve, 500))
    const newProof: Proof = {
      ...proof,
      id: `proof-${Date.now()}`,
      createdAt: new Date(),
    }
    MOCK_PROOFS.push(newProof)
    return newProof
  },

  async verifyProof(id: string): Promise<Proof | null> {
    await new Promise(resolve => setTimeout(resolve, 600))
    const proof = MOCK_PROOFS.find(p => p.id === id)
    if (!proof) return null
    proof.status = 'verified'
    proof.verifiedAt = new Date()
    return proof
  },

  async rejectProof(id: string): Promise<Proof | null> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const proof = MOCK_PROOFS.find(p => p.id === id)
    if (!proof) return null
    proof.status = 'rejected'
    return proof
  },
}
