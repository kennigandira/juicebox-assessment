# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development & Build

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

## Architecture Overview

### State Management Pattern

The app uses a centralized state machine in `src/app/page.tsx`:

- **AppState**: `'hero' | 'tutorial' | 'form' | 'results'` controls section visibility
- **Progressive disclosure**: Each section appears only after completing the previous step
- **Form data persistence**: Multi-step form data is preserved across navigation
- **Flow**: Hero → Tutorial → Multi-Step Form → Results → (Restart to Hero)

### Animation System Architecture

The app heavily relies on GSAP with specific patterns:

- **ScrollTrigger Integration**: Most sections use scroll-triggered animations
- **Lenis Smooth Scrolling**: Custom `useSmoothScroll` hook integrates Lenis with GSAP ticker
- **Component-level contexts**: Each section manages its own GSAP context for proper cleanup
- **Registration requirement**: Always register ScrollTrigger: `gsap.registerPlugin(ScrollTrigger)`

Key animation files:

- `src/hooks/useSmoothScroll.ts` - Lenis + GSAP ScrollTrigger integration
- `src/components/animations/LottieAnimation.tsx` - Lottie wrapper component

### Form Validation System

Multi-step form with robust validation:

- **React Hook Form** for state management
- **Zod schemas** for validation (`step1Schema`, `step2Schema`)
- **Real-time validation** with error display
- **Data persistence** between steps via component state in `MultiStepForm.tsx`

## Component Structure & Patterns

### Directory Organization

```
src/
├── app/
│   ├── page.tsx              # Main state orchestration
│   ├── layout.tsx            # Font loading and global layout
│   └── fonts.ts              # Custom font configurations
├── components/
│   ├── sections/             # Main page sections (Hero, Tutorial, MultiStepForm, Results)
│   ├── ui/                   # Reusable components (Button, Input, Select)
│   └── animations/           # Animation components
├── hooks/
│   └── useSmoothScroll.ts    # Lenis + GSAP integration
└── lib/
    └── utils.ts              # Utilities (cn function, etc.)
```

### Typography System

Three custom fonts loaded via `next/font/local`:

- **PP Agrandir**: Headings (`var(--font-pp-agrandir)`)
- **Graphik**: UI elements (`var(--font-graphik)`)
- **Sohne**: Body text (`var(--font-sohne)`)

### Design System

- **Theme**: Dark base (`#0a0b14`) with purple/blue gradient accents
- **Styling**: Tailwind CSS with CSS custom properties for fonts
- **Components**: Variant-based props with built-in accessibility features

## Development Guidelines

### Working with Animations

- Always use GSAP context for cleanup: `gsap.context(() => { ... }, ref)`
- Register ScrollTrigger before use: `gsap.registerPlugin(ScrollTrigger)`
- Use `scrollTrigger: { once: true }` for entrance animations
- Connect Lenis to GSAP via `useSmoothScroll` hook

### Form Development

- Each step has its own Zod schema and React Hook Form instance
- Use existing multi-step pattern for new form flows
- Form data persists between steps via parent component state
- Implement real-time validation with error display

### Adding New Sections

- Follow progressive disclosure pattern in `page.tsx`
- Add new states to `AppState` type
- Implement visibility logic based on current state
- Include scroll-to functionality using `scrollTo` from `useSmoothScroll`
- Add GSAP entrance animations with ScrollTrigger

### Accessibility Requirements

This project emphasizes accessibility:

- Include ARIA labels and descriptions for all interactive elements
- Ensure keyboard navigation works throughout the app
- Provide focus indicators and proper focus management
- Use semantic HTML structure with proper heading hierarchy
- Test with screen readers (VoiceOver, NVDA, JAWS)
- Maintain WCAG compliant color contrast ratios

## Third-Party Dependencies

### Core Libraries

- **GSAP + ScrollTrigger**: Animation engine (requires registration)
- **Lenis**: Smooth scrolling (integrated with GSAP ticker)
- **Swiper.js**: Tutorial carousel functionality
- **React Hook Form + Zod**: Form handling and validation
- **Lottie React**: Animation playback from JSON files

### Important Notes

- Turbopack is enabled for both dev and build commands
- Custom fonts are located in `public/fonts/figmafonts/`
- Lottie animation file: `public/animations/JB2G_Lottie.json`
