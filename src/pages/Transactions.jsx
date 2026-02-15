import { useMemo, useContext, useState } from 'react';
import { FilterContext } from '../context/FilterContext';
import transactions from '../data/transactions.json';

function Transactions() {
  const { filters } = useContext(FilterContext);
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredTransactions = useMemo(() => {
    return transactions.filter(txn => {
      if (filters.region !== 'All' && txn.region !== filters.region) {
        return false;
      }

      if (filters.riskLevel !== 'All' && txn.status !== filters.riskLevel) {
        return false;
      }

      if (filters.type !== 'All' && txn.type !== filters.type) {
        return false;
      }

      if (filters.startDate && txn.date < filters.startDate) {
        return false;
      }

      if (filters.endDate && txn.date > filters.endDate) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a.amount - b.amount;
      }
      return b.amount - a.amount;
    });
  }, [filteredTransactions, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Transactions</h1>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Region
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button 
                    onClick={toggleSortOrder}
                    className="flex items-center gap-1 hover:text-gray-700"
                  >
                    Amount
                    <span className="text-sm">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Leakage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Score
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTransactions.map((txn, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {txn.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {txn.region}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ₹{txn.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ₹{txn.leakage.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {txn.riskScore}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      txn.status === 'Suspicious' 
                        ? 'bg-red-100 text-red-800' 
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {txn.type}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <p className="text-sm text-gray-700">
            Showing <span className="font-semibold">{sortedTransactions.length}</span> transactions
          </p>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
