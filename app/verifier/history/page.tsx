'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Download } from 'lucide-react'
import { Card, CardContent } from '@/components/ds/card'
import { useMockStore, MockVerification } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { useToast } from '@/hooks/use-toast'
import { downloadVerificationReportPdf } from '@/lib/pdf-export'

export default function HistoryPage() {
  const { verifications: mockVerifs } = useMockStore()
  const toast = useToast()
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline')

  const [isLoading, setIsLoading] = useState(true)
  const [dbVerifs, setDbVerifs] = useState<MockVerification[]>([])

  useEffect(() => {
    const fetchHistory = async () => {
      setIsLoading(true)
      try {
        const v = await supabaseAuditService.getVerificationHistory()
        const mapped = v.map((r) => ({
          id: r.id,
          proofId: r.proof_id,
          proofHash: 'N/A', // fallback
          action: r.action,
          result: r.result as any,
          timestamp: r.timestamp,
          details: r.details,
        }))
        setDbVerifs(mapped)
      } catch (err) {
        console.warn('Supabase fetch failed, falling back to mock store', err)
      } finally {
        setIsLoading(false)
      }
    }
    fetchHistory()
  }, [])

  const verifications = dbVerifs.length > 0 ? dbVerifs : mockVerifs

  const handleExportReport = async () => {
    try {
      await downloadVerificationReportPdf({
        id: `history-${verifications[0]?.id || 'report'}`,
        proofId: verifications[0]?.proofId || 'N/A',
        verificationResult: verifications.some((item) => item.result === 'success') ? 'Completed' : 'Needs Review',
        timestamp: new Date(),
        complianceStatus: 'Compliant',
        summary: `${verifications.length} verification events recorded.`,
      })
      toast.success('Export Started', 'History report PDF has been downloaded.')
    } catch (error) {
      console.error('History report PDF export failed', error)
      toast.error('Export Failed', 'Unable to generate the history report PDF right now.')
    }
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Verification History</h1>
          <p className="text-gray-400">Track all verification activities</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('timeline')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'timeline'
                ? 'bg-cyan-500 text-white'
                : 'border border-gray-700 text-gray-300 hover:border-gray-600'
            }`}
          >
            Timeline
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'table'
                ? 'bg-cyan-500 text-white'
                : 'border border-gray-700 text-gray-300 hover:border-gray-600'
            }`}
          >
            Table
          </button>
        </div>
      </div>

      {isLoading && (
        <div className="text-sm text-cyan-400 bg-cyan-900/20 border border-cyan-500/20 p-2 rounded text-center animate-pulse">
          Loading history...
        </div>
      )}

      {viewMode === 'timeline' ? (
        <Card className="border-cyan-500/20">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {verifications.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.result === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />
                    {index < verifications.length - 1 && <div className="w-0.5 h-12 bg-gradient-to-b from-gray-700 to-gray-800 mt-2" />}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-white font-medium">{item.action}</p>
                        <p className="text-sm text-gray-400 mt-1">{item.details}</p>
                      </div>
                      <span className="text-xs text-gray-500">{new Date(item.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Proof: {item.proofId}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-cyan-500/20">
          <CardContent className="pt-6 p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-900/50 border-b border-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Action</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Proof ID</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Result</th>
                    <th className="px-6 py-3 text-left text-sm font-medium text-gray-400">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {verifications.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-900/50 transition-colors">
                      <td className="px-6 py-4 text-white">{item.action}</td>
                      <td className="px-6 py-4 text-gray-300 font-mono text-sm">{item.proofId}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-2 ${
                            item.result === 'success' ? 'text-emerald-400' : 'text-red-400'
                          }`}
                        >
                          {item.result === 'success' ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <AlertCircle className="w-4 h-4" />
                          )}
                          {item.result}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-400 text-sm">
                        {new Date(item.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Export Button */}
      <div className="flex justify-end">
        <button
          onClick={() => handleExportReport()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
        >
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </motion.div>
  )
}
