import { useMemo } from 'react';
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
  const totalRevenue = useMemo(() => 
    calculateTotalRevenue(transactions), 
    []
  );

  const totalLeakage = useMemo(() => 
    calculateTotalLeakage(transactions), 
    []
  );

  const leakagePercentage = useMemo(() => 
    calculateLeakagePercentage(transactions), 
    []
  );

  const avgTransaction = useMemo(() => 
    calculateAverageTransaction(transactions), 
    []
  );

  const suspiciousCount = useMemo(() => 
    countSuspiciousTransactions(transactions), 
    []
  );

  const monthlyRevenue = useMemo(() => 
    groupRevenueByMonth(transactions), 
    []
  );

  const regionRevenue = useMemo(() => 
    groupRevenueByRegion(transactions), 
    []
  );

  const riskDistribution = useMemo(() => 
    groupRiskDistribution(transactions), 
    []
  );

  const totalTransactions = transactions.length;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard</h1>
      
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
          subtitle={`${((suspiciousCount / totalTransactions) * 100).toFixed(1)}% of total`}
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
