'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Globe, Briefcase, Calendar, Star, Shield, Edit2, Save } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { mockVerifierAPI } from '@/lib/verifier/mock-data'
import { VerifierProfile } from '@/types/verifier'

export default function ProfilePage() {
  const [profile, setProfile] = useState<VerifierProfile | null>(null)
  const [editing, setEditing] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await mockVerifierAPI.getVerifierProfile()
        setProfile(data)
      } finally {
        setLoading(false)
      }
    }
    loadProfile()
  }, [])

  if (loading) {
    return <div className="text-center py-8">Loading profile...</div>
  }

  if (!profile) {
    return <div className="text-center py-8">No profile data available</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Verifier Profile</h1>
          <p className="text-gray-400">Manage your verification credentials</p>
        </div>
        <button
          onClick={() => setEditing(!editing)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 text-white hover:opacity-90 transition-opacity"
        >
          {editing ? (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit
            </>
          )}
        </button>
      </div>

      {/* Profile Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <Card className="border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 to-blue-500/5">
          <CardContent className="pt-8 pb-8">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <span className="text-3xl font-bold text-white">AJ</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{profile.name}</h2>
                <p className="text-gray-400">{profile.organization}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400">
                    {profile.verificationLevel.toUpperCase()} LEVEL
                  </span>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(profile.successRate / 20) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Stats Grid */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-cyan-500/20">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Verified Proofs</p>
            <p className="text-3xl font-bold text-cyan-400">{profile.verifiedProofs}</p>
          </CardContent>
        </Card>
        <Card className="border-emerald-500/20">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Success Rate</p>
            <p className="text-3xl font-bold text-emerald-400">{profile.successRate.toFixed(1)}%</p>
          </CardContent>
        </Card>
        <Card className="border-blue-500/20">
          <CardContent className="pt-6">
            <p className="text-gray-400 text-sm mb-2">Experience</p>
            <p className="text-3xl font-bold text-blue-400">{profile.experience} years</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Profile Details */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-cyan-400" />
              <div>
                <p className="text-xs text-gray-400">Email</p>
                <p className="text-white">{profile.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-400" />
              <div>
                <p className="text-xs text-gray-400">Organization</p>
                <p className="text-white">{profile.organization}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-purple-400" />
              <div>
                <p className="text-xs text-gray-400">Wallet Address</p>
                <p className="text-white font-mono text-sm">{profile.wallet.slice(0, 10)}...{profile.wallet.slice(-8)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credentials */}
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Credentials & Experience</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-emerald-400" />
              <div>
                <p className="text-xs text-gray-400">Verification Level</p>
                <p className="text-white capitalize">{profile.verificationLevel}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-yellow-400" />
              <div>
                <p className="text-xs text-gray-400">Joined</p>
                <p className="text-white">{new Date(profile.joinedAt).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-2">Languages</p>
              <div className="flex flex-wrap gap-2">
                {profile.languages.map((lang) => (
                  <span key={lang} className="px-2 py-1 rounded-full text-xs bg-cyan-500/20 text-cyan-400">
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Performance Summary */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <Card className="border-cyan-500/20">
          <CardHeader>
            <CardTitle className="text-white">Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-400">Overall Success Rate</span>
                <span className="text-cyan-400 font-medium">{profile.successRate.toFixed(1)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  style={{ width: `${profile.successRate}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
