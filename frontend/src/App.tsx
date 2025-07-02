import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import EntryForm from './pages/EntryForm';
import Reminders from './pages/Reminders';
import Insights from './pages/Insights';

export default function App() {
  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4 space-x-4">
        <Link to="/">Dashboard</Link>
        <Link to="/entry">Entry</Link>
        <Link to="/reminders">Reminders</Link>
        <Link to="/insights">Insights</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/entry" element={<EntryForm />} />
        <Route path="/reminders" element={<Reminders />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </div>
  );
}
