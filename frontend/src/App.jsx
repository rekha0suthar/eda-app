import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FilterPanel from './components/FilterPanel';
import ChartGrid from './components/ChartGrid';
import Header from './components/Header';

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [filterOptions, setFilterOptions] = useState(null);
  const [filters, setFilters] = useState({
    brand: '',
    pack_type: '',
    ppg: '',
    channel: '',
    year: '',
  });
  const [loading, setLoading] = useState(true);

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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <FilterPanel
              filterOptions={filterOptions}
              filters={filters}
              onFilterChange={handleFilterChange}
            />
          </div>
          <div className="lg:col-span-3">
            <ChartGrid filters={filters} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
