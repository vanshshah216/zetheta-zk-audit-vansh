'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, ChevronRight, ChevronLeft, CheckCircle, AlertCircle, X } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { mockAPI } from '@/lib/company/mock-data'
import { useMockStore, MockAuditRequest } from '@/stores/mock-store'
import { supabaseAuditService } from '@/services/supabase-audit-service'
import { useToast } from '@/hooks/use-toast'
import { useCurrentProfile } from '@/hooks/use-current-profile'

const AUDIT_CATEGORIES = ['Information Security', 'Compliance', 'Data Protection', 'Healthcare Compliance']
const INDUSTRIES = ['Technology', 'Cloud Services', 'Healthcare IT', 'Finance', 'Other']
const COMPLIANCE_STANDARDS = ['ISO27001', 'SOC2', 'GDPR', 'HIPAA', 'PCI-DSS']

export function RequestAuditForm() {
  const router = useRouter()
  const toast = useToast()
  const { profileId, companyName, isReady } = useCurrentProfile()
  const { submitAuditRequest } = useMockStore()
  const [step, setStep] = useState(1)
  const [files, setFiles] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    industry: '',
    description: '',
    financialYear: '',
    scope: '',
    standards: [] as string[],
    priority: 'medium',
    deadline: '',
    budget: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (stepNum: number) => {
    const newErrors: Record<string, string> = {}

    if (stepNum === 1) {
      if (!formData.title) newErrors.title = 'Title is required'
      if (!formData.category) newErrors.category = 'Category is required'
      if (!formData.industry) newErrors.industry = 'Industry is required'
      if (!formData.description) newErrors.description = 'Description is required'
    } else if (stepNum === 2) {
      if (!formData.financialYear) newErrors.financialYear = 'Financial year is required'
      if (!formData.scope) newErrors.scope = 'Scope is required'
      if (formData.standards.length === 0) newErrors.standards = 'Select at least one standard'
      if (!formData.deadline) newErrors.deadline = 'Deadline is required'
      if (formData.budget && isNaN(Number(formData.budget))) newErrors.budget = 'Budget must be a number'
    } else if (stepNum === 3) {
      // File upload is optional for demo
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.add('border-cyan', 'bg-cyan/10')
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('border-cyan', 'bg-cyan/10')
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.currentTarget.classList.remove('border-cyan', 'bg-cyan/10')
    const droppedFiles = Array.from(e.dataTransfer.files)
    setFiles([...files, ...droppedFiles])
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)])
    }
  }

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index))
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    setLoading(true)
    try {
      const resolvedProfileId = profileId ?? 'comp-current'
      const profCompanyName = companyName

      try {
        await supabaseAuditService.createAuditRequest({
          company_id: resolvedProfileId,
          company_name: profCompanyName,
          audit_type: formData.title || formData.category || 'Compliance Audit',
          budget: Number(formData.budget) || 10000,
          priority: (formData.priority as any) || 'medium',
          deadline: formData.deadline
            ? new Date(formData.deadline).toISOString()
            : new Date(Date.now() + 30 * 864e5).toISOString(),
          compliance_standard: formData.standards[0] || 'ISO27001',
          description: formData.description || 'N/A',
          status: 'pending',
          documents_count: files.length,
          industry: formData.industry || 'Technology'
        })
      } catch (err) {
        console.warn('Supabase create request failed, falling back to local store only', err)
      }

      // Save into shared mock store so auditor sees it
      const newRequest: MockAuditRequest = {
        id: `req-${Date.now()}`,
        companyId: resolvedProfileId,
        companyName: profCompanyName,
        auditType: formData.title || formData.category || 'Compliance Audit',
        budget: Number(formData.budget) || 10000,
        priority: formData.priority as MockAuditRequest['priority'],
        deadline: formData.deadline
          ? new Date(formData.deadline).toISOString()
          : new Date(Date.now() + 30 * 864e5).toISOString(),
        complianceStandard: formData.standards[0] || 'ISO27001',
        description: formData.description,
        status: 'pending',
        documentsCount: files.length,
        industry: formData.industry,
        createdAt: new Date().toISOString(),
      }
      submitAuditRequest(newRequest)
      toast.success('Audit Request Submitted!', 'Your request is now visible to auditors.')
      setSubmitted(true)
      setTimeout(() => router.push('/company/my-audits'), 1800)
    } catch (error) {
      toast.error('Submission Failed', 'Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const pageVariants = {
    enter: { opacity: 0, x: 50 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  }

  if (submitted) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-cyan to-blue rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Audit Request Submitted!</h2>
          <p className="text-muted-foreground mb-6">
            Your audit request has been successfully submitted. Redirecting...
          </p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          {[1, 2, 3, 4].map((s) => (
            <div key={s} className="flex items-center flex-1">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                  s <= step
                    ? 'bg-gradient-to-r from-cyan to-blue text-white'
                    : 'bg-card text-muted-foreground'
                }`}
              >
                {s < step ? <CheckCircle className="w-5 h-5" /> : s}
              </div>
              {s < 4 && (
                <div
                  className={`flex-1 h-1 mx-2 rounded transition-all ${
                    s < step ? 'bg-gradient-to-r from-cyan to-blue' : 'bg-card'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Audit Details</span>
          <span>Scope & Standards</span>
          <span>Upload Documents</span>
          <span>Review & Submit</span>
        </div>
      </div>

      {/* Form Content */}
      <Card variant="glass">
        <CardHeader>
          <CardTitle>
            {step === 1 && 'Audit Details'}
            {step === 2 && 'Scope & Standards'}
            {step === 3 && 'Upload Documents'}
            {step === 4 && 'Review & Submit'}
          </CardTitle>
          <CardDescription>
            {step === 1 && 'Provide basic information about your audit request'}
            {step === 2 && 'Define the scope and compliance standards'}
            {step === 3 && 'Upload supporting financial documents'}
            {step === 4 && 'Review your information and submit'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              variants={pageVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
            >
              {/* Step 1: Audit Details */}
              {step === 1 && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Audit Title *</label>
                    <input
                      type="text"
                      placeholder="e.g., ISO 27001 Security Audit"
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      >
                        <option value="">Select category</option>
                        {AUDIT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.category && (
                        <p className="text-red-500 text-sm mt-1">{errors.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Industry *</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                        value={formData.industry}
                        onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                      >
                        <option value="">Select industry</option>
                        {INDUSTRIES.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                      {errors.industry && (
                        <p className="text-red-500 text-sm mt-1">{errors.industry}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description *</label>
                    <textarea
                      placeholder="Describe your audit requirements..."
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors resize-none"
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Scope & Standards */}
              {step === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Financial Year *</label>
                      <input
                        type="text"
                        placeholder="e.g., 2024"
                        className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                        value={formData.financialYear}
                        onChange={(e) => setFormData({ ...formData, financialYear: e.target.value })}
                      />
                      {errors.financialYear && (
                        <p className="text-red-500 text-sm mt-1">{errors.financialYear}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Priority *</label>
                      <select
                        className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                        value={formData.priority}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="critical">Critical</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Audit Scope *</label>
                    <textarea
                      placeholder="Define the scope of the audit..."
                      className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors resize-none"
                      rows={3}
                      value={formData.scope}
                      onChange={(e) => setFormData({ ...formData, scope: e.target.value })}
                    />
                    {errors.scope && (
                      <p className="text-red-500 text-sm mt-1">{errors.scope}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Compliance Standards *</label>
                    <div className="grid grid-cols-2 gap-2">
                      {COMPLIANCE_STANDARDS.map((standard) => (
                        <label key={standard} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.standards.includes(standard)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setFormData({
                                  ...formData,
                                  standards: [...formData.standards, standard],
                                })
                              } else {
                                setFormData({
                                  ...formData,
                                  standards: formData.standards.filter((s) => s !== standard),
                                })
                              }
                            }}
                            className="rounded"
                          />
                          <span className="text-sm">{standard}</span>
                        </label>
                      ))}
                    </div>
                    {errors.standards && (
                      <p className="text-red-500 text-sm mt-1">{errors.standards}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Expected Deadline *</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                        value={formData.deadline}
                        onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                      />
                      {errors.deadline && (
                        <p className="text-red-500 text-sm mt-1">{errors.deadline}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Budget</label>
                      <input
                        type="number"
                        placeholder="0"
                        className="w-full px-4 py-2 rounded-lg bg-card border border-border hover:border-cyan/50 focus:border-cyan focus:outline-none transition-colors"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      />
                      {errors.budget && (
                        <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Upload Documents */}
              {step === 3 && (
                <div className="space-y-4">
                  <div
                    className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-cyan transition-colors cursor-pointer"
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium mb-1">Drag and drop files here</p>
                    <p className="text-xs text-muted-foreground">
                      or click to select files (PDF, Excel, Word)
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      className="hidden"
                      onChange={handleFileSelect}
                      accept=".pdf,.xlsx,.xls,.docx,.doc"
                    />
                  </div>

                  {files.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Uploaded Files ({files.length})</h4>
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-card rounded-lg border border-border/50"
                        >
                          <div className="flex items-center gap-3 flex-1 min-w-0">
                            <Upload className="w-4 h-4 text-cyan flex-shrink-0" />
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium truncate">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => removeFile(index)}
                            className="p-1 hover:bg-red-950/30 rounded transition-colors"
                          >
                            <X className="w-4 h-4 text-red-500" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {errors.files && (
                    <div className="flex items-center gap-2 p-4 bg-red-950/20 border border-red-500/30 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      <p className="text-sm text-red-400">{errors.files}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Review & Submit */}
              {step === 4 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Audit Details</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Title</p>
                          <p className="font-medium">{formData.title}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Category</p>
                          <p className="font-medium">{formData.category}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Industry</p>
                          <p className="font-medium">{formData.industry}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Priority</p>
                          <p className="font-medium capitalize">{formData.priority}</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-card/50 rounded-lg">
                      <p className="text-xs text-muted-foreground mb-1">Description</p>
                      <p className="text-sm">{formData.description}</p>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Compliance Standards</h4>
                      <div className="flex flex-wrap gap-2">
                        {formData.standards.map((standard) => (
                          <span
                            key={standard}
                            className="px-3 py-1 bg-cyan/20 text-cyan rounded-full text-sm"
                          >
                            {standard}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">
                        Documents ({files.length} files)
                      </h4>
                      <div className="space-y-2">
                        {files.map((file, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <span className="w-2 h-2 bg-cyan rounded-full"></span>
                            {file.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-cyan/10 border border-cyan/30 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Please review before submitting</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Once submitted, you cannot modify this audit request. Contact support if you need changes.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </CardContent>

        {/* Navigation Buttons */}
        <div className="flex justify-between p-6 border-t border-border/50">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={step === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {step < 4 ? (
            <Button variant="cyan" onClick={handleNext}>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              variant="cyan"
              onClick={handleSubmit}
              disabled={loading}
              className="relative"
            >
              {loading ? 'Submitting...' : 'Create Audit Request'}
            </Button>
          )}
        </div>
      </Card>
    </div>
  )
}
