function KPICard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <h3 className="text-gray-600 text-sm font-medium mb-2">
        {title}
      </h3>
      <p className="text-3xl font-bold text-gray-900 mb-1">
        {value}
      </p>
      {subtitle && (
        <p className="text-gray-500 text-xs">
          {subtitle}
        </p>
      )}
    </div>
  );
}

export default KPICard;
