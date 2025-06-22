import React from 'react';
import FilterDropdown from './FilterDropdown';

const FilterPanel = ({ filters, setFilters, filterOptions }) => {
  if (!filterOptions) return null;

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      channel: '',
      brand: '',
      pack_type: '',
      ppg: '',
      year: '',
    });
  };

  const filterConfigs = [
    { label: 'Channel', key: 'channel', options: filterOptions.channels },
    { label: 'Brand', key: 'brand', options: filterOptions.brands },
    {
      label: 'Pack Type',
      key: 'pack_type',
      options: filterOptions.pack_types,
    },
    { label: 'PPG', key: 'ppg', options: filterOptions.ppgs },
    { label: 'Year', key: 'year', options: filterOptions.years },
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
            onChange={(e) => handleFilterChange(config.key, e.target.value)}
            options={config.options || []}
          />
        ))}
        <div className="w-full sm:w-auto px-2 mb-4">
          <button
            onClick={handleReset}
            className="bg-primary-600 text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-md text-sm px-5 py-2.5 text-center w-full shadow-sm"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;
