'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Smartphone, Trash2, Check } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { TrustedDevice } from '@/types/security'

export default function DevicesPage() {
  const [devices, setDevices] = useState<TrustedDevice[]>([])
  const [loading, setLoading] = useState(true)
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set())

  useEffect(() => {
    const loadDevices = async () => {
      try {
        const data = await mockAPI.getTrustedDevices()
        setDevices(data)
      } catch (error) {
      } finally {
        setLoading(false)
      }
    }

    loadDevices()
  }, [])

  const handleRemoveDevice = async (deviceId: string) => {
    setRemovingIds((prev) => new Set(prev).add(deviceId))
    try {
      await mockAPI.removeDevice(deviceId)
      setTimeout(() => {
        setDevices((prev) => prev.filter((d) => d.id !== deviceId))
        setRemovingIds((prev) => {
          const next = new Set(prev)
          next.delete(deviceId)
          return next
        })
      }, 300)
    } catch (error) {
      setRemovingIds((prev) => {
        const next = new Set(prev)
        next.delete(deviceId)
        return next
      })
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="h-24 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-bold">Trusted Devices</h1>
          <p className="text-sm text-muted-foreground">Manage devices that access your account</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Your Devices ({devices.length})</CardTitle>
            <CardDescription>Verified devices with secure access</CardDescription>
          </CardHeader>
          <CardContent>
            {devices.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No trusted devices configured</p>
              </div>
            ) : (
              <div className="space-y-4">
                {devices.map((device) => (
                  <motion.div
                    key={device.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`p-4 rounded-lg border border-border ${
                      removingIds.has(device.id) ? 'opacity-50' : ''
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <Smartphone className="w-5 h-5 text-cyan mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold flex items-center gap-2">
                            {device.name}
                            <Check className="w-4 h-4 text-green-500" />
                          </h3>
                          <p className="text-sm text-muted-foreground">{device.browser}</p>
                        </div>
                      </div>
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">
                        Verified
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4 text-sm">
                      <div>
                        <p className="text-xs text-muted-foreground">OS</p>
                        <p className="font-medium">{device.os}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">IP Address</p>
                        <p className="font-mono text-xs">{device.ipAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="font-medium">{device.country}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Last Login</p>
                        <p className="text-xs">{device.lastLogin}</p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="destructive"
                      className="gap-2"
                      onClick={() => handleRemoveDevice(device.id)}
                      disabled={removingIds.has(device.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                      {removingIds.has(device.id) ? 'Removing...' : 'Remove'}
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
