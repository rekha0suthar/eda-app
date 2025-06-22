import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api';

export const fetchSalesByYear = (filters) =>
  axios.get(`${API_BASE_URL}/charts/sales-by-year/`, { params: filters });

export const fetchVolumeByYear = (filters) =>
  axios.get(`${API_BASE_URL}/charts/volume-by-year/`, { params: filters });

export const fetchYearlyValue = (filters) =>
  axios.get(`${API_BASE_URL}/charts/year-wise-sales-vertical/`, {
    params: filters,
  });

export const fetchMonthlyTrend = (filters) =>
  axios.get(`${API_BASE_URL}/charts/monthly-trend/`, { params: filters });

export const fetchMarketShare = (filters, metric) =>
  axios.get(`${API_BASE_URL}/charts/market-share/`, {
    params: { ...filters, metric },
  });
