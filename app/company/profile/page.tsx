'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Save, Building2, Mail, Phone, MapPin, Globe, Shield, Wallet } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/company/mock-data'
import { Organization } from '@/types/company'

export default function ProfilePage() {
  const [org, setOrg] = useState<Organization | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState<Organization | null>(null)

  useEffect(() => {
    const loadOrg = async () => {
      const data = await mockAPI.getOrganization()
      setOrg(data)
      setFormData(data)
    }
    loadOrg()
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setOrg(formData)
      setIsEditing(false)
    } finally {
      setIsSaving(false)
    }
  }

  if (!org || !formData) {
    return <div className="text-center py-12">Loading profile...</div>
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Organization Profile</h1>
          <p className="text-muted-foreground">Manage your organization information</p>
        </div>
        <Button
          variant={isEditing ? 'outline' : 'cyan'}
          onClick={() => {
            if (isEditing) {
              setFormData(org)
            }
            setIsEditing(!isEditing)
          }}
        >
          {isEditing ? 'Cancel' : (
            <>
              <Edit2 className="w-4 h-4 mr-2" />
              Edit
            </>
          )}
        </Button>
      </div>

      {/* Main Profile Card */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Organization details and identification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo and Name */}
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-cyan to-blue rounded-lg flex items-center justify-center">
              <Building2 className="w-12 h-12 text-white" />
            </div>
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Organization Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <p className="text-3xl font-bold mb-2">{org.name}</p>
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-cyan" />
                    <span className="text-sm capitalize text-cyan">{org.verificationStatus} Account</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                <Building2 className="w-4 h-4 inline mr-2" />
                Industry
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                />
              ) : (
                <p className="font-medium">{org.industry}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Employees
              </label>
              {isEditing ? (
                <input
                  type="number"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                  value={formData.employees}
                  onChange={(e) => setFormData({ ...formData, employees: parseInt(e.target.value) })}
                />
              ) : (
                <p className="font-medium">{org.employees}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Contact Email
              </label>
              {isEditing ? (
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                  value={formData.contact || ''}
                  onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                />
              ) : (
                <p className="font-medium">{org.contact || '-'}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                <Globe className="w-4 h-4 inline mr-2" />
                Website
              </label>
              {isEditing ? (
                <input
                  type="url"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                  value={formData.website || ''}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                />
              ) : (
                <p className="font-medium">{org.website || '-'}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              {isEditing ? (
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                  value={formData.address || ''}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                />
              ) : (
                <p className="font-medium">{org.address || '-'}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <Button
              variant="cyan"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Blockchain & Wallet */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Blockchain & Wallet</CardTitle>
          <CardDescription>Blockchain integration and wallet information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <Wallet className="w-4 h-4" />
                Connected Wallet Address
              </label>
              <div className="flex items-center gap-2 p-3 bg-card rounded-lg border border-border/50">
                <code className="text-sm font-mono flex-1 truncate">{org.walletAddress || 'Not connected'}</code>
                {org.walletAddress && (
                  <Button variant="ghost" size="sm">
                    Copy
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Verification Status */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Verification Status</CardTitle>
          <CardDescription>Organization verification information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-4 bg-cyan/10 border border-cyan/30 rounded-lg flex items-center gap-3">
            <Shield className="w-6 h-6 text-cyan flex-shrink-0" />
            <div>
              <p className="font-medium capitalize">{org.verificationStatus}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {org.verificationStatus === 'verified'
                  ? 'Your organization has been verified and approved.'
                  : org.verificationStatus === 'pending'
                    ? 'Your verification is pending. Please allow 2-3 business days.'
                    : 'Your verification was rejected. Please contact support.'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
