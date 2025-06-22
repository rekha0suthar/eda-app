import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
  ArcElement
);

const API_BASE_URL = 'http://localhost:8000/api';

const formatMillion = (val) => `${parseFloat(val / 1000000).toFixed(1)} M`;

const ChartGrid = ({ filters }) => {
  const [salesByYear, setSalesByYear] = useState(null);
  const [volumeByYear, setVolumeByYear] = useState(null);
  const [yearWiseSalesVertical, setYearWiseSalesVertical] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState(null);
  const [marketShare, setMarketShare] = useState(null);
  const [marketShareMetric, setMarketShareMetric] = useState('sales');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCharts();
    // eslint-disable-next-line
  }, [filters]);

  useEffect(() => {
    if (!loading) {
      fetchMarketShare();
    }
    // eslint-disable-next-line
  }, [marketShareMetric]);

  const fetchMarketShare = async () => {
    try {
      const params = {
        ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v)),
        metric: marketShareMetric,
      };
      const res = await axios.get(`${API_BASE_URL}/charts/market-share/`, {
        params,
      });
      setMarketShare(res.data);
    } catch (error) {
      console.error('Error loading market share data:', error);
    }
  };

  const fetchAllCharts = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v)
      );
      const [salesRes, volumeRes, verticalRes, trendRes, marketShareRes] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/charts/sales-by-year/`, { params }),
          axios.get(`${API_BASE_URL}/charts/volume-by-year/`, { params }),
          axios.get(`${API_BASE_URL}/charts/year-wise-sales-vertical/`, {
            params,
          }),
          axios.get(`${API_BASE_URL}/charts/monthly-trend/`, { params }),
          axios.get(`${API_BASE_URL}/charts/market-share/`, {
            params: { ...params, metric: marketShareMetric },
          }),
        ]);
      setSalesByYear(salesRes.data);
      setVolumeByYear(volumeRes.data);
      setYearWiseSalesVertical(verticalRes.data);
      setMonthlyTrend(trendRes.data);
      setMarketShare(marketShareRes.data);
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Sales Value (EURO)</h3>
        {salesByYear && (
          <div className="relative h-64">
            <Bar
              data={{
                labels: salesByYear.labels,
                datasets: salesByYear.datasets.map((ds) => ({
                  ...ds,
                  borderRadius: 6,
                })),
              }}
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                    },
                  },
                  title: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${formatMillion(
                          context.parsed.x
                        )}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                    ticks: {
                      callback: function (value) {
                        return formatMillion(value);
                      },
                      stepSize: 5,
                      maxTicksLimit: 10,
                    },
                  },
                  y: { stacked: true },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Volume Contribution (KG)</h3>
        {volumeByYear && (
          <div className="relative h-64">
            <Bar
              data={{
                labels: volumeByYear.labels,
                datasets: volumeByYear.datasets.map((ds) => ({
                  ...ds,
                  borderRadius: 6,
                })),
              }}
              options={{
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                    },
                  },
                  title: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${formatMillion(
                          context.parsed.x
                        )}`;
                      },
                    },
                  },
                },
                scales: {
                  x: {
                    stacked: true,
                    ticks: {
                      callback: function (value) {
                        return formatMillion(value);
                      },
                      stepSize: 1,
                      maxTicksLimit: 10,
                    },
                  },
                  y: { stacked: true },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Value</h3>
        {yearWiseSalesVertical && (
          <div className="relative h-64">
            <Bar
              data={{
                labels: yearWiseSalesVertical.labels,
                datasets: yearWiseSalesVertical.datasets.map((ds) => ({
                  ...ds,
                  borderRadius: 6,
                })),
              }}
              options={{
                indexAxis: 'x',
                responsive: true,
                maintainAspectRatio: false,
                barPercentage: 0.6,
                categoryPercentage: 0.8,
                plugins: {
                  legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                    },
                  },
                  title: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.dataset.label}: ${formatMillion(
                          context.parsed.y
                        )}`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      callback: function (value) {
                        return formatMillion(value);
                      },
                      stepSize: 5,
                      maxTicksLimit: 10,
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">
          Monthly Trend of Sales Value
        </h3>
        {monthlyTrend && (
          <div className="relative h-64">
            <Line
              data={{
                labels: monthlyTrend.labels,
                datasets: [
                  {
                    label: 'Sales Value',
                    data: monthlyTrend.data,
                    backgroundColor: monthlyTrend.backgroundColor,
                    borderColor: monthlyTrend.borderColor,
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { display: false },
                  title: { display: false },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `Sales: ${formatMillion(context.parsed.y)}`;
                      },
                    },
                  },
                },
                scales: {
                  y: {
                    ticks: {
                      callback: function (value) {
                        return formatMillion(value);
                      },
                      stepSize: 5,
                      maxTicksLimit: 10,
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">Market Share</h3>
          <div className="flex space-x-1 bg-gray-200 p-1 rounded-full">
            <button
              onClick={() => setMarketShareMetric('sales')}
              className={`px-3 py-1 text-sm rounded-full ${
                marketShareMetric === 'sales'
                  ? 'bg-white shadow'
                  : 'bg-transparent text-gray-700'
              }`}
            >
              By Sales
            </button>
            <button
              onClick={() => setMarketShareMetric('volume')}
              className={`px-3 py-1 text-sm rounded-full ${
                marketShareMetric === 'volume'
                  ? 'bg-white shadow'
                  : 'bg-transparent text-gray-700'
              }`}
            >
              By Volume
            </button>
          </div>
        </div>
        {marketShare && (
          <div className="relative h-64">
            <Doughnut
              data={{
                labels: marketShare.labels,
                datasets: [
                  {
                    data: marketShare.data,
                    backgroundColor: marketShare.backgroundColor,
                    borderColor: marketShare.borderColor,
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      usePointStyle: true,
                      pointStyle: 'circle',
                      padding: 20,
                    },
                  },
                  title: {
                    display: false,
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        const label = context.label || '';
                        const value = context.parsed;
                        const total = context.dataset.data.reduce(
                          (acc, current) => acc + current,
                          0
                        );
                        const percentage =
                          total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                        const formattedValue = formatMillion(value);
                        return `${label}: ${formattedValue} (${percentage}%)`;
                      },
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChartGrid;
