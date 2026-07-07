'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, TrendingUp, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { VerificationReport } from '@/types/verifier'
import { useToast } from '@/hooks/use-toast'

export default function ReportsPage() {
  const toast = useToast()
  const [report, setReport] = useState<VerificationReport | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadReport = async () => {
      try {
        const data = await mockVerifierAPI.getVerificationReport()
        setReport(data)
      } finally {
        setLoading(false)
      }
    }
    loadReport()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading report...</div>
  }

  if (!report) {
    return <div className="text-center py-8">No report available</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Verification Reports</h1>
          <p className="text-gray-400">Generate and view verification reports</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast.success('PDF Exported', 'Verification report PDF is being prepared.')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export PDF
          </button>
          <button
            onClick={() => toast.success('CSV Exported', 'Verification data CSV is being prepared.')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900/50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>


      {/* Report Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Total Verifications</p>
            <p className="text-3xl font-bold text-cyan-400">{report.totalVerifications}</p>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-green-500/5">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Successful</p>
            <p className="text-3xl font-bold text-emerald-400">{report.successfulVerifications}</p>
          </CardContent>
        </Card>

        <Card className="border-red-500/20 bg-gradient-to-br from-red-500/10 to-pink-500/5">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Failed</p>
            <p className="text-3xl font-bold text-red-400">{report.failedVerifications}</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-500/10 to-pink-500/5">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Compliance Score</p>
            <p className="text-3xl font-bold text-purple-400">{report.complianceScore.toFixed(1)}%</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Detailed Report */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Companies */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Top Companies</CardTitle>
            <CardDescription>Most verifications requested</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.topCompanies.map((company, index) => (
                <div key={company} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                    <span className="text-cyan-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-white flex-1">{company}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Auditors */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Top Auditors</CardTitle>
            <CardDescription>Most submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {report.topAuditors.map((auditor, index) => (
                <div key={auditor} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <span className="text-blue-400 font-bold text-sm">{index + 1}</span>
                  </div>
                  <span className="text-white flex-1">{auditor}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Additional Metrics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Average Verification Time</p>
                <p className="text-2xl font-bold text-cyan-400">{report.averageTime} min</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Success Rate</p>
                <p className="text-2xl font-bold text-emerald-400">
                  {((report.successfulVerifications / report.totalVerifications) * 100).toFixed(1)}%
                </p>
              </div>
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <p className="text-gray-400 text-sm mb-2">Failure Rate</p>
                <p className="text-2xl font-bold text-red-400">
                  {((report.failedVerifications / report.totalVerifications) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
