import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from './components/FilterPanel';
import ChartGrid from './components/ChartGrid';
import Header from './components/Header';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [filterOptions, setFilterOptions] = useState(null);
  const [filters, setFilters] = useState({
    market: '',
    channel: '',
    region: '',
    category: '',
    subcategory: '',
    brand: '',
    variant: '',
    pack_type: '',
    ppg: '',
    pack_size: '',
    year: '',
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Brand');

  const tabs = [
    'Brand',
    'Pack Type',
    'PPG',
    'Brand X Pack Type X PPC',
    'Correlation and Trends',
  ];

  useEffect(() => {
    loadFilterOptions();
  }, []);

  const loadFilterOptions = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/filters/`);
      setFilterOptions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error loading filter options:', error);
      setLoading(false);
    }
  };

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      market: '',
      channel: '',
      region: '',
      category: '',
      subcategory: '',
      brand: '',
      variant: '',
      pack_type: '',
      ppg: '',
      pack_size: '',
      year: '',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading EDA Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Consumer Surplus Factor (CSF)
          </h2>
          <div className="mt-4 border-b">
            <nav className="-mb-px flex flex-wrap space-x-8">
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
        <FilterPanel
          filterOptions={filterOptions}
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleReset}
        />
        <ChartGrid filters={filters} />
      </div>
    </div>
  );
}

export default App;
