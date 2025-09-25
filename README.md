# Juicebox Frontend Assessment

A modern, interactive web application built with Next.js, featuring smooth animations, intuitive forms, and seamless user experiences.

## 🚀 Features

### ✨ Interactive Homepage

- **Lottie Animations**: Engaging animations powered by the provided JB2G_Lottie.json file
- **Color Customization**: CSS filter-based color theming (purple, blue, gradient themes)
- **Juicebox Branding**: Dark theme with gradient backgrounds matching the brand identity
- **Business Messaging**: Real industry insights about WA businesses and technology
- **GSAP Integration**: Smooth scroll-triggered animations and interactions
- **Responsive Design**: Optimized for all screen sizes and devices

### 📖 Tutorial Walkthrough

- **Swiper.js Carousel**: Interactive tutorial screens with smooth transitions
- **Progressive Navigation**: Step-by-step feature introduction
- **Animated Transitions**: GSAP-powered entrance and exit animations

### 📝 Multi-Step Form

- **Two-Step Process**: First Name → Email Address
- **Real-time Validation**: Powered by react-hook-form
- **Accessibility First**: ARIA labels, keyboard navigation, and screen reader support
- **Progress Tracking**: Visual progress indicator and step completion status
- **Data Persistence**: Form data preserved in localStorage across navigation

### ⚡ Enhanced User Experience

- **Single-Page Architecture**: Smooth section transitions without page reloads
- **URL State Sync**: Browser navigation and deep linking support
- **Dark Theme Design**: Professional dark interface with purple/blue gradient accents
- **Lenis Smooth Scrolling**: Buttery smooth scrolling throughout the application
- **Custom Fonts**: PP Agrandir, Graphik, and Sohne fonts from the provided font package
- **CSS Variables**: Consistent dark theming and easy customization
- **TypeScript**: Full type safety and enhanced developer experience

## 🛠 Technical Stack

- **Framework**: Next.js 15.5.3 with App Router and Turbopack
- **Language**: TypeScript 5+
- **Runtime**: React 19.1.0
- **Styling**: Tailwind CSS with CSS Variables and Modules
- **Animations**: GSAP + ScrollTrigger, Lottie-react
- **Carousel**: Swiper.js 12+
- **Smooth Scrolling**: Lenis (dual implementation)
- **State Management**: nuqs for URL state synchronization
- **Form Handling**: React Hook Form
- **Build Tool**: Turbopack (Next.js native)

## ⚡ State Management Architecture

### URL State Synchronization with nuqs

The application uses **nuqs** for client-side URL state management, enabling:

- **Page Navigation**: Smooth transitions between sections (Hero → Walkthrough → Form)
- **Tutorial Steps**: URL-synced walkthrough carousel navigation
- **Form Steps**: Multi-step form progress tracking
- **Deep Linking**: Direct access to specific sections via URL parameters

### State Structure

```typescript
// Page States
enum PageState {
  Hero = 'hero',
  Walkthrough = 'walkthrough',
  Form = 'form',
}

// Query Parameters
enum QueryState {
  PageState = 'pageState',
  WalkthroughStep = 'walkthroughStep',
  FormStep = 'formStep',
}
```

### Suspense Boundaries

Due to nuqs using `useSearchParams()` internally, components are wrapped in Suspense boundaries:

- **SmoothScrollProvider**: Isolated Suspense wrapper for scroll behavior
- **Main Content**: Suspense boundary around all page sections
- **SSR Compatibility**: Proper server-side rendering support

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd juicebox-assessment
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗 Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with NuqsAdapter and font loading
│   ├── page.tsx                 # Main application page with Suspense boundaries
│   ├── globals.css              # Global styles and CSS variables
│   └── fonts.ts                 # Custom font configurations
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx           # Accessible button component
│   │   ├── Input.tsx            # Form input component
│   │   └── index.ts             # Component exports
│   ├── layout/                  # Layout components
│   │   ├── Header.tsx           # Site header with navigation
│   │   └── Footer.tsx           # Site footer with form handling
│   ├── icons/                   # Icon components and management
│   │   ├── Icon.tsx             # Main icon component
│   │   ├── types.ts             # Icon type definitions
│   │   └── icons/               # Individual icon components
│   └── providers/
│       └── SmoothScrollProvider.tsx  # Suspense wrapper for smooth scrolling
├── modules/                     # Feature-based modules
│   ├── hero/
│   │   ├── components/
│   │   │   ├── HeroAnimation.tsx    # Lottie animation with GSAP
│   │   │   ├── HeroContent.tsx      # Hero text content
│   │   │   └── HeroSection.tsx      # Main hero section
│   │   ├── styles/
│   │   └── index.ts
│   ├── walkthrough/
│   │   ├── components/
│   │   │   └── WalkthroughSection.tsx # Swiper tutorial carousel
│   │   ├── hooks/
│   │   │   └── useStepNavigation.ts   # Step navigation logic
│   │   ├── styles/
│   │   └── index.ts
│   └── form/
│       ├── components/
│       │   └── FormSection.tsx      # Form implementation
│       ├── styles/
│       └── index.ts
├── shared/                      # Shared utilities and components
│   └── animations/
│       └── components/
│           └── LottieWithGradientMask.tsx
├── global/                      # Global configurations
│   └── enums/
│       ├── pageState.ts         # Page state enumeration
│       └── queryState.ts        # URL query state keys
├── hooks/
│   └── useSmoothScroll.ts       # Lenis + GSAP + nuqs integration
└── public/
    ├── animations/
    │   └── JB2G_Lottie.json     # Provided Lottie animation
    └── fonts/                   # Custom fonts from provided package
        └── figmafonts/
```

## 🎨 Design System

### Typography

- **Primary**: PP Agrandir (Headings)
- **Secondary**: Graphik (UI Elements)
- **Body**: Sohne (Body text)

### Colors

- **Primary**: Dark theme (#0a0b14) with purple/blue gradients
- **Accents**: Purple (#a855f7) and blue (#3b82f6) gradients
- **Text**: White with opacity variations for hierarchy
- **Interactive**: Purple gradient buttons with hover effects

### Spacing

- CSS variables for consistent spacing
- Mobile-first responsive design
- Grid and flexbox layouts

## ♿ Accessibility Features

- **Keyboard Navigation**: Full keyboard support throughout
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Visible focus indicators
- **Form Accessibility**: Error announcements and validation
- **Color Contrast**: WCAG compliant color ratios
- **Semantic HTML**: Proper heading hierarchy and landmarks

## 🚀 Build & Deployment

### Development

```bash
npm run dev          # Start development server with Turbopack
```

### Production Build

```bash
npm run build        # Build for production with Turbopack
```

### Start Production Server

```bash
npm start           # Start production server
```

### Code Quality

```bash
npm run lint        # Run ESLint
npm run lint:fix    # Fix ESLint issues automatically
npm run format      # Format code with Prettier
npm run type-check  # TypeScript type checking
```

### Testing

```bash
npm test            # Run Jest tests
npm run test:watch  # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

## 🌐 Deployment Options

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Deploy automatically on commits
3. Environment variables are handled automatically

### Netlify

1. Build command: `npm run build`
2. Publish directory: `out` (if using static export)
3. Node version: 18+

### Other Platforms

The application can be deployed to any platform that supports Node.js applications.

## 📱 Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile**: iOS Safari 14+, Chrome Mobile 90+
- **Features**: ES6+, CSS Grid, Flexbox, CSS Variables

## 🧪 Testing the Application

### User Flow Testing

1. **Hero Section**: Verify Lottie animation loads and GSAP animations trigger
2. **Walkthrough Tutorial**: Navigate through all slides using indicators or navigation
3. **Multi-Step Form**: Fill out both steps (First Name → Email) with validation testing
4. **URL Navigation**: Test direct navigation to sections via URL parameters
5. **Smooth Scrolling**: Test scroll behavior and section transitions
6. **Data Persistence**: Verify form data is preserved in localStorage

### Accessibility Testing

- Use screen reader (VoiceOver, NVDA, JAWS)
- Test keyboard-only navigation
- Verify focus management
- Check color contrast

## 🐛 Known Issues & Solutions

### Font Loading

- Custom fonts are preloaded for optimal performance
- Fallback fonts ensure content remains readable

### Animation Performance

- GSAP animations are optimized for 60fps
- Lottie animations use hardware acceleration when available

## 📄 License

This project was created as part of the Juicebox Frontend Developer Assessment.

## 📞 Support

For questions or issues regarding this assessment:

- Email: support@juicebox.com
- Review the assessment requirements document

---

**Built with ❤️ for the Juicebox Frontend Assessment**
