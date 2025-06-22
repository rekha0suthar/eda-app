import React, { useState } from 'react';

const Tabs = () => {
  const [activeTab, setActiveTab] = useState('Brand');

  const tabs = [
    'Brand',
    'Pack Type',
    'PPG',
    'Brand X Pack Type X PPC',
    'Correlation and Trends',
  ];
  return (
    <div className="mb-6 overflow-x-auto">
      <div className="border-b">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab
                  ? 'border-yellow-500 text-yellow-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tabs;
