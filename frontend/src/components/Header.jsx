import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">EDA Dashboard</h1>
            <p className="text-gray-600">FMCG Retail Data Analysis</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-primary-50 px-3 py-1 rounded-full">
              <span className="text-primary-700 text-sm font-medium">
                Live Data
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
