import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FilterProvider } from './context/FilterContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import RiskAnalysis from './pages/RiskAnalysis';

function App() {
  return (
    <FilterProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="transactions" element={<Transactions />} />
            <Route path="risk-analysis" element={<RiskAnalysis />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </FilterProvider>
  );
}

export default App;
