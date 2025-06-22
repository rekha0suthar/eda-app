import React from 'react';
import { Bar } from 'react-chartjs-2';

const formatMillion = (val) => `${parseFloat(val / 1000000).toFixed(1)} M`;

const SalesBarChart = ({ apiData }) => {
  if (!apiData) return null;
  const data = {
    labels: apiData.labels,
    datasets: apiData.datasets.map((ds) => ({
      ...ds,
      borderRadius: 6,
    })),
  };
  const options = {
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
  };
  return (
    <div className="relative h-64">
      <Bar data={data} options={options} />
    </div>
  );
};

export default SalesBarChart;
