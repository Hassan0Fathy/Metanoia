# METANOIA Development Guide

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# http://localhost:3000
```

## Development Workflow

### 1. Component Development

When creating new components, follow this pattern:

```tsx
'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';

interface YourComponentProps {
  title: string;
  description?: string;
}

export function YourComponent({
  title,
  description,
}: YourComponentProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1>{title}</h1>
      {description && <p>{description}</p>}
    </motion.div>
  );
}
```

**Key Points:**
- Use `'use client'` directive for interactive components
- Import types from `lib/types.ts`
- Use Tailwind CSS classes for styling
- Add Framer Motion animations for smooth interactions
- Follow naming conventions: PascalCase for components

### 2. Page Development

New pages go in the `app/` directory and automatically become routes:

```tsx
// app/new-page/page.tsx
import { HeroSection } from '@/components/sections/HeroSection';
import { AnimatedSection } from '@/components/sections/AnimatedSection';

export default function NewPage() {
  return (
    <>
      <HeroSection
        title="Page Title"
        subtitle="Subtitle"
        description="Description"
      />
      
      <section className="py-20 md:py-32 container-gutter">
        <AnimatedSection>
          {/* Content */}
        </AnimatedSection>
      </section>
    </>
  );
}
```

The page is automatically accessible at `/new-page`

### 3. Styling Guide

Always use Tailwind CSS classes with our custom color tokens:

```tsx
{/* Primary colors */}
<div className="bg-primary-olive text-off-white" />

{/* Typography classes */}
<h1 className="text-display-lg font-serif" />
<p className="text-body-md" />

{/* Responsive utilities */}
<div className="text-lg md:text-2xl lg:text-4xl" />

{/* Spacing using custom scale */}
<div className="py-margin-mobile md:py-margin-desktop" />
```

### 4. Adding New Experiences

Update `lib/constants.ts`:

```typescript
export const EXPERIENCES = [
  // ... existing
  {
    id: 'new-experience',
    title: 'New Experience',
    description: 'Description here',
    category: 'Category Name',
    icon: '🎯',
  },
];
```

Then use in components:

```tsx
import { EXPERIENCES } from '@/lib/constants';

EXPERIENCES.map((exp) => (
  <ExperienceCard key={exp.id} {...exp} />
))
```

### 5. Form Handling

Use controlled components with React hooks:

```tsx
'use client';

import { useState } from 'react';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';

export function MyForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    // Form data stored in state (no backend)
  };

  return (
    <div className="space-y-6">
      <InputField
        label="Name"
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        required
      />
      <InputField
        label="Email"
        type="email"
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        required
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
```

### 6. Animation Patterns

Common animation patterns already defined:

```tsx
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer } from '@/lib/animations';

{/* Single element fade-in */}
<motion.div {...fadeInUp}>
  Content
</motion.div>

{/* Staggered list */}
<motion.ul variants={staggerContainer} initial="initial" animate="animate">
  {items.map(item => (
    <motion.li key={item.id} variants={staggerItem}>
      {item.name}
    </motion.li>
  ))}
</motion.ul>

{/* Scroll-triggered animation */}
<AnimatedSection delay={0.2}>
  Content appears when scrolled into view
</AnimatedSection>
```

### 7. Responsive Design

Always design mobile-first:

```tsx
<div className="
  grid 
  grid-cols-1              // Mobile
  md:grid-cols-2          // Tablet
  lg:grid-cols-3          // Desktop
  gap-4 md:gap-6 lg:gap-8
  px-4 md:px-6 lg:px-8
  py-6 md:py-12 lg:py-16
">
```

Key breakpoints:
- No prefix: Mobile (0-640px)
- `sm:`: 640px+
- `md:`: 768px+
- `lg:`: 1024px+
- `xl:`: 1280px+

### 8. Type Safety

Always import and use types:

```tsx
import { Experience, Journey, Plan } from '@/lib/types';

interface MyComponentProps {
  experience: Experience;
  journey: Journey;
  plan: Plan;
}

export function MyComponent({
  experience,
  journey,
  plan,
}: MyComponentProps) {
  // Full type safety
}
```

## Project Structure

### Components Organization

```
components/
├── layout/         // Header, Footer, Navigation
├── ui/             // Reusable: Button, Card, Badge, Inputs
├── sections/       // Page sections: Hero, Animated
├── cards/          // Card variants: Experience, Journey
└── forms/          // Complex forms: Reservation
```

### Data Flow

```
Constants (lib/constants.ts)
    ↓
Components (consume via props)
    ↓
State Management (React hooks)
    ↓
User Actions (no backend)
```

## Common Tasks

### Add a New Button Variant

```tsx
// components/ui/Button.tsx
const variants = {
  // ... existing
  gradient: 'bg-gradient-to-r from-primary-olive to-earth-brown text-off-white hover:shadow-lg',
};
```

### Add a New Page Section

```tsx
// app/journeys/journey-details/page.tsx
export default function JourneyDetailsPage() {
  return (
    <>
      <HeroSection title="Journey Details" />
      <section className="py-20 md:py-32 container-gutter">
        {/* Your content */}
      </section>
    </>
  );
}
```

### Create a New Data Array

```tsx
// lib/constants.ts
export const NEW_DATA = [
  {
    id: 'item-1',
    name: 'Item 1',
    // ...
  },
];

// Use in components
import { NEW_DATA } from '@/lib/constants';
```

### Add Animation to Component

```tsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
  viewport={{ once: true }}
>
  Content
</motion.div>
```

## Performance Tips

1. **Lazy load components**
   ```tsx
   const HeavyComponent = dynamic(() => import('./Heavy'), {
     loading: () => <div>Loading...</div>,
   });
   ```

2. **Optimize images** (when using real images)
   ```tsx
   import Image from 'next/image';
   <Image src="/image.jpg" alt="Alt" width={800} height={600} />
   ```

3. **Memoize expensive calculations**
   ```tsx
   const memoizedValue = useMemo(() => {
     return expensiveCalculation();
   }, [dependencies]);
   ```

4. **Debounce event handlers**
   ```tsx
   const handleSearch = debounce((query) => {
     // Search logic
   }, 300);
   ```

## Testing Tips

### Manual Testing Checklist

- [ ] Page loads without errors
- [ ] Responsive on mobile/tablet/desktop
- [ ] All links navigate correctly
- [ ] Forms submit (state updates)
- [ ] Animations are smooth
- [ ] Color contrast is accessible
- [ ] Keyboard navigation works

### Testing Specific Features

```tsx
// Test form validation
const { getByRole } = render(<ReservationForm />);
const submitButton = getByRole('button', { name: /submit/i });
expect(submitButton).toBeDisabled();
```

## Debugging

### Common Issues

**Port already in use:**
```bash
npm run dev -- -p 3001
```

**Build errors:**
```bash
npm run type-check
npm run lint
npm run build
```

**Clear cache:**
```bash
rm -rf .next
npm run dev
```

### Browser DevTools

- Check Network tab for failed requests
- Use Console for JavaScript errors
- Lighthouse for performance audit
- React DevTools extension for component inspection

## Deployment

### Pre-deployment Checklist

- [ ] Run type check: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Test build: `npm run build`
- [ ] Test start: `npm start`
- [ ] Check all pages load correctly
- [ ] Verify responsive design
- [ ] Test forms work in production

### Deploy to Vercel

1. Push to GitHub
2. Go to vercel.com
3. Connect repository
4. Vercel auto-deploys on push

### Self-hosted Deployment

```bash
npm run build
npm start
```

Server runs on port 3000 by default.

## Contributing Guidelines

1. Create feature branches: `git checkout -b feature/my-feature`
2. Keep commits atomic and well-described
3. Test locally before pushing
4. Update README if adding new features
5. Follow existing code style

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

## Support

For issues or questions:
1. Check existing documentation
2. Review similar components
3. Test with minimal reproduction
4. Check console errors and warnings

---

Happy building! 🚀✨
