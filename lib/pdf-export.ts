export interface CertificatePdfData {
  id?: string
  certificateNumber?: string
  companyName?: string
  auditType?: string
  complianceStandard?: string
  issueDate?: string | Date
  expiryDate?: string | Date
  verificationHash?: string
  status?: string
}

export interface VerificationReportPdfData {
  id?: string
  proofId?: string
  proofHash?: string
  blockchainTxHash?: string
  verificationResult?: string
  timestamp?: string | Date
  complianceStatus?: string
  summary?: string
  totalVerifications?: number
  successfulVerifications?: number
  failedVerifications?: number
  complianceScore?: number
  topCompanies?: string[]
  topAuditors?: string[]
}

export interface ProofReportPdfData {
  id?: string
  companyName?: string
  auditName?: string
  auditType?: string
  status?: string
  hash?: string
  blockchainTxHash?: string
  generatedAt?: string | Date
  verificationStatus?: string
}

function toDisplayDate(value?: string | Date) {
  if (!value) return 'N/A'
  const date = value instanceof Date ? value : new Date(value)
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString()
}

function sanitizeFileName(value?: string) {
  return String(value || 'document')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'document'
}

async function createPdfWithContent(content: string[], fileName: string) {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 40
  let y = 60

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(20)
  doc.text('Zero Knowledge Audit Report', margin, y)
  y += 28

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(11)
  content.forEach((line) => {
    if (y > 760) {
      doc.addPage()
      y = 60
    }
    const text = line.length > 120 ? `${line.slice(0, 117)}...` : line
    doc.text(text, margin, y)
    y += 18
  })

  doc.save(fileName)
}

export async function downloadCertificatePdf(data: CertificatePdfData) {
  const fileName = `certificate-${sanitizeFileName(data.id || data.certificateNumber)}.pdf`
  const lines = [
    `Certificate ID: ${data.id || data.certificateNumber || 'N/A'}`,
    `Company Name: ${data.companyName || 'N/A'}`,
    `Audit Type: ${data.auditType || 'N/A'}`,
    `Compliance Standard: ${data.complianceStandard || 'N/A'}`,
    `Issue Date: ${toDisplayDate(data.issueDate)}`,
    `Expiry Date: ${toDisplayDate(data.expiryDate)}`,
    `Verification Hash: ${data.verificationHash || 'N/A'}`,
    `Status: ${data.status || 'N/A'}`,
  ]

  await createPdfWithContent(lines, fileName)
}

export async function downloadVerificationReportPdf(data: VerificationReportPdfData) {
  const fileName = `verification-report-${sanitizeFileName(data.id || data.proofId)}.pdf`
  const lines = [
    `Proof ID: ${data.proofId || data.id || 'N/A'}`,
    `Proof Hash: ${data.proofHash || 'N/A'}`,
    `Blockchain Transaction Hash: ${data.blockchainTxHash || 'N/A'}`,
    `Verification Result: ${data.verificationResult || 'N/A'}`,
    `Timestamp: ${toDisplayDate(data.timestamp)}`,
    `Compliance Status: ${data.complianceStatus || 'N/A'}`,
    `Summary: ${data.summary || `Successful ${data.successfulVerifications ?? 0} of ${data.totalVerifications ?? 0} verifications. Compliance score ${data.complianceScore ?? 0}%`}`,
    `Top Companies: ${data.topCompanies?.join(', ') || 'N/A'}`,
    `Top Auditors: ${data.topAuditors?.join(', ') || 'N/A'}`,
  ]

  await createPdfWithContent(lines, fileName)
}

export async function downloadProofReportPdf(data: ProofReportPdfData) {
  const fileName = `proof-report-${sanitizeFileName(data.id)}.pdf`
  const lines = [
    `Proof ID: ${data.id || 'N/A'}`,
    `Company Name: ${data.companyName || 'N/A'}`,
    `Audit Name: ${data.auditName || data.auditType || 'N/A'}`,
    `Status: ${data.status || 'N/A'}`,
    `Proof Hash: ${data.hash || 'N/A'}`,
    `Blockchain Transaction Hash: ${data.blockchainTxHash || 'N/A'}`,
    `Generated At: ${toDisplayDate(data.generatedAt)}`,
    `Verification Status: ${data.verificationStatus || 'N/A'}`,
  ]

  await createPdfWithContent(lines, fileName)
}
