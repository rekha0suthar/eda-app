import React from 'react';

const FilterDropdown = ({ label, value, onChange, options, filterKey }) => (
  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
    <label
      htmlFor={filterKey}
      className="block text-sm font-medium text-gray-700"
    >
      {label}
    </label>
    <select
      id={filterKey}
      name={filterKey}
      className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
      value={value}
      onChange={onChange}
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option.toString()}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const FilterPanel = ({ filterOptions, filters, onFilterChange }) => {
  if (!filterOptions) return null;

  const filterConfigs = [
    { label: 'Market', key: 'market', options: filterOptions.markets },
    { label: 'Channel', key: 'channel', options: filterOptions.channels },
    { label: 'Region', key: 'region', options: filterOptions.regions },
    { label: 'Year', key: 'year', options: filterOptions.years },
    { label: 'Category', key: 'category', options: filterOptions.categories },
    {
      label: 'SubCategory',
      key: 'subcategory',
      options: filterOptions.subcategories,
    },
    { label: 'Brand', key: 'brand', options: filterOptions.brands },
    { label: 'Variant', key: 'variant', options: filterOptions.variants },
    {
      label: 'Pack Type',
      key: 'pack_type',
      options: filterOptions.pack_types,
    },
    {
      label: 'Pack Size',
      key: 'pack_size',
      options: filterOptions.pack_sizes,
    },
    { label: 'PPG', key: 'ppg', options: filterOptions.ppgs },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex flex-wrap -mx-2">
        {filterConfigs.map((config) => (
          <FilterDropdown
            key={config.key}
            filterKey={config.key}
            label={config.label}
            value={filters[config.key]}
            onChange={(e) => onFilterChange(config.key, e.target.value)}
            options={config.options || []}
          />
        ))}
      </div>
    </div>
  );
};

export default FilterPanel;
