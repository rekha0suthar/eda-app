const ChartWrapper = ({ children, title }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      {children}
    </div>
  );
};

export default ChartWrapper;
