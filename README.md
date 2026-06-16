# Project Reorganization Plan

This document outlines the final project structure after successful reorganization.

## 1. Goal
- Clean architecture
- Professional folder structure (`src/`)
- Standardized naming conventions
- Removed dead code/unused assets
- Fully functional production-ready structure

## 2. Final Project Structure
```
metanoia-wellness-sanctuary/
├── app/                  # Next.js App Router (Routes)
│   ├── sanctuary/
│   ├── journeys/
│   ├── reservation/
│   ├── shop/
│   ├── key/
│   ├── layout.tsx        # Root Layout
│   └── page.tsx          # Home
├── public/
│   └── images/           # Finalized/Sorted assets
├── src/
│   ├── assets/           # Reorganized images, icons, fonts
│   ├── components/
│   │   ├── common/       # UI/Shared components
│   │   ├── layout/       # Header/Footer
│   │   ├── home/         # Home specific sections
│   │   ├── reservation/  # Reservation components
│   │   ├── organic-shop/ # Shop components
│   │   └── ...
│   ├── pages/            # Page components (mapping to app routes)
│   ├── utils/            # Utilities & Services (Constants, PDF, Utils)
│   ├── styles/           # Global styles
│   └── ...
├── package.json
└── tsconfig.json
```

## 3. Key Changes Made
- Introduced `src/` directory for cleaner separation of concerns.
- Migrated shared components to `src/components/common/`.
- Consolidated utility files and logic into `src/utils/`.
- Standardized page component structure in `src/pages/` (mapping 1-to-1 with `app/` routes).
- Standardized file naming to `PascalCase.tsx`.
- Updated all import paths to use path aliasing (`@/`).
- Removed redundant code, unused imports, and temporary development files.
- Verified build and type-safety.

## 4. Verification
- Project builds successfully (`npm run build`).
- Core flows (Navigation, Reservation, PDF Generation) are functional.
- TypeScript compilation is successful (`npm run type-check`).
