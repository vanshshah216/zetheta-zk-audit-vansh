import {
  Audit,
  AuditFile,
  Proof,
  Certificate,
  Payment,
  Notification,
  Organization,
  DashboardMetrics,
} from '@/types/company'

// Mock data
export const mockOrganization: Organization = {
  id: 'org-001',
  name: 'TechCorp Industries',
  industry: 'Software Development',
  employees: 250,
  website: 'https://techcorp.example.com',
  address: '123 Tech Street, Silicon Valley, CA 94025',
  contact: 'info@techcorp.com',
  verificationStatus: 'verified',
  walletAddress: '0x1234...5678',
}

export const mockAudits: Audit[] = [
  {
    id: 'audit-001',
    title: 'ISO 27001 Security Audit',
    category: 'Information Security',
    industry: 'Technology',
    description: 'Annual information security management system audit',
    status: 'in-progress',
    priority: 'high',
    assignedAuditor: 'John Smith',
    createdAt: new Date('2024-01-15'),
    deadline: new Date('2024-02-15'),
    progress: 65,
    budget: 5000,
    estimatedCost: 4500,
  },
  {
    id: 'audit-002',
    title: 'SOC 2 Type II Compliance',
    category: 'Compliance',
    industry: 'Cloud Services',
    description: 'System and Organization Controls audit',
    status: 'completed',
    priority: 'high',
    assignedAuditor: 'Sarah Johnson',
    createdAt: new Date('2024-01-01'),
    completionDate: new Date('2024-01-30'),
    progress: 100,
    budget: 7500,
    estimatedCost: 7200,
    proofGenerated: true,
    blockchainTxHash: '0xabc123...',
    certificateId: 'cert-001',
  },
  {
    id: 'audit-003',
    title: 'GDPR Data Protection Assessment',
    category: 'Data Protection',
    industry: 'Technology',
    description: 'GDPR compliance and data protection audit',
    status: 'pending',
    priority: 'critical',
    createdAt: new Date('2024-02-01'),
    deadline: new Date('2024-03-01'),
    progress: 0,
    budget: 6000,
  },
  {
    id: 'audit-004',
    title: 'HIPAA Compliance Review',
    category: 'Healthcare Compliance',
    industry: 'Healthcare IT',
    description: 'HIPAA security and privacy rule compliance review',
    status: 'completed',
    priority: 'high',
    assignedAuditor: 'Mike Davis',
    createdAt: new Date('2023-12-01'),
    completionDate: new Date('2024-01-15'),
    progress: 100,
    budget: 8000,
    estimatedCost: 7800,
    proofGenerated: true,
    blockchainTxHash: '0xdef456...',
    certificateId: 'cert-002',
  },
]

export const mockAuditFiles: AuditFile[] = [
  {
    id: 'file-001',
    name: 'Financial_Statements_2024.pdf',
    type: 'application/pdf',
    size: 2048576,
    uploadedAt: new Date('2024-01-20'),
    url: '/documents/financial-statements.pdf',
  },
  {
    id: 'file-002',
    name: 'Balance_Sheet_Q1.xlsx',
    type: 'application/vnd.ms-excel',
    size: 512000,
    uploadedAt: new Date('2024-01-22'),
    url: '/documents/balance-sheet.xlsx',
  },
  {
    id: 'file-003',
    name: 'Income_Statement.xlsx',
    type: 'application/vnd.ms-excel',
    size: 384000,
    uploadedAt: new Date('2024-01-25'),
    url: '/documents/income-statement.xlsx',
  },
  {
    id: 'file-004',
    name: 'Tax_Documents_2024.pdf',
    type: 'application/pdf',
    size: 1536000,
    uploadedAt: new Date('2024-02-01'),
    url: '/documents/tax-documents.pdf',
  },
]

export const mockProofs: Proof[] = [
  {
    id: 'proof-001',
    hash: '0xabcdef123456789...',
    timestamp: new Date('2024-01-30'),
    blockchainStatus: 'confirmed',
    blockchainTxHash: '0xabc123...',
    auditId: 'audit-002',
    downloadUrl: '/proofs/proof-001.pdf',
  },
  {
    id: 'proof-002',
    hash: '0x123456789abcdef...',
    timestamp: new Date('2024-01-15'),
    blockchainStatus: 'confirmed',
    blockchainTxHash: '0xdef456...',
    auditId: 'audit-004',
    downloadUrl: '/proofs/proof-002.pdf',
  },
]

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-001',
    auditId: 'audit-002',
    complianceStandard: 'SOC2',
    issueDate: new Date('2024-01-30'),
    expiryDate: new Date('2025-01-30'),
    pdfUrl: '/certificates/SOC2-Type-II.pdf',
  },
  {
    id: 'cert-002',
    auditId: 'audit-004',
    complianceStandard: 'HIPAA',
    issueDate: new Date('2024-01-15'),
    expiryDate: new Date('2025-01-15'),
    pdfUrl: '/certificates/HIPAA-Compliance.pdf',
  },
]

export const mockPayments: Payment[] = [
  {
    id: 'pay-001',
    auditId: 'audit-001',
    amount: 4500,
    status: 'completed',
    date: new Date('2024-01-20'),
    method: 'Credit Card',
    description: 'ISO 27001 Audit Payment',
    invoiceUrl: '/invoices/INV-001.pdf',
    receiptUrl: '/receipts/REC-001.pdf',
  },
  {
    id: 'pay-002',
    auditId: 'audit-003',
    amount: 6000,
    status: 'pending',
    date: new Date('2024-02-05'),
    method: 'Bank Transfer',
    description: 'GDPR Assessment Payment',
  },
  {
    id: 'pay-003',
    auditId: 'audit-002',
    amount: 7200,
    status: 'completed',
    date: new Date('2024-01-05'),
    method: 'Stripe',
    description: 'SOC 2 Compliance Payment',
    invoiceUrl: '/invoices/INV-002.pdf',
    receiptUrl: '/receipts/REC-002.pdf',
  },
]

export const mockNotifications: Notification[] = [
  {
    id: 'notif-001',
    title: 'Audit Progress Update',
    message: 'Your ISO 27001 audit is now 65% complete',
    category: 'audits',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
    actionUrl: '/company/audit-details/audit-001',
  },
  {
    id: 'notif-002',
    title: 'Payment Reminder',
    message: 'Payment due for GDPR Assessment is due in 3 days',
    category: 'payments',
    read: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
    actionUrl: '/company/payments',
  },
  {
    id: 'notif-003',
    title: 'Security Alert',
    message: 'Unusual login activity detected',
    category: 'security',
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: 'notif-004',
    title: 'Certificate Issued',
    message: 'Your SOC 2 Type II certificate is ready for download',
    category: 'verification',
    read: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    actionUrl: '/company/certificates',
  },
]

export const mockDashboardMetrics: DashboardMetrics = {
  activeAudits: 1,
  completedAudits: 2,
  pendingPayments: 1,
  complianceScore: 78,
  proofsGenerated: 2,
  upcomingDeadlines: 2,
  monthlyAuditRequests: [
    { month: 'Dec', count: 2 },
    { month: 'Jan', count: 3 },
    { month: 'Feb', count: 2 },
  ],
  complianceTrend: [
    { month: 'Dec', score: 65 },
    { month: 'Jan', score: 72 },
    { month: 'Feb', score: 78 },
  ],
  auditStatusDistribution: [
    { status: 'pending', count: 1 },
    { status: 'in-progress', count: 1 },
    { status: 'completed', count: 2 },
    { status: 'failed', count: 0 },
  ],
}

// Mock API functions
export const mockAPI = {
  getDashboard: async () => mockDashboardMetrics,
  getOrganization: async () => mockOrganization,
  getAudits: async () => mockAudits,
  getAudit: async (id: string) => mockAudits.find((a) => a.id === id),
  getAuditFiles: async (auditId: string) => mockAuditFiles,
  uploadFiles: async (files: File[]) => {
    // Simulate upload
    return files.map((file) => ({
      id: `file-${Math.random().toString(36).substr(2, 9)}`,
      name: file.name,
      type: file.type,
      size: file.size,
      uploadedAt: new Date(),
      url: `/uploads/${file.name}`,
    }))
  },
  createAudit: async (data: any) => ({
    id: `audit-${Math.random().toString(36).substr(2, 9)}`,
    ...data,
    status: 'pending' as const,
    progress: 0,
    createdAt: new Date(),
  }),
  getProofs: async () => mockProofs,
  getCertificates: async () => mockCertificates,
  getPayments: async () => mockPayments,
  getNotifications: async () => mockNotifications,
  updateNotification: async (id: string, read: boolean) => {
    const notif = mockNotifications.find((n) => n.id === id)
    if (notif) notif.read = read
    return notif
  },
  logout: async () => true,
}
