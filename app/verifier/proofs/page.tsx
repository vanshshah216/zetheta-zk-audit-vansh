'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Download, CheckCircle, AlertCircle, Eye as EyeIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ds/card'
import { useMockStore, MockProof } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { useToast } from '@/hooks/use-toast'
import { downloadProofReportPdf } from '@/lib/pdf-export'

export default function ProofsPage() {
  const { proofs: mockProofs } = useMockStore()
  const toast = useToast()

  const [isLoading, setIsLoading] = useState(true)
  const [dbProofs, setDbProofs] = useState<MockProof[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    const fetchProofs = async () => {
      setIsLoading(true)
      try {
        const p = await supabaseAuditService.getProofs()
        const mapped = p.map((r) => ({
          id: r.id,
          auditId: r.audit_id,
          auditName: r.audit_name,
          companyName: r.company_name,
          status: r.status as any,
          hash: r.hash,
          blockchainTxHash: r.blockchain_tx_hash || '',
          generatedAt: r.generated_at,
          verificationStatus: r.verification_status as any,
        }))
        setDbProofs(mapped)
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to mock store', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchProofs()
  }, [])

  const proofs = dbProofs.length > 0 ? dbProofs : mockProofs

  const handleDownload = async (proof: MockProof) => {
    try {
      await downloadProofReportPdf({
        id: proof.id,
        companyName: proof.companyName,
        auditName: proof.auditName,
        status: proof.status,
        hash: proof.hash,
        blockchainTxHash: proof.blockchainTxHash,
        generatedAt: proof.generatedAt,
        verificationStatus: proof.verificationStatus,
      })
      toast.success('Download Started', `Proof ${proof.id} PDF has been downloaded.`)
    } catch (error) {
      console.error('Proof PDF download failed', error)
      toast.error('Download Failed', 'Unable to generate the proof PDF right now.')
    }
  }

  const filteredProofs = proofs.filter((p) => {
    const matchesSearch =
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.auditName.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || p.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const paginatedProofs = filteredProofs.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
  const totalPages = Math.ceil(filteredProofs.length / itemsPerPage)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Proof Explorer</h1>
        <p className="text-gray-400">View and manage all submitted proofs</p>
      </div>

      {isLoading && (
        <div className="text-sm text-cyan-400 bg-cyan-900/20 border border-cyan-500/20 p-2 rounded text-center animate-pulse">
          Loading proofs...
        </div>
      )}

      {/* Search and Filters */}
      <Card className="border-cyan-500/20">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
              <input
                type="text"
                placeholder="Search by proof ID, company, or audit name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {['all', 'verified', 'generating', 'failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => {
                    setStatusFilter(status)
                    setCurrentPage(1)
                  }}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    statusFilter === status
                      ? 'bg-cyan-500 text-white'
                      : 'border border-gray-700 text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-cyan-500/20 overflow-hidden">
        <CardContent className="pt-6 p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-900/50 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Proof ID</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Company</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Audit Type</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Blockchain</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {paginatedProofs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-400">
                      No proofs found
                    </td>
                  </tr>
                ) : (
                  paginatedProofs.map((proof) => (
                    <tr key={proof.id} className="hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4 text-white font-mono text-sm">{proof.id}</td>
                      <td className="px-6 py-4 text-gray-300">{proof.companyName}</td>
                      <td className="px-6 py-4 text-gray-300">{proof.auditName}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            proof.status === 'verified'
                              ? 'bg-emerald-500/20 text-emerald-400'
                              : proof.status === 'failed'
                                ? 'bg-red-500/20 text-red-400'
                                : 'bg-yellow-500/20 text-yellow-400'
                          }`}
                        >
                          {proof.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {proof.blockchainTxHash ? (
                          <CheckCircle className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <AlertCircle className="w-5 h-5 text-yellow-500" />
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => toast.info('View Proof', `Viewing details for ${proof.id}`)}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-cyan-400"
                          >
                            <EyeIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDownload(proof)}
                            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-cyan-400"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg ${
                currentPage === page
                  ? 'bg-cyan-500 text-white'
                  : 'border border-gray-700 text-gray-300 hover:border-gray-600'
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:border-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </motion.div>
  )
}
