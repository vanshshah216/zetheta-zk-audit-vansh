import { supabase } from '@/lib/supabase/client'
import type { 
  AuditRequest, 
  Proof, 
  Certificate, 
  VerificationHistory, 
  Notification, 
  Payment 
} from '@/types/supabase'

export const supabaseAuditService = {
  // Profiles
  async getProfileByEmail(email: string) {
    const { data, error } = await supabase.from('profiles').select('*').eq('email', email).single()
    if (error) throw error
    return data as any // cast to any or Profile
  },
  // Audit Requests
  async getAuditRequests() {
    const { data, error } = await supabase.from('audit_requests').select('*')
    if (error) throw error
    return data as AuditRequest[]
  },

  async getAuditRequestsByCompany(companyId: string) {
    const { data, error } = await supabase.from('audit_requests').select('*').eq('company_id', companyId)
    if (error) throw error
    return data as AuditRequest[]
  },

  async getPendingAuditRequests() {
    const { data, error } = await supabase.from('audit_requests').select('*').eq('status', 'pending')
    if (error) throw error
    return data as AuditRequest[]
  },

  async getAssignedAuditRequests(auditorId: string) {
    const { data, error } = await supabase.from('audit_requests').select('*').eq('assigned_auditor_id', auditorId)
    if (error) throw error
    return data as AuditRequest[]
  },

  async createAuditRequest(auditData: Partial<AuditRequest>) {
    const { data, error } = await supabase.from('audit_requests').insert([auditData]).select().single()
    if (error) throw error
    return data as AuditRequest
  },

  async updateAuditRequestStatus(id: string, status: string, auditorId?: string) {
    const updatePayload: Partial<AuditRequest> = { status: status as AuditRequest['status'] }
    if (auditorId) updatePayload.assigned_auditor_id = auditorId
    
    const { data, error } = await supabase.from('audit_requests').update(updatePayload).eq('id', id).select().single()
    if (error) throw error
    return data as AuditRequest
  },

  // Proofs
  async getProofs() {
    const { data, error } = await supabase.from('proofs').select('*')
    if (error) throw error
    return data as Proof[]
  },

  async getProofsByAuditRequest(auditRequestId: string) {
    const { data, error } = await supabase.from('proofs').select('*').eq('audit_id', auditRequestId)
    if (error) throw error
    return data as Proof[]
  },

  async createProof(proofData: Partial<Proof>) {
    const { data, error } = await supabase.from('proofs').insert([proofData]).select().single()
    if (error) throw error
    return data as Proof
  },

  async updateProofStatus(id: string, status: string) {
    const { data, error } = await supabase.from('proofs').update({ status }).eq('id', id).select().single()
    if (error) throw error
    return data as Proof
  },

  // Certificates
  async getCertificates() {
    const { data, error } = await supabase.from('certificates').select('*')
    if (error) throw error
    return data as Certificate[]
  },

  async getCertificatesByCompany(companyId: string) {
    const { data, error } = await supabase.from('certificates').select('*').eq('company_id', companyId)
    if (error) throw error
    return data as Certificate[]
  },

  async createCertificate(certData: Partial<Certificate>) {
    const { data, error } = await supabase.from('certificates').insert([certData]).select().single()
    if (error) throw error
    return data as Certificate
  },

  // Verification
  async getVerificationHistory() {
    const { data, error } = await supabase.from('verification_history').select('*')
    if (error) throw error
    return data as VerificationHistory[]
  },

  async createVerificationRecord(recordData: Partial<VerificationHistory>) {
    const { data, error } = await supabase.from('verification_history').insert([recordData]).select().single()
    if (error) throw error
    return data as VerificationHistory
  },

  // Notifications
  async getNotifications() {
    const { data, error } = await supabase.from('notifications').select('*')
    if (error) throw error
    return data as Notification[]
  },

  async createNotification(notificationData: Partial<Notification>) {
    const { data, error } = await supabase.from('notifications').insert([notificationData]).select().single()
    if (error) throw error
    return data as Notification
  },

  // Payments
  async getPayments() {
    const { data, error } = await supabase.from('payments').select('*')
    if (error) throw error
    return data as Payment[]
  },

  async createPayment(paymentData: Partial<Payment>) {
    const { data, error } = await supabase.from('payments').insert([paymentData]).select().single()
    if (error) throw error
    return data as Payment
  }
}
