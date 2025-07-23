import type { Post } from '../types/post';

export interface FilterOptions {
  searchQuery: string;
  publishedFilter: boolean | undefined;
}

export interface FilteredResult {
  filteredPosts: Post[];
  totalItems: number;
}

/**
 * Filtra posts baseado em query de busca e filtro de publicação
 */
export const filterPosts = (
  posts: Post[],
  options: FilterOptions
): FilteredResult => {
  const { searchQuery, publishedFilter } = options;

  const filteredPosts = posts.filter((post) => {
    // Filtro por busca (título e conteúdo)
    const matchesSearch = searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    // Filtro por status de publicação
    const matchesPublished = publishedFilter === undefined ||
      post.published === publishedFilter;

    return matchesSearch && matchesPublished;
  });

  return {
    filteredPosts,
    totalItems: filteredPosts.length,
  };
};

/**
 * Filtra posts apenas por query de busca
 */
export const filterPostsBySearch = (posts: Post[], searchQuery: string): Post[] => {
  if (!searchQuery.trim()) return posts;

  return posts.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );
};

/**
 * Filtra posts apenas por status de publicação
 */
export const filterPostsByPublished = (
  posts: Post[],
  published: boolean | undefined
): Post[] => {
  if (published === undefined) return posts;

  return posts.filter((post) => post.published === published);
};
