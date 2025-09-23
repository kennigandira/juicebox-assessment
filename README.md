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
- **Real-time Validation**: Powered by react-hook-form and Zod
- **Accessibility First**: ARIA labels, keyboard navigation, and screen reader support
- **Progress Tracking**: Visual progress indicator and step completion status

### 🎉 Results Page

- **User Summary**: Complete overview of submitted information
- **Success Animations**: Celebratory interactions and visual feedback
- **Reset Functionality**: Option to restart the entire flow

### ⚡ Enhanced User Experience

- **Dark Theme Design**: Professional dark interface with purple/blue gradient accents
- **Lenis Smooth Scrolling**: Buttery smooth scrolling throughout the application
- **Custom Fonts**: PP Agrandir, Graphik, and Sohne fonts from the provided font package
- **CSS Variables**: Consistent dark theming and easy customization
- **TypeScript**: Full type safety and enhanced developer experience

## 🛠 Technical Stack

- **Framework**: Next.js 15+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with CSS Variables
- **Animations**: GSAP + ScrollTrigger, Lottie-react
- **Carousel**: Swiper.js
- **Smooth Scrolling**: Lenis
- **Form Handling**: React Hook Form + Zod validation
- **Build Tool**: Turbopack (Next.js)

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
│   ├── layout.tsx               # Root layout with font loading
│   ├── page.tsx                 # Main application page
│   ├── globals.css              # Global styles and CSS variables
│   └── fonts.ts                 # Custom font configurations
├── components/
│   ├── ui/                      # Reusable UI components
│   │   ├── Button.tsx           # Accessible button component
│   │   ├── Input.tsx            # Form input with validation
│   │   ├── Select.tsx           # Dropdown select component
│   │   └── index.ts             # Component exports
│   ├── sections/                # Page sections
│   │   ├── Hero.tsx             # Homepage hero section
│   │   ├── Tutorial.tsx         # Swiper tutorial carousel
│   │   ├── MultiStepForm.tsx    # Multi-step form component
│   │   └── Results.tsx          # Results and summary page
│   └── animations/
│       └── LottieAnimation.tsx  # Lottie animation wrapper
├── hooks/
│   └── useSmoothScroll.ts       # Lenis smooth scrolling hook
├── lib/
│   └── utils.ts                 # Utility functions
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
npm run dev
```

### Production Build

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Linting

```bash
npm run lint
```

### Type Checking

```bash
npx tsc --noEmit
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

1. **Homepage**: Verify Lottie animation loads and GSAP animations trigger
2. **Tutorial**: Navigate through all slides and click "Get Started"
3. **Form**: Fill out both steps with validation testing
4. **Results**: Confirm data display and restart functionality
5. **Smooth Scrolling**: Test navigation between sections

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
