import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { fetchMarketShare } from '../../api';
import { formatMillion } from '../../util';

const MarketShareChart = ({ filters }) => {
  const [marketShare, setMarketShare] = useState(null);
  const [metric, setMetric] = useState('sales');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchMarketShare(filters, metric);
        setMarketShare(res.data);
      } catch (error) {
        console.error('Error loading market share data:', error);
      }
    };
    fetchData();
  }, [filters, metric]);

  if (!marketShare) return null;

  const data = {
    labels: marketShare.labels,
    datasets: [
      {
        data: marketShare.data,
        backgroundColor: marketShare.backgroundColor,
        borderColor: marketShare.borderColor,
        borderWidth: 2,
      },
    ],
  };

  const options = {
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
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Market Share</h3>
        <div className="flex space-x-1 bg-gray-200 p-1 rounded-full">
          <button
            onClick={() => setMetric('sales')}
            className={`px-3 py-1 text-sm rounded-full ${
              metric === 'sales'
                ? 'bg-white shadow'
                : 'bg-transparent text-gray-700'
            }`}
          >
            By Sales
          </button>
          <button
            onClick={() => setMetric('volume')}
            className={`px-3 py-1 text-sm rounded-full ${
              metric === 'volume'
                ? 'bg-white shadow'
                : 'bg-transparent text-gray-700'
            }`}
          >
            By Volume
          </button>
        </div>
      </div>
      <div className="relative h-64">
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};

export default MarketShareChart;
