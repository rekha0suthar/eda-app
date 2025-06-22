import React, { useState } from 'react';

const Header = () => {
  const [activeMainTab, setActiveMainTab] = useState('Trends');

  const mainTabs = ['Trends', 'CSF Results', 'Scenario Planning'];

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-between sm:items-center mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 sm:mb-0">
        Consumer Surplus Factor (CSF)
      </h2>
      <div className="bg-gray-200 rounded-lg p-1 flex space-x-1 self-start sm:self-center">
        {mainTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveMainTab(tab)}
            className={`px-4 py-1.5 text-sm font-medium rounded-md ${
              activeMainTab === tab
                ? 'bg-white text-gray-800 shadow-sm'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
