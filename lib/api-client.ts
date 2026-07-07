import { authService } from '@/services/auth-service'
import { auditService } from '@/services/audit-service'
import { proofService } from '@/services/proof-service'
import { companyService } from '@/services/company-service'
import { auditorService } from '@/services/auditor-service'
import { verifierService } from '@/services/verifier-service'

/**
 * Centralized API Client
 * Provides a single point of access to all backend services
 */
export const apiClient = {
  // Auth services
  auth: authService,

  // Data services
  audits: auditService,
  proofs: proofService,
  company: companyService,
  auditor: auditorService,
  verifier: verifierService,
}

export default apiClient
