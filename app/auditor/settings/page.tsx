'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Bell, Wallet, Eye, Shield, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockSettings } from '@/lib/auditor/mock-data'

export default function SettingsPage() {
  const [settings, setSettings] = useState(mockSettings)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
    <button
      onClick={onToggle}
      className={`relative w-12 h-6 rounded-full transition-colors ${
        enabled ? 'bg-cyan-500' : 'bg-gray-600'
      }`}
    >
      <div
        className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Settings</h2>
        <p className="text-muted-foreground">Manage your preferences and account settings</p>
      </motion.div>

      {/* Availability Settings */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Availability
            </CardTitle>
            <CardDescription>Set your current availability status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label htmlFor="availability" className="text-sm font-medium">
                  Current Status
                </label>
                <select
                  id="availability"
                  value={settings.availability}
                  className="px-3 py-2 bg-card/50 border border-border/30 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                >
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Notification Settings */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notifications
            </CardTitle>
            <CardDescription>Configure your notification preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="email-requests" className="text-sm font-medium">
                Email on New Request
              </label>
              <ToggleSwitch
                enabled={settings.notificationSettings.emailOnNewRequest}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      emailOnNewRequest: !settings.notificationSettings.emailOnNewRequest,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="email-messages" className="text-sm font-medium">
                Email on Message Received
              </label>
              <ToggleSwitch
                enabled={settings.notificationSettings.emailOnMessageReceived}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      emailOnMessageReceived: !settings.notificationSettings.emailOnMessageReceived,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="email-proof" className="text-sm font-medium">
                Email on Proof Generated
              </label>
              <ToggleSwitch
                enabled={settings.notificationSettings.emailOnProofGenerated}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      emailOnProofGenerated: !settings.notificationSettings.emailOnProofGenerated,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="email-cert" className="text-sm font-medium">
                Email on Certificate Issued
              </label>
              <ToggleSwitch
                enabled={settings.notificationSettings.emailOnCertificateIssued}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      emailOnCertificateIssued: !settings.notificationSettings.emailOnCertificateIssued,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="push" className="text-sm font-medium">
                Push Notifications
              </label>
              <ToggleSwitch
                enabled={settings.notificationSettings.pushNotifications}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    notificationSettings: {
                      ...settings.notificationSettings,
                      pushNotifications: !settings.notificationSettings.pushNotifications,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Settings */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Security
            </CardTitle>
            <CardDescription>Manage your security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">Two-Factor Authentication</p>
                <p className="text-xs text-muted-foreground mt-1">{settings.security.twoFactorEnabled ? 'Enabled' : 'Disabled'}</p>
              </div>
              <ToggleSwitch
                enabled={settings.security.twoFactorEnabled}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    security: {
                      ...settings.security,
                      twoFactorEnabled: !settings.security.twoFactorEnabled,
                    },
                  })
                }
              />
            </div>
            <div className="border-t border-border/30 pt-4">
              <p className="font-medium text-sm mb-3">API Keys</p>
              <p className="text-sm text-muted-foreground mb-3">{settings.security.apiKeysCount} active API keys</p>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30">
                Manage API Keys
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Wallet Settings */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              Wallet Settings
            </CardTitle>
            <CardDescription>Configure your payment and withdrawal preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Wallet Address</p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={settings.walletSettings.walletAddress}
                  className="flex-1 bg-card/50 border border-border/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  disabled
                />
                <Button size="sm" className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                  Update
                </Button>
              </div>
            </div>

            <div className="border-t border-border/30 pt-4">
              <div className="flex items-center justify-between mb-3">
                <p className="font-medium text-sm">Auto Withdrawal</p>
                <ToggleSwitch
                  enabled={settings.walletSettings.autoWithdraw}
                  onToggle={() =>
                    setSettings({
                      ...settings,
                      walletSettings: {
                        ...settings.walletSettings,
                        autoWithdraw: !settings.walletSettings.autoWithdraw,
                      },
                    })
                  }
                />
              </div>

              <label htmlFor="min-withdraw" className="text-sm font-medium block mb-2">
                Minimum Withdrawal Amount
              </label>
              <input
                id="min-withdraw"
                type="number"
                value={settings.walletSettings.minimumWithdrawAmount}
                className="w-full bg-card/50 border border-border/30 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
              <p className="text-xs text-muted-foreground mt-1">Automatically withdraw when balance reaches this amount</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Privacy Settings */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Privacy
            </CardTitle>
            <CardDescription>Control your profile visibility</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Show Profile Publicly</p>
              <ToggleSwitch
                enabled={settings.privacySettings.showProfile}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    privacySettings: {
                      ...settings.privacySettings,
                      showProfile: !settings.privacySettings.showProfile,
                    },
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Show Rating Publicly</p>
              <ToggleSwitch
                enabled={settings.privacySettings.showRating}
                onToggle={() =>
                  setSettings({
                    ...settings,
                    privacySettings: {
                      ...settings.privacySettings,
                      showRating: !settings.privacySettings.showRating,
                    },
                  })
                }
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div variants={itemVariants}>
        <Button className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold text-lg">
          Save Settings
        </Button>
      </motion.div>

      {/* Danger Zone */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-red-500/30 bg-red-950/10">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              Danger Zone
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-muted-foreground">These actions cannot be undone.</p>
            <Button className="w-full text-red-400 border border-red-500/30 hover:bg-red-950/30">
              Deactivate Account
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
