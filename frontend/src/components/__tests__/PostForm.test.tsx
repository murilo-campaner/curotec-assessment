import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PostForm from '../PostForm';
import type { Post } from '../../types/post';

// Wrapper para QueryClient
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('PostForm Integration Tests', () => {
  const mockOnSubmit = vi.fn();
  const mockOnCancel = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render create form with all required elements', () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    // Verificar elementos básicos
    expect(screen.getByText('Title *')).toBeInTheDocument();
    expect(screen.getByText('Content *')).toBeInTheDocument();
    expect(screen.getByText('Publish immediately')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /cancel/i })).toBeInTheDocument();

    // Verificar inputs
    expect(screen.getByLabelText('Title *')).toBeInTheDocument();
    expect(screen.getByLabelText('Content *')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('should render edit form with pre-filled data', () => {
    const mockPost: Post = {
      id: 1 as any,
      title: 'Test Post',
      content: 'Test content',
      published: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    render(
      <PostForm
        post={mockPost}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    // Verificar dados preenchidos
    expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test content')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
  });

  it('should handle form submission for create with all fields', async () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const titleInput = screen.getByLabelText('Title *');
    const contentInput = screen.getByLabelText('Content *');
    const publishCheckbox = screen.getByRole('checkbox');
    const submitButton = screen.getByRole('button', { name: /create/i });

    // Preencher formulário
    fireEvent.change(titleInput, { target: { value: 'New Post' } });
    fireEvent.change(contentInput, { target: { value: 'New content' } });
    fireEvent.click(publishCheckbox);

    // Submeter formulário
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'New Post',
        content: 'New content',
        published: true,
      });
    });
  });

  it('should handle form submission for edit with partial updates', async () => {
    const mockPost: Post = {
      id: 1 as any,
      title: 'Original Post',
      content: 'Original content',
      published: false,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    render(
      <PostForm
        post={mockPost}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const titleInput = screen.getByLabelText('Title *');
    const submitButton = screen.getByRole('button', { name: /update/i });

    // Atualizar apenas o título
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith({
        title: 'Updated Title',
        content: 'Original content',
        published: false,
      });
    });
  });

  it('should handle cancel button click', () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);

    expect(mockOnCancel).toHaveBeenCalledTimes(1);
  });

  it('should disable submit button when form is invalid - empty fields', () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const submitButton = screen.getByRole('button', { name: /create/i });
    expect(submitButton).toBeDisabled();
  });

  it('should disable submit button when form is invalid - only title', () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const titleInput = screen.getByLabelText('Title *');
    const submitButton = screen.getByRole('button', { name: /create/i });

    fireEvent.change(titleInput, { target: { value: 'Only Title' } });
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when form is valid', () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const titleInput = screen.getByLabelText('Title *');
    const contentInput = screen.getByLabelText('Content *');
    const submitButton = screen.getByRole('button', { name: /create/i });

    fireEvent.change(titleInput, { target: { value: 'Valid Title' } });
    fireEvent.change(contentInput, { target: { value: 'Valid content' } });

    expect(submitButton).not.toBeDisabled();
  });

  it('should disable submit button and show loading state', () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={true}
      />,
      { wrapper: createWrapper() }
    );

    const submitButton = screen.getByRole('button', { name: /saving/i });
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Saving...');
  });

  it('should handle checkbox toggle correctly', () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const publishCheckbox = screen.getByRole('checkbox');

    // Inicialmente desmarcado
    expect(publishCheckbox).not.toBeChecked();

    // Marcar checkbox
    fireEvent.click(publishCheckbox);
    expect(publishCheckbox).toBeChecked();

    // Desmarcar checkbox
    fireEvent.click(publishCheckbox);
    expect(publishCheckbox).not.toBeChecked();
  });

  it('should not call onSubmit when form is invalid', async () => {
    render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    const submitButton = screen.getByRole('button', { name: /create/i });

    // Tentar submeter formulário vazio
    fireEvent.click(submitButton);

    // Aguardar um pouco para garantir que não foi chamado
    await new Promise(resolve => setTimeout(resolve, 100));

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });

  it('should handle form reset when switching between create and edit modes', () => {
    const mockPost: Post = {
      id: 1 as any,
      title: 'Test Post',
      content: 'Test content',
      published: true,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };

    const { rerender } = render(
      <PostForm
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />,
      { wrapper: createWrapper() }
    );

    // Verificar modo create
    expect(screen.getByRole('button', { name: /create/i })).toBeInTheDocument();
    expect(screen.getByLabelText('Title *')).toHaveValue('');

    // Mudar para modo edit
    rerender(
      <PostForm
        post={mockPost}
        onSubmit={mockOnSubmit}
        onCancel={mockOnCancel}
        isLoading={false}
      />
    );

    // Verificar modo edit
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(screen.getByDisplayValue('Test Post')).toBeInTheDocument();
  });
});
