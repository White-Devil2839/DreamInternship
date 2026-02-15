import { createContext, useState, useMemo } from 'react';
import { generateTransactions } from '../data/generateTransactions';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    region: 'All',
    riskLevel: 'All',
    type: 'All'
  });

  const transactions = useMemo(() => generateTransactions(), []);

  return (
    <FilterContext.Provider value={{ filters, setFilters, transactions }}>
      {children}
    </FilterContext.Provider>
  );
}
