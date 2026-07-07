export interface AuditorStats {
  completedAudits: number
  activeAudits: number
  earnings: number
  rating: number
}

export interface AuditorProfile {
  id: string
  firstName: string
  lastName: string
  email: string
  expertise: string[]
  certifications: string[]
  rating: number
  completedAudits: number
  hourlyRate: number
}

const MOCK_AUDITOR: AuditorProfile = {
  id: 'auditor-1',
  firstName: 'John',
  lastName: 'Auditor',
  email: 'auditor@example.com',
  expertise: ['Web Security', 'Smart Contracts', 'Infrastructure'],
  certifications: ['CEH', 'OSCP', 'CKA'],
  rating: 4.8,
  completedAudits: 42,
  hourlyRate: 150,
}

const MOCK_AUDITOR_STATS: AuditorStats = {
  completedAudits: 42,
  activeAudits: 3,
  earnings: 25000,
  rating: 4.8,
}

export const auditorService = {
  async getAuditorProfile(): Promise<AuditorProfile> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_AUDITOR
  },

  async updateAuditorProfile(profile: Partial<AuditorProfile>): Promise<AuditorProfile> {
    await new Promise(resolve => setTimeout(resolve, 500))
    Object.assign(MOCK_AUDITOR, profile)
    return MOCK_AUDITOR
  },

  async getAuditorStats(): Promise<AuditorStats> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return MOCK_AUDITOR_STATS
  },

  async updateHourlyRate(rate: number): Promise<AuditorProfile> {
    await new Promise(resolve => setTimeout(resolve, 400))
    MOCK_AUDITOR.hourlyRate = rate
    return MOCK_AUDITOR
  },
}
