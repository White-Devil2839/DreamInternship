import { useMemo, useContext } from 'react';
import { FilterContext } from '../context/FilterContext';
import FilterPanel from '../components/filters/FilterPanel';
import KPICard from '../components/dashboard/KPICard';
import RevenueChart from '../components/dashboard/RevenueChart';
import RegionChart from '../components/dashboard/RegionChart';
import RiskChart from '../components/dashboard/RiskChart';
import transactions from '../data/transactions.json';
import {
  calculateTotalRevenue,
  calculateTotalLeakage,
  calculateLeakagePercentage,
  calculateAverageTransaction,
  countSuspiciousTransactions,
  groupRevenueByMonth,
  groupRevenueByRegion,
  groupRiskDistribution
} from '../utils/calculations';

function Dashboard() {
  const { filters } = useContext(FilterContext);

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

  const totalRevenue = useMemo(() => 
    calculateTotalRevenue(filteredTransactions), 
    [filteredTransactions]
  );

  const totalLeakage = useMemo(() => 
    calculateTotalLeakage(filteredTransactions), 
    [filteredTransactions]
  );

  const leakagePercentage = useMemo(() => 
    calculateLeakagePercentage(filteredTransactions), 
    [filteredTransactions]
  );

  const avgTransaction = useMemo(() => 
    calculateAverageTransaction(filteredTransactions), 
    [filteredTransactions]
  );

  const suspiciousCount = useMemo(() => 
    countSuspiciousTransactions(filteredTransactions), 
    [filteredTransactions]
  );

  const monthlyRevenue = useMemo(() => 
    groupRevenueByMonth(filteredTransactions), 
    [filteredTransactions]
  );

  const regionRevenue = useMemo(() => 
    groupRevenueByRegion(filteredTransactions), 
    [filteredTransactions]
  );

  const riskDistribution = useMemo(() => 
    groupRiskDistribution(filteredTransactions), 
    [filteredTransactions]
  );

  const totalTransactions = filteredTransactions.length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
      <FilterPanel />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Total Revenue"
          value={`₹${totalRevenue.toLocaleString()}`}
          subtitle="Across all transactions"
        />
        
        <KPICard
          title="Revenue Leakage"
          value={`${leakagePercentage}%`}
          subtitle={`₹${totalLeakage.toLocaleString()} total leakage`}
        />
        
        <KPICard
          title="Total Transactions"
          value={totalTransactions}
          subtitle="Jan - Jun 2025"
        />
        
        <KPICard
          title="Suspicious Transactions"
          value={suspiciousCount}
          subtitle={`${totalTransactions > 0 ? ((suspiciousCount / totalTransactions) * 100).toFixed(1) : 0}% of total`}
        />
        
        <KPICard
          title="Average Transaction"
          value={`₹${avgTransaction.toLocaleString()}`}
          subtitle="Per transaction"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <RevenueChart data={monthlyRevenue} />
        <RegionChart data={regionRevenue} />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RiskChart data={riskDistribution} />
      </div>
    </div>
  );
}

export default Dashboard;
