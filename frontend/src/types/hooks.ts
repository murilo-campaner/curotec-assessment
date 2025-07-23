import type { Post, CreatePostData, UpdatePostData, PostFilters, PostSort, PostPagination } from './post';
import type { LoadingState, ModalState, Toast } from './base';

// Tipos para usePosts hook
export interface UsePostsReturn {
  posts: Post[];
  loading: boolean;
  error: Error | null;
  filters: PostFilters;
  sort: PostSort;
  pagination: PostPagination;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  setFilters: (filters: PostFilters) => void;
  setSort: (sort: PostSort) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  refetch: () => void;
}

// Tipos para usePostMutations hook
export interface UsePostMutationsReturn {
  createPost: {
    mutate: (data: CreatePostData) => void;
    isLoading: boolean;
    error: Error | null;
    isSuccess: boolean;
  };
  updatePost: {
    mutate: (data: { id: number; data: UpdatePostData }) => void;
    isLoading: boolean;
    error: Error | null;
    isSuccess: boolean;
  };
  deletePost: {
    mutate: (id: number) => void;
    isLoading: boolean;
    error: Error | null;
    isSuccess: boolean;
  };
}

// Tipos para usePostModal hook
export interface UsePostModalReturn {
  modalState: ModalState;
  openCreateModal: () => void;
  openEditModal: (post: Post) => void;
  openDeleteModal: (post: Post) => void;
  closeModal: () => void;
}

// Tipos para useToast hook
export interface UseToastReturn {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

// Tipos para useForm hook (genérico)
export interface UseFormReturn<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
  setFieldValue: (field: keyof T, value: T[keyof T]) => void;
  setFieldError: (field: keyof T, error: string) => void;
  setFieldTouched: (field: keyof T, touched: boolean) => void;
  validateField: (field: keyof T) => void;
  validateForm: () => boolean;
  resetForm: () => void;
  handleSubmit: (onSubmit: (data: T) => void) => (e: React.FormEvent) => void;
}

// Tipos para useLocalStorage hook
export interface UseLocalStorageReturn<T> {
  value: T;
  setValue: (value: T) => void;
  removeValue: () => void;
}

// Tipos para useDebounce hook
export interface UseDebounceReturn<T> {
  debouncedValue: T;
  isDebouncing: boolean;
}

// Tipos para useIntersectionObserver hook
export interface UseIntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  root?: Element | null;
}

export interface UseIntersectionObserverReturn {
  ref: React.RefCallback<Element>;
  isIntersecting: boolean;
  entry?: IntersectionObserverEntry;
}

// Tipos para useClickOutside hook
export interface UseClickOutsideReturn {
  ref: React.RefCallback<Element>;
}

// Tipos para useKeyPress hook
export interface UseKeyPressOptions {
  targetKey: string;
  onKeyDown?: () => void;
  onKeyUp?: () => void;
}

export interface UseKeyPressReturn {
  isPressed: boolean;
}

// Tipos para usePrevious hook
export interface UsePreviousReturn<T> {
  previousValue: T | undefined;
}

// Tipos para useAsync hook
export interface UseAsyncOptions<T> {
  asyncFn: () => Promise<T>;
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

export interface UseAsyncReturn<T> {
  data: T | null;
  loading: LoadingState;
  error: Error | null;
  execute: () => Promise<T>;
  reset: () => void;
}
