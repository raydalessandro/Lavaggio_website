import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// ===== PLACEHOLDER COMPONENTS =====
// Questi verranno sostituiti con i componenti veri
// Per ora servono solo per testare il routing
import Login from './views/Login';
import Layout from './components/layout/Layout';

const ClientDashboard = () => (
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Dashboard</h2>
    <p className="text-gray-600">Dashboard cliente - placeholder</p>
  </div>
);

const TeamDashboard = () => (
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Team Dashboard</h2>
    <p className="text-gray-600">Dashboard team - placeholder</p>
  </div>
);

const BossDashboard = () => (
  <div className="max-w-7xl mx-auto">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">Boss Dashboard</h2>
    <p className="text-gray-600">Dashboard boss - placeholder</p>
  </div>
);

// ===== PROTECTED ROUTE COMPONENT =====
// Protegge le route richiedendo autenticazione
// Se user non è loggato → redirect a /login

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

// ===== DASHBOARD ROUTER =====
// Mostra dashboard diversa in base al ruolo utente

function DashboardRouter() {
  const { user } = useAuth();
  
  return (
    <Layout>
      {user.role === 'client' && <ClientDashboard />}
      {user.role === 'team' && <TeamDashboard />}
      {user.role === 'boss' && <BossDashboard />}
    </Layout>
  );
}

// ===== LOGIN REDIRECT =====
// Se user è già loggato, redirect a dashboard

function LoginPage() {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return <Login />;
}

// ===== MAIN APP COMPONENT =====

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Root redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Login route (redirect se già loggato) */}
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected dashboard route */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            } 
          />
          
          {/* Fallback - qualsiasi altra route → dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
