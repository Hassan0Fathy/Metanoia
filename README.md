# 🌿 METANOIA: Luxury Wellness Sanctuary

Metanoia is an immersive, high-end digital portal for a luxury wellness retreat. Crafted to evoke tranquility, restore connection, and inspire creativity, this frontend application provides a premium user experience with fluid animations, intuitive booking flows, and a clean, responsive layout.

---

## ✨ Features Overview

*   **🏡 Home & Philosophy**: An elegant introduction to the Metanoia philosophy of healing, custom experiences, and luxury accommodations.
*   **🧘 Sanctuary Zones**: A guided virtual walkthrough of the four retreat zones (Healing Waters, Creative Workshops, Organic Farm & Apothecary, and the Quiet Zone).
*   **✨ Curated Experiences**: A fully filterable, dynamic grid of 15 wellness activities grouped into categories (Mindfulness, Creative, Culinary, Nature, etc.).
*   **🗺️ Customized Journeys**: An overview of the three guest journey structures (Solo, Couple, Family) and the tier-based sanctuary packages.
*   **📅 Multi-Step Reservation**: A responsive, 6-step wizard that dynamically processes reservation options, collects guest information, validates entries, and issues confirmation identifiers.

---

## 🛠️ Technology Stack

*   **Framework**: Next.js 15 (App Router)
*   **Library**: React 19
*   **Styling**: Tailwind CSS 3
*   **Animations**: Framer Motion 11
*   **Icons**: Lucide React
*   **Language**: TypeScript 5

---

## 📁 Project Structure

```
stitch_metanoia_wellness_sanctuary/
├── app/                          # Next.js App Router Pages & Layouts
│   ├── globals.css               # Core styling & custom design tokens
│   ├── layout.tsx                # Universal layout (Navigation & Footer)
│   ├── page.tsx                  # Landing page
│   ├── sanctuary/                # Sanctuary zones subpage
│   ├── experiences/              # Filterable experiences subpage
│   ├── journeys/                 # Journey packages subpage
│   └── reservation/              # Multi-step booking wizard subpage
├── components/                   # Reusable UI & Layout Components
│   ├── layout/                   # Universal components (Header, Footer)
│   ├── ui/                       # Basic design primitives (Button, Card, Badge, Inputs)
│   ├── sections/                 # Generic layout sections (Hero, AnimatedSection)
│   ├── cards/                    # Domain cards (ExperienceCard, JourneyCard)
│   └── forms/                    # Large form components (ReservationForm)
├── lib/                          # Application logic and shared definitions
│   ├── animations.ts             # Framer Motion animation definitions
│   ├── constants.ts              # Static data definitions & configurations
│   ├── types.ts                  # Shared TypeScript models
│   └── utils.ts                  # Common helper utilities
└── public/                       # Static assets & public resources
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run the Development Server
```bash
npm run dev
# Access the local development port at http://localhost:3000
```

### 3. Production Build & Start
```bash
npm run build
npm start
```

### 4. Code Quality & Type Safety
```bash
npm run lint          # Run ESLint validation
npm run type-check    # Run TypeScript compiler checks
```

---

## ⚡ No-Code Performance Optimization Guide

You can significantly improve the performance, page-load speed, and Core Web Vitals (LCP, FID, CLS) of this Next.js 15 application **without editing a single line of project code**. 

Below are highly actionable suggestions grouped by infrastructure, hosting environment, network delivery, and runtime configuration:

### 1. High-Performance Javascript Runtime (Bun)
Instead of running Next.js under the default Node.js runtime, deploy and run the build artifacts using **Bun**. 
*   **Why**: Bun's highly optimized engine has much faster startup times and lower memory footprint, which improves Server-Side Rendering (SSR) throughput.
*   **How**:
    ```bash
    # Install dependencies with bun
    bun install
    # Build the production bundle
    bun run build
    # Run the production server
    bun run start
    ```

### 2. Edge CDN & Advanced Caching Configuration
Deploy the application behind a modern content delivery network (such as **Cloudflare**, **Vercel Edge**, or **AWS CloudFront**).
*   **Aggressive Asset Caching**: Set up a custom cache rule to serve all static assets (`/_next/static/*` and static media from `/images/*`) directly from the Edge cache. Since Next.js uses file hashing for build outputs, these are completely immutable:
    *   Set headers: `Cache-Control: public, max-age=31536000, immutable`
*   **Stale-While-Revalidate**: Configure page caching at the CDN level using headers to serve stale pages instantly while revalidating the content in the background.

### 3. Image & Media Optimization at the Edge (Without next/image code changes)
Since images represent the heaviest payloads:
*   **Pre-optimized Assets**: Before deploying, batch-optimize images inside the `/public/images` directory using external lossless/lossy compression tools (such as *TinyPNG*, *Squoosh*, or command-line *imagemin*). Converting raw large files to high-compression WebP or AVIF formats saves megabytes of bandwidth.
*   **Cloudflare Polish / CDN Image Re-formatting**: If using Cloudflare, enable **Polish** and **WebP/AVIF auto-conversion**. Cloudflare will inspect incoming client headers and dynamically convert images to AVIF or WebP formats at the network edge, matching client browser capabilities without code changes.

### 4. Enable HTTP/3 (QUIC) and Brotli Compression
*   **Brotli Compression**: Configure your hosting platform or reverse proxy (Nginx/Cloudflare) to compress files using **Brotli** instead of Gzip. Brotli yields up to 20-30% smaller files for CSS, Javascript, and HTML, leading to faster download times.
*   **HTTP/3 Support**: Enable HTTP/3 protocols on the hosting server. HTTP/3 avoids head-of-line blocking by using UDP-based streams, drastically improving asset delivery speed on high-latency mobile networks.

### 5. Runtime Tuning & Environment Flags
Apply server-level environment settings to reduce system overhead:
*   `NEXT_TELEMETRY_DISABLED=1` — Disables outbound telemetry network requests on Next.js startup/runtime.
*   `NODE_ENV=production` — Ensures React runs in optimized production mode with all development assertions and warning overhead removed.
*   **V8 GC Optimization**: Launch Node.js with performance flags:
    ```bash
    NODE_OPTIONS="--max-old-space-size=2048 --gc-interval=100" npm start
    ```

### 6. Edge Script Deferral & Auto-Minification
If using Cloudflare or a similar proxy service, enable:
*   **Rocket Loader**: Defers the loading and execution of non-critical script resources automatically, improving First Contentful Paint (FCP) and Time to Interactive (TTI).
*   **Auto-Minify**: Dynamically removes empty lines, comments, and whitespace from HTML, CSS, and Javascript files before serving them to client browsers.
