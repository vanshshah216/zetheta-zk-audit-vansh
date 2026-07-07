# Developer Quick Start Guide

## Getting Started

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Start Development Server
```bash
pnpm dev
```
Visit `http://localhost:3000`

### 3. Test Authentication
Use these test credentials:
- **Company**: company@example.com / password123
- **Auditor**: auditor@example.com / password123
- **Verifier**: verifier@example.com / password123

## Core Concepts

### Authentication
The app uses Zustand for global auth state. Always use the `useAuth()` hook in components:

```typescript
'use client'
import { useAuth } from '@/hooks/use-auth'

export function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  if (!isAuthenticated) {
    return <div>Please log in</div>
  }
  
  return <div>Welcome, {user.firstName}</div>
}
```

### Data Loading
Always use specific hooks for data operations:

```typescript
'use client'
import { useAudits } from '@/hooks/use-audits'

export function AuditsList() {
  const { audits, isLoading, getAudits } = useAudits()
  
  useEffect(() => {
    getAudits()
  }, [])
  
  if (isLoading) return <TableSkeleton />
  
  return <DataTable columns={columns} data={audits} />
}
```

### Notifications
Display notifications using the `useNotifications()` hook:

```typescript
const { notify } = useNotifications()

// In event handler:
await saveData()
notify('success', 'Success', 'Data saved successfully')
```

## Adding New Features

### 1. Add New Service
Create `services/my-service.ts`:

```typescript
export interface MyData {
  id: string
  name: string
}

export const myService = {
  async getAll(): Promise<MyData[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return []
  },
  
  async getById(id: string): Promise<MyData | null> {
    // Implementation
    return null
  },
  
  async create(data: Omit<MyData, 'id'>): Promise<MyData> {
    // Implementation
    return { id: '1', ...data }
  }
}
```

### 2. Add New Hook
Create `hooks/use-my-data.ts`:

```typescript
'use client'
import { useCallback, useState } from 'react'
import { myService } from '@/services/my-service'
import { useNotifications } from './use-notifications'

export function useMyData() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const { notify } = useNotifications()
  
  const getAll = useCallback(async () => {
    setIsLoading(true)
    try {
      const result = await myService.getAll()
      setData(result)
      return result
    } catch (error) {
      notify('error', 'Error', 'Failed to load data')
      return []
    } finally {
      setIsLoading(false)
    }
  }, [notify])
  
  return { data, isLoading, getAll }
}
```

### 3. Use Hook in Component
```typescript
'use client'
import { useMyData } from '@/hooks/use-my-data'
import { useEffect } from 'react'

export function MyDataPage() {
  const { data, isLoading, getAll } = useMyData()
  
  useEffect(() => {
    getAll()
  }, [])
  
  return (
    <PageContainer title="My Data">
      <DataTable columns={columns} data={data} isLoading={isLoading} />
    </PageContainer>
  )
}
```

## Common Patterns

### Protected Page
Wrap page content with ProtectedRoute:

```typescript
import { ProtectedRoute } from '@/components/auth/protected-route'

export default function AuditorPage() {
  return (
    <ProtectedRoute requiredRole="auditor">
      <YourPageContent />
    </ProtectedRoute>
  )
}
```

### Loading State
Use skeleton loaders during data fetch:

```typescript
if (isLoading) {
  return (
    <div className="space-y-4">
      <CardSkeleton />
      <CardSkeleton />
      <CardSkeleton />
    </div>
  )
}
```

### Error Handling
Always wrap async operations with try-catch and notify:

```typescript
try {
  await apiClient.audits.createAudit(data)
  notify('success', 'Created', 'Audit created successfully')
} catch (error) {
  notify('error', 'Error', 'Failed to create audit')
}
```

### Modal Usage
```typescript
const [isOpen, setIsOpen] = useState(false)

return (
  <>
    <Button onClick={() => setIsOpen(true)}>Open</Button>
    
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="My Modal"
      footer={<Button onClick={() => setIsOpen(false)}>Close</Button>}
    >
      <p>Modal content</p>
    </Modal>
  </>
)
```

## Debugging

### Browser DevTools
1. Open DevTools → Application → Storage → IndexedDB
2. Look for Zustand store data
3. Use React DevTools to inspect component state

### Zustand DevTools
```typescript
import { useAuthStore } from '@/stores/auth-store'

// In console:
const auth = useAuthStore()
console.log(auth) // See all state and methods
auth.logout() // Test actions
```

### Network Tab
1. Open DevTools → Network
2. Watch API calls (simulated as timeouts)
3. Check request/response payloads

## File Organization Best Practices

### Where to put files:
- **Services**: `services/` - Data fetching logic
- **Hooks**: `hooks/` - React hooks for data/state
- **Components**: `components/` - Reusable UI components
- **Stores**: `stores/` - Zustand stores
- **Types**: `types/` or `lib/` - TypeScript interfaces
- **Layouts**: `components/layouts/` - Page layouts
- **Pages**: `app/` - Next.js pages

### Naming conventions:
- Services: `{domain}-service.ts` (e.g., `audit-service.ts`)
- Hooks: `use-{domain}.ts` (e.g., `use-audits.ts`)
- Stores: `{domain}-store.ts` (e.g., `auth-store.ts`)
- Components: PascalCase (e.g., `DataTable.tsx`)

## Testing Your Changes

### Local Testing
```bash
# Build
pnpm build

# Check for errors
pnpm lint

# Type check
pnpm tsc --noEmit
```

### Test Account Flows
1. Login with test account
2. Navigate between pages
3. Test each feature in your dashboard
4. Open DevTools console for errors
5. Check notifications appear/dismiss correctly

## Deployment Checklist

Before pushing to production:
- [ ] All features working locally
- [ ] No console errors
- [ ] Navigation works correctly
- [ ] Responsive on mobile
- [ ] Notifications display properly
- [ ] Error boundaries catch errors
- [ ] Loading states show
- [ ] All links valid
- [ ] Forms validate
- [ ] Build passes (`pnpm build`)

## Useful Commands

```bash
# Development
pnpm dev

# Build
pnpm build

# Lint code
pnpm lint

# Type check
pnpm tsc --noEmit

# Run tests (if configured)
pnpm test
```

## Need Help?

1. Check `ARCHITECTURE.md` for system design
2. Check `TESTING_GUIDE.md` for test procedures
3. Check `TRANSFORMATION_SUMMARY.md` for overview
4. Review relevant service/hook files for examples
5. Check similar components for patterns

## Key Files Reference

| File | Purpose |
|------|---------|
| `lib/api-client.ts` | Central API entry point |
| `stores/auth-store.ts` | Authentication state |
| `hooks/use-auth.ts` | Auth operations |
| `providers/root-provider.tsx` | App wrapper |
| `components/layouts/dashboard-layout.tsx` | Dashboard template |
| `ARCHITECTURE.md` | System design |

## Performance Tips

- Use `useCallback()` for expensive functions
- Memoize components with `memo()`
- Lazy load heavy components with `dynamic()`
- Avoid unnecessary re-renders
- Use skeleton loaders for better UX
- Optimize images with Next.js Image component
- Code split by route

## Security Notes

- Always validate user input
- Use protected routes for authenticated pages
- Check user role before showing features
- Don't expose sensitive data in frontend
- Use environment variables for secrets
- Sanitize user-generated content

Happy coding!
