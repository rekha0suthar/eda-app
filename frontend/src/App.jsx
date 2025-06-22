import React, { useState, useEffect, Suspense, lazy } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Loader from './components/Loader';
const FilterPanel = lazy(() => import('./components/FilterPanel'));
const ChartGrid = lazy(() => import('./components/ChartGrid'));

const API_BASE_URL = 'http://localhost:8000/api';

function App() {
  const [filters, setFilters] = useState({
    channel: '',
    brand: '',
    pack_type: '',
    ppg: '',
    year: '',
  });
  const [filterOptions, setFilterOptions] = useState(null);

  useEffect(() => {
    const loadFilterOptions = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/filters/`);
        setFilterOptions(response.data);
      } catch (error) {
        console.error('Error loading filter options:', error);
      }
    };
    loadFilterOptions();
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="container mx-auto px-4 py-6">
          <Header />
          <Tabs />
          <FilterPanel
            filters={filters}
            setFilters={setFilters}
            filterOptions={filterOptions}
          />
          <ChartGrid filters={filters} />
        </div>
      </div>{' '}
    </Suspense>
  );
}

export default App;
