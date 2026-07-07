'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ExternalLink, CheckCircle, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { BlockchainTransaction } from '@/types/verifier'

export default function BlockchainPage() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTx, setSelectedTx] = useState<BlockchainTransaction | null>(null)

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await mockVerifierAPI.getBlockchainTransactions()
        setTransactions(data)
      } finally {
        setLoading(false)
      }
    }
    loadTransactions()
  }, [])

  const filtered = transactions.filter(
    (tx) =>
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.walletAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.network.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Blockchain Explorer</h1>
        <p className="text-gray-400">View blockchain transactions and smart contracts</p>
      </div>

      {/* Search */}
      <Card className="border-cyan-500/20">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
            <input
              type="text"
              placeholder="Search by hash, wallet, or network..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transactions List */}
        <div className="lg:col-span-2">
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white">Recent Transactions</CardTitle>
              <CardDescription>{filtered.length} transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">Loading...</div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((tx) => (
                    <motion.button
                      key={tx.hash}
                      onClick={() => setSelectedTx(tx)}
                      className="w-full p-4 rounded-lg border border-gray-700 hover:border-cyan-500/40 hover:bg-gray-900/50 transition-all text-left"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {tx.status === 'confirmed' ? (
                            <CheckCircle className="w-5 h-5 text-emerald-500" />
                          ) : (
                            <AlertCircle className="w-5 h-5 text-yellow-500" />
                          )}
                          <code className="text-cyan-400 text-xs font-mono">{tx.hash.slice(0, 16)}...</code>
                        </div>
                        <span className="text-xs px-2 py-1 rounded bg-blue-500/20 text-blue-400">
                          {tx.network}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span>Block: {tx.block}</span>
                        <span>{new Date(tx.timestamp).toLocaleTimeString()}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Details Panel */}
        {selectedTx && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
            <Card className="border-cyan-500/20 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white">Transaction Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Hash</p>
                  <code className="text-cyan-400 text-xs break-all font-mono">{selectedTx.hash}</code>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Block</p>
                  <p className="text-white">{selectedTx.block}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Status</p>
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                    selectedTx.status === 'confirmed'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {selectedTx.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Network</p>
                  <p className="text-white">{selectedTx.network}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Gas Used</p>
                  <p className="text-white">{selectedTx.gasUsed}</p>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Value</p>
                  <p className="text-white">{selectedTx.value} ETH</p>
                </div>
                <div className="pt-2 border-t border-gray-700">
                  <button className="w-full py-2 px-3 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors flex items-center justify-center gap-2 text-xs">
                    <ExternalLink className="w-4 h-4" />
                    View on Explorer
                  </button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
