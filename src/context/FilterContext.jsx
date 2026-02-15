import { createContext, useState } from 'react';

export const FilterContext = createContext();

export function FilterProvider({ children }) {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    region: 'All',
    riskLevel: 'All',
    type: 'All'
  });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
}
