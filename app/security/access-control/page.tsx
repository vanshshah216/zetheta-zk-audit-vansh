'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/security/mock-data'
import { RolePermissions, Permission } from '@/types/security'

export default function AccessControlPage() {
  const [rolePermissions, setRolePermissions] = useState<RolePermissions[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const [roles, perms] = await Promise.all([mockAPI.getRolePermissions(), mockAPI.getPermissions()])
        setRolePermissions(roles)
        setPermissions(perms)
      } catch (error) {
        // Handle error silently
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <div className="p-6">
        <div className="h-96 bg-muted rounded-lg animate-pulse" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div>
          <h1 className="text-2xl font-bold">Access Control (RBAC)</h1>
          <p className="text-sm text-muted-foreground">Manage role-based permissions and access</p>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="text-base">Permissions Matrix</CardTitle>
            <CardDescription>Role-based permissions mapping</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-4 font-semibold text-xs">Permission</th>
                    {rolePermissions.map((role) => (
                      <th key={role.role} className="text-center py-3 px-4 font-semibold text-xs uppercase">
                        {role.role}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map((permission) => (
                    <tr key={permission.id} className="border-b border-border hover:bg-muted/50">
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium">{permission.name}</p>
                          <p className="text-xs text-muted-foreground">{permission.description}</p>
                        </div>
                      </td>
                      {rolePermissions.map((role) => (
                        <td key={`${permission.id}-${role.role}`} className="text-center py-3 px-4">
                          {role.permissions.includes(permission.name) ? (
                            <Check className="w-5 h-5 text-green-500 mx-auto" />
                          ) : (
                            <X className="w-5 h-5 text-muted-foreground mx-auto" />
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rolePermissions.map((role) => (
            <Card key={role.role} className="border-border">
              <CardHeader>
                <CardTitle className="text-base capitalize">{role.role} Role</CardTitle>
                <CardDescription>{role.permissions.length} permissions granted</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {role.permissions.map((perm) => (
                    <div
                      key={perm}
                      className="flex items-center gap-2 p-2 bg-muted rounded border border-border"
                    >
                      <Check className="w-4 h-4 text-cyan" />
                      <span className="text-sm">{perm}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
