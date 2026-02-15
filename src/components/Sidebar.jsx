import { Link } from 'react-router-dom';

function Sidebar() {
  return (
    <aside className="w-64 bg-gray-800 text-white min-h-screen p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Revenue Monitor</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/transactions" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Transactions
            </Link>
          </li>
          <li>
            <Link to="/risk-analysis" className="block py-2 px-4 hover:bg-gray-700 rounded">
              Risk Analysis
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

export default Sidebar;
