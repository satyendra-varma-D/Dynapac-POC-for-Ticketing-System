import { useNavigate } from 'react-router';
import { Ticket, Clock, CheckCircle, Plus, Wrench, BookOpen, BarChart3, MessageSquare, AlertCircle, Sparkles, User, Shield, TrendingUp, ChevronRight } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const recentTickets = [
  {
    id: 'TKT-10234',
    orderNumber: 'ORD-45678',
    issueType: 'Part Missing',
    status: 'open',
    lastUpdated: '2 hours ago',
  },
  {
    id: 'TKT-10198',
    orderNumber: 'ORD-45321',
    issueType: 'Delivery Delay',
    status: 'in-progress',
    lastUpdated: '1 day ago',
  },
  {
    id: 'TKT-10145',
    orderNumber: 'ORD-44987',
    issueType: 'Wrong Part',
    status: 'resolved',
    lastUpdated: '3 days ago',
  },
  {
    id: 'TKT-10098',
    orderNumber: 'ORD-44756',
    issueType: 'Quality Issue',
    status: 'closed',
    lastUpdated: '1 week ago',
  },
];

const trendData = [
  { month: 'Sep', raised: 24, resolved: 18 },
  { month: 'Oct', raised: 32, resolved: 25 },
  { month: 'Nov', raised: 28, resolved: 30 },
  { month: 'Dec', raised: 45, resolved: 38 },
  { month: 'Jan', raised: 38, resolved: 42 },
  { month: 'Feb', raised: 52, resolved: 48 },
];

const attributionData = [
  { name: 'AI Assistant', value: 45, icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-50', barColor: '#9333ea' },
  { name: 'Customer Portal', value: 30, icon: User, color: 'text-[#C8102E]', bg: 'bg-red-50', barColor: '#C8102E' },
  { name: 'Admin / Agent', value: 25, icon: Shield, color: 'text-blue-600', bg: 'bg-blue-50', barColor: '#2563eb' },
];

export default function CustomerDashboard() {
  const navigate = useNavigate();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 h-[calc(100vh-64px)] overflow-y-auto">
      {/* Welcome Section */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            Welcome back, John!
          </h1>
          <p className="text-sm text-gray-500 font-medium">
            System Status: <span className="text-green-600 font-bold">Optimal</span> • Last update: 5 mins ago
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3 bg-white p-2 rounded-xl border border-gray-200">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-[10px] font-bold">SJ</div>
            ))}
          </div>
          <span className="text-xs font-semibold text-gray-600">3 Agents Online</span>
        </div>
      </div>

      {/* TIER 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Open Tickets', value: 3, sub: 'Awaiting response', icon: Ticket, color: 'text-blue-600', bg: 'bg-blue-50', trend: '+12%' },
          { label: 'In-Progress', value: 5, sub: 'Being worked on', icon: Clock, color: 'text-yellow-600', bg: 'bg-yellow-50', trend: '-2%' },
          { label: 'Resolved', value: 12, sub: 'Last 30 days', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50', trend: '+18%' },
          { label: 'Closed', value: 84, sub: 'Total history', icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-50', trend: '+5%' },
        ].map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 ${kpi.bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <TrendingUp className="w-3 h-3" /> {kpi.trend}
                </div>
              </div>
              <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">{kpi.label}</p>
              <p className="text-3xl font-black text-gray-900">{kpi.value}</p>
              <p className="text-xs font-medium text-gray-400 mt-2">{kpi.sub}</p>
            </div>
          );
        })}
      </div>

      {/* TIER 2: Insights & Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Monthly Trends Chart */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Ticketing Trends</h2>
              <p className="text-xs font-medium text-gray-500">Raised vs Resolved monthly performance</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#C8102E]"></div>
                <span className="text-xs font-bold text-gray-600">Raised</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs font-bold text-gray-600">Resolved</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: '#9ca3af' }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fontWeight: 600, fill: '#9ca3af' }}
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="raised" fill="#C8102E" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="resolved" fill="#10b981" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Ticket Attribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Ticket Attribution</h2>
          <p className="text-xs font-medium text-gray-500 mb-8">Breakdown of creation sources</p>
          
          <div className="space-y-6 flex-1">
            {attributionData.map((source, idx) => {
              const Icon = source.icon;
              return (
                <div key={idx} className="group cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 ${source.bg} rounded-lg flex items-center justify-center`}>
                        <Icon className={`w-4 h-4 ${source.color}`} />
                      </div>
                      <span className="text-sm font-bold text-gray-700">{source.name}</span>
                    </div>
                    <span className="text-sm font-black text-gray-900">{source.value}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full transition-all duration-1000 ease-out rounded-full"
                      style={{ width: `${source.value}%`, backgroundColor: source.barColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-gray-500 uppercase">Top Source</span>
              <span className="font-bold text-purple-600 bg-purple-50 px-2 py-1 rounded">AI Assistant</span>
            </div>
          </div>
        </div>
      </div>

      {/* TIER 3: Table & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tickets Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">Recent Tickets</h2>
              <button onClick={() => navigate('/customer/tickets')} className="text-xs font-bold text-[#C8102E] hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Ticket ID
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Issue Type
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Last Updated
                    </th>
                    <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50/80 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors">{ticket.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-700">{ticket.issueType}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-lg text-xs font-bold uppercase tracking-tight ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-500">{ticket.lastUpdated}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/customer/tickets/${ticket.id}`)}
                          className="flex items-center gap-1 text-xs font-bold text-[#C8102E] hover:underline"
                        >
                          View <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-6 uppercase tracking-wider text-[10px] text-gray-400">Control Center</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/customer/create-ticket')}
                className="w-full flex items-center justify-between px-5 py-4 bg-[#C8102E] text-white rounded-xl hover:bg-[#A00D25] transition-all shadow-md active:scale-95 group"
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  <span className="font-bold">Create New Ticket</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>

              <button
                onClick={() => navigate('/customer/knowledge-base')}
                className="w-full flex items-center justify-between px-5 py-4 bg-white border-2 border-gray-100 text-gray-700 rounded-xl hover:border-[#C8102E] hover:text-[#C8102E] transition-all group"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5" />
                  <span className="font-bold text-sm">Knowledge Base</span>
                </div>
                <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}