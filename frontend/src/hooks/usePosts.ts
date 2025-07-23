import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../services/postsApi';
import { filterPosts } from '../utils/filters';
import { paginateItems } from '../utils/pagination';

export const usePosts = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [publishedFilter, setPublishedFilter] = useState<boolean | undefined>(undefined);

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

  const handleFilterChange = (filter: boolean | undefined) => {
    setPublishedFilter(filter);
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
    publishedFilter,

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
