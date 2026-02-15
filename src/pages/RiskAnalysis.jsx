import { useMemo, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import { groupRevenueByMonth } from '../utils/calculations';
import KPICard from '../components/dashboard/KPICard';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

function RiskAnalysis() {
  const { filters, transactions } = useContext(FilterContext);

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

  const suspiciousTransactions = useMemo(() => {
    return filteredTransactions.filter(txn => txn.status === 'Suspicious');
  }, [filteredTransactions]);

  const totalSuspicious = useMemo(() => 
    suspiciousTransactions.length, 
    [suspiciousTransactions]
  );

  const suspiciousPercentage = useMemo(() => {
    if (filteredTransactions.length === 0) return 0;
    return ((suspiciousTransactions.length / filteredTransactions.length) * 100).toFixed(1);
  }, [suspiciousTransactions, filteredTransactions]);

  const totalSuspiciousAmount = useMemo(() => {
    return suspiciousTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  }, [suspiciousTransactions]);

  const highestRiskScore = useMemo(() => {
    if (filteredTransactions.length === 0) return 0;
    return Math.max(...filteredTransactions.map(txn => txn.riskScore));
  }, [filteredTransactions]);

  const suspiciousTrend = useMemo(() => 
    groupRevenueByMonth(suspiciousTransactions), 
    [suspiciousTransactions]
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Risk Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <KPICard
          title="Total Suspicious"
          value={totalSuspicious}
          subtitle="Flagged transactions"
        />
        <KPICard
          title="Suspicious Rate"
          value={`${suspiciousPercentage}%`}
          subtitle="Of filtered dataset"
        />
        <KPICard
          title="Suspicious Amount"
          value={`₹${totalSuspiciousAmount.toLocaleString()}`}
          subtitle="Total flagged revenue"
        />
        <KPICard
          title="Highest Risk Score"
          value={highestRiskScore.toFixed(2)}
          subtitle="Maximum in dataset"
        />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Suspicious Transaction Trend
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={suspiciousTrend}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Suspicious Amount"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default RiskAnalysis;
