# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Common Development Commands

### Running the Application

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

### Testing Individual Components

Since this is a single-page application, you can test specific sections by directly navigating the state flow or temporarily modifying the initial state in `src/app/page.tsx`.

## Project Architecture

### State Management Flow

This application uses a centralized state machine pattern in the main `page.tsx`:

- **AppState**: `'hero' | 'tutorial' | 'form' | 'results'` - controls which sections are visible
- **Form Data**: Collected across multi-step form and passed to results
- **Progressive Disclosure**: Each section becomes available only after completing the previous step

The flow is: Hero → Tutorial → Multi-Step Form → Results → (Restart to Hero)

### Animation Architecture

The app heavily relies on GSAP for animations with a consistent pattern:

- **ScrollTrigger Integration**: Most sections use scroll-triggered animations
- **Lenis Smooth Scroll**: Custom hook (`useSmoothScroll`) provides smooth scrolling and programmatic scroll control
- **Component-Level Animation**: Each major section component manages its own GSAP context and cleanup

Key animation components:

- `useSmoothScroll.ts` - Lenis integration with GSAP ScrollTrigger
- Lottie animations via `lottie-react` in `LottieAnimation.tsx`
- Form transitions and validation feedback in `MultiStepForm.tsx`

### Form Validation System

Uses a robust validation stack:

- **React Hook Form** for form state management
- **Zod schemas** for validation rules (`step1Schema`, `step2Schema`)
- **Real-time validation** with error display
- **Multi-step data persistence** - data is preserved when moving between steps

### Component Structure

```
src/
├── app/                     # Next.js App Router
│   ├── page.tsx            # Main state management and section orchestration
│   ├── layout.tsx          # Font loading and global layout
│   └── fonts.ts            # Custom font configurations (PP Agrandir, Graphik, Sohne)
├── components/
│   ├── sections/           # Main page sections (Hero, Tutorial, MultiStepForm, Results)
│   └── ui/                 # Reusable components (Button, Input, Select)
├── hooks/
│   └── useSmoothScroll.ts  # Lenis + GSAP ScrollTrigger integration
└── lib/
    └── utils.ts            # Utilities (cn function, field name formatting)
```

### Design System

- **Typography**: Three custom fonts loaded via `next/font/local`
  - PP Agrandir (headings)
  - Graphik (UI elements)
  - Sohne (body text)
- **Theme**: Dark theme (`#0a0b14`) with purple/blue gradient accents
- **Styling**: Tailwind CSS with CSS custom properties for font families
- **Components**: Custom UI components with variant props and accessibility features

### Third-Party Dependencies

- **GSAP + ScrollTrigger**: Animation library (requires ScrollTrigger registration)
- **Lenis**: Smooth scrolling (integrated with GSAP ticker)
- **Swiper.js**: Tutorial carousel functionality
- **React Hook Form + Zod**: Form handling and validation
- **Lottie React**: Animation playback from provided JSON file

## Development Guidelines

### Working with Animations

- Always use GSAP context (`gsap.context()`) for proper cleanup
- Register ScrollTrigger plugin before using: `gsap.registerPlugin(ScrollTrigger)`
- Use `scrollTrigger: { once: true }` for entrance animations to prevent re-triggering
- Connect Lenis to GSAP via the `useSmoothScroll` hook

### Form Development

- Each form step has its own schema and React Hook Form instance
- Validation schemas are defined with Zod for type safety
- Use the existing multi-step pattern for any new form flows
- Form data persists between steps via component state

### Adding New Sections

- Follow the progressive disclosure pattern in `page.tsx`
- Add new states to the `AppState` type
- Implement section visibility logic in the main component
- Add scroll-to functionality for smooth navigation
- Include GSAP entrance animations with ScrollTrigger

### Styling Conventions

- Use CSS custom properties for font families: `var(--font-pp-agrandir)`
- Follow the dark theme color palette
- Use Tailwind's backdrop-blur and transparency for glassmorphism effects
- Implement responsive design with mobile-first approach

### Accessibility Requirements

This project emphasizes accessibility:

- Include ARIA labels and descriptions
- Ensure keyboard navigation works throughout
- Provide focus indicators and management
- Use semantic HTML structure
- Test with screen readers
- Maintain WCAG compliant color contrast

## File Organization

When adding new components:

- **UI components** → `src/components/ui/`
- **Page sections** → `src/components/sections/`
- **Custom hooks** → `src/hooks/`
- **Utilities** → `src/lib/`
- **Types** → Define inline or in component files (no separate types directory)

The project uses absolute imports with the `@/` alias pointing to the `src/` directory.
