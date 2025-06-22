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
      className="bg-white text-gray-900 text-base rounded-md focus:ring-blue-500 block w-full p-2.5 shadow-sm pr-8"
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

export default FilterDropdown;
