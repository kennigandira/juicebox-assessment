import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Hero } from '../Hero';

// Mock the CSS module
jest.mock('../Hero.module.css', () => ({
  hero: 'hero',
  logoContainer: 'logoContainer',
  backButton: 'backButton',
  refreshButton: 'refreshButton',
  animationWrapper: 'animationWrapper',
  lottieContainer: 'lottieContainer',
  heroAnimationTexts: 'heroAnimationTexts',
  contentContainer: 'contentContainer',
  textContent: 'textContent',
  title: 'title',
  titleGradient: 'titleGradient',
  titleWhite: 'titleWhite',
  tutorialSwiper: 'tutorialSwiper',
  tutorialContent: 'tutorialContent',
  stepIndicators: 'stepIndicators',
  stepDot: 'stepDot',
  stepDotActive: 'stepDotActive',
  stepDotInactive: 'stepDotInactive',
  cta: 'cta',
  ctaOutlined: 'ctaOutlined',
}));

describe('Hero Component', () => {
  const mockOnCtaClick = jest.fn();

  beforeEach(() => {
    mockOnCtaClick.mockClear();
  });

  it('should render the hero section with logo and initial CTA button', () => {
    render(<Hero onCtaClick={mockOnCtaClick} />);

    expect(screen.getByAltText('Juicebox Logo')).toBeInTheDocument();
    expect(screen.getByText('Get a reality check')).toBeInTheDocument();
    expect(screen.getByText('Compare your thoughts on')).toBeInTheDocument();
  });

  it('should render floating animation texts', () => {
    render(<Hero onCtaClick={mockOnCtaClick} />);

    expect(
      screen.getByText('WA businesses feel confident about future growth')
    ).toBeInTheDocument();
    expect(screen.getByText("AI can't replace real creativity")).toBeInTheDocument();
    expect(screen.getByText('Sales measure true process')).toBeInTheDocument();
    expect(screen.getByText('Human connection drives WA business')).toBeInTheDocument();
    expect(
      screen.getByText('The primary barrier to digital transformation is financial investment')
    ).toBeInTheDocument();
  });

  it('should enter tutorial mode when CTA button is clicked', async () => {
    const user = userEvent.setup();
    render(<Hero onCtaClick={mockOnCtaClick} />);

    const ctaButton = screen.getByText('Get a reality check');
    await user.click(ctaButton);

    await waitFor(() => {
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });
  });

  it('should show step indicators in tutorial mode', async () => {
    const user = userEvent.setup();
    render(<Hero onCtaClick={mockOnCtaClick} />);

    const ctaButton = screen.getByText('Get a reality check');
    await user.click(ctaButton);

    await waitFor(() => {
      const stepIndicators = screen.getByRole('region', { hidden: true });
      expect(stepIndicators).toBeInTheDocument();
    });
  });

  it('should show back button in tutorial mode', async () => {
    const user = userEvent.setup();
    render(<Hero onCtaClick={mockOnCtaClick} />);

    const ctaButton = screen.getByText('Get a reality check');
    await user.click(ctaButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    });
  });

  it('should navigate through tutorial steps', async () => {
    const user = userEvent.setup();
    render(<Hero onCtaClick={mockOnCtaClick} />);

    const ctaButton = screen.getByText('Get a reality check');
    await user.click(ctaButton);

    // Should be on step 1
    await waitFor(() => {
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    // Click continue to go to next step
    const continueButton = screen.getByText('Continue');
    await user.click(continueButton);

    // Should still be in tutorial mode but possibly on different step
    await waitFor(() => {
      expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    });
  });

  it('should call onCtaClick when completing tutorial', async () => {
    const user = userEvent.setup();
    render(<Hero onCtaClick={mockOnCtaClick} />);

    const ctaButton = screen.getByText('Get a reality check');
    await user.click(ctaButton);

    // Navigate through all tutorial steps
    await waitFor(() => {
      expect(screen.getByText('Continue')).toBeInTheDocument();
    });

    // Click through all steps until we reach "Get Started"
    let currentButton = screen.getByText('Continue');
    await user.click(currentButton);

    await waitFor(() => {
      currentButton = screen.getByText('Continue');
    });
    await user.click(currentButton);

    // On last step, should show "Get Started"
    await waitFor(() => {
      const getStartedButton = screen.getByText('Get Started');
      expect(getStartedButton).toBeInTheDocument();
    });

    // Click "Get Started" should trigger onCtaClick
    const getStartedButton = screen.getByText('Get Started');
    await user.click(getStartedButton);

    expect(mockOnCtaClick).toHaveBeenCalledTimes(1);
  });

  it('should go back to normal mode when back button is clicked from first step', async () => {
    const user = userEvent.setup();
    render(<Hero onCtaClick={mockOnCtaClick} />);

    // Enter tutorial mode
    const ctaButton = screen.getByText('Get a reality check');
    await user.click(ctaButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    });

    // Click back button
    const backButton = screen.getByLabelText('Go back');
    await user.click(backButton);

    // Should return to initial state
    await waitFor(() => {
      expect(screen.getByText('Get a reality check')).toBeInTheDocument();
    });
  });

  it('should render Lottie animation component', () => {
    render(<Hero onCtaClick={mockOnCtaClick} />);

    expect(screen.getByTestId('lottie-animation')).toBeInTheDocument();
  });

  it('should have proper accessibility attributes', () => {
    render(<Hero onCtaClick={mockOnCtaClick} />);

    // Back button should have aria-label when it appears
    const refreshButton = screen.getByRole('button', { name: /refresh/i, hidden: true });
    expect(refreshButton).toBeInTheDocument();
  });
});
