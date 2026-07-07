import { AuditDetailsContent } from '@/components/company/audit-details/audit-details-content'

export const metadata = {
  title: 'Audit Details - AuditChain',
  description: 'View audit details and progress',
}

export default function AuditDetailsPage({ params }: { params: { id: string } }) {
  return <AuditDetailsContent auditId={params.id} />
}
