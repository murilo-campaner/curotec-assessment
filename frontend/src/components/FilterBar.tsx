import React from 'react';

export type FilterOption = 'all' | 'published' | 'drafts';

interface FilterBarProps {
  activeFilter: FilterOption;
  onFilterChange: (filter: FilterOption) => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({
  activeFilter,
  onFilterChange,
  className = ''
}) => {
  const filters: { value: FilterOption; label: string; icon: string }[] = [
    { value: 'all', label: 'All Posts', icon: '📄' },
    { value: 'published', label: 'Published', icon: '✅' },
    { value: 'drafts', label: 'Drafts', icon: '📝' },
  ];

  return (
    <div className={`flex items-center space-x-2 p-4 bg-gray-50 rounded-lg border ${className}`}>
      <span className="text-sm font-medium text-gray-700 mr-3">Filter by:</span>

      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`
            flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
            ${activeFilter === filter.value
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }
          `}
        >
          <span className="text-base">{filter.icon}</span>
          <span>{filter.label}</span>
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
