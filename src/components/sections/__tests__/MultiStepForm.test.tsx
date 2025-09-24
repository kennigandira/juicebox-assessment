import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MultiStepForm } from '../MultiStepForm';

// Mock UI components
jest.mock('@/components/ui/Button', () => ({
  Button: ({ children, onClick, disabled, loading, type, ...props }) => (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      type={type}
      data-loading={loading}
      {...props}
    >
      {loading ? 'Loading...' : children}
    </button>
  ),
}));

jest.mock('@/components/ui/Input', () => ({
  Input: ({ label, error, ...props }) => (
    <div>
      {label && <label htmlFor={props.id}>{label}</label>}
      <input {...props} />
      {error && <span role="alert">{error}</span>}
    </div>
  ),
}));

describe('MultiStepForm Component', () => {
  const mockOnComplete = jest.fn();

  beforeEach(() => {
    mockOnComplete.mockClear();
  });

  it('should render the form section with initial step', () => {
    render(<MultiStepForm onComplete={mockOnComplete} />);

    expect(screen.getByText('Get Started')).toBeInTheDocument();
    expect(
      screen.getByText('Just a few quick details to personalize your experience')
    ).toBeInTheDocument();
    expect(screen.getByText('Step 1 of 2')).toBeInTheDocument();
  });

  it('should render the progress bar', () => {
    render(<MultiStepForm onComplete={mockOnComplete} />);

    expect(screen.getByText('Step 1 of 2')).toBeInTheDocument();
    expect(screen.getByText('50% Complete')).toBeInTheDocument();
  });

  it('should render the first step form fields', () => {
    render(<MultiStepForm onComplete={mockOnComplete} />);

    expect(screen.getByText('Personal Information')).toBeInTheDocument();
    expect(screen.getByText("Let's start with your name")).toBeInTheDocument();
    expect(screen.getByLabelText('First Name')).toBeInTheDocument();
    expect(screen.getByText('Next Step')).toBeInTheDocument();
  });

  it('should show validation error for empty first name', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  it('should show validation error for short first name', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'A');

    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('First name must be at least 2 characters')).toBeInTheDocument();
    });
  });

  it('should proceed to step 2 with valid first name', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');

    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Contact Details')).toBeInTheDocument();
      expect(screen.getByText('How can we reach you?')).toBeInTheDocument();
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });
  });

  it('should show step 2 progress', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');

    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Step 2 of 2')).toBeInTheDocument();
      expect(screen.getByText('100% Complete')).toBeInTheDocument();
    });
  });

  it('should show previous button on step 2', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');

    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeInTheDocument();
    });
  });

  it('should go back to step 1 when previous button is clicked', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    // Go to step 2
    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');
    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeInTheDocument();
    });

    // Go back to step 1
    const prevButton = screen.getByText('Previous');
    await user.click(prevButton);

    await waitFor(() => {
      expect(screen.getByText('Personal Information')).toBeInTheDocument();
      expect(screen.getByText('Step 1 of 2')).toBeInTheDocument();
    });
  });

  it('should show email validation error', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    // Go to step 2
    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');
    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });

    // Enter invalid email
    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'invalid-email');

    const completeButton = screen.getByText('Complete');
    await user.click(completeButton);

    await waitFor(() => {
      expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument();
    });
  });

  it('should submit form with valid data', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    // Step 1
    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');
    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
    });

    // Step 2
    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'john@example.com');

    const completeButton = screen.getByText('Complete');
    await user.click(completeButton);

    await waitFor(() => {
      expect(screen.getByText('Submitting...')).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalledWith({
        firstName: 'John',
        email: 'john@example.com',
      });
    });
  });

  it('should show form summary', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    // Step 1
    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');
    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    await waitFor(() => {
      expect(screen.getByText('John')).toBeInTheDocument();
    });

    // Step 2
    const emailInput = screen.getByLabelText('Email Address');
    await user.type(emailInput, 'john@example.com');

    await waitFor(() => {
      expect(screen.getByText('john@example.com')).toBeInTheDocument();
    });
  });

  it('should have proper section structure', () => {
    render(<MultiStepForm onComplete={mockOnComplete} />);

    const section = screen.getByRole('region');
    expect(section).toHaveAttribute('id', 'form');

    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toHaveTextContent('Get Started');
  });

  it('should render help text', () => {
    render(<MultiStepForm onComplete={mockOnComplete} />);

    expect(screen.getByText(/Need help\? Contact our support team at/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'support@juicebox.com' })).toBeInTheDocument();
  });

  it('should persist data when navigating between steps', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm onComplete={mockOnComplete} />);

    // Step 1
    const firstNameInput = screen.getByLabelText('First Name');
    await user.type(firstNameInput, 'John');
    const nextButton = screen.getByText('Next Step');
    await user.click(nextButton);

    // Step 2
    await waitFor(() => {
      expect(screen.getByText('Previous')).toBeInTheDocument();
    });

    // Go back to step 1
    const prevButton = screen.getByText('Previous');
    await user.click(prevButton);

    await waitFor(() => {
      const firstNameInputAgain = screen.getByLabelText('First Name');
      expect(firstNameInputAgain).toHaveValue('John');
    });
  });
});
