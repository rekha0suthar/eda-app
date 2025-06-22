import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line, Pie } from 'react-chartjs-2';
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

const ChartGrid = ({ filters }) => {
  const [salesByYear, setSalesByYear] = useState(null);
  const [volumeByYear, setVolumeByYear] = useState(null);
  const [yearWiseSalesVertical, setYearWiseSalesVertical] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState(null);
  const [marketShare, setMarketShare] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllCharts();
    // eslint-disable-next-line
  }, [filters]);

  const fetchAllCharts = async () => {
    setLoading(true);
    try {
      const params = Object.fromEntries(
        Object.entries(filters).filter(([_, v]) => v)
      );
      const [salesRes, volumeRes, verticalRes, trendRes, shareRes] =
        await Promise.all([
          axios.get(`${API_BASE_URL}/charts/sales-by-year/`, { params }),
          axios.get(`${API_BASE_URL}/charts/volume-by-year/`, { params }),
          axios.get(`${API_BASE_URL}/charts/year-wise-sales-vertical/`, {
            params,
          }),
          axios.get(`${API_BASE_URL}/charts/monthly-trend/`, { params }),
          axios.get(`${API_BASE_URL}/charts/market-share/`, { params }),
        ]);
      setSalesByYear(salesRes.data);
      setVolumeByYear(volumeRes.data);
      setYearWiseSalesVertical(verticalRes.data);
      setMonthlyTrend(trendRes.data);
      setMarketShare(shareRes.data);
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
        <h3 className="text-lg font-semibold mb-2">
          Sales Value by Year (Horizontal Bar)
        </h3>
        {salesByYear && (
          <Bar
            data={{
              labels: salesByYear.labels,
              datasets: [
                {
                  label: 'Sales Value',
                  data: salesByYear.data,
                  backgroundColor: salesByYear.backgroundColor,
                  borderColor: salesByYear.borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
            }}
          />
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">
          Volume (kg) by Year (Horizontal Bar)
        </h3>
        {volumeByYear && (
          <Bar
            data={{
              labels: volumeByYear.labels,
              datasets: [
                {
                  label: 'Volume (kg)',
                  data: volumeByYear.data,
                  backgroundColor: volumeByYear.backgroundColor,
                  borderColor: volumeByYear.borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              indexAxis: 'y',
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
            }}
          />
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">
          Year-wise Sales Value (Vertical Bar)
        </h3>
        {yearWiseSalesVertical && (
          <Bar
            data={{
              labels: yearWiseSalesVertical.labels,
              datasets: [
                {
                  label: 'Sales Value',
                  data: yearWiseSalesVertical.data,
                  backgroundColor: yearWiseSalesVertical.backgroundColor,
                  borderColor: yearWiseSalesVertical.borderColor,
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              indexAxis: 'x',
              responsive: true,
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
            }}
          />
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-2">
          Monthly Trend of Sales Value (Line)
        </h3>
        {monthlyTrend && (
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
              plugins: {
                legend: { display: false },
                title: { display: false },
              },
            }}
          />
        )}
      </div>
      <div className="bg-white rounded-lg shadow p-4 md:col-span-2">
        <h3 className="text-lg font-semibold mb-2">Market Share (Pie/Donut)</h3>
        {marketShare && (
          <Pie
            data={{
              labels: marketShare.labels,
              datasets: [
                {
                  label: 'Market Share',
                  data: marketShare.data,
                  backgroundColor: marketShare.backgroundColor,
                  borderColor: marketShare.borderColor,
                  borderWidth: 2,
                },
              ],
            }}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  display: true,
                  position: 'right',
                },
                title: { display: false },
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default ChartGrid;
