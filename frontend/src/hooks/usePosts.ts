import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../services/postsApi';
import { filterPosts } from '../utils/filters';
import { paginateItems } from '../utils/pagination';
import type { FilterOption } from '../components/FilterBar';

export const usePosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');

  // Convert FilterOption to boolean | undefined for the filter utility
  const publishedFilter = activeFilter === 'all'
    ? undefined
    : activeFilter === 'published';

  const itemsPerPage = 10;

  // Query to fetch posts
  const {
    data: posts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['posts', searchQuery, publishedFilter, currentPage],
    queryFn: () => postsApi.getAllPosts(),
  });

  // Filter posts using utility function
  const { filteredPosts, totalItems } = filterPosts(posts, {
    searchQuery,
    publishedFilter,
  });

  // Paginate posts using utility function
  const { paginatedItems: paginatedPosts, pagination } = paginateItems(filteredPosts, {
    page: currentPage,
    itemsPerPage,
  });

  const { totalPages } = pagination;

  // Handlers
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
    setCurrentPage(1); // Reset to first page when filtering
  };

    return {
    // Data
    posts: paginatedPosts,
    allPosts: posts,
    isLoading,
    error,

    // State
    searchQuery,
    currentPage,
    activeFilter,

    // Pagination
    totalItems,
    totalPages,
    itemsPerPage,

    // Handlers
    handleSearchChange,
    handlePageChange,
    handleFilterChange,
  };
};
