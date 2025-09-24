import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tutorial } from '../Tutorial';

// Mock the CSS module
jest.mock('../Tutorial.module.css', () => ({
  tutorial: 'tutorial',
  container: 'container',
  title: 'title',
  swiperContainer: 'swiperContainer',
  slide: 'slide',
  slideIcon: 'slideIcon',
  slideTitle: 'slideTitle',
  slideDescription: 'slideDescription',
  navButton: 'navButton',
  navButtonPrev: 'navButtonPrev',
  navButtonNext: 'navButtonNext',
  navIcon: 'navIcon',
  progressContainer: 'progressContainer',
  progressText: 'progressText',
  progressDots: 'progressDots',
  progressDot: 'progressDot',
  progressDotActive: 'progressDotActive',
  progressDotInactive: 'progressDotInactive',
  buttonContainer: 'buttonContainer',
  buttonContainerVisible: 'buttonContainerVisible',
  buttonContainerHidden: 'buttonContainerHidden',
  getStartedButton: 'getStartedButton',
}));

describe('Tutorial Component', () => {
  const mockOnGetStarted = jest.fn();

  beforeEach(() => {
    mockOnGetStarted.mockClear();
  });

  it('should render the tutorial section with title', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    expect(screen.getByText('Discover Our Features')).toBeInTheDocument();
    expect(screen.getByRole('region')).toHaveAttribute('id', 'tutorial');
  });

  it('should render all tutorial slides', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    expect(screen.getByText('Interactive Animations')).toBeInTheDocument();
    expect(screen.getByText('Intuitive Forms')).toBeInTheDocument();
    expect(screen.getByText('Smooth Scrolling')).toBeInTheDocument();
    expect(screen.getByText('Modern Technology')).toBeInTheDocument();
  });

  it('should render slide descriptions', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    expect(
      screen.getByText(/Experience smooth, engaging animations powered by GSAP and Lottie/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Multi-step forms with real-time validation/)).toBeInTheDocument();
    expect(
      screen.getByText(/Enhanced user experience with Lenis smooth scrolling/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Built with Next.js, TypeScript, and modern web technologies/)
    ).toBeInTheDocument();
  });

  it('should render Swiper component', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.getAllByTestId('swiper-slide')).toHaveLength(4);
  });

  it('should render navigation buttons with proper accessibility', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    expect(screen.getByLabelText('Previous slide')).toBeInTheDocument();
    expect(screen.getByLabelText('Next slide')).toBeInTheDocument();
  });

  it('should render progress indicators', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    expect(screen.getByText('1 of 4')).toBeInTheDocument();

    // Should have 4 progress dots
    const progressDots = screen.getAllByLabelText(/Go to slide \d/);
    expect(progressDots).toHaveLength(4);
  });

  it('should render progress dots with correct labels', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    expect(screen.getByLabelText('Go to slide 1')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 2')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 3')).toBeInTheDocument();
    expect(screen.getByLabelText('Go to slide 4')).toBeInTheDocument();
  });

  it('should initially hide the Get Started button', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    // The button container should be hidden initially
    const buttonContainer = screen.getByText('Get Started').closest('div');
    expect(buttonContainer).toHaveClass('buttonContainerHidden');
  });

  it('should call onGetStarted when Get Started button is clicked', async () => {
    const user = userEvent.setup();
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    const getStartedButton = screen.getByText('Get Started');
    await user.click(getStartedButton);

    expect(mockOnGetStarted).toHaveBeenCalledTimes(1);
  });

  it('should have proper section structure', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    const section = screen.getByRole('region');
    expect(section).toHaveClass('tutorial');
    expect(section).toHaveAttribute('id', 'tutorial');

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Discover Our Features');
  });

  it('should render slide icons', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    const slides = screen.getAllByTestId('swiper-slide');
    slides.forEach(slide => {
      const svg = slide.querySelector('svg');
      expect(svg).toBeInTheDocument();
    });
  });

  it('should have navigation buttons for swiper', () => {
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    const prevButton = screen.getByLabelText('Previous slide');
    const nextButton = screen.getByLabelText('Next slide');

    expect(prevButton).toHaveClass('swiper-button-prev-custom');
    expect(nextButton).toHaveClass('swiper-button-next-custom');
  });

  it('should allow clicking on progress dots', async () => {
    const user = userEvent.setup();
    render(<Tutorial onGetStarted={mockOnGetStarted} />);

    const secondDot = screen.getByLabelText('Go to slide 2');
    await user.click(secondDot);

    // Since we're mocking Swiper, we can't test the actual slide change
    // but we can verify the button exists and is clickable
    expect(secondDot).toBeInTheDocument();
  });
});
