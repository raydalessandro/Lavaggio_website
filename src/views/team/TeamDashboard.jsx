import { useState, useMemo } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import StatCard from '../../components/ui/StatCard';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Users,
  MessageSquare,
  Send,
  Filter,
  Calendar
} from 'lucide-react';
import { mockClients } from '../../data/mockClients';
import { mockProjects } from '../../data/mockProjects';
import { mockTasks } from '../../data/mockTasks';
import { mockMessages } from '../../data/mockMessages';

export default function TeamDashboard() {
  const { user } = useAuth();
  
  // State
  const [selectedClient, setSelectedClient] = useState(null);
  const [taskFilter, setTaskFilter] = useState('all'); // all, my, urgent, done
  const [newMessage, setNewMessage] = useState('');

  // ===== COMPUTED DATA =====
  
  // Clienti attivi
  const activeClients = useMemo(() => {
    return mockClients.filter(c => c.status === 'active');
  }, []);

  // Task filtrati per cliente selezionato
  const clientFilteredTasks = useMemo(() => {
    if (!selectedClient) return mockTasks;
    return mockTasks.filter(t => t.clientId === selectedClient.id);
  }, [selectedClient]);

  // Task filtrati per tipo (all/my/urgent/done)
  const filteredTasks = useMemo(() => {
    let tasks = clientFilteredTasks;

    switch (taskFilter) {
      case 'my':
        tasks = tasks.filter(t => t.assignedTo === user.name);
        break;
      case 'urgent':
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tasks = tasks.filter(t => {
          const dueDate = new Date(t.dueDate);
          return dueDate <= tomorrow && t.status !== 'done';
        });
        break;
      case 'done':
        tasks = tasks.filter(t => t.status === 'done');
        break;
      default:
        break;
    }

    // Ordina per priorità e deadline
    return tasks.sort((a, b) => {
      const priorityOrder = { high: 0, medium: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return new Date(a.dueDate) - new Date(b.dueDate);
    });
  }, [clientFilteredTasks, taskFilter, user.name]);

  // Messaggi filtrati per cliente
  const filteredMessages = useMemo(() => {
    if (!selectedClient) return [];
    return mockMessages
      .filter(m => m.clientId === selectedClient.id)
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);
  }, [selectedClient]);

  // Stats
  const stats = useMemo(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const tasksToday = mockTasks.filter(t => {
      const dueDate = new Date(t.dueDate);
      return dueDate >= today && dueDate < tomorrow && t.status !== 'done';
    }).length;

    const myClients = activeClients.filter(c => {
      const clientProjects = mockProjects.filter(p => p.clientId === c.id);
      const clientTasks = mockTasks.filter(t => t.clientId === c.id);
      return clientProjects.some(p => p.assignedTo === user.name) ||
             clientTasks.some(t => t.assignedTo === user.name);
    }).length;

    const tasksInReview = mockTasks.filter(t => t.status === 'review').length;

    return { tasksToday, myClients, tasksInReview };
  }, [user.name, activeClients]);

  // ===== HANDLERS =====

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedClient) return;
    
    // In produzione: API call per salvare messaggio
    alert(`Messaggio inviato a ${selectedClient.name}:\n"${newMessage}"\n\n(In produzione questo salverebbe nel database)`);
    setNewMessage('');
  };

  // ===== UTILITY FUNCTIONS =====

  const getStatusBadge = (status) => {
    const variants = {
      'todo': { variant: 'default', label: 'Da Fare' },
      'in-progress': { variant: 'info', label: 'In Corso' },
      'review': { variant: 'warning', label: 'In Revisione' },
      'done': { variant: 'success', label: 'Completato' }
    };
    const config = variants[status] || variants.todo;
    return <Badge variant={config.variant}>{config.label}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'high': { variant: 'danger', label: '🔴 Alta', icon: '🔴' },
      'medium': { variant: 'warning', label: '🟡 Media', icon: '🟡' },
      'low': { variant: 'default', label: '🟢 Bassa', icon: '🟢' }
    };
    const config = variants[priority] || variants.medium;
    return <Badge variant={config.variant} size="sm">{config.label}</Badge>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date < today) {
      return <span className="text-red-600 font-semibold">Scaduto</span>;
    } else if (date >= today && date < tomorrow) {
      return <span className="text-orange-600 font-semibold">Oggi, {date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>;
    } else if (date >= tomorrow && date < new Date(tomorrow.getTime() + 86400000)) {
      return <span className="text-yellow-600 font-semibold">Domani, {date.toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' })}</span>;
    } else {
      return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
    }
  };

  const formatMessageTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Ora';
    if (diffMins < 60) return `${diffMins} min fa`;
    if (diffHours < 24) return `${diffHours}h fa`;
    return date.toLocaleDateString('it-IT', { day: 'numeric', month: 'short' });
  };

  const getClientById = (clientId) => {
    return mockClients.find(c => c.id === clientId);
  };

  // ===== RENDER =====

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Dashboard Team
        </h1>
        <p className="text-gray-600">
          Gestisci task, clienti e comunicazioni
        </p>
      </div>

      {/* Client Filter */}
      <Card>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <label className="text-sm font-semibold text-gray-700">
              Filtra per cliente:
            </label>
          </div>
          
          <select
            value={selectedClient?.id || ''}
            onChange={(e) => {
              const clientId = parseInt(e.target.value);
              setSelectedClient(clientId ? activeClients.find(c => c.id === clientId) : null);
            }}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
          >
            <option value="">Tutti i clienti</option>
            {activeClients.map(client => (
              <option key={client.id} value={client.id}>
                {client.logo} {client.name}
              </option>
            ))}
          </select>

          {selectedClient && (
            <button
              onClick={() => setSelectedClient(null)}
              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
            >
              Rimuovi filtro
            </button>
          )}
        </div>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Task Oggi"
          value={stats.tasksToday}
          change={stats.tasksToday > 0 ? `${stats.tasksToday} da completare` : 'Nessun task urgente'}
          trend={stats.tasksToday > 5 ? 'down' : 'neutral'}
          icon={Clock}
        />
        <StatCard
          title="Miei Clienti"
          value={stats.myClients}
          change={`${activeClients.length} totali attivi`}
          trend="neutral"
          icon={Users}
        />
        <StatCard
          title="In Revisione"
          value={stats.tasksInReview}
          change="Richiedono approvazione"
          trend={stats.tasksInReview > 3 ? 'up' : 'neutral'}
          icon={AlertCircle}
        />
      </div>

      {/* Task Filters */}
      <Card>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setTaskFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              taskFilter === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Tutti ({clientFilteredTasks.length})
          </button>
          <button
            onClick={() => setTaskFilter('my')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              taskFilter === 'my'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Miei Task
          </button>
          <button
            onClick={() => setTaskFilter('urgent')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              taskFilter === 'urgent'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Urgenti
          </button>
          <button
            onClick={() => setTaskFilter('done')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              taskFilter === 'done'
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Completati
          </button>
        </div>
      </Card>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tasks List - 2 columns */}
        <div className="lg:col-span-2 space-y-4">
          <Card title={`Task (${filteredTasks.length})`}>
            {filteredTasks.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-medium">
                  {taskFilter === 'done' ? 'Nessun task completato' : 'Nessun task da mostrare'}
                </p>
                <p className="text-sm text-gray-400 mt-2">
                  {selectedClient ? `per ${selectedClient.name}` : 'Prova a cambiare filtro'}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredTasks.map(task => {
                  const client = getClientById(task.clientId);
                  return (
                    <div
                      key={task.id}
                      className="p-4 border border-gray-200 rounded-lg hover:border-primary-300 hover:shadow-sm transition-all"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            {getPriorityBadge(task.priority)}
                            {getStatusBadge(task.status)}
                          </div>
                          <h4 className="font-semibold text-gray-900 mb-1">
                            {task.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2">
                            {task.description}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-4">
                          <span className="text-gray-600">
                            {client?.logo} <strong>{client?.name}</strong>
                          </span>
                          <span className="text-gray-500">
                            👤 {task.assignedTo}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar className="w-4 h-4" />
                          {formatDate(task.dueDate)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        </div>

        {/* Chat Sidebar - 1 column */}
        <div className="space-y-4">
          
          {/* Team Chat */}
          <Card 
            title={
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                <span>Team Chat</span>
              </div>
            }
          >
            {!selectedClient ? (
              <div className="text-center py-8">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-sm text-gray-500">
                  Seleziona un cliente per vedere la chat
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                
                {/* Messages */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredMessages.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">
                      Nessun messaggio per questo cliente
                    </p>
                  ) : (
                    filteredMessages.map(msg => (
                      <div key={msg.id} className="bg-gray-50 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-semibold text-gray-900">
                            {msg.author}
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
                    💡 In produzione: notifiche real-time e storico completo
                  </p>
                </form>
              </div>
            )}
          </Card>

          {/* Quick Client Stats */}
          {selectedClient && (
            <Card title="Cliente Selezionato">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{selectedClient.logo}</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">
                      {selectedClient.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {selectedClient.industry}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Progetti Attivi</p>
                    <p className="text-lg font-bold text-gray-900">
                      {selectedClient.activeProjects}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Budget Mensile</p>
                    <p className="text-lg font-bold text-gray-900">
                      €{selectedClient.monthlyBudget.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>

      </div>
    </div>
  );
    }
