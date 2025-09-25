import '@testing-library/jest-dom';

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '/',
      query: {},
      asPath: '/',
      push: jest.fn(),
      pop: jest.fn(),
      reload: jest.fn(),
      back: jest.fn(),
      prefetch: jest.fn().mockResolvedValue(undefined),
      beforePopState: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
        emit: jest.fn(),
      },
    };
  },
}));

// Mock Next.js Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: props => {
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} />;
  },
}));

// Mock GSAP
const mockGSAP = {
  registerPlugin: jest.fn(),
  context: jest.fn(() => ({
    revert: jest.fn(),
  })),
  timeline: jest.fn(() => ({
    to: jest.fn().mockReturnThis(),
    from: jest.fn().mockReturnThis(),
    fromTo: jest.fn().mockReturnThis(),
    call: jest.fn().mockReturnThis(),
  })),
  to: jest.fn(),
  from: jest.fn(),
  fromTo: jest.fn(),
  set: jest.fn(),
};

jest.mock('gsap', () => mockGSAP);
jest.mock('gsap/dist/gsap', () => mockGSAP);

// Default export for gsap
Object.defineProperty(mockGSAP, 'default', {
  value: mockGSAP,
  enumerable: false,
  writable: true,
});

// Mock @gsap/react
jest.mock('@gsap/react', () => ({
  useGSAP: jest.fn((fn, deps) => {
    if (typeof fn === 'function') {
      fn();
    }
    return {
      contextSafe: jest.fn(fn => fn),
    };
  }),
}));

// Mock ScrollTrigger
jest.mock('gsap/dist/ScrollTrigger', () => ({
  ScrollTrigger: {},
}));

// Mock TextPlugin
jest.mock('gsap/dist/TextPlugin', () => ({
  TextPlugin: {},
}));

// Mock Swiper
jest.mock('swiper/react', () => ({
  Swiper: ({
    children,
    onSwiper,
    onSlideChange,
    spaceBetween,
    slidesPerView,
    modules,
    navigation,
    pagination,
    effect,
    fadeEffect,
    autoplay,
    allowTouchMove,
    className,
    ...props
  }) => {
    // Filter out Swiper-specific props that shouldn't be passed to DOM elements
    const domProps = Object.keys(props).reduce((acc, key) => {
      if (!key.includes('Per') && !key.includes('Effect') && !key.includes('Module')) {
        acc[key] = props[key];
      }
      return acc;
    }, {});

    return (
      <div data-testid="swiper" className={className} {...domProps}>
        {children}
      </div>
    );
  },
  SwiperSlide: ({ children, ...props }) => (
    <div data-testid="swiper-slide" {...props}>
      {children}
    </div>
  ),
}));

// Mock Swiper modules
jest.mock('swiper/modules', () => ({
  Navigation: {},
  Pagination: {},
  EffectFade: {},
  Autoplay: {},
}));

// Mock CSS imports
jest.mock('swiper/css', () => {});
jest.mock('swiper/css/navigation', () => {});
jest.mock('swiper/css/pagination', () => {});
jest.mock('swiper/css/effect-fade', () => {});

// Mock Lottie
jest.mock('lottie-react', () => ({
  __esModule: true,
  default: ({ className, ...props }) => (
    <div data-testid="lottie-animation" className={className} {...props} />
  ),
}));

// Mock Lenis
jest.mock('@studio-freight/lenis', () => ({
  __esModule: true,
  default: jest.fn().mockImplementation(() => ({
    on: jest.fn(),
    off: jest.fn(),
    scrollTo: jest.fn(),
    destroy: jest.fn(),
  })),
}));

// Mock IntersectionObserver
global.IntersectionObserver = jest.fn().mockImplementation(callback => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

// Mock ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(callback => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));
