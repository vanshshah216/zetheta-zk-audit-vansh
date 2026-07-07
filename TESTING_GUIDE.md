# Testing Guide - Zero Knowledge Audit Marketplace

## Authentication Flow Testing

### Test Accounts
```
Company User:
Email: company@example.com
Password: password123
Role: audited

Auditor User:
Email: auditor@example.com
Password: password123
Role: auditor

Verifier User:
Email: verifier@example.com
Password: password123
Role: investor
```

### Login Flow
1. Navigate to `/auth/login`
2. Enter credentials above
3. Click "Sign In"
4. Should redirect to `/auth/success`
5. Auto-redirects to role dashboard

### Registration Flow
1. Navigate to `/auth/role`
2. Select a role (Auditor, Company, or Investor)
3. Click "Continue to Registration"
4. Fill in registration form
5. Should create account and redirect to success page

## Module Testing

### Company Dashboard (/company/dashboard)
- [ ] Page loads with stats
- [ ] Recent audits display
- [ ] Notification bell shows notifications
- [ ] Profile link works
- [ ] Logout works

### Auditor Dashboard (/auditor/dashboard)
- [ ] Page loads with earnings stats
- [ ] Active audits display
- [ ] Rating visible
- [ ] Navigation to other auditor pages works
- [ ] Sidebar toggle works on mobile

### Verifier Dashboard (/verifier/dashboard)
- [ ] Page loads with verification stats
- [ ] Recent verifications display
- [ ] Blockchain verification link works
- [ ] All verifier routes accessible

### Security Center (/security/dashboard)
- [ ] Access control page shows users
- [ ] Threat monitor displays alerts
- [ ] Audit logs are visible
- [ ] All security routes accessible

## State Management Testing

### Auth Store
```typescript
// In browser console:
const { useAuthStore } = require('@/stores/auth-store');
const auth = useAuthStore();
console.log(auth.user); // Should show current user
console.log(auth.isAuthenticated); // Should be true when logged in
auth.logout(); // Should clear auth state
```

### Notifications Store
```typescript
const { useNotificationsStore } = require('@/stores/notifications-store');
const notif = useNotificationsStore();
notif.addNotification({
  type: 'success',
  title: 'Test',
  message: 'This is a test notification'
});
// Should see notification in bottom-right
```

### UI Store
```typescript
const { useUIStore } = require('@/stores/ui-store');
const ui = useUIStore();
ui.toggleSidebar(); // Should toggle sidebar on desktop
ui.setTheme('light'); // Should switch to light theme
```

## API Service Testing

### Manual Service Testing
```typescript
// In browser console:
const { apiClient } = require('@/lib/api-client');

// Test audit service
const audits = await apiClient.audits.getAudits();
console.log(audits); // Should show mock audits

// Test auth service
const result = await apiClient.auth.login({
  email: 'auditor@example.com',
  password: 'password123'
});
console.log(result); // Should return user and session

// Test company service
const profile = await apiClient.company.getCompanyProfile();
console.log(profile); // Should return company data
```

## Hook Testing

### useAuth Hook
```typescript
// In any client component:
const { isAuthenticated, user, login, logout } = useAuth();

// Test login
await login({
  email: 'company@example.com',
  password: 'password123'
});

// Test logout
await logout(); // Should redirect to home
```

### useNotifications Hook
```typescript
const { notify, notifications } = useNotifications();

// Test notification
notify('success', 'Test Title', 'This is a test message');

// Check notifications array
console.log(notifications); // Should contain the notification
```

### useAudits Hook
```typescript
const { audits, getAudits, createAudit } = useAudits();

// Fetch audits
await getAudits();
console.log(audits); // Should show audits

// Create audit
const newAudit = await createAudit({
  title: 'Test Audit',
  description: 'Test',
  status: 'pending',
  type: 'Security',
  company: 'Test Corp',
});
```

## Navigation Testing

### Protected Routes
- [ ] Unauthenticated access to `/auditor/dashboard` redirects to login
- [ ] Unauthenticated access to `/company/dashboard` redirects to login
- [ ] Authenticated users cannot access auth pages directly
- [ ] Login page accessible without auth

### Role-Based Routing
- [ ] Company user dashboard shows company features
- [ ] Auditor user dashboard shows auditor features
- [ ] Verifier user dashboard shows verifier features
- [ ] Users cannot access other roles' dashboards

### Navigation Links
- [ ] GlobalNav shows correct user name
- [ ] Logo links to correct dashboard
- [ ] Breadcrumbs navigate correctly
- [ ] Sidebar links work on all pages

## UI Component Testing

### Modal Component
```typescript
// Test in a component:
const [isOpen, setIsOpen] = useState(false);

<Modal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Test Modal"
>
  Modal content here
</Modal>

// Should open/close correctly
```

### DataTable Component
```typescript
const columns = [
  { key: 'title', label: 'Title' },
  { key: 'status', label: 'Status' }
];

<DataTable 
  columns={columns}
  data={audits}
  isLoading={false}
/>

// Should display all audits in table format
```

### StatCard Component
```typescript
<StatCard 
  label="Active Audits"
  value={3}
  icon={<Shield />}
  trend="up"
  trendValue="+1"
/>

// Should display stat with icon and trend
```

## Performance Testing

### Bundle Size
```bash
npm run build
# Check .next/static/chunks for bundle sizes
```

### Lighthouse Audit
1. Open DevTools → Lighthouse
2. Run audit for Performance, Accessibility, Best Practices, SEO
3. Target: Score > 80 for all categories

### Network Testing
1. Open DevTools → Network
2. Slow 3G throttling
3. Verify pages load reasonably fast
4. Check for unnecessary requests

## Accessibility Testing

### Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter key activates buttons
- [ ] Escape key closes modals
- [ ] Skip to main content link works

### Screen Reader Testing
- [ ] Headings properly labeled
- [ ] Buttons have descriptive labels
- [ ] Images have alt text
- [ ] Form labels associated with inputs

## Error Handling Testing

### Network Errors
1. Open DevTools Network tab
2. Throttle to "Offline"
3. Try to load data
4. Should show error notification

### Component Errors
1. Open browser console
2. Trigger error in component
3. Should catch in error boundary
4. Should show fallback UI

### Validation Errors
1. Try to submit empty form
2. Should show field errors
3. Submit with invalid email
4. Should show email error

## Sign-Off Checklist

Before deployment:
- [ ] All auth flows work correctly
- [ ] Role-based routing functions properly
- [ ] Data loads from services correctly
- [ ] Notifications display and dismiss
- [ ] Error boundaries catch errors
- [ ] Mobile responsive
- [ ] Keyboard accessible
- [ ] No console errors
- [ ] Lighthouse scores good
- [ ] All links work
- [ ] Forms validate correctly
