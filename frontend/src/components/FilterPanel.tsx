import React from 'react';
import { FilterOptions, Filters } from '../types';

interface FilterPanelProps {
  filterOptions: FilterOptions | null;
  filters: Filters;
  onFilterChange: (filterType: string, value: string) => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  filterOptions,
  filters,
  onFilterChange,
}) => {
  if (!filterOptions) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-primary-700">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Brand
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.brand}
            onChange={(e) => onFilterChange('brand', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Pack Type
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.pack_type}
            onChange={(e) => onFilterChange('pack_type', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.pack_types.map((packType) => (
              <option key={packType} value={packType}>
                {packType}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">PPG</label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.ppg}
            onChange={(e) => onFilterChange('ppg', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.ppgs.map((ppg) => (
              <option key={ppg} value={ppg}>
                {ppg}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Channel
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.channel}
            onChange={(e) => onFilterChange('channel', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.channels.map((channel) => (
              <option key={channel} value={channel}>
                {channel}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Year
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.year}
            onChange={(e) => onFilterChange('year', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.years.map((year) => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
