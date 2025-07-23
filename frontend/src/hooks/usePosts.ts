import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../services/postsApi';

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

  // Filter posts based on search and publication filter
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPublished = publishedFilter === undefined || post.published === publishedFilter;

    return matchesSearch && matchesPublished;
  });

  // Pagination
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + itemsPerPage);

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
