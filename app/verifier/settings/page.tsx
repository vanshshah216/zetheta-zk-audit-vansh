'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, Bell, Wallet, LogOut, Shield, Eye, EyeOff, Key, AlertCircle } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<'security' | 'notifications' | 'wallet' | 'privacy'>('security')
  const [showPassword, setShowPassword] = useState(false)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(false)

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-gray-400">Manage your account preferences and security</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-700 overflow-x-auto">
        {[
          { id: 'security', label: 'Security', icon: Lock },
          { id: 'notifications', label: 'Notifications', icon: Bell },
          { id: 'wallet', label: 'Wallet', icon: Wallet },
          { id: 'privacy', label: 'Privacy', icon: Shield },
        ].map((tab) => {
          const Icon = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'border-cyan-500 text-cyan-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Security Settings */}
      {activeTab === 'security' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-cyan-400" />
                Password Security
              </CardTitle>
              <CardDescription>Change your password regularly to keep your account secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Current Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your current password"
                    className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">New Password</label>
                <input
                  type="password"
                  placeholder="Enter your new password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your new password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none"
                />
              </div>

              <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:opacity-90 transition-opacity">
                Update Password
              </button>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Key className="w-5 h-5 text-cyan-400" />
                API Keys
              </CardTitle>
              <CardDescription>Manage API keys for programmatic access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-mono text-sm">sk_live_51a2b3c4d5e6f7g8h9i0j</span>
                  <button className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">Copy</button>
                </div>
                <p className="text-xs text-gray-400">Created 3 months ago • Last used 2 days ago</p>
              </div>
              <button className="w-full py-2 px-4 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900/50 transition-colors">
                Generate New Key
              </button>
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-400" />
                Two-Factor Authentication
              </CardTitle>
            </CardHeader>
            <CardContent>
              <button className="w-full py-2 px-4 rounded-lg border border-cyan-500/20 text-cyan-400 hover:bg-cyan-500/10 transition-colors">
                Enable 2FA
              </button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5 text-cyan-400" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <div>
                  <p className="text-white font-medium">Email Notifications</p>
                  <p className="text-xs text-gray-400">Receive updates via email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={(e) => setEmailNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                <div>
                  <p className="text-white font-medium">Push Notifications</p>
                  <p className="text-xs text-gray-400">Receive browser notifications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pushNotifications}
                    onChange={(e) => setPushNotifications(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                </label>
              </div>

              <div className="space-y-2 pt-4 border-t border-gray-700">
                <p className="text-white font-medium text-sm">Notify me about:</p>
                {['Verification requests', 'Completed verifications', 'Failed verifications', 'System alerts'].map((item) => (
                  <label key={item} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded border-gray-700 bg-gray-900 text-cyan-500 focus:ring-cyan-500"
                    />
                    <span className="text-gray-300 text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Wallet Settings */}
      {activeTab === 'wallet' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Wallet className="w-5 h-5 text-cyan-400" />
                Wallet Management
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Connected Wallet</label>
                <div className="p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                  <p className="text-white font-mono">0x742d35Cc6634C0532925a3b844Bc9e7595f42e0</p>
                  <p className="text-xs text-emerald-400 mt-2">Connected</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-300 mb-2 block">Preferred Network</label>
                <select className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white focus:border-cyan-500 focus:outline-none">
                  <option>Ethereum</option>
                  <option>Polygon</option>
                  <option>Arbitrum</option>
                </select>
              </div>

              <button className="w-full py-2 px-4 rounded-lg border border-gray-700 text-gray-300 hover:bg-gray-900/50 transition-colors">
                Change Wallet
              </button>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Privacy Settings */}
      {activeTab === 'privacy' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-cyan-400" />
                Privacy & Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: 'Show profile on leaderboard', description: 'Your success rate will be visible to others' },
                { title: 'Allow data analytics', description: 'Help improve our service with anonymous usage data' },
                { title: 'Show verification statistics', description: 'Display your verification count publicly' },
              ].map((item) => (
                <div key={item.title} className="flex items-center justify-between p-4 rounded-lg bg-gray-900/50 border border-gray-700">
                  <div>
                    <p className="text-white font-medium text-sm">{item.title}</p>
                    <p className="text-xs text-gray-400">{item.description}</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" defaultChecked className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-600"></div>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Danger Zone
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <button className="w-full py-2 px-4 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors">
                Export My Data
              </button>
              <button className="w-full py-2 px-4 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/10 transition-colors">
                Delete Account
              </button>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
