import { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';
import { 
  DollarSign,
  Users,
  Briefcase,
  TrendingUp,
  AlertCircle,
  MessageSquare,
  Send,
  Filter,
  BarChart3,
  Clock,
  CheckCircle2,
  Target
} from 'lucide-react';
import { mockClients } from '../../data/mockClients';
import { mockProjects } from '../../data/mockProjects';
import { mockTasks } from '../../data/mockTasks';
import { mockBossTeamMessages } from '../../data/mockBossTeamMessages';
import { mockBossClientMessages } from '../../data/mockBossClientMessages';

export default function BossDashboard() {
  const { user } = useAuth();
  
  // State
  const [selectedClient, setSelectedClient] = useState(null);
  const [newTeamMessage, setNewTeamMessage] = useState('');
  const [newClientMessage, setNewClientMessage] = useState('');

  // ===== COMPUTED DATA =====
  
  // Clienti attivi
  const activeClients = useMemo(() => {
    return mockClients.filter(c => c.status === 'active');
  }, []);

  // Overview Stats (quando nessun cliente selezionato)
  const overviewStats = useMemo(() => {
    const totalRevenue = activeClients.reduce((sum, c) => sum + c.monthlyBudget, 0);
    const totalProjects = mockProjects.filter(p => {
      const client = mockClients.find(c => c.id === p.clientId);
      return client?.status === 'active';
    }).length;
    
    const projectsAtRisk = mockProjects.filter(p => {
      const now = new Date();
      const endDate = new Date(p.endDate);
      const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
      return daysLeft < 7 && daysLeft > 0 && p.status !== 'completed';
    }).length;

    return {
      totalRevenue,
      activeClients: activeClients.length,
      totalProjects,
      projectsAtRisk
    };
  }, [activeClients]);

  // Client-specific stats (quando cliente selezionato)
  const clientStats = useMemo(() => {
    if (!selectedClient) return null;

    const clientProjects = mockProjects.filter(p => p.clientId === selectedClient.id);
    const clientTasks = mockTasks.filter(t => t.clientId === selectedClient.id);
    
    const totalBudget = clientProjects.reduce((sum, p) => sum + p.budget, 0);
    const totalSpent = clientProjects.reduce((sum, p) => sum + p.spent, 0);
    const activeProjects = clientProjects.filter(p => p.status === 'active' || p.status === 'in-progress').length;
    
    const tasksInProgress = clientTasks.filter(t => 
      t.status === 'in-progress' || t.status === 'review'
    ).length;

    // Team members assegnati
    const teamMembers = [...new Set(
      [...clientProjects.map(p => p.assignedTo), ...clientTasks.map(t => t.assignedTo)]
    )];

    // Last activity
    const allDates = [
      ...clientProjects.map(p => new Date(p.startDate)),
      ...clientTasks.map(t => new Date(t.createdAt))
    ];
    const lastActivity = allDates.length > 0 
      ? new Date(Math.max(...allDates))
      : null;

    return {
      totalBudget,
      totalSpent,
      activeProjects,
      tasksInProgress,
      teamMembers,
      lastActivity,
      projects: clientProjects
    };
  }, [selectedClient]);

  // Messaggi filtrati
  const filteredTeamMessages = useMemo(() => {
    return mockBossTeamMessages
      .filter(m => selectedClient ? m.clientId === selectedClient.id : m.clientId === null)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  }, [selectedClient]);

  const filteredClientMessages = useMemo(() => {
    if (!selectedClient) return [];
    return mockBossClientMessages
      .filter(m => m.clientId === selectedClient.id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  }, [selectedClient]);

  // Team Performance (overview mode)
  const teamPerformance = useMemo(() => {
    const teamMembers = ['Maria Bianchi', 'Luca Verdi', 'Sara Rossi', 'Marco Neri', 'Alessio Tech'];
    
    return teamMembers.map(member => {
      const memberTasks = mockTasks.filter(t => t.assignedTo === member);
      const completedTasks = memberTasks.filter(t => t.status === 'done').length;
      const activeTasks = memberTasks.filter(t => t.status === 'in-progress').length;
      const utilization = memberTasks.length > 0 
        ? Math.round((activeTasks / memberTasks.length) * 100)
        : 0;

      return {
        name: member,
        activeTasks,
        completedTasks,
        utilization
      };
    });
  }, []);

  // Projects at risk (overview mode)
  const projectsAtRisk = useMemo(() => {
    const now = new Date();
    return mockProjects
      .filter(p => {
        const endDate = new Date(p.endDate);
        const daysLeft = Math.ceil((endDate - now) / (1000 * 60 * 60 * 24));
        return daysLeft < 7 && daysLeft > 0 && p.status !== 'completed';
      })
      .slice(0, 5);
  }, []);

  // ===== HANDLERS =====

  const handleSendTeamMessage = (e) => {
    e.preventDefault();
    if (!newTeamMessage.trim()) return;
    
    const context = selectedClient 
      ? `al team per ${selectedClient.name}`
      : 'al team (messaggio globale)';
    
    alert(`Messaggio inviato ${context}:\n"${newTeamMessage}"\n\n(In produzione questo salverebbe nel database e notificherebbe il team)`);
    setNewTeamMessage('');
  };

  const handleSendClientMessage = (e) => {
    e.preventDefault();
    if (!newClientMessage.trim() || !selectedClient) return;
    
    alert(`Messaggio inviato a ${selectedClient.name}:\n"${newClientMessage}"\n\n(In produzione questo invierebbe email + notifica cliente)`);
    setNewClientMessage('');
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
    return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
  };

  const calculateProgress = (spent, budget) => {
    return Math.round((spent / budget) * 100);
  };

  // ===== RENDER =====

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Boss
        </h1>
        <p className="text-gray-600">
          Overview strategica e controllo operativo
        </p>
      </div>

      {/* Client Filter */}
      <Card>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <label className="text-sm font-semibold text-gray-700">
              Vista:
            </label>
          </div>
          
          <select
            value={selectedClient?.id || ''}
            onChange={(e) => {
              const clientId = parseInt(e.target.value);
              setSelectedClient(clientId ? activeClients.find(c => c.id === clientId) : null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm font-medium"
          >
            <option value="">📊 Overview Generale</option>
            <optgroup label="Clienti Attivi">
              {activeClients.map(client => (
                <option key={client.id} value={client.id}>
                  {client.logo} {client.name}
                </option>
              ))}
            </optgroup>
          </select>

          {selectedClient && (
            <button
              onClick={() => setSelectedClient(null)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Torna a Overview
            </button>
          )}
        </div>
      </Card>

      {/* ===== OVERVIEW MODE ===== */}
      {!selectedClient ? (
        <>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Revenue Mensile"
              value={formatCurrency(overviewStats.totalRevenue)}
              change="+12% vs mese scorso"
              trend="up"
              icon={DollarSign}
            />
            <StatCard
              title="Clienti Attivi"
              value={overviewStats.activeClients}
              change={`${mockClients.length} totali`}
              trend="neutral"
              icon={Users}
            />
            <StatCard
              title="Progetti Attivi"
              value={overviewStats.totalProjects}
              change="In corso"
              trend="neutral"
              icon={Briefcase}
            />
            <StatCard
              title="Alert Progetti"
              value={overviewStats.projectsAtRisk}
              change="Scadenza < 7 giorni"
              trend={overviewStats.projectsAtRisk > 0 ? 'down' : 'up'}
              icon={AlertCircle}
            />
          </div>

          {/* Revenue Chart Mockup */}
          <Card title="Revenue Trend (Ultimi 6 mesi)">
            <div className="h-64 bg-gradient-to-br from-primary-50 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-primary-200">
              <div className="text-center">
                <BarChart3 className="w-16 h-16 text-primary-400 mx-auto mb-3" />
                <p className="text-gray-600 font-medium">
                  Grafico Revenue Mensile
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  In produzione: Chart.js o Recharts con dati reali
                </p>
              </div>
            </div>
          </Card>

          {/* Two Columns: Team Performance + Projects at Risk */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Team Performance */}
            <Card title="Team Performance">
              <div className="space-y-3">
                {teamPerformance.map(member => (
                  <div key={member.name} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">{member.name}</span>
                      <span className="text-sm font-medium text-gray-600">
                        {member.utilization}% utilizzo
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>🔵 {member.activeTasks} attivi</span>
                      <span>✅ {member.completedTasks} completati</span>
                    </div>
                    {/* Progress bar */}
                    <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-primary-600 h-2 rounded-full transition-all"
                        style={{ width: `${member.utilization}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects at Risk */}
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-orange-500" />
                  <span>Progetti Attenzione</span>
                </div>
              }
            >
              {projectsAtRisk.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">
                    Nessun progetto a rischio
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Tutte le deadline sotto controllo
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {projectsAtRisk.map(project => {
                    const client = mockClients.find(c => c.id === project.clientId);
                    const endDate = new Date(project.endDate);
                    const daysLeft = Math.ceil((endDate - new Date()) / (1000 * 60 * 60 * 24));
                    
                    return (
                      <div key={project.id} className="p-3 border-l-4 border-orange-500 bg-orange-50 rounded">
                        <div className="flex items-start justify-between mb-1">
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">
                              {project.title}
                            </p>
                            <p className="text-xs text-gray-600 mt-1">
                              {client?.logo} {client?.name}
                            </p>
                          </div>
                          {getProjectStatusBadge(project.status)}
                        </div>
                        <p className="text-sm text-orange-700 font-medium mt-2">
                          ⏰ Scadenza tra {daysLeft} {daysLeft === 1 ? 'giorno' : 'giorni'}
                        </p>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>
          </div>

          {/* Global Team Chat */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Comunicazioni Team Globali</span>
              </div>
            }
          >
            <div className="space-y-4">
              {/* Messages */}
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {filteredTeamMessages.length === 0 ? (
                  <p className="text-sm text-gray-500 text-center py-4">
                    Nessun messaggio globale
                  </p>
                ) : (
                  filteredTeamMessages.map(msg => (
                    <div key={msg.id} className={`rounded-lg p-3 ${
                      msg.from === 'boss' ? 'bg-primary-50 ml-8' : 'bg-gray-100 mr-8'
                    }`}>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-semibold text-gray-900">
                          {msg.from === 'boss' ? '👨‍💼 Tu (Boss)' : `👤 ${msg.fromName}`}
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
              <form onSubmit={handleSendTeamMessage} className="border-t border-gray-200 pt-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTeamMessage}
                    onChange={(e) => setNewTeamMessage(e.target.value)}
                    placeholder="Messaggio globale a tutto il team..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!newTeamMessage.trim()}
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Messaggi globali visibili a tutto il team
                </p>
              </form>
            </div>
          </Card>
        </>
      ) : (
        // ===== CLIENT-FOCUSED MODE =====
        <>
          {/* Client Header Card */}
          <Card>
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedClient.logo}</div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    {selectedClient.name}
                  </h2>
                  <p className="text-gray-600">{selectedClient.industry}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <Badge variant={selectedClient.status === 'active' ? 'success' : 'default'}>
                      {selectedClient.status === 'active' ? 'Attivo' : 'In Pausa'}
                    </Badge>
                    <span className="text-sm text-gray-500">
                      Cliente dal {new Date(selectedClient.startDate).toLocaleDateString('it-IT', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Client Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCard
              title="Budget Totale"
              value={formatCurrency(clientStats.totalBudget)}
              change={`Spent: ${formatCurrency(clientStats.totalSpent)}`}
              trend="neutral"
              icon={DollarSign}
            />
            <StatCard
              title="Progetti Attivi"
              value={clientStats.activeProjects}
              change={`${clientStats.projects.length} totali`}
              trend="neutral"
              icon={Briefcase}
            />
            <StatCard
              title="Task in Corso"
              value={clientStats.tasksInProgress}
              change="Da completare"
              trend="neutral"
              icon={Clock}
            />
            <StatCard
              title="Team Assegnato"
              value={clientStats.teamMembers.length}
              change="Membri attivi"
              trend="neutral"
              icon={Users}
            />
          </div>

          {/* Two Chats Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Chat Boss → Team */}
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-600" />
                  <span>Chat con Team</span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredTeamMessages.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nessun messaggio per questo cliente
                    </p>
                  ) : (
                    filteredTeamMessages.map(msg => (
                      <div key={msg.id} className={`rounded-lg p-3 ${
                        msg.from === 'boss' ? 'bg-purple-50 ml-8' : 'bg-gray-100 mr-8'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {msg.from === 'boss' ? '👨‍💼 Tu' : `👤 ${msg.fromName}`}
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

                <form onSubmit={handleSendTeamMessage} className="border-t border-gray-200 pt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newTeamMessage}
                      onChange={(e) => setNewTeamMessage(e.target.value)}
                      placeholder="Messaggio al team..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!newTeamMessage.trim()}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    💬 Coordinamento interno team
                  </p>
                </form>
              </div>
            </Card>

            {/* Chat Boss → Cliente */}
            <Card 
              title={
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <span>Chat con Cliente</span>
                </div>
              }
            >
              <div className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredClientMessages.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nessun messaggio con questo cliente
                    </p>
                  ) : (
                    filteredClientMessages.map(msg => (
                      <div key={msg.id} className={`rounded-lg p-3 ${
                        msg.from === 'boss' ? 'bg-blue-50 ml-8' : 'bg-gray-100 mr-8'
                      }`}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {msg.from === 'boss' ? '👨‍💼 Tu' : `👤 ${msg.fromName}`}
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

                <form onSubmit={handleSendClientMessage} className="border-t border-gray-200 pt-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newClientMessage}
                      onChange={(e) => setNewClientMessage(e.target.value)}
                      placeholder="Messaggio al cliente..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                    <button
                      type="submit"
                      disabled={!newClientMessage.trim()}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    📧 Comunicazione diretta cliente (+ email notifica)
                  </p>
                </form>
              </div>
            </Card>
          </div>

          {/* Client Projects */}
          <Card title={`Progetti (${clientStats.projects.length})`}>
            {clientStats.projects.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nessun progetto per questo cliente
              </p>
            ) : (
              <div className="space-y-3">
                {clientStats.projects.map(project => {
                  const progress = calculateProgress(project.spent, project.budget);
                  
                  return (
                    <div key={project.id} className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getProjectStatusBadge(project.status)}
                            <Badge variant={project.priority === 'high' ? 'danger' : 'default'} size="sm">
                              {project.priority === 'high' ? '🔴 Alta' : project.priority === 'medium' ? '🟡 Media' : '🟢 Bassa'}
                            </Badge>
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {project.title}
                          </h4>
                          <p className="text-sm text-gray-600">
                            👤 {project.assignedTo}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-gray-900">
                            {formatCurrency(project.spent)} / {formatCurrency(project.budget)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {progress}% completato
                          </p>
                        </div>
                      </div>
                      
                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            progress >= 90 ? 'bg-red-500' : progress >= 70 ? 'bg-yellow-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      
                      <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                        <span>Inizio: {new Date(project.startDate).toLocaleDateString('it-IT')}</span>
                        <span>Fine: {new Date(project.endDate).toLocaleDateString('it-IT')}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>

          {/* Team Members Assigned */}
          <Card title="Team Assegnato">
            <div className="flex flex-wrap gap-3">
              {clientStats.teamMembers.map((member, index) => (
                <div key={index} className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium text-gray-900 flex items-center gap-2">
                  <span>👤</span>
                  <span>{member}</span>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
