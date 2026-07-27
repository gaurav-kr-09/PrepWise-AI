import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function ProtectedNavbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="border-b border-white/70 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/dashboard" className="text-lg font-semibold tracking-tight text-ink">
          PrepWise AI
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium text-slate-600">
          <Link to="/dashboard" className="transition hover:text-brand-700">
            Dashboard
          </Link>
          <Link to="/start-interview" className="transition hover:text-brand-700">
            Start Interview
          </Link>
          <Link to="/history" className="transition hover:text-brand-700">
            History
          </Link>
          <Link to="/profile" className="transition hover:text-brand-700">
            Profile
          </Link>
          <span className="hidden rounded-full bg-brand-50 px-3 py-1 text-brand-700 sm:inline-flex">
            {user?.name || 'User'}
          </span>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-slate-300 px-4 py-2 text-slate-700 transition hover:border-brand-400 hover:text-brand-700"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
}

export default ProtectedNavbar;
