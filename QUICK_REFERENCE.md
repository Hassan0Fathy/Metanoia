# METANOIA Quick Reference Guide

## 🚀 Quick Start

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## 📁 Where to Find Things

| What You Need | Location |
|---------------|----------|
| Add a new page | `app/new-page/page.tsx` |
| Add a component | `components/ui/`, `components/cards/`, or `components/sections/` |
| Update colors | `tailwind.config.ts` |
| Add data/experiences | `lib/constants.ts` |
| Add animations | Import from `lib/animations.ts` |
| Helper functions | `lib/utils.ts` |
| Types definitions | `lib/types.ts` |

## 🧩 Common Component Usage

### Button
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg" onClick={handleClick}>
  Click Me
</Button>
```

Variants: `primary`, `secondary`, `outline`, `ghost`  
Sizes: `sm`, `md`, `lg`

### Card
```tsx
import { Card } from '@/components/ui/Card';

<Card variant="elevated" hover={true}>
  <h3>Title</h3>
  <p>Content</p>
</Card>
```

Variants: `elevated`, `outlined`, `filled`

### Badge
```tsx
import { Badge } from '@/components/ui/Badge';

<Badge variant="primary">New</Badge>
```

Variants: `primary`, `secondary`, `outlined`

### Input Field
```tsx
import { InputField } from '@/components/ui/InputField';

<InputField
  label="Your Name"
  required
  value={name}
  onChange={(e) => setName(e.target.value)}
  error={nameError}
/>
```

### Select Field
```tsx
import { SelectField } from '@/components/ui/SelectField';

<SelectField
  label="Choose Option"
  options={[
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
  ]}
  value={selected}
  onChange={(e) => setSelected(e.target.value)}
/>
```

## 🎨 Styling Tips

### Colors
```tsx
{/* Use Tailwind classes with custom colors */}
<div className="bg-primary-olive text-off-white">
  {/* Colors: primary-olive, olive-container, off-white, warm-beige, earth-brown, dark-brown */}
</div>
```

### Typography
```tsx
<h1 className="text-display-lg font-serif">Heading</h1>
<p className="text-body-lg">Body text</p>
<span className="text-label-caps">Small label</span>
```

### Responsive
```tsx
<div className="text-base md:text-lg lg:text-xl">
  Responsive text sizes
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  Responsive grid
</div>
```

### Spacing
```tsx
{/* Use container-gutter for proper padding */}
<section className="py-margin-mobile md:py-margin-desktop container-gutter">
  Content with margins
</section>
```

## ✨ Animation Usage

### Scroll-Triggered
```tsx
import { AnimatedSection } from '@/components/sections/AnimatedSection';

<AnimatedSection delay={0.2}>
  This fades up when scrolled into view
</AnimatedSection>
```

### Custom Framer Motion
```tsx
import { motion } from 'framer-motion';
import { fadeInUp } from '@/lib/animations';

<motion.div {...fadeInUp}>
  Animated content
</motion.div>
```

### Staggered List
```tsx
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/animations';

<motion.ul variants={staggerContainer} initial="initial" animate="animate">
  {items.map((item) => (
    <motion.li key={item.id} variants={staggerItem}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>
```

## 📋 Form Patterns

### Simple Form
```tsx
'use client';

import { useState } from 'react';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';

export function MyForm() {
  const [data, setData] = useState({ name: '', email: '' });

  return (
    <div className="space-y-6">
      <InputField
        label="Name"
        value={data.name}
        onChange={(e) => setData({ ...data, name: e.target.value })}
        required
      />
      <InputField
        label="Email"
        type="email"
        value={data.email}
        onChange={(e) => setData({ ...data, email: e.target.value })}
        required
      />
      <Button onClick={() => console.log(data)}>Submit</Button>
    </div>
  );
}
```

## 🌍 Using Global Data

```tsx
import { EXPERIENCES, JOURNEYS, PLANS } from '@/lib/constants';

{EXPERIENCES.map((exp) => (
  <ExperienceCard key={exp.id} {...exp} />
))}
```

## 🔑 Key Files Overview

### lib/constants.ts
Contains all static data:
- Journey types
- Experience items
- Plan options
- Sanctuary zones
- Contact info

### lib/types.ts
TypeScript definitions for:
- Journey, Experience, Plan, Zone
- Component props
- Booking data
- Form data

### lib/utils.ts
Utility functions:
- formatPrice(), formatDate()
- isValidEmail(), isValidPhone()
- generateBookingId()
- debounce(), throttle()
- And more...

### lib/animations.ts
Framer Motion variants:
- fadeInUp, fadeIn, slideInLeft/Right
- scaleIn, staggerContainer, staggerItem
- hoverScale, hoverLift, pageTransition

## 🧪 Testing Checklist

- [ ] Page loads without errors
- [ ] Responsive on mobile (< 640px)
- [ ] Responsive on tablet (640-1024px)
- [ ] Responsive on desktop (> 1024px)
- [ ] All links navigate correctly
- [ ] Forms validate and submit
- [ ] Animations are smooth
- [ ] Hover states work
- [ ] Focus states visible
- [ ] No console errors

## 📱 Responsive Breakpoints

```tsx
// Mobile (0-640px) - Default
<div className="text-lg">
  
// Tablet (640px+)
  md:text-xl
  
// Desktop (1024px+)
  lg:text-2xl
">
  Content
</div>
```

## 🐛 Debugging

### Check errors
```bash
npm run type-check  # TypeScript errors
npm run lint        # ESLint issues
npm run build       # Build errors
```

### Clear cache
```bash
rm -rf .next
npm run dev
```

### Check dependencies
```bash
npm list
npm outdated
```

## 📚 Important Files to Read

1. **README.md** - Full project overview
2. **DEVELOPMENT.md** - Development patterns
3. **PROJECT_STRUCTURE.md** - File inventory
4. **lib/constants.ts** - All data definitions

## 🔗 File Import Paths

```tsx
// Components
import { Button } from '@/components/ui/Button';
import { HeroSection } from '@/components/sections/HeroSection';
import { Header } from '@/components/layout/Header';

// Utilities
import { fadeInUp } from '@/lib/animations';
import { EXPERIENCES, JOURNEYS } from '@/lib/constants';
import { generateBookingId } from '@/lib/utils';
import { Experience, Journey } from '@/lib/types';
```

## 🎯 Common Tasks

### Add a new experience
Edit `lib/constants.ts` EXPERIENCES array:
```typescript
{
  id: 'new-exp',
  title: 'Title',
  description: 'Description',
  category: 'Category',
  icon: '🎯',
}
```

### Create new page
1. Create `app/my-page/page.tsx`
2. Add content using existing components
3. Accessible at `/my-page`

### Add new color
Edit `tailwind.config.ts`:
```typescript
colors: {
  'my-color': '#hexcode',
}
```

Use as `className="bg-my-color text-my-color"`

### Create form state
```typescript
const [form, setForm] = useState({
  field1: '',
  field2: '',
});

const update = (field: string, value: string) => {
  setForm(prev => ({ ...prev, [field]: value }));
};
```

## 🚀 Deployment Checklist

- [ ] npm run type-check passes
- [ ] npm run lint passes
- [ ] npm run build succeeds
- [ ] All pages load
- [ ] Forms work
- [ ] No console errors
- [ ] Responsive on all devices
- [ ] Links working
- [ ] Images optimized

---

## 📞 Still Need Help?

1. Check DEVELOPMENT.md for detailed patterns
2. Look at existing components for examples
3. Review lib/constants.ts for data structure
4. Check TypeScript types in lib/types.ts

---

**Happy Coding! 🎨✨**
