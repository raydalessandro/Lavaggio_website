import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { LogOut, User } from 'lucide-react';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Mappa ruoli a badge colors
  const roleColors = {
    client: 'bg-blue-100 text-blue-800',
    team: 'bg-purple-100 text-purple-800',
    boss: 'bg-emerald-100 text-emerald-800'
  };

  const roleLabels = {
    client: 'Cliente',
    team: 'Team Member',
    boss: 'Manager'
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Left: Logo + Title */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo-meraviglia.png" 
              alt="Meraviglia Lab" 
              className="h-8 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div>
              <h1 className="text-lg font-bold text-gray-900">
                Agency Dashboard
              </h1>
              <p className="text-xs text-gray-500 hidden sm:block">
                Gestione clienti e progetti
              </p>
            </div>
          </div>

          {/* Right: User Info + Logout */}
          <div className="flex items-center gap-3">
            
            {/* User Info */}
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
                {user.avatar || user.name.charAt(0)}
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-gray-900">
                  {user.name}
                </p>
                <span 
                  className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[user.role]}`}
                >
                  {roleLabels[user.role]}
                </span>
              </div>
            </div>

            {/* Mobile: Just Avatar */}
            <div className="sm:hidden w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-sm">
              {user.avatar || user.name.charAt(0)}
            </div>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
}
