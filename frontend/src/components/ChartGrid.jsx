import React, { useEffect, useState } from 'react';
import {
  fetchSalesByYear,
  fetchVolumeByYear,
  fetchYearlyValue,
  fetchMonthlyTrend,
} from '../api';
import SalesBarChart from './charts/SalesBarChart';
import VolumeBarChart from './charts/VolumeBarChart';
import YearlyValueChart from './charts/YearlyValueChart';
import MonthlyTrendChart from './charts/MonthlyTrendChart';
import MarketShareChart from './charts/MarketShareChart';
import ChartWrapper from './ChartWrapper';

const ChartGrid = ({ filters }) => {
  const [salesByYear, setSalesByYear] = useState(null);
  const [volumeByYear, setVolumeByYear] = useState(null);
  const [yearWiseSalesVertical, setYearWiseSalesVertical] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllCharts = async () => {
      setLoading(true);
      try {
        const params = Object.fromEntries(
          Object.entries(filters).filter(([_, v]) => v)
        );
        const [salesRes, volumeRes, verticalRes, trendRes] = await Promise.all([
          fetchSalesByYear(params),
          fetchVolumeByYear(params),
          fetchYearlyValue(params),
          fetchMonthlyTrend(params),
        ]);
        setSalesByYear(salesRes.data);
        setVolumeByYear(volumeRes.data);
        setYearWiseSalesVertical(verticalRes.data);
        setMonthlyTrend(trendRes.data);
      } catch (error) {
        console.error('Error loading chart data:', error);
      }
      setLoading(false);
    };

    fetchAllCharts();
  }, [filters]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ChartWrapper title="Sales Value (EURO)">
        {salesByYear && <SalesBarChart apiData={salesByYear} />}
      </ChartWrapper>
      <ChartWrapper title="Volume Contribution (KG)">
        {volumeByYear && <VolumeBarChart apiData={volumeByYear} />}
      </ChartWrapper>
      <ChartWrapper title="Year-wise Sales Value">
        {yearWiseSalesVertical && (
          <YearlyValueChart apiData={yearWiseSalesVertical} />
        )}
      </ChartWrapper>
      <ChartWrapper title="Monthly Trend of Sales Value">
        {monthlyTrend && <MonthlyTrendChart apiData={monthlyTrend} />}
      </ChartWrapper>
      <MarketShareChart filters={filters} />
    </div>
  );
};

export default ChartGrid;
