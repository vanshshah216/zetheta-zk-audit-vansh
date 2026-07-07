'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle, AlertCircle, Download } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { VerificationHistory } from '@/types/verifier'

export default function HistoryPage() {
  const [history, setHistory] = useState<VerificationHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<'timeline' | 'table'>('timeline')

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const data = await mockVerifierAPI.getVerificationHistory()
        setHistory(data)
      } finally {
        setLoading(false)
      }
    }
    loadHistory()
  }, [])

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

      {loading ? (
        <div className="text-center py-8">Loading history...</div>
      ) : viewMode === 'timeline' ? (
        <Card className="border-cyan-500/20">
          <CardContent className="pt-6">
            <div className="space-y-6">
              {history.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex gap-4"
                >
                  {/* Timeline Dot */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-4 h-4 rounded-full ${
                        item.result === 'success' ? 'bg-emerald-500' : 'bg-red-500'
                      }`}
                    />
                    {index < history.length - 1 && <div className="w-0.5 h-12 bg-gradient-to-b from-gray-700 to-gray-800 mt-2" />}
                  </div>

                  {/* Content */}
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
                  {history.map((item) => (
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
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
          <Download className="w-4 h-4" />
          Export Report
        </button>
      </div>
    </motion.div>
  )
}
