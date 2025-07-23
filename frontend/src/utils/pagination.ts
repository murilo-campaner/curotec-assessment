

export interface PaginationOptions {
  page: number;
  itemsPerPage: number;
}

export interface PaginationResult<T> {
  paginatedItems: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
    startIndex: number;
    endIndex: number;
  };
}

/**
 * Pagina uma lista de itens
 */
export const paginateItems = <T>(
  items: T[],
  options: PaginationOptions
): PaginationResult<T> => {
  const { page, itemsPerPage } = options;
  const total = items.length;
  const totalPages = Math.ceil(total / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, total);

  const paginatedItems = items.slice(startIndex, endIndex);

  return {
    paginatedItems,
    pagination: {
      page,
      limit: itemsPerPage,
      total,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
      startIndex,
      endIndex,
    },
  };
};

/**
 * Calcula informações de paginação sem paginar os itens
 */
export const calculatePagination = (
  totalItems: number,
  options: PaginationOptions
) => {
  const { page, itemsPerPage } = options;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);

  return {
    page,
    limit: itemsPerPage,
    total: totalItems,
    totalPages,
    hasNext: page < totalPages,
    hasPrev: page > 1,
    startIndex,
    endIndex,
  };
};

/**
 * Valida se uma página é válida
 */
export const isValidPage = (page: number, totalPages: number): boolean => {
  return page >= 1 && page <= totalPages;
};

/**
 * Normaliza uma página para garantir que esteja dentro dos limites
 */
export const normalizePage = (page: number, totalPages: number): number => {
  if (page < 1) return 1;
  if (page > totalPages) return totalPages;
  return page;
};
