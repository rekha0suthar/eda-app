import React from 'react';
import { Line } from 'react-chartjs-2';
import { formatMillion } from '../../util';

const MonthlyTrendChart = ({ apiData }) => {
  if (!apiData) return null;

  const data = {
    labels: apiData.labels,
    datasets: [
      {
        label: 'Sales Value',
        data: apiData.data,
        backgroundColor: apiData.backgroundColor,
        borderColor: apiData.borderColor,
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
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
  };

  return (
    <div className="relative h-64">
      <Line data={data} options={options} />
    </div>
  );
};

export default MonthlyTrendChart;
