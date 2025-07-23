import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Input from '../Input';

describe('Input', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('border-gray-300');
  });

  it('renders with label', () => {
    render(<Input label="Username" placeholder="Enter username" />);

    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('shows error state', () => {
    render(<Input error="This field is required" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('border-red-300');
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('shows helper text', () => {
    render(<Input helperText="This is helpful information" placeholder="Enter text" />);

    expect(screen.getByText('This is helpful information')).toBeInTheDocument();
  });

  it('prioritizes error over helper text', () => {
    render(
      <Input
        error="This field is required"
        helperText="This is helpful information"
        placeholder="Enter text"
      />
    );

    expect(screen.getByText('This field is required')).toBeInTheDocument();
    expect(screen.queryByText('This is helpful information')).not.toBeInTheDocument();
  });

  it('handles value changes', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Input className="custom-class" placeholder="Enter text" />);

    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toHaveClass('custom-class');
  });

  it('forwards all input props', () => {
    render(
      <Input
        type="email"
        required
        disabled
        placeholder="Enter email"
        data-testid="email-input"
      />
    );

    const input = screen.getByTestId('email-input');
    expect(input).toHaveAttribute('type', 'email');
    expect(input).toHaveAttribute('required');
    expect(input).toBeDisabled();
  });

  it('generates unique id when not provided', () => {
    render(<Input label="Username" placeholder="Enter username" />);

    const label = screen.getByText('Username');
    const input = screen.getByPlaceholderText('Enter username');

    expect(label).toHaveAttribute('for');
    expect(input).toHaveAttribute('id');
    expect(label.getAttribute('for')).toBe(input.getAttribute('id'));
  });

  it('uses provided id', () => {
    render(<Input id="custom-id" label="Username" placeholder="Enter username" />);

    const label = screen.getByText('Username');
    const input = screen.getByPlaceholderText('Enter username');

    expect(label).toHaveAttribute('for', 'custom-id');
    expect(input).toHaveAttribute('id', 'custom-id');
  });
});
