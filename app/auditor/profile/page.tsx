'use client'

import { motion } from 'framer-motion'
import { Edit2, Save, Star, CheckCircle, Badge, Award } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAuditorProfile } from '@/lib/auditor/mock-data'

export default function ProfilePage() {
  const profile = mockAuditorProfile

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

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full space-y-6">
      {/* Header */}
      <motion.div variants={itemVariants} className="space-y-2">
        <h2 className="text-2xl font-bold">Auditor Profile</h2>
        <p className="text-muted-foreground">Manage your professional information</p>
      </motion.div>

      {/* Profile Header */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex-shrink-0"></div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-2xl font-bold">{profile.name}</h3>
                  {profile.verificationStatus === 'verified' && (
                    <CheckCircle className="w-6 h-6 text-emerald-400" />
                  )}
                </div>
                <p className="text-muted-foreground mb-3">{profile.email}</p>
                <div className="flex flex-wrap gap-3">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-cyan-400">{profile.completedAudits}</p>
                    <p className="text-xs text-muted-foreground">Audits Completed</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-emerald-400">{profile.rating}★</p>
                    <p className="text-xs text-muted-foreground">Rating</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-blue-400">{profile.experience}+</p>
                    <p className="text-xs text-muted-foreground">Years Experience</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-purple-400">{profile.responseTime}</p>
                    <p className="text-xs text-muted-foreground">Response Time</p>
                  </div>
                </div>
              </div>
              <Button className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30">
                <Edit2 className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Bio */}
      <motion.div variants={itemVariants}>
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Professional Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{profile.bio}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Skills and Certifications */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge className="w-5 h-5" />
              Skills & Specializations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium mb-2">Compliance Standards</p>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill) => (
                    <span key={skill} className="px-3 py-1 bg-blue-950/30 border border-blue-500/30 text-blue-300 text-sm rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {profile.specializations.map((spec) => (
                    <span key={spec} className="px-3 py-1 bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 text-sm rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Languages</p>
                <div className="flex flex-wrap gap-2">
                  {profile.languages.map((lang) => (
                    <span key={lang} className="px-3 py-1 bg-purple-950/30 border border-purple-500/30 text-purple-300 text-sm rounded-full">
                      {lang}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications */}
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {profile.certifications.map((cert) => (
              <div key={cert} className="flex items-center gap-2 p-3 bg-card/50 border border-border/30 rounded-lg">
                <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="font-medium text-sm">{cert}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      {/* Wallet and Verification */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass border-border/30">
          <CardHeader>
            <CardTitle>Wallet Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="bg-card/50 p-3 rounded-lg">
                <p className="text-xs text-muted-foreground mb-1">Connected Wallet</p>
                <code className="text-sm font-mono break-all text-cyan-400">{profile.walletAddress}</code>
              </div>
              <Button className="w-full bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30">
                Update Wallet
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="glass border-emerald-500/30 bg-emerald-950/10">
          <CardHeader>
            <CardTitle className="text-emerald-400">Verification Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-400" />
                <span className="capitalize font-semibold text-emerald-400">{profile.verificationStatus}</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your account has been verified. You can now accept audit requests and issue certificates.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}
