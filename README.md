# Revenue & Risk Monitoring Dashboard

## Project Overview

A comprehensive dashboard application for monitoring revenue metrics and analyzing risk patterns in transaction data. The dashboard provides real-time insights through interactive visualizations, global filtering capabilities, and detailed transaction analytics.

## Features

- **Multi-page Routing**: Navigate between Dashboard, Transactions, and Risk Analysis pages
- **KPI Cards**: Display key metrics including total revenue, leakage percentage, transaction counts, and risk indicators
- **Interactive Charts**: Visualize data through line charts, bar charts, and pie charts using Recharts
- **Global Filtering**: Apply filters across all pages by date range, region, risk level, and transaction type
- **Transaction Table**: View and sort all transactions with detailed information
- **Risk Analytics**: Analyze suspicious transactions with dedicated metrics and trend visualization

## Tech Stack

- **Frontend Framework**: React 18 with Vite
- **Routing**: React Router DOM v6
- **Charts**: Recharts for data visualization
- **Styling**: Tailwind CSS v3
- **State Management**: React Context API
- **Performance Optimization**: React useMemo hooks

## Folder Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── KPICard.jsx           # Reusable KPI card component
│   │   ├── RevenueChart.jsx      # Monthly revenue line chart
│   │   ├── RegionChart.jsx       # Regional revenue bar chart
│   │   └── RiskChart.jsx         # Risk distribution pie chart
│   ├── filters/
│   │   └── FilterPanel.jsx       # Global filter controls
│   ├── Layout.jsx                # Main layout wrapper
│   ├── Navbar.jsx                # Top navigation bar
│   └── Sidebar.jsx               # Side navigation menu
├── context/
│   └── FilterContext.jsx         # Global filter state management
├── data/
│   └── generateTransactions.js   # Dynamic seeded transaction generator
├── pages/
│   ├── Dashboard.jsx             # Main dashboard with KPIs and charts
│   ├── Transactions.jsx          # Transaction table with sorting
│   └── RiskAnalysis.jsx          # Risk analysis with suspicious trends
├── utils/
│   └── calculations.js           # Pure calculation functions
├── App.jsx                       # Root component with routing
└── main.jsx                      # Application entry point
```

## Mock Data Generation

### Dynamic Seeded Generation

The application uses a **deterministic seeded random number generator** to create consistent mock transaction data:

- **100 Transactions**: Generated with realistic values
- **Date Range**: Dynamically spread across the last 6 months from current date
- **Regions**: North, South, East, West (random distribution)
- **Types**: Online, POS, Transfer (random distribution)
- **Amounts**: Random values between ₹8,000 - ₹20,000
- **Risk Scores**: Random values 0.00 - 1.00 (2 decimal precision)
- **Status**: Automatically assigned ("Suspicious" if riskScore >= 0.7, else "Normal")
- **Leakage**: Calculated as 5-15% of transaction amount

### Session Persistence

The data generation uses **sessionStorage-based seeding** for consistency:

```javascript
// Seed is generated once per browser session
const seed = getSessionSeed(); // e.g., 1771176130016
const random = createSeededRandom(seed);
```

**How It Works:**
1. First app load → generates unique seed using `Date.now()`
2. Seed saved to `sessionStorage.getItem("dashboard_seed")`
3. All subsequent page loads/refreshes use same seed
4. Same seed = identical dataset throughout session

### When Data Changes

**Data Regenerates (New Seed) When:**
- New browser tab opened
- Browser session ends (tab/window closed)
- Opening in incognito/private mode
- Different browser used
- sessionStorage manually cleared

**Data Stays Same When:**
- Page refresh (F5 / Ctrl+R)
- Navigating between Dashboard/Transactions/Risk Analysis
- Applying filters or sorting
- Hard reload

### Benefits

- **Consistency**: Same user sees identical data throughout their session
- **Variety**: Different users/sessions see different realistic datasets
- **Reproducibility**: Can manually set seed for testing specific scenarios
- **Realistic Demo**: Stable data for presentations and testing

## State Management Strategy

### FilterContext

The application uses React Context API for centralized filter state management:

- **Single Source of Truth**: FilterContext provides global filter state (date range, region, risk level, type)
- **Provider Pattern**: FilterProvider wraps the entire application in App.jsx
- **Consumer Pattern**: Pages access filters via useContext hook

### Derived Data with useMemo

Each page independently derives filtered data from the raw dataset:

```javascript
const filteredTransactions = useMemo(() => {
  return transactions.filter(txn => {
    // Apply all filter conditions
  });
}, [filters]);
```

**Benefits:**
- Performance optimization through memoization
- Consistent filtering logic across all pages
- No redundant calculations on re-renders
- Clean separation between state and derived data

### Architecture Pattern

```
FilterContext (Global State)
     ↓
filteredTransactions (Derived per page)
     ↓
Page-specific data (KPIs, Charts, Tables)
```

Each page:
1. Reads filters from FilterContext
2. Derives filteredTransactions using identical filtering logic
3. Calculates page-specific metrics from filtered data
4. Updates UI reactively when filters change

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Design Decisions

### Why Seeded Deterministic Data Generation?

- **Session Stability**: Users see consistent data throughout their entire session, enabling reliable testing and demos
- **Linear Congruential Generator**: Simple, fast pseudo-random algorithm that produces identical sequences from the same seed
- **sessionStorage Persistence**: Seed survives page refreshes but creates new data per tab/session for variety
- **No Backend Required**: Generates realistic data client-side without API calls or database
- **Reproducible Testing**: Can manually set specific seeds to test edge cases or reproduce bugs

### Why Context API over Redux?

- **Simplicity**: Context API is sufficient for this application's state management needs
- **No Boilerplate**: Eliminates Redux setup, actions, and reducers
- **Performance**: Combined with useMemo, provides efficient re-rendering control
- **React Native**: Built-in solution without external dependencies

### Why useMemo for Performance?

- **Expensive Calculations**: Filtering 100 transactions and aggregating metrics can be costly
- **Prevent Redundant Work**: Only recalculate when dependencies change
- **Selective Re-rendering**: Components only update when their specific data changes
- **Scalability**: Ensures performance as dataset grows

### Why Derive Filtered Data Per Page?

- **Component Independence**: Each page manages its own data derivation
- **Specific Needs**: Different pages require different data transformations
  - Dashboard: Aggregated KPIs and chart data
  - Transactions: Sorted table rows
  - Risk Analysis: Suspicious-only subset with trend grouping
- **Testability**: Easier to test isolated components
- **Maintainability**: Changes to one page don't affect others

### Code Architecture Principles

- **Pure Functions**: All calculation utilities are pure functions (no side effects)
- **Single Responsibility**: Each component has one clear purpose
- **Consistent Patterns**: Identical filtering logic across all pages
- **No Premature Optimization**: Simple, readable code over complex abstractions
- **Separation of Concerns**: UI components separate from business logic

## Data Flow

1. User interacts with FilterPanel controls
2. FilterContext state updates globally
3. All pages re-derive filteredTransactions via useMemo
4. Calculations recompute based on new filtered data
5. UI updates reactively across all components

This architecture ensures data consistency, optimal performance, and maintainable code structure.
