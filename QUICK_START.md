# Quick Start Guide

## Using the Design System

### 1. Import Components

```tsx
import { Button } from '@/components/ds/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ds/card'
import { Badge } from '@/components/ds/badge'
import { Input } from '@/components/ds/input'
import { Alert, AlertTitle, AlertDescription } from '@/components/ds/alert'
```

Or use the index file for cleaner imports:

```tsx
import { 
  Button, 
  Card, 
  Badge, 
  Input, 
  Alert 
} from '@/components/ds'
```

### 2. Build Your First Component

```tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { Badge } from '@/components/ds/badge'

export default function AuditCard() {
  return (
    <Card variant="glass" className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Security Audit</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Badge variant="cyan">Active</Badge>
          <Badge variant="emerald">Verified</Badge>
        </div>
        <p className="text-muted-foreground">
          Your security audit is in progress. All systems nominal.
        </p>
        <Button variant="cyan" className="w-full">
          View Results
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 3. Use Animations

```tsx
'use client'

import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ds/animations'

export default function AnimatedSection() {
  return (
    <StaggerContainer>
      <StaggerItem>
        <h2>Item 1</h2>
      </StaggerItem>
      <StaggerItem>
        <h2>Item 2</h2>
      </StaggerItem>
      <StaggerItem>
        <h2>Item 3</h2>
      </StaggerItem>
    </StaggerContainer>
  )
}
```

### 4. Create a Form

```tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ds/card'
import { Input } from '@/components/ds/input'
import { Button } from '@/components/ds/button'
import { Label } from '@/components/ds/label'
import { Lock, Mail } from 'lucide-react'

export default function LoginForm() {
  return (
    <Card variant="glass" className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email"
            type="email"
            placeholder="you@example.com"
            icon={<Mail className="w-4 h-4" />}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input 
            id="password"
            type="password"
            placeholder="••••••••"
            icon={<Lock className="w-4 h-4" />}
          />
        </div>
        <Button variant="cyan" className="w-full">
          Sign In
        </Button>
      </CardContent>
    </Card>
  )
}
```

### 5. Build a Data Table

```tsx
'use client'

import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from '@/components/ds/table'
import { Badge } from '@/components/ds/badge'
import { StatusChip } from '@/components/ds/status-chip'

export default function AuditTable() {
  const audits = [
    { id: 'AUDIT-001', status: 'active', risk: 'Low', date: '2026-01-15' },
    { id: 'AUDIT-002', status: 'processing', risk: 'Medium', date: '2026-01-18' },
    { id: 'AUDIT-003', status: 'error', risk: 'High', date: '2026-01-20' },
  ]

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Audit ID</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {audits.map((audit) => (
          <TableRow key={audit.id}>
            <TableCell className="font-mono">{audit.id}</TableCell>
            <TableCell>
              <StatusChip status={audit.status as any} label={audit.status} />
            </TableCell>
            <TableCell>
              <Badge variant={audit.risk === 'Low' ? 'success' : 'warning'}>
                {audit.risk}
              </Badge>
            </TableCell>
            <TableCell className="text-muted-foreground">{audit.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

## Key Features

✨ **Glassmorphism** - Frosted glass effects with backdrop blur
🌈 **Color Coded** - Cyan, Blue, Emerald, Purple color palette
⚡ **Smooth Animations** - Framer Motion-powered interactions
🎨 **Premium Feel** - Enterprise-grade cybersecurity aesthetics
♿ **Accessible** - Built with Radix UI primitives
📱 **Responsive** - Mobile-first design
🚀 **Performance** - Optimized with Next.js 16 & Turbopack

## Component Variants

### Buttons
- **variant**: default | cyan | emerald | purple | outline | ghost | glass | destructive
- **size**: sm | default | lg | icon

### Cards
- **variant**: default | glass | neon | gradient

### Badges
- **variant**: default | cyan | blue | emerald | purple | destructive | success | warning | outline | glass
- **size**: sm | default | lg
- **animated**: true | false

### Progress Bars
- **variant**: default | cyan | blue | emerald | purple | gradient
- **showLabel**: true | false
- **animated**: true | false

### Status Chips
- **status**: active | inactive | pending | error | processing | warning

### Alerts
- **variant**: default | destructive | warning | success | info | glass

## Styling Tips

1. **Use semantic colors**: `text-cyan`, `bg-emerald`, `border-purple`
2. **Glass containers**: Add `.glass` class for glassmorphic effect
3. **Glow effects**: Use `.glow-cyan`, `.glow-blue`, `.glow-emerald`, `.glow-purple`
4. **Hover animations**: Components automatically include smooth hover states
5. **Responsive**: Use Tailwind breakpoints: `md:`, `lg:`, `xl:`

## Customization

### Changing Colors

Edit `app/globals.css`:

```css
:root {
  --cyan: #00E5FF;
  --blue: #2563EB;
  --emerald: #10B981;
  --purple: #7C3AED;
}
```

### Adding New Animations

Edit `app/globals.css`:

```css
@keyframes your-animation {
  0% { /* start state */ }
  100% { /* end state */ }
}

@layer utilities {
  .animate-your-animation {
    animation: your-animation 2s ease-in-out infinite;
  }
}
```

## Resources

- **Full Documentation**: See `DESIGN_SYSTEM.md`
- **Live Showcase**: Visit the home page (`/`) to see all components
- **Component Source**: Check `/components/ds/` for implementation details
- **Tailwind Docs**: https://tailwindcss.com
- **Framer Motion**: https://www.framer.com/motion
- **Radix UI**: https://www.radix-ui.com

## Next Steps

1. ✅ Design System is ready
2. 📄 Build your pages using the components
3. 🎨 Customize colors and animations as needed
4. 🚀 Deploy to production

Happy building! 🚀
