# Zero Knowledge Audit Marketplace - Design System

A premium, enterprise-grade cybersecurity SaaS design system featuring dark cyber aesthetics, glassmorphic components, and smooth Framer Motion animations.

## 🎨 Design Philosophy

This design system is built for enterprise cybersecurity and fintech applications with:
- **Dark Cyber Aesthetic**: Deep dark backgrounds (#050816) with neon accents
- **Premium Fintech Feel**: Similar to Stripe, Vercel, and Chainalysis
- **Glassmorphism**: Frosted glass effects with backdrop blur
- **Smooth Animations**: Framer Motion-powered interactions
- **Professional Typography**: Inter font with bold, readable hierarchy

## 🎭 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| **Cyan** | #00E5FF | Primary accent, glow effects |
| **Blue** | #2563EB | Primary actions, hover states |
| **Emerald** | #10B981 | Success states, positive indicators |
| **Purple** | #7C3AED | Secondary actions, premium feel |
| **Background** | #050816 | Main dark background |
| **Card** | #0f172a | Component backgrounds |

## 📦 Components

### Core Components

#### Button
Versatile button component with multiple variants and sizes.

```tsx
import { Button } from '@/components/ds/button'

<Button>Default Button</Button>
<Button variant="cyan">Cyan Button</Button>
<Button variant="emerald">Emerald Button</Button>
<Button variant="purple">Purple Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="ghost">Ghost Button</Button>
<Button variant="glass">Glass Button</Button>
<Button variant="destructive">Destructive Button</Button>

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

**Variants**: `default`, `cyan`, `emerald`, `purple`, `outline`, `ghost`, `glass`, `destructive`
**Sizes**: `sm`, `default`, `lg`, `icon`

#### Input
Advanced input field with icon support and validation states.

```tsx
import { Input } from '@/components/ds/input'

<Input placeholder="Enter text..." />
<Input placeholder="Search..." icon={<SearchIcon />} />
<Input placeholder="Valid input" success />
<Input placeholder="Error input" error />
```

#### Card
Container component with multiple variants for different visual effects.

```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ds/card'

<Card variant="default">
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Description</CardDescription>
  </CardHeader>
  <CardContent>Content</CardContent>
  <CardFooter>Footer</CardFooter>
</Card>

<Card variant="glass">Glass Card</Card>
<Card variant="neon">Neon Card with cyan glow</Card>
<Card variant="gradient">Subtle gradient Card</Card>
```

**Variants**: `default`, `glass`, `neon`, `gradient`

#### Badge
Small tag component for status indicators and labels.

```tsx
import { Badge } from '@/components/ds/badge'

<Badge>Default</Badge>
<Badge variant="cyan">Cyan</Badge>
<Badge variant="emerald">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="destructive">Error</Badge>
<Badge variant="outline">Outline</Badge>
<Badge animated>Active</Badge>
<Badge icon={<Icon />}>With Icon</Badge>
```

**Variants**: `default`, `cyan`, `blue`, `emerald`, `purple`, `destructive`, `success`, `warning`, `outline`, `glass`
**Sizes**: `sm`, `default`, `lg`

#### StatusChip
Specialized component for displaying system status states.

```tsx
import { StatusChip } from '@/components/ds/status-chip'

<StatusChip status="active" label="Active" />
<StatusChip status="inactive" label="Inactive" />
<StatusChip status="pending" label="Pending" />
<StatusChip status="error" label="Error" />
<StatusChip status="processing" label="Processing" />
<StatusChip status="warning" label="Warning" />
```

**Statuses**: `active`, `inactive`, `pending`, `error`, `processing`, `warning`

#### Alert
Notification messages with multiple severity levels.

```tsx
import { Alert, AlertTitle, AlertDescription } from '@/components/ds/alert'

<Alert variant="info">
  <Icon />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>Details here</AlertDescription>
</Alert>

<Alert variant="success">Success Alert</Alert>
<Alert variant="warning">Warning Alert</Alert>
<Alert variant="destructive">Error Alert</Alert>
<Alert variant="glass">Custom Alert</Alert>
```

**Variants**: `default`, `destructive`, `warning`, `success`, `info`, `glass`

#### Progress
Animated progress indicator with color variants.

```tsx
import { Progress } from '@/components/ds/progress'

<Progress value={65} />
<Progress value={45} variant="cyan" />
<Progress value={80} variant="emerald" />
<Progress value={55} variant="gradient" animated />
<Progress value={70} showLabel />
```

**Variants**: `default`, `cyan`, `blue`, `emerald`, `purple`, `gradient`
**Props**: `value` (0-100), `variant`, `showLabel`, `animated`

#### Table
Data table component with hover effects and status indicators.

```tsx
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ds/table'

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>Data 1</TableCell>
      <TableCell>Data 2</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

#### Navbar
Sticky navigation bar with brand, navigation, and action areas.

```tsx
import { Navbar, NavbarBrand, NavbarLogo, NavbarNav, NavbarItem, NavbarActions } from '@/components/ds/navbar'

<Navbar sticky>
  <NavbarBrand>
    <NavbarLogo>Brand Name</NavbarLogo>
  </NavbarBrand>
  <NavbarNav>
    <NavbarItem href="#section">Link</NavbarItem>
  </NavbarNav>
  <NavbarActions>
    <Button>Action</Button>
  </NavbarActions>
</Navbar>
```

#### Sidebar
Collapsible sidebar with navigation items.

```tsx
import { Sidebar, SidebarContent, SidebarNav, SidebarNavItem } from '@/components/ds/sidebar'

<Sidebar collapsed={false}>
  <SidebarContent>
    <SidebarNav>
      <SidebarNavItem active icon={<Icon />}>Item</SidebarNavItem>
    </SidebarNav>
  </SidebarContent>
</Sidebar>
```

### Animation Components

#### FloatingParticles
Animated floating particles background effect.

```tsx
import { FloatingParticles } from '@/components/ds/animations'

<FloatingParticles particleCount={20} color="#00E5FF" />
```

#### AnimatedGradient
Animated gradient background that shifts through colors.

```tsx
import { AnimatedGradient } from '@/components/ds/animations'

<AnimatedGradient className="p-8">
  Content with animated gradient background
</AnimatedGradient>
```

#### GlowBox
Container with hover glow effects.

```tsx
import { GlowBox } from '@/components/ds/animations'

<GlowBox glowColor="cyan">
  Content with glow effect
</GlowBox>
```

**glowColor options**: `cyan`, `blue`, `emerald`, `purple`

#### ScanLine
Animated scan line effect (like old CRT monitors).

```tsx
import { ScanLine } from '@/components/ds/animations'

<div className="relative">
  <ScanLine />
  Content
</div>
```

#### PulseRing
Pulsing ring animation.

```tsx
import { PulseRing } from '@/components/ds/animations'

<PulseRing color="#00E5FF" size="md" />
```

**Sizes**: `sm`, `md`, `lg`

#### FadeIn
Fade-in animation on mount.

```tsx
import { FadeIn } from '@/components/ds/animations'

<FadeIn delay={0.2}>
  Fading content
</FadeIn>
```

#### StaggerContainer & StaggerItem
Staggered animation for lists.

```tsx
import { StaggerContainer, StaggerItem } from '@/components/ds/animations'

<StaggerContainer>
  <StaggerItem>Item 1</StaggerItem>
  <StaggerItem>Item 2</StaggerItem>
  <StaggerItem>Item 3</StaggerItem>
</StaggerContainer>
```

## 🎨 Utility Classes

Custom Tailwind utilities for cybersecurity aesthetics:

```css
/* Glassmorphism */
.glass - Glass effect with backdrop blur
.glass-sm - Smaller glass effect

/* Glow Effects */
.glow-cyan - Cyan glow shadow
.glow-blue - Blue glow shadow
.glow-emerald - Emerald glow shadow
.glow-purple - Purple glow shadow

/* Hover Effects */
.hover-glow-cyan - Glow on hover (cyan)
.hover-glow-blue - Glow on hover (blue)

/* Animations */
.animate-float - Floating motion
.animate-glow-pulse - Pulsing glow
.animate-shimmer - Shimmer effect
.animate-scan-line - Scan line effect
```

## 🚀 Getting Started

### Installation

1. The design system is pre-configured in your Next.js 16 project
2. All components are in `/components/ds/`
3. Styling is configured in `app/globals.css` with Tailwind v4

### Usage Example

```tsx
'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ds/card'
import { Button } from '@/components/ds/button'
import { Badge } from '@/components/ds/badge'
import { StatusChip } from '@/components/ds/status-chip'

export default function Dashboard() {
  return (
    <div className="space-y-6 p-8">
      <Card variant="glass">
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Badge variant="cyan">Active</Badge>
            <StatusChip status="active" label="Running" />
          </div>
          <Button variant="cyan">Start Audit</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

## 🎯 Best Practices

1. **Use Variants**: Always use semantic variants (cyan, emerald, etc.) for consistent branding
2. **Glass Effects**: Use glass variant for secondary surfaces to maintain hierarchy
3. **Animations**: Only animate on user interactions or meaningful state changes
4. **Colors**: Stick to the defined color palette to maintain visual consistency
5. **Spacing**: Use Tailwind's spacing scale (gap, p, m) for consistent layouts
6. **Typography**: Use appropriate heading levels (h1, h2, h3, etc.) for hierarchy

## 📚 Design Tokens

Key design tokens are defined in `app/globals.css`:

- **Spacing**: Tailwind default scale (4px base unit)
- **Radius**: 0.5rem for small elements, 0.75rem for larger ones
- **Font**: Inter (400, 500, 600, 700 weights)
- **Animation**: Framer Motion for smooth, performant animations
- **Breakpoints**: Tailwind default (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)

## 🔧 Customization

### Adding New Colors

Edit `app/globals.css` in the `:root` section:

```css
:root {
  --cyan: #00E5FF;
  --blue: #2563EB;
  --emerald: #10B981;
  --purple: #7C3AED;
  /* Add custom colors here */
}
```

### Extending Animations

Add new keyframes in `app/globals.css`:

```css
@keyframes your-animation {
  0% { /* start */ }
  100% { /* end */ }
}

@layer utilities {
  .animate-your-animation {
    animation: your-animation 2s ease-in-out infinite;
  }
}
```

## 📖 Documentation

Visit the showcase page in the app to see all components in action with interactive examples.

## 🛠️ Dependencies

- **Next.js 16**: React framework
- **Framer Motion**: Smooth animations
- **Tailwind CSS 4**: Utility-first styling
- **Radix UI**: Accessible component primitives
- **Lucide Icons**: Icon library
- **class-variance-authority**: Component variants

## 📄 License

This design system is part of the Zero Knowledge Audit Marketplace project.
