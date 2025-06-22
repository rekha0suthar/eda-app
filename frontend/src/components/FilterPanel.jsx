import React from 'react';

const FilterDropdown = ({ label, value, onChange, options, filterKey }) => (
  <div className="w-full sm:w-1/2 md:w-1/4 lg:w-1/6 px-2 mb-4">
    <label
      htmlFor={filterKey}
      className="block text-sm font-medium text-gray-700 mb-1"
    >
      {label}
    </label>
    <select
      id={filterKey}
      name={filterKey}
      className="bg-white border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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

const FilterPanel = ({ filterOptions, filters, onFilterChange, onReset }) => {
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
    <div className="mb-6">
      <div className="flex flex-wrap -mx-2 items-end">
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
        <div className="w-full sm:w-auto px-2 mb-4">
          <button
            onClick={onReset}
            className="bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center w-full"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
