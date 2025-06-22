import React from 'react';

const FilterPanel = ({ filterOptions, filters, onFilterChange }) => {
  if (!filterOptions) return null;

  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <h2 className="text-lg font-semibold mb-4 text-primary-700">Filters</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Market
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.market}
            onChange={(e) => onFilterChange('market', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.markets.map((market) => (
              <option key={market} value={market}>
                {market}
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
            Region
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.region}
            onChange={(e) => onFilterChange('region', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.category}
            onChange={(e) => onFilterChange('category', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            SubCategory
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.subcategory}
            onChange={(e) => onFilterChange('subcategory', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.subcategories.map((subcategory) => (
              <option key={subcategory} value={subcategory}>
                {subcategory}
              </option>
            ))}
          </select>
        </div>
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
            Variant
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.variant}
            onChange={(e) => onFilterChange('variant', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.variants.map((variant) => (
              <option key={variant} value={variant}>
                {variant}
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
            Pack Size
          </label>
          <select
            className="mt-1 block w-full rounded border-gray-300 shadow-sm focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            value={filters.pack_size}
            onChange={(e) => onFilterChange('pack_size', e.target.value)}
          >
            <option value="">All</option>
            {filterOptions.pack_sizes.map((pack_size) => (
              <option key={pack_size} value={pack_size}>
                {pack_size}
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
