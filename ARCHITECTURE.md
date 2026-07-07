# Zero Knowledge Audit Marketplace - Architecture

## Overview
A production-ready enterprise SaaS platform with three distinct user roles: Auditors, Audited Projects (Companies), and Investors (Verifiers).

## Application Flow

### Entry Point
```
Landing Page (/)
├── Unauthenticated → Show marketing content
└── Authenticated → Redirect to role-specific dashboard
```

### Authentication Flow
```
Landing (/) 
  ↓
Login/Register (/auth/login, /auth/register)
  ↓
Role Selection (/auth/role)
  ↓
Account Setup (/auth/setup-2fa, /auth/wallet-connect)
  ↓
Success Page (/auth/success) → Auto-redirect to dashboard
```

## Role-Based Routing

### Auditor Route
```
/auditor/
├── /dashboard - Overview and active audits
├── /assigned-audits - Audits assigned to me
├── /incoming-requests - New audit requests
├── /generate-proof - Create and submit proofs
├── /proofs - My submitted proofs
├── /certificates - Earned certificates
├── /earnings - Payment history
├── /messages - Client communication
├── /analytics - Performance metrics
├── /profile - Auditor profile
└── /settings - Account settings
```

### Company (Audited) Route
```
/company/
├── /dashboard - Overview and audit status
├── /request-audit - Submit new audit requests
├── /my-audits - My requested audits
├── /proof-vault - Proof storage
├── /certificates - Security certificates
├── /payments - Payment management
├── /notifications - Notifications
├── /profile - Company profile
└── /settings - Account settings
```

### Verifier (Investor) Route
```
/verifier/
├── /dashboard - Overview
├── /verify-proof - Verify security proofs
├── /proofs - All proofs
├── /blockchain - Blockchain verification
├── /certificates - Issued certificates
├── /reports - Verification reports
├── /analytics - Verification metrics
├── /history - Verification history
├── /profile - Verifier profile
└── /settings - Account settings
```

### Security Center (Admin) Route
```
/security/
├── /dashboard - Security overview
├── /threat-monitor - Threat monitoring
├── /incident-response - Incident management
├── /audit-logs - Audit trails
├── /access-control - User management
├── /sessions - Active sessions
├── /devices - Connected devices
├── /api-keys - API key management
├── /compliance - Compliance reports
└── /system-logs - System logs
```

## State Management

### Global Stores (Zustand)

#### useAuthStore
- user: Current authenticated user
- session: Active session info
- isAuthenticated: Auth status
- login/logout: Auth actions

#### useNotificationsStore
- notifications: Active notifications
- addNotification: Display notification
- removeNotification: Dismiss notification

#### useUIStore
- sidebarOpen: Sidebar state
- theme: Dark/light theme
- isMobile: Mobile detection
- setLoading: Global loading state

#### useDataStore
- audits, certificates, proofs: Cached data
- setAudits, setCertificates, setProofs: Update data
- clearAll: Clear cache

## Services Architecture

All data access goes through centralized services in `/services/`:

### authService
- login(credentials)
- register(data)
- logout()
- getCurrentUser(token)
- refreshSession(token)

### auditService
- getAudits()
- getAuditById(id)
- createAudit(audit)
- updateAudit(id, updates)
- getCertificates()
- getCertificateById(id)

### proofService
- getProofs()
- getProofsByAudit(auditId)
- getProofById(id)
- createProof(proof)
- verifyProof(id)
- rejectProof(id)

### companyService
- getCompanyProfile()
- updateCompanyProfile(profile)
- getAuditRequests()
- createAuditRequest(request)
- updateAuditRequest(id, updates)

### auditorService
- getAuditorProfile()
- updateAuditorProfile(profile)
- getAuditorStats()
- updateHourlyRate(rate)

### verifierService
- getVerifications()
- getVerificationById(id)
- getVerifierStats()
- verifyProof(proofId, notes)
- rejectProof(proofId, notes)

## Hooks

Custom hooks for easy data access in components:

### useAuth()
- user, session, isAuthenticated, isLoading, error
- login(credentials), register(data), logout(), clearError()

### useNotifications()
- notifications, notify(type, title, message)
- addNotification, removeNotification, clearNotifications

### useUI()
- sidebarOpen, theme, isMobile, loading
- toggleSidebar, setTheme, setLoading

### useAudits()
- audits, isLoading
- getAudits(), getAuditById(id), createAudit(audit)

### useCompany()
- profile, requests, isLoading
- getProfile(), updateProfile(updates), getRequests(), createRequest(request)

### useAuditor()
- profile, stats, isLoading
- getProfile(), updateProfile(updates), getStats()

## Component Structure

### Layouts
- `DashboardLayout`: Main app layout with nav and sidebar
- `PageContainer`: Standard page header + content wrapper
- `RootProvider`: Global providers and error boundary

### Navigation
- `GlobalNav`: Top navigation bar
- `Breadcrumb`: Breadcrumb navigation

### Shared Components
- `DataTable`: Reusable table component
- `StatCard`: Metric card component
- `Modal`: Reusable modal dialog
- `Skeleton`: Loading skeleton states

### Auth Components
- `ProtectedRoute`: Route protection wrapper
- `AuthCardEnhanced`: Auth form container
- `OAuthButton`: OAuth login button
- `PasswordStrength`: Password meter

## API Integration

All API calls use the centralized `apiClient` (lib/api-client.ts):

```typescript
import { apiClient } from '@/lib/api-client'

// Usage in hooks/components:
const data = await apiClient.audits.getAudits()
const verified = await apiClient.proofs.verifyProof(proofId)
const updated = await apiClient.company.updateProfile(updates)
```

## Error Handling

- Global error boundary in RootProvider
- Notifications for all user-facing errors
- Fallback UI for failed loads
- Retry mechanisms in hooks

## Loading States

- Skeleton loaders for tables, cards, charts
- CardSkeleton, TableSkeleton, ChartSkeleton components
- isLoading flags in all custom hooks
- Graceful degradation

## Performance Optimizations

- Server components for static content
- Client components only where needed
- Lazy loading of dashboard modules
- Code splitting by route
- Image optimization
- Memoization of expensive operations

## Security

- Protected routes with useAuth() wrapper
- Role-based access control
- Session management
- Error boundary for crash protection
- Type-safe API calls

## Next Steps

1. Implement actual API endpoints to replace mock services
2. Add real database integration (Supabase/Neon)
3. Implement WebSocket for real-time notifications
4. Add file upload for audit documents
5. Implement blockchain integration
6. Add email notifications
7. Implement payment processing
8. Add analytics tracking
