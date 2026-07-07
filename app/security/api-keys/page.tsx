'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Copy, Check, Trash2, Plus } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { ApiKey } from '@/types/security'

export default function ApiKeysPage() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
  const [newKeyName, setNewKeyName] = useState('')
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const loadKeys = async () => {
      try {
        // Load the mock API keys directly
        setApiKeys(mockAPI.apiKeys || [])
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadKeys()
  }, [])

  const handleGenerateKey = async () => {
    if (!newKeyName.trim()) return

    setCreating(true)
    try {
      const newKey = await mockAPI.generateApiKey(newKeyName)
      // Reload keys list
      setNewKeyName('')
    } catch (error) {
    } finally {
      setCreating(false)
    }
  }

  const handleDeleteKey = async (keyId: string) => {
    try {
      await mockAPI.deleteApiKey(keyId)
      setApiKeys((prev) => prev.filter((k) => k.id !== keyId))
    } catch (error) {
    }
  }

  const handleCopy = (key: string, id: string) => {
    navigator.clipboard.writeText(key)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-bold">API Key Management</h1>
          <p className="text-sm text-muted-foreground">Create and manage API keys for integrations</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Generate New API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Key name (e.g., Production API)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
                className="flex-1 px-3 py-2 bg-muted border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan"
              />
              <Button
                onClick={handleGenerateKey}
                disabled={!newKeyName.trim() || creating}
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                {creating ? 'Creating...' : 'Generate'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Active API Keys</CardTitle>
            <CardDescription>Your API keys for authentication</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-20 bg-muted rounded-lg animate-pulse" />
                ))}
              </div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No API keys yet. Create one to get started.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <motion.div
                    key={apiKey.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border border-border ${
                      apiKey.status === 'revoked' ? 'opacity-50 bg-muted/30' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-semibold">{apiKey.name}</h3>
                        <p className="text-xs text-muted-foreground">
                          Created: {new Date(apiKey.created).toLocaleDateString()}
                        </p>
                      </div>
                      <span
                        className={`text-xs px-2 py-1 rounded whitespace-nowrap ${
                          apiKey.status === 'active'
                            ? 'bg-green-500/20 text-green-500'
                            : apiKey.status === 'expired'
                              ? 'bg-red-500/20 text-red-500'
                              : 'bg-muted text-muted-foreground'
                        }`}
                      >
                        {apiKey.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="mb-3 p-3 bg-muted rounded border border-border font-mono text-xs flex items-center justify-between">
                      <span>{apiKey.key.substring(0, 20)}...{apiKey.key.substring(-8)}</span>
                      <button
                        onClick={() => handleCopy(apiKey.key, apiKey.id)}
                        className="p-1 hover:bg-border rounded transition-colors"
                      >
                        {copiedId === apiKey.id ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4 text-muted-foreground" />
                        )}
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">Permissions</p>
                        <p className="text-xs">{apiKey.permissions.join(', ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Expires</p>
                        <p className="text-xs">{apiKey.expiresAt || 'Never'}</p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleDeleteKey(apiKey.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      Revoke
                    </Button>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
