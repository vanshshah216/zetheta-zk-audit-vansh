'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Bell, Key, Eye, Trash2, Shield, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'

export default function SettingsPage() {
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const handleToggle = (setter: any) => {
    setter((prev: boolean) => !prev)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and security settings</p>
      </div>

      {/* Security Settings */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            Security
          </CardTitle>
          <CardDescription>Manage your security preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Password */}
          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your password regularly</p>
            </div>
            <Button variant="outline" size="sm">
              Change
            </Button>
          </div>

          {/* Two Factor Authentication */}
          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
              </p>
            </div>
            <button
              onClick={() => handleToggle(setTwoFactorEnabled)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                twoFactorEnabled ? 'bg-cyan' : 'bg-card'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  twoFactorEnabled ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* API Keys */}
          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Key className="w-4 h-4" />
                API Keys
              </p>
              <p className="text-sm text-muted-foreground">Manage your API access tokens</p>
            </div>
            <Button variant="outline" size="sm">
              Manage
            </Button>
          </div>

          {/* Sessions */}
          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
            <div>
              <p className="font-medium flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Active Sessions
              </p>
              <p className="text-sm text-muted-foreground">View and manage active sessions</p>
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            Notifications
          </CardTitle>
          <CardDescription>Configure how you receive notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates via email</p>
            </div>
            <button
              onClick={() => handleToggle(setEmailNotifications)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                emailNotifications ? 'bg-cyan' : 'bg-card'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  emailNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Push Notifications */}
          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium">Push Notifications</p>
              <p className="text-sm text-muted-foreground">Receive browser notifications</p>
            </div>
            <button
              onClick={() => handleToggle(setPushNotifications)}
              className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                pushNotifications ? 'bg-cyan' : 'bg-card'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  pushNotifications ? 'translate-x-7' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Notification Types */}
          <div className="space-y-2 mt-4">
            <p className="text-sm font-medium text-muted-foreground">Notification Types</p>
            <div className="space-y-2">
              {[
                { label: 'Audit Updates', enabled: true },
                { label: 'Payment Reminders', enabled: true },
                { label: 'Security Alerts', enabled: true },
                { label: 'Certificate Expiry', enabled: true },
              ].map((type) => (
                <label key={type.label} className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={type.enabled}
                    className="rounded"
                  />
                  <span className="text-sm">{type.label}</span>
                </label>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Connected Integrations */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Connected Integrations
          </CardTitle>
          <CardDescription>Manage third-party integrations</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg">
            <div>
              <p className="font-medium">Blockchain Wallet</p>
              <p className="text-sm text-muted-foreground">Connected: 0x1234...5678</p>
            </div>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card variant="glass" className="border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-500 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            Danger Zone
          </CardTitle>
          <CardDescription>Irreversible actions</CardDescription>
        </CardHeader>
        <CardContent>
          {showDeleteConfirm ? (
            <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-lg">
              <p className="font-medium text-red-400 mb-4">
                This action cannot be undone. All data will be permanently deleted.
              </p>
              <div className="flex gap-2">
                <Button
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Delete Organization
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between p-4 bg-card/50 rounded-lg border border-red-500/20">
              <div>
                <p className="font-medium text-red-400">Delete Organization</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete this organization and all data
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => setShowDeleteConfirm(true)}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
