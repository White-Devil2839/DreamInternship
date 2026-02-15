import { useContext } from 'react';
import { FilterContext } from '../../context/FilterContext';

function FilterPanel() {
  const { filters, setFilters } = useContext(FilterContext);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setFilters({
      startDate: '',
      endDate: '',
      region: 'All',
      riskLevel: 'All',
      type: 'All'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Start Date
          </label>
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => handleFilterChange('startDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => handleFilterChange('endDate', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Region
          </label>
          <select
            value={filters.region}
            onChange={(e) => handleFilterChange('region', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Regions</option>
            <option value="North">North</option>
            <option value="South">South</option>
            <option value="East">East</option>
            <option value="West">West</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Risk Level
          </label>
          <select
            value={filters.riskLevel}
            onChange={(e) => handleFilterChange('riskLevel', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Levels</option>
            <option value="Normal">Normal</option>
            <option value="Suspicious">Suspicious</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All Types</option>
            <option value="Online">Online</option>
            <option value="POS">POS</option>
            <option value="Transfer">Transfer</option>
          </select>
        </div>

        <div className="flex items-end">
          <button
            onClick={handleReset}
            className="w-full px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPanel;
