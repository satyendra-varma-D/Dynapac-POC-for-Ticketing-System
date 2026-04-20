import { useNavigate } from 'react-router';
import { AlertTriangle, TrendingUp, Users, Clock } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const ticketVolumeData = [
  { day: 'Mon', tickets: 45 },
  { day: 'Tue', tickets: 52 },
  { day: 'Wed', tickets: 38 },
  { day: 'Thu', tickets: 61 },
  { day: 'Fri', tickets: 48 },
  { day: 'Sat', tickets: 28 },
  { day: 'Sun', tickets: 22 },
];

const slaBreachData = [
  { day: 'Mon', breaches: 3 },
  { day: 'Tue', breaches: 5 },
  { day: 'Wed', breaches: 2 },
  { day: 'Thu', breaches: 7 },
  { day: 'Fri', breaches: 4 },
  { day: 'Sat', breaches: 1 },
  { day: 'Sun', breaches: 0 },
];

const agentWorkload = [
  { name: 'Sarah Johnson', active: 12, resolved: 45, slaRisk: 3 },
  { name: 'Mike Chen', active: 8, resolved: 52, slaRisk: 1 },
  { name: 'Lisa Brown', active: 15, resolved: 38, slaRisk: 5 },
  { name: 'John Davis', active: 6, resolved: 61, slaRisk: 0 },
];

const escalations = [
  { id: 'TKT-2456', reason: 'Complex Technical Issue', agent: 'Sarah Johnson', time: '2h ago' },
  { id: 'TKT-2449', reason: 'SLA Breach Risk', agent: 'Lisa Brown', time: '4h ago' },
  { id: 'TKT-2445', reason: 'Customer Escalation', agent: 'Mike Chen', time: '6h ago' },
];

export default function SupervisorDashboard() {
  const navigate = useNavigate();

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Supervisor Dashboard</h1>
        <p className="text-sm text-gray-500">Team performance and ticket analytics overview</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Open Tickets</p>
              <p className="text-3xl font-semibold text-gray-900">41</p>
              <p className="text-xs text-green-600 mt-1">↓ 12% from last week</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">SLA At Risk</p>
              <p className="text-3xl font-semibold text-[#C8102E]">9</p>
              <p className="text-xs text-[#C8102E] mt-1">↑ 3 from yesterday</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-[#C8102E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Agents</p>
              <p className="text-3xl font-semibold text-gray-900">4</p>
              <p className="text-xs text-gray-500 mt-1">All agents online</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
              <p className="text-3xl font-semibold text-gray-900">2.4h</p>
              <p className="text-xs text-green-600 mt-1">↓ 0.5h improvement</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Ticket Volume Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Ticket Volume Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ticketVolumeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar dataKey="tickets" fill="#C8102E" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SLA Breach Heatmap */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">SLA Breach Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={slaBreachData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="breaches" stroke="#C8102E" strokeWidth={2} dot={{ fill: '#C8102E', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Agent Workload & Escalations */}
      <div className="grid grid-cols-3 gap-6">
        {/* Agent Workload */}
        <div className="col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Agent Workload</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {agentWorkload.map((agent, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-700">
                          {agent.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{agent.name}</p>
                        <p className="text-xs text-gray-500">{agent.active} active tickets</p>
                      </div>
                    </div>
                    <button
                      onClick={() => navigate('/queue-management')}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors"
                    >
                      Reassign
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Active</p>
                      <p className="text-lg font-semibold text-gray-900">{agent.active}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Resolved (7d)</p>
                      <p className="text-lg font-semibold text-gray-900">{agent.resolved}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">SLA Risk</p>
                      <p className={`text-lg font-semibold ${agent.slaRisk > 0 ? 'text-[#C8102E]' : 'text-gray-900'}`}>
                        {agent.slaRisk}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Escalations */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Recent Escalations</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {escalations.map((escalation, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="flex items-start gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-[#C8102E] mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <button
                        onClick={() => navigate(`/dashboard/ticket/${escalation.id}`)}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        {escalation.id}
                      </button>
                      <p className="text-xs text-gray-600 mt-1">{escalation.reason}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        By {escalation.agent} • {escalation.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => navigate('/sla-escalation')}
              className="w-full mt-4 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              View All Escalations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
