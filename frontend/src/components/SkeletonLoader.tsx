import React from 'react';

interface SkeletonLoaderProps {
  count?: number;
  className?: string;
}

const PostSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
    {/* Title skeleton */}
    <div className="h-6 bg-gray-200 rounded mb-3 w-3/4"></div>

    {/* Content skeleton */}
    <div className="space-y-2 mb-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      <div className="h-4 bg-gray-200 rounded w-4/6"></div>
    </div>

    {/* Meta skeleton */}
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {/* Status skeleton */}
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        {/* Date skeleton */}
        <div className="h-4 w-24 bg-gray-200 rounded"></div>
      </div>

      {/* Actions skeleton */}
      <div className="flex space-x-2">
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
        <div className="h-8 w-16 bg-gray-200 rounded"></div>
      </div>
    </div>
  </div>
);

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count = 3,
  className = ''
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: count }, (_, index) => (
        <PostSkeleton key={index} />
      ))}
    </div>
  );
};

export default SkeletonLoader;
