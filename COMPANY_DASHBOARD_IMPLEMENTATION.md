# Company User Dashboard Implementation

## Overview

This document outlines the complete implementation of the **Company User Dashboard** for the Cybersecurity SaaS platform. The system provides a comprehensive interface for managing audits, compliance, payments, and organizational data.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui with custom design system
- **Animations:** Framer Motion
- **Charts & Data Visualization:** Recharts
- **State Management:** Zustand (available for global state)
- **Icons:** Lucide Icons
- **Type Safety:** TypeScript

## Project Structure

```
/app/company/
├── layout.tsx                 # Main company layout with sidebar/navbar
├── dashboard/
│   └── page.tsx              # Dashboard page
├── request-audit/
│   └── page.tsx              # Audit request form page
├── my-audits/
│   └── page.tsx              # Audits list and management
├── audit-details/
│   └── [id]/
│       └── page.tsx          # Individual audit details
├── proof-vault/
│   └── page.tsx              # Proof storage and management
├── certificates/
│   └── page.tsx              # Compliance certificates
├── payments/
│   └── page.tsx              # Payment history and invoices
├── notifications/
│   └── page.tsx              # Notification center
├── profile/
│   └── page.tsx              # Organization profile
└── settings/
    └── page.tsx              # Account settings

/components/company/
├── dashboard/
│   └── dashboard-content.tsx  # Dashboard with charts and metrics
├── request-audit/
│   └── request-audit-form.tsx # Multi-step audit request form
├── my-audits/
│   └── my-audits-content.tsx  # Advanced data table with filters
└── audit-details/
    └── audit-details-content.tsx # Audit details view

/types/
└── company.ts                # TypeScript types and interfaces

/lib/company/
└── mock-data.ts              # Mock API functions and data
```

## Features Implemented

### 1. Dashboard (`/company/dashboard`)
- **Metric Cards** with trend indicators (6 KPIs)
  - Active Audits
  - Completed Audits
  - Pending Payments
  - Compliance Score
  - Proofs Generated
  - Upcoming Deadlines

- **Charts & Analytics**
  - Compliance Score Trend (Line Chart)
  - Audit Status Distribution (Pie Chart)
  - Monthly Audit Requests (Bar Chart)

- **Recent Activity Widget**
  - Latest 3 audits with progress bars
  - Status badges (pending, in-progress, completed)

- **Quick Actions Panel**
  - Request Audit button
  - Proof Vault access
  - Payments management

- **Notifications Widget**
  - Real-time notification display
  - Category-based filtering

### 2. Request Audit (`/company/request-audit`)
**Multi-Step Form with 4 Stages:**

**Step 1: Audit Details**
- Audit Title (required)
- Category selection
- Industry selection
- Detailed description

**Step 2: Scope & Standards**
- Financial year
- Audit scope description
- Compliance standards selection (multiple)
- Priority level
- Expected deadline
- Budget estimation

**Step 3: Upload Documents**
- Drag-and-drop file upload
- Support for PDF, Excel, Word documents
- File preview with size information
- Progress tracking

**Step 4: Review & Summary**
- Complete information review
- Confirmation before submission
- Success notification with redirect

### 3. My Audits (`/company/my-audits`)
**Advanced Data Table Features:**
- **Search:** By title or audit ID
- **Filtering:** 
  - Status (All, Pending, In Progress, Completed, Failed)
  - Priority (All, Low, Medium, High, Critical)
- **Sorting:** By date, status, or progress
- **Pagination:** 10 items per page with navigation
- **Export:** CSV export of filtered results
- **Columns:**
  - Audit ID
  - Title
  - Assigned Auditor
  - Status (with color badges)
  - Priority (with color indicators)
  - Progress bar
  - Deadline
  - Action (View details link)

### 4. Audit Details (`/company/audit-details/[id]`)
**Comprehensive Audit Information:**
- Audit header with title and status
- Key metrics (ID, Auditor, Priority, Deadline)
- **Progress Section:**
  - Animated progress bar
  - Estimated vs. actual cost
  - Budget tracking

- **Timeline:**
  - Audit requested date
  - Expected completion
  - Actual completion (if done)
  - Proof generation milestone
  - Animated milestone indicators

- **Uploaded Documents:**
  - File list with download capability
  - File size and upload date
  - Hover actions

- **Status Cards:**
  - Current status details
  - Category and industry info
  - Blockchain transaction details
  - Certificate status

### 5. Proof Vault (`/company/proof-vault`)
- Grid display of encrypted proofs
- **Per-proof Card Contains:**
  - Proof ID
  - Hash value (copyable)
  - Timestamp
  - Blockchain status (pending/confirmed)
  - Blockchain transaction link
  - Download button

- **Search & Filter:**
  - Search by proof ID or hash
  - Status filter

### 6. Certificates (`/company/certificates`)
- Card-based grid layout with neon styling
- **Per-certificate Card:**
  - Compliance standard (ISO27001, SOC2, GDPR, HIPAA)
  - Issued and expiration dates
  - Expiry status indicator
  - Days until expiry countdown
  - Download PDF button
  - Share functionality

### 7. Payments (`/company/payments`)
- **Summary Cards:**
  - Total amount
  - Completed amount
  - Pending amount

- **Transaction Table:**
  - Payment ID
  - Description
  - Amount
  - Date
  - Status (with color coding)
  - Invoice/Receipt download

- **Status Filtering:**
  - All, Pending, Completed, Failed, Refunded

### 8. Notifications (`/company/notifications`)
- **Tab Navigation:**
  - All notifications
  - Unread only

- **Per-notification Features:**
  - Title and message
  - Category badge (System, Audits, Payments, Security, Verification)
  - Timestamp
  - Read/Unread toggle
  - Delete action
  - Unread counter

- **Search & Filter:**
  - Full-text search
  - Mark all as read

### 9. Organization Profile (`/company/profile`)
- **Edit Mode:**
  - Toggle between view and edit
  - Save changes

- **Profile Sections:**
  - Organization logo placeholder
  - Name (editable)
  - Industry
  - Employee count
  - Contact email
  - Website URL
  - Address
  - Verification status indicator

- **Blockchain Integration:**
  - Connected wallet address display
  - Copy functionality

- **Verification Status:**
  - Visual status indicator (Verified, Pending, Rejected)
  - Status-specific messages

### 10. Settings (`/company/settings`)
- **Security Section:**
  - Change password
  - Two-factor authentication toggle
  - API keys management
  - Active sessions management

- **Notification Settings:**
  - Email notifications toggle
  - Push notifications toggle
  - Notification type checkboxes
    - Audit Updates
    - Payment Reminders
    - Security Alerts
    - Certificate Expiry

- **Connected Integrations:**
  - Blockchain wallet connection status

- **Danger Zone:**
  - Delete organization (with confirmation)

## Global Layout (`/company/layout.tsx`)

### Sidebar Navigation
- Responsive sidebar with collapse on mobile
- Active page highlighting
- 9 main navigation items
- Logout button in footer
- Smooth transitions and animations

### Top Navigation Bar
- Sticky navbar
- Page title display
- Notification bell with unread indicator
- Profile menu with dropdown
  - Profile link
  - Settings link
  - Logout button

### Mobile Optimization
- Hamburger menu toggle
- Responsive sidebar overlay
- Touch-friendly spacing

## Mock API (`/lib/company/mock-data.ts`)

The application uses mock data and simulated API functions:

```typescript
mockAPI.getDashboard()        // Dashboard metrics
mockAPI.getOrganization()     // Organization profile
mockAPI.getAudits()           // List of audits
mockAPI.getAudit(id)          // Single audit details
mockAPI.getAuditFiles()       // Files for an audit
mockAPI.uploadFiles()         // File upload simulation
mockAPI.createAudit()         // Create new audit
mockAPI.getProofs()           // Proof vault items
mockAPI.getCertificates()     // Certificates list
mockAPI.getPayments()         // Payment history
mockAPI.getNotifications()    // Notifications
mockAPI.updateNotification()  // Update notification status
mockAPI.logout()              // Logout simulation
```

## Data Types (`/types/company.ts`)

### Main Entities
- `Audit` - Audit request with status and progress
- `AuditFile` - File attachment
- `Proof` - Blockchain proof
- `Certificate` - Compliance certificate
- `Payment` - Payment transaction
- `Notification` - User notification
- `Organization` - Company profile
- `DashboardMetrics` - KPI data

### Enums
- `AuditStatus`: pending, in-progress, completed, failed
- `AuditPriority`: low, medium, high, critical
- `ComplianceStandard`: ISO27001, SOC2, GDPR, HIPAA, PCI-DSS
- `NotificationCategory`: system, audits, payments, security, verification
- `PaymentStatus`: pending, completed, failed, refunded

## Design System

### Color Palette
- **Primary:** Cyan (#06b6d4) - Main accent
- **Secondary:** Blue (#3b82f6) - Alternative accent
- **Success:** Emerald (#10b981)
- **Warning:** Orange (#f59e0b)
- **Danger:** Red (#ef4444)
- **Purple:** Accent color
- **Backgrounds:** Dark theme with glass morphism

### Typography
- **Font:** Inter (via Next.js)
- **Headings:** Bold, large scale
- **Body:** Regular, readable line-height

### Components
- **Cards:** Glass morphism effect with border
- **Buttons:** Multiple variants (default, cyan, outline, ghost, destructive)
- **Inputs:** Dark theme with hover/focus states
- **Tables:** Striped rows with hover effects
- **Charts:** Recharts with custom colors

### Animations
- Page transitions with Framer Motion
- Smooth card hover effects
- Animated progress bars
- Staggered list items
- Fade and scale animations

## Features To Add (Backend Integration)

1. **Authentication:**
   - User login/logout
   - Role-based access control
   - JWT/session management

2. **Real API Integration:**
   - Replace mock API with actual endpoints
   - Database models and queries
   - API error handling

3. **File Management:**
   - Actual file upload to storage (Vercel Blob, S3, etc.)
   - File encryption for proof vault
   - PDF generation for certificates

4. **Blockchain Integration:**
   - Actual blockchain proof generation
   - Smart contract interaction
   - Transaction verification

5. **Payment Processing:**
   - Stripe integration
   - Invoice generation
   - Payment webhook handling

6. **Real-time Updates:**
   - WebSocket for notifications
   - Server-sent events for audit updates
   - Live dashboard refresh

7. **Email Notifications:**
   - Email templates
   - SMTP configuration
   - Scheduled digests

## Performance Optimizations

- Server-side rendering for core pages
- Client components for interactive features
- Lazy loading of charts and heavy components
- Optimized images with Next.js Image component
- Responsive design with Tailwind breakpoints
- Minimal JavaScript bundle size

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Form validation with error messages
- Screen reader friendly

## Browser Support

- Chrome/Edge (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Getting Started

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Run development server:
   ```bash
   pnpm dev
   ```

3. Open dashboard:
   ```
   http://localhost:3000/company/dashboard
   ```

## Building for Production

```bash
pnpm build
pnpm start
```

## Future Enhancements

1. Dark/Light theme toggle
2. Advanced reporting and analytics
3. Bulk audit operations
4. Audit assignment and collaboration
5. Audit templates
6. Custom compliance frameworks
7. Integration with third-party audit tools
8. Mobile app companion

---

**Implementation Date:** 2024
**Status:** Complete (MVP - Mock Data)
