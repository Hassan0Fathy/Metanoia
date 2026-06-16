---
name: Ethereal Sanctuary
colors:
  surface: '#fcf9f5'
  surface-dim: '#dcdad6'
  surface-bright: '#fcf9f5'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ef'
  surface-container: '#f0ede9'
  surface-container-high: '#eae8e4'
  surface-container-highest: '#e5e2de'
  on-surface: '#1c1c1a'
  on-surface-variant: '#46483e'
  inverse-surface: '#31302e'
  inverse-on-surface: '#f3f0ec'
  outline: '#77786d'
  outline-variant: '#c7c7ba'
  surface-tint: '#5a623e'
  primary: '#565d39'
  on-primary: '#ffffff'
  primary-container: '#6e7650'
  on-primary-container: '#f5fdce'
  inverse-primary: '#c2cb9f'
  secondary: '#685c50'
  on-secondary: '#ffffff'
  secondary-container: '#f1e0d0'
  on-secondary-container: '#6e6256'
  tertiary: '#70543f'
  on-tertiary: '#ffffff'
  tertiary-container: '#8a6c56'
  on-tertiary-container: '#fff7f3'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dfe7b9'
  primary-fixed-dim: '#c2cb9f'
  on-primary-fixed: '#181e03'
  on-primary-fixed-variant: '#434a28'
  secondary-fixed: '#f1e0d0'
  secondary-fixed-dim: '#d4c4b5'
  on-secondary-fixed: '#221a11'
  on-secondary-fixed-variant: '#50453a'
  tertiary-fixed: '#ffdcc4'
  tertiary-fixed-dim: '#e4bfa6'
  on-tertiary-fixed: '#2b1707'
  on-tertiary-fixed-variant: '#5b412e'
  background: '#fcf9f5'
  on-background: '#1c1c1a'
  surface-variant: '#e5e2de'
typography:
  display-lg:
    fontFamily: Libre Caslon Text
    fontSize: 64px
    fontWeight: '400'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Libre Caslon Text
    fontSize: 40px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Libre Caslon Text
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.3'
  headline-sm:
    fontFamily: Libre Caslon Text
    fontSize: 24px
    fontWeight: '400'
    lineHeight: '1.4'
  body-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  gutter: 32px
  margin-desktop: 80px
  margin-mobile: 24px
  section-gap: 160px
---

## Brand & Style

The design system is rooted in the concept of "Metanoia"—a transformative change of heart and mind. It targets high-end wellness seekers who prioritize emotional depth and architectural beauty. The personality is quiet, grounded, and profoundly restorative.

The visual style is a blend of **Editorial Minimalism** and **Tactile Luxury**. It leverages expansive white space, "breathable" layouts, and organic movement to simulate the physical experience of a luxury retreat. Every interaction is intentional and slow-paced, avoiding the high-frequency patterns of typical digital interfaces. The aesthetic prioritizes architectural storytelling, using large-scale imagery and staggered grids to guide the user through a digital sanctuary.

## Colors

The palette is derived from the natural transition of earth to flora. The base of the design system is the **Off White (#F8F5F1)**, which provides a high-luxury, parchment-like canvas. **Primary Olive (#6E7650)** serves as the main signal color for healing and growth, while **Dark Brown (#4E3B2E)** is used for high-contrast typography to ensure readability without the harshness of pure black.

**Warm Beige** and **Soft Beige** are used for background layering and subtle UI containers to create "zones" within the interface, mimicking the different rooms of a retreat. Accent colors should be used sparingly to maintain a sense of calm.

## Typography

This design system uses a classic serif/sans-serif pairing to evoke trust and modernity. **Libre Caslon Text** is used for headlines, bringing an authoritative, literary, and timeless feel to the brand. Large display sizes should use negative letter spacing to create a more "tightly woven" editorial look.

**Manrope** provides a clean, professional, and highly legible counterpoint for functional text and body copy. It keeps the UI from feeling overly traditional, rooting the experience in modern luxury. Small labels should always use increased letter spacing and uppercase styling to denote "Sanctuary Zones" or categories.

## Layout & Spacing

The layout philosophy follows a **Fluid Editorial Grid**. On desktop, a 12-column grid is used with generous 80px margins to ensure content feels centered and protected. Large immersive imagery often breaks the grid or spans 8-10 columns to create visual pauses.

Spacing is intentionally oversized. Between major content sections, a "Section Gap" of 160px is used to create a meditative pace while scrolling. For mobile, the grid collapses to 4 columns with a 24px margin, but vertical breathing room is preserved to maintain the premium feel. Use asymmetrical placements for images to evoke an organic, non-linear healing journey.

## Elevation & Depth

In this design system, depth is achieved through **Tonal Layers** and **Ambient Shadows** rather than stark elevation. Surfaces use very subtle shifts between `Off White` and `Soft Beige` to denote hierarchy.

Shadows are "whisper-thin"—highly diffused (40px-60px blur), very low opacity (5-8%), and tinted with `Earth Brown` (#7B5E49) instead of black. This creates a soft glow effect, as if UI elements are resting on a fabric surface. Interactive elements like cards should feel like they are "lifting" slightly when hovered, using a slow 400ms transition.

## Shapes

The shape language is inspired by organic curves and architectural arches. The base roundedness is `2` (0.5rem), providing a soft, approachable feel to buttons and inputs. However, larger containers and "feature" images should utilize `rounded-xl` (1.5rem) or custom "arch" masks (top-rounded only) to reference sanctuary architecture. Interactive elements avoid sharp corners to maintain the "healing" brand promise.

## Components

### Buttons
Primary buttons use a "Soft Pill" shape with a `Primary Olive` background and `Off White` text. Secondary buttons are outlined in `Warm Beige` with a subtle hover fill. Avoid heavy drop shadows; use color transitions to indicate state.

### Input Fields
Inputs are minimalist, using only a bottom border in `Warm Beige` that transitions to `Primary Olive` on focus. Labels use the `label-caps` typography style and sit above the field.

### Cards
Cards use the `Soft Beige` background with a `rounded-lg` corner. They do not have borders; instead, they rely on the tonal difference against the `Off White` page background and a very soft ambient shadow.

### Navigation
The navigation should be semi-transparent with a backdrop blur (Glassmorphism), appearing only when the user scrolls up, to keep the focus on the "architectural storytelling" of the content.

### Immersive Imagery
All imagery should have a slight `0.5rem` corner radius or an "arch" top. Images are the primary way the design communicates luxury; they should be high-resolution, featuring natural light, soft textures, and the retreat's physical spaces.