import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/index.jsx';
import Dashboard from './pages/DashboardPage.jsx';
import Transactions from './pages/TransactionsPage.jsx';
import Budgets from './pages/BudgetsPage.jsx';
import Analytics from './pages/AnalyticsPage.jsx';
import NotFound from './pages/NotFoundPage.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="transactions" element={<Transactions />} />
        <Route path="budgets" element={<Budgets />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;