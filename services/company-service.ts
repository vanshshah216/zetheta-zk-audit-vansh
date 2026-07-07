export interface CompanyProfile {
  id: string
  name: string
  email: string
  phone: string
  address: string
  industry: string
  employees: number
  website: string
}

export interface AuditRequest {
  id: string
  companyId: string
  title: string
  description: string
  type: string
  status: 'pending' | 'accepted' | 'rejected' | 'completed'
  requestedAt: Date
  completedAt?: Date
  budget: number
}

const MOCK_COMPANY: CompanyProfile = {
  id: 'company-1',
  name: 'Tech Corp',
  email: 'company@example.com',
  phone: '+1234567890',
  address: '123 Tech Street, San Francisco, CA',
  industry: 'Technology',
  employees: 500,
  website: 'https://techcorp.example.com',
}

const MOCK_AUDIT_REQUESTS: AuditRequest[] = [
  {
    id: 'req-1',
    companyId: 'company-1',
    title: 'Security Audit Q1 2024',
    description: 'Complete security assessment',
    type: 'Security',
    status: 'pending',
    requestedAt: new Date('2024-02-01'),
    budget: 5000,
  },
  {
    id: 'req-2',
    companyId: 'company-1',
    title: 'Compliance Review',
    description: 'SOC 2 Compliance',
    type: 'Compliance',
    status: 'accepted',
    requestedAt: new Date('2024-01-15'),
    completedAt: new Date('2024-02-10'),
    budget: 8000,
  },
]

export const companyService = {
  async getCompanyProfile(): Promise<CompanyProfile> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_COMPANY
  },

  async updateCompanyProfile(profile: Partial<CompanyProfile>): Promise<CompanyProfile> {
    await new Promise(resolve => setTimeout(resolve, 500))
    Object.assign(MOCK_COMPANY, profile)
    return MOCK_COMPANY
  },

  async getAuditRequests(): Promise<AuditRequest[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    return MOCK_AUDIT_REQUESTS
  },

  async createAuditRequest(request: Omit<AuditRequest, 'id' | 'requestedAt'>): Promise<AuditRequest> {
    await new Promise(resolve => setTimeout(resolve, 600))
    const newRequest: AuditRequest = {
      ...request,
      id: `req-${Date.now()}`,
      requestedAt: new Date(),
    }
    MOCK_AUDIT_REQUESTS.push(newRequest)
    return newRequest
  },

  async updateAuditRequest(id: string, updates: Partial<AuditRequest>): Promise<AuditRequest | null> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const request = MOCK_AUDIT_REQUESTS.find(r => r.id === id)
    if (!request) return null
    Object.assign(request, updates)
    return request
  },
}
