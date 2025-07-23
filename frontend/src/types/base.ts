// Branded types para IDs
export type PostId = number & { readonly brand: unique symbol };
export type UserId = number & { readonly brand: unique symbol };

// Tipos de status
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// Tipos de ordenação
export type SortField = 'createdAt' | 'updatedAt' | 'title';
export type SortOrder = 'asc' | 'desc';

// Tipos de filtro
export type FilterOption = 'all' | 'published' | 'draft';

// Tipos de resposta da API
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: ApiError;
}

export interface ApiError {
  message: string;
  statusCode: number;
  timestamp: string;
  path: string;
  details?: Record<string, string[]>;
}

// Tipos de paginação
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: PaginationMeta;
}

// Tipos de formulário
export interface FormState<T> {
  data: T;
  errors: Partial<Record<keyof T, string>>;
  touched: Partial<Record<keyof T, boolean>>;
  isValid: boolean;
  isSubmitting: boolean;
}

// Tipos de modal
export interface ModalState {
  isOpen: boolean;
  type: 'create' | 'edit' | 'delete' | null;
  data?: any;
}

// Tipos de toast
export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

// Tipos de validação
export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: any) => string | null;
}

export type ValidationRules<T> = Partial<Record<keyof T, ValidationRule>>;

// Utilitários de tipo
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
