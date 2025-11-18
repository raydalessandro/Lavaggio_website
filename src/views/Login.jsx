import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Users, Briefcase, TrendingUp } from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleRoleSelect = (role) => {
    login(role);
    navigate('/dashboard');
  };

  const roles = [
    {
      id: 'client',
      title: 'Cliente',
      icon: Users,
      description: 'Visualizza i tuoi progetti e report',
      gradient: 'from-blue-500 to-blue-600',
      hoverGradient: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      id: 'team',
      title: 'Team',
      icon: Briefcase,
      description: 'Gestisci clienti e task quotidiani',
      gradient: 'from-purple-500 to-purple-600',
      hoverGradient: 'hover:from-purple-600 hover:to-purple-700'
    },
    {
      id: 'boss',
      title: 'Boss',
      icon: TrendingUp,
      description: 'Analytics e performance overview',
      gradient: 'from-emerald-500 to-emerald-600',
      hoverGradient: 'hover:from-emerald-600 hover:to-emerald-700'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Logo e Header */}
        <div className="text-center mb-12">
          <img 
            src="/logo-meraviglia.png" 
            alt="Meraviglia Lab" 
            className="h-20 mx-auto mb-6"
            onError={(e) => {
              // Fallback se logo non caricato
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <div className="hidden text-5xl mb-6">🎯</div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Agency Dashboard Demo
          </h1>
          <p className="text-lg md:text-xl text-gray-600">
            Scegli il tuo ruolo per esplorare la piattaforma
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.id)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-left border-2 border-transparent hover:border-gray-200 transform hover:-translate-y-1"
              >
                {/* Icon Background */}
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${role.gradient} ${role.hoverGradient} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {role.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {role.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-gray-400 group-hover:text-gray-900 transition-colors">
                  <span className="text-sm font-semibold mr-2">Esplora</span>
                  <svg 
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            💡 <strong>Demo interattiva</strong> - Esplora liberamente tutte le funzionalità
          </p>
          <p className="text-xs text-gray-400">
            Powered by React + Vite + Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
