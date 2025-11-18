import { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';
import { 
  DollarSign,
  Briefcase,
  Calendar,
  MessageSquare,
  FileText,
  Download,
  Send,
  TrendingUp,
  Clock
} from 'lucide-react';
import { mockClients } from '../../data/mockClients';
import { mockProjects } from '../../data/mockProjects';
import { mockBossClientMessages } from '../../data/mockBossClientMessages';

export default function ClientDashboard() {
  const { user } = useAuth();
  const [newMessage, setNewMessage] = useState('');

  // ===== COMPUTED DATA =====

  // Cliente info (basato su user.clientId)
  const clientInfo = useMemo(() => {
    return mockClients.find(c => c.id === user.clientId);
  }, [user.clientId]);

  // Progetti del cliente
  const clientProjects = useMemo(() => {
    return mockProjects.filter(p => p.clientId === user.clientId);
  }, [user.clientId]);

  // Stats
  const stats = useMemo(() => {
    if (!clientInfo) return { totalBudget: 0, totalSpent: 0, activeProjects: 0, nextDeadline: null };

    const totalBudget = clientProjects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = clientProjects.reduce((sum, p) => sum + p.spent, 0);
    const activeProjects = clientProjects.filter(p => 
      p.status === 'active' || p.status === 'in-progress'
    ).length;

    // Prossima deadline
    const now = new Date();
    const upcomingProjects = clientProjects
      .filter(p => new Date(p.endDate) > now && p.status !== 'completed')
      .sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    
    const nextDeadline = upcomingProjects.length > 0 
      ? new Date(upcomingProjects[0].endDate)
      : null;

    return { totalBudget, totalSpent, activeProjects, nextDeadline };
  }, [clientInfo, clientProjects]);

  // Messaggi con agenzia
  const clientMessages = useMemo(() => {
    return mockBossClientMessages
      .filter(m => m.clientId === user.clientId)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  }, [user.clientId]);

  // Mock report mensili
  const mockReports = useMemo(() => {
    return [
      {
        id: 1,
        month: 'Ottobre',
        year: 2024,
        generatedAt: '2024-11-01',
        metrics: {
          impressions: 45200,
          clicks: 3800,
          conversions: 145,
          spend: stats.totalSpent
        }
      },
      {
        id: 2,
        month: 'Settembre',
        year: 2024,
        generatedAt: '2024-10-01',
        metrics: {
          impressions: 38900,
          clicks: 3200,
          conversions: 120,
          spend: stats.totalSpent * 0.85
        }
      },
      {
        id: 3,
        month: 'Agosto',
        year: 2024,
        generatedAt: '2024-09-01',
        metrics: {
          impressions: 42100,
          clicks: 3500,
          conversions: 132,
          spend: stats.totalSpent * 0.90
        }
      }
    ];
  }, [stats.totalSpent]);

  // ===== HANDLERS =====

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    alert(`Messaggio inviato all'agenzia:\n"${newMessage}"\n\n(In produzione questo invierebbe notifica a Boss/Team)`);
    setNewMessage('');
  };

  const handleDownloadReport = (report) => {
    alert(`Download report ${report.month} ${report.year}\n\n(In produzione questo genererebbe PDF e avvierebbe download)`);
  };

  // ===== UTILITY FUNCTIONS =====

  const formatCurrency = (amount) => {
    return `€${amount.toLocaleString('it-IT')}`;
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Ora';
    if (diffMins < 60) return `${diffMins} min fa`;
    if (diffHours < 24) return `${diffHours}h fa`;
    if (diffDays === 1) return 'Ieri';
    if (diffDays < 7) return `${diffDays} giorni fa`;
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  const getProjectStatusBadge = (status) => {
    const variants = {
      'active': { variant: 'info', label: 'Attivo' },
      'in-progress': { variant: 'warning', label: 'In Corso' },
      'review': { variant: 'warning', label: 'In Revisione' },
      'completed': { variant: 'success', label: 'Completato' },
      'paused': { variant: 'default', label: 'In Pausa' }
    };
    const config = variants[status] || variants.active;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const calculateProgress = (spent, budget) => {
    return Math.round((spent / budget) * 100);
  };

  const formatDeadline = (date) => {
    if (!date) return 'Nessuna';
    
    const now = new Date();
    const diffDays = Math.ceil((date - now) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Scaduta';
    if (diffDays === 0) return 'Oggi';
    if (diffDays === 1) return 'Domani';
    if (diffDays < 7) return `${diffDays} giorni`;
    
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  // ===== RENDER =====

  if (!clientInfo) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Cliente non trovato</p>
      </div>
    );
  }

  const budgetRemaining = stats.totalBudget - stats.totalSpent;
  const budgetPercentage = stats.totalBudget > 0 
    ? Math.round((stats.totalSpent / stats.totalBudget) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-primary-600 to-blue-600 rounded-xl p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="text-5xl">{clientInfo.logo}</div>
          <div>
            <h1 className="text-3xl font-bold mb-1">
              Benvenuto, {user.name.split(' ')[0]}!
            </h1>
            <p className="text-blue-100">
              {clientInfo.name} · {clientInfo.industry}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Budget Utilizzato"
          value={formatCurrency(stats.totalSpent)}
          change={`${formatCurrency(budgetRemaining)} rimanenti`}
          trend={budgetPercentage > 80 ? 'down' : 'neutral'}
          icon={DollarSign}
        />
        <StatCard
          title="Progetti Attivi"
          value={stats.activeProjects}
          change={`${clientProjects.length} totali`}
          trend="neutral"
          icon={Briefcase}
        />
        <StatCard
          title="Prossima Deadline"
          value={formatDeadline(stats.nextDeadline)}
          change={stats.nextDeadline ? 'In corso' : 'Nessuna scadenza'}
          trend="neutral"
          icon={Calendar}
        />
      </div>

      {/* Budget Progress */}
      <Card title="Riepilogo Budget">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Budget Totale Progetti</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats.totalBudget)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Speso</p>
              <p className="text-2xl font-bold text-primary-600">
                {formatCurrency(stats.totalSpent)}
              </p>
            </div>
          </div>
          
          {/* Progress bar */}
          <div>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className={`h-4 rounded-full transition-all ${
                  budgetPercentage >= 90 ? 'bg-red-500' : 
                  budgetPercentage >= 70 ? 'bg-yellow-500' : 
                  'bg-emerald-500'
                }`}
                style={{ width: `${budgetPercentage}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>0%</span>
              <span className="font-semibold">{budgetPercentage}% utilizzato</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Progetti */}
      <Card title={`I Tuoi Progetti (${clientProjects.length})`}>
        {clientProjects.length === 0 ? (
          <div className="text-center py-8">
            <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">Nessun progetto attivo</p>
          </div>
        ) : (
          <div className="space-y-4">
            {clientProjects.map(project => {
              const progress = calculateProgress(project.spent, project.budget);
              const daysLeft = Math.ceil(
                (new Date(project.endDate) - new Date()) / (1000 * 60 * 60 * 24)
              );
              
              return (
                <div 
                  key={project.id} 
                  className="p-5 border border-gray-200 rounded-lg hover:shadow-md transition-all bg-white"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getProjectStatusBadge(project.status)}
                        {project.priority === 'high' && (
                          <Badge variant="danger" size="sm">Priorità Alta</Badge>
                        )}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        👤 Gestito da: {project.assignedTo}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatCurrency(project.spent)}
                      </p>
                      <p className="text-xs text-gray-500">
                        su {formatCurrency(project.budget)}
                      </p>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        Avanzamento
                      </span>
                      <span className="text-sm font-semibold text-gray-900">
                        {progress}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${
                          progress >= 90 ? 'bg-red-500' : 
                          progress >= 70 ? 'bg-yellow-500' : 
                          'bg-emerald-500'
                        }`}
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span>
                        Inizio: {new Date(project.startDate).toLocaleDateString('it-IT')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className={daysLeft < 7 && daysLeft > 0 ? 'text-orange-600 font-semibold' : 'text-gray-600'}>
                        Scadenza: {new Date(project.endDate).toLocaleDateString('it-IT')}
                        {daysLeft > 0 && daysLeft < 30 && ` (${daysLeft} giorni)`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {/* Two Columns: Chat + Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chat con Agenzia */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <span>Chat con Agenzia</span>
            </div>
          }
        >
          <div className="space-y-4">
            {/* Messages */}
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {clientMessages.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4">
                  Nessun messaggio
                </p>
              ) : (
                clientMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`rounded-lg p-3 ${
                      msg.from === 'client' ? 'bg-blue-50 ml-8' : 'bg-gray-100 mr-8'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-900">
                        {msg.from === 'client' ? '👤 Tu' : '👨‍💼 Agenzia'}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatMessageTime(msg.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">
                      {msg.message}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Message Input */}
            <form onSubmit={handleSendMessage} className="border-t border-gray-200 pt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Scrivi un messaggio..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💬 Risposta entro 24 ore lavorative
              </p>
            </form>
          </div>
        </Card>

        {/* Report Mensili */}
        <Card 
          title={
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              <span>Report Mensili</span>
            </div>
          }
        >
          <div className="space-y-3">
            {mockReports.map(report => (
              <div 
                key={report.id}
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all bg-white"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      Report {report.month} {report.year}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      Generato il {new Date(report.generatedAt).toLocaleDateString('it-IT')}
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>

                {/* Metrics Preview */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div>
                    <p className="text-xs text-gray-500">Impressions</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {report.metrics.impressions.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Clicks</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {report.metrics.clicks.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Conversioni</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {report.metrics.conversions}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Investimento</p>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatCurrency(Math.round(report.metrics.spend))}
                    </p>
                  </div>
                </div>

                {/* Download Button */}
                <button
                  onClick={() => handleDownloadReport(report)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-lg transition-colors text-sm font-medium"
                >
                  <Download className="w-4 h-4" />
                  Scarica Report PDF
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
    }
