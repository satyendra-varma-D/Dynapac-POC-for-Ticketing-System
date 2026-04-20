import { useNavigate } from 'react-router';
import {
  AlertTriangle, Clock, Package, CheckCircle, Ticket, TrendingUp, MessageCircle,
  MessageSquare, X, HelpCircle, Send, Paperclip, Plus, User, Sparkles,
  ChevronRight, BarChart3, Users, Filter, Calendar, Activity
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { ImageWithFallback } from './figma/ImageWithFallback';
import agentPhoto from 'figma:asset/fd383cc16a26e9b6919854dcabd4d7c098fb71ce.png';

interface Ticket {
  id: string;
  priority: 'high' | 'medium' | 'low';
  dealer: string;
  orderNumber: string;
  issueType: string;
  status: 'new' | 'in-progress' | 'waiting-supplier' | 'resolved' | 'closed';
  supplierETA: string;
  slaCountdown: string;
  slaRisk: boolean;
  lastUpdated: string;
  source: 'ai' | 'admin' | 'customer';
  createdDate: string;
  createdBy: string;
}

const mockTickets: Ticket[] = [
  {
    id: 'TKT-2451',
    priority: 'high',
    dealer: 'AutoParts Direct',
    orderNumber: 'ORD-89234',
    issueType: 'Shipment Delay',
    status: 'in-progress',
    supplierETA: 'Mar 5, 2026',
    slaCountdown: '2h 15m',
    slaRisk: true,
    lastUpdated: '10 min ago',
    source: 'ai',
    createdDate: '2024-03-08',
    createdBy: 'AI System',
  },
  {
    id: 'TKT-2448',
    priority: 'medium',
    dealer: 'Midwest Motors',
    orderNumber: 'ORD-89187',
    issueType: 'Part Inquiry',
    status: 'waiting-supplier',
    supplierETA: 'Mar 4, 2026',
    slaCountdown: '5h 30m',
    slaRisk: false,
    lastUpdated: '45 min ago',
    source: 'customer',
    createdDate: '2024-03-07',
    createdBy: 'Customer Portal',
  },
  {
    id: 'TKT-2445',
    priority: 'high',
    dealer: 'Coast Auto Supply',
    orderNumber: 'ORD-89156',
    issueType: 'Wrong Part Shipped',
    status: 'new',
    supplierETA: 'Mar 3, 2026',
    slaCountdown: '1h 05m',
    slaRisk: true,
    lastUpdated: '1 hour ago',
    source: 'admin',
    createdDate: '2024-03-06',
    createdBy: 'Mike Chen',
  },
  {
    id: 'TKT-2442',
    priority: 'low',
    dealer: 'Southern Parts Hub',
    orderNumber: 'ORD-89124',
    issueType: 'Order Status',
    status: 'in-progress',
    supplierETA: 'Mar 6, 2026',
    slaCountdown: '8h 20m',
    slaRisk: false,
    lastUpdated: '2 hours ago',
    source: 'ai',
    createdDate: '2024-03-05',
    createdBy: 'AI System',
  },
  {
    id: 'TKT-2440',
    priority: 'medium',
    dealer: 'Prime Automotive',
    orderNumber: 'ORD-89098',
    issueType: 'Missing Documentation',
    status: 'resolved',
    supplierETA: 'N/A',
    slaCountdown: 'Met',
    slaRisk: false,
    lastUpdated: '3 hours ago',
    source: 'customer',
    createdDate: '2024-03-04',
    createdBy: 'Customer Portal',
  },
];

const trendingData = [
  { month: 'Oct', raised: 120, resolved: 95 },
  { month: 'Nov', raised: 145, resolved: 110 },
  { month: 'Dec', raised: 130, resolved: 125 },
  { month: 'Jan', raised: 165, resolved: 140 },
  { month: 'Feb', raised: 180, resolved: 155 },
  { month: 'Mar', raised: 210, resolved: 185 },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      sender: 'support' as const,
      senderName: 'Support Team',
      message: 'Hello! How can we help you today?',
      timestamp: '9:00 AM',
    },
  ]);

  // Filter tickets - show priority tickets
  const priorityTickets = mockTickets.filter(
    ticket => ticket.slaRisk || ticket.priority === 'high' || ticket.status === 'new'
  );

  const slaAtRiskCount = mockTickets.filter(ticket => ticket.slaRisk).length;

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'in-progress':
        return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'waiting-supplier':
        return 'bg-purple-50 text-purple-700 border border-purple-200';
      case 'resolved':
        return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
      case 'closed':
        return 'bg-gray-50 text-gray-700 border border-gray-200';
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getStatusLabel = (status: Ticket['status']) => {
    return status.replace('-', ' ');
  };

  const getPriorityIcon = (priority: Ticket['priority']) => {
    if (priority === 'high') {
      return (
        <div className="w-6 h-6 flex items-center justify-center">
          <AlertTriangle className="w-5 h-5 text-[#C8102E]" />
        </div>
      );
    }
    return (
      <div className="w-6 h-6 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
      </div>
    );
  };

  const getSLAColor = (sla: string, slaRisk: boolean) => {
    if (sla === 'Met') return 'text-green-600 font-medium';
    if (slaRisk) return 'text-[#C8102E] font-semibold';
    return 'text-orange-500 font-medium';
  };

  const handleSendChatMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: 'agent' as const,
        senderName: 'Mike Chen',
        message: chatMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages([...chatMessages, newMessage]);
      setChatMessage('');
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8 space-y-8 animate-fade-in bg-[#F9FAFB]">
      {/* Professional Hero Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="px-2 py-0.5 bg-red-50 text-[#C8102E] text-[10px] font-bold uppercase tracking-wider rounded border border-red-100">Support Agent</div>
            <div className="text-xs text-gray-400">Mike Chen • Germany Center</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Service Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 rounded-xl font-bold text-xs text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
            <Calendar className="w-3.5 h-3.5" /> Export Data
          </button>
          <button
            onClick={() => navigate('/customer/create-ticket')}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#C8102E] rounded-xl font-bold text-xs text-white hover:bg-[#B00E29] transition-all shadow-lg shadow-red-900/10"
          >
            <Plus className="w-4 h-4" /> New Ticket
          </button>
        </div>
      </div>

      {/* Analytics Convergence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-[24px] p-7 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10 flex flex-col justify-between">
            <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6 border border-red-100">
              <AlertTriangle className="w-6 h-6 text-[#C8102E]" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">SLA At Risk</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 leading-none">{slaAtRiskCount}</span>
              <span className="text-sm font-medium text-[#C8102E]">Tickets</span>
            </div>
          </div>
        </div>

        {/* Support Load Card */}
        <div className="bg-white rounded-[24px] p-7 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-6 border border-blue-100">
              <Ticket className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Open Tickets</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 leading-none">{mockTickets.filter(t => t.status !== 'closed').length}</span>
              <span className="text-sm font-medium text-gray-400">Active</span>
            </div>
          </div>
        </div>

        {/* Speed Card */}
        <div className="bg-white rounded-[24px] p-7 border border-gray-100 shadow-sm relative overflow-hidden group">
          <div className="relative z-10">
            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center mb-6 border border-purple-100">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Avg Response</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-gray-900 leading-none">2.4h</span>
              <span className="text-sm font-medium text-gray-400">Last 7d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Analytical Trends & Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-xl font-bold text-gray-900 tracking-tight">Ticketing Trends</h2>
              <p className="text-xs text-gray-400 font-medium">Monthly performance: Raised vs Resolved</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#C8102E] rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Raised</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Resolved</span>
              </div>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendingData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={8}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94A3B8', fontSize: 11, fontWeight: 600 }} />
                <Tooltip cursor={{ fill: '#F8FAFC' }} contentStyle={{ borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="raised" fill="#C8102E" radius={[4, 4, 0, 0]} barSize={20} />
                <Bar dataKey="resolved" fill="#94A3B8" radius={[4, 4, 0, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-[24px] p-8 border border-gray-100 shadow-sm flex flex-col">
          <div className="relative z-10 flex flex-col h-full">
            <h2 className="text-xl font-bold mb-10 tracking-tight flex items-center gap-3">
              <div className="p-2 bg-gray-50 rounded-lg"><Sparkles className="w-4 h-4 text-[#C8102E]" /></div>
              Source Distribution
            </h2>

            <div className="space-y-8 flex-1">
              {[
                { label: 'AI Extraction', count: 42, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                { label: 'Admin Created', count: 18, color: 'text-blue-600', bg: 'bg-blue-50' },
                { label: 'Customer Portal', count: 40, color: 'text-gray-600', bg: 'bg-gray-100' },
              ].map((src, i) => (
                <div key={i}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{src.label}</span>
                    <span className="text-sm font-bold text-gray-900">{src.count}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                    <div className={`h-full ${src.label === 'AI Extraction' ? 'bg-[#C8102E]' : 'bg-gray-300'} transition-all duration-1000`} style={{ width: `${src.count}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-10 w-full py-3 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
              View Insights <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Unified Status Navigator */}
      <div className="bg-white rounded-[16px] p-2 border border-gray-200 shadow-sm flex items-center gap-1 overflow-x-auto no-scrollbar">
        {[
          { label: 'New', count: 4, icon: Plus, iconColor: 'text-blue-600', bgColor: 'bg-blue-50' },
          { label: 'Assigned', count: 12, icon: User, iconColor: 'text-amber-600', bgColor: 'bg-amber-50' },
          { label: 'Waiting', count: 3, icon: Clock, iconColor: 'text-purple-600', bgColor: 'bg-purple-50' },
          { label: 'Resolved', count: 45, icon: CheckCircle, iconColor: 'text-emerald-600', bgColor: 'bg-emerald-50' },
          { label: 'Closed', count: 156, icon: X, iconColor: 'text-gray-600', bgColor: 'bg-gray-100' }
        ].map((status, i) => (
          <div key={i} className="flex-1 min-w-[140px] px-6 py-4 rounded-xl hover:bg-gray-50 transition-all flex items-center gap-4 group cursor-pointer border border-transparent">
            <div className={`w-10 h-10 ${status.bgColor} rounded-lg flex items-center justify-center ${status.iconColor} transition-transform`}>
              <status.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">{status.label}</p>
              <p className="text-lg font-bold text-gray-900 leading-none">{status.count}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-[24px] shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            Priority Tickets
            <span className="px-2.5 py-0.5 bg-red-50 text-[#C8102E] text-[10px] font-bold rounded uppercase tracking-wider">Active Focus</span>
          </h2>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-gray-50 border border-transparent rounded-lg text-xs font-medium focus:bg-white focus:border-gray-200 focus:outline-none transition-all w-36" />
            </div>
            <button className="p-2 text-gray-400 hover:text-[#C8102E] bg-gray-50 rounded-lg transition-colors"><BarChart3 className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Priority</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Identifier</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Dealer Entity</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">By Whom</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Created Date</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-4 text-left text-[10px] font-bold text-gray-400 uppercase tracking-widest">SLA Time</th>
                <th className="px-8 py-4 text-right text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockTickets.filter(t => t.priority === 'high' || t.slaRisk).map((ticket) => (
                <tr key={ticket.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-8 py-5">
                    {ticket.priority === 'high' ? (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-red-50 text-[#C8102E] text-[10px] font-bold uppercase rounded">
                        <div className="w-1 h-1 bg-[#C8102E] rounded-full animate-pulse"></div> High
                      </div>
                    ) : (
                      <div className="text-[10px] font-bold text-gray-400 uppercase">Medium</div>
                    )}
                  </td>
                  <td className="px-8 py-5 text-sm font-bold text-gray-900 tracking-tight">#{ticket.id}</td>
                  <td className="px-8 py-5">
                    <div className="text-sm font-bold text-gray-900">{ticket.dealer}</div>
                    <div className="text-[11px] text-gray-500">{ticket.issueType}</div>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-900">{ticket.createdBy}</td>
                  <td className="px-8 py-5 text-sm text-gray-500">{ticket.createdDate}</td>
                  <td className="px-8 py-5 text-sm">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                      {ticket.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm">
                    <div className={`font-bold ${ticket.slaRisk ? 'text-[#C8102E]' : 'text-emerald-600'}`}>
                      {ticket.slaCountdown}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="px-4 py-2 bg-gray-900 border border-gray-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-white hover:text-gray-900 transition-all">
                      Open
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Help Button - Opens Chat */}
      <button
        onClick={() => setShowChat(!showChat)}
        className="fixed bottom-4 right-4 w-16 h-16 bg-[#C8102E] text-white rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center z-50"
      >
        {showChat ? (
          <X className="w-7 h-7" />
        ) : (
          <MessageCircle className="w-7 h-7" />
        )}
      </button>

      {/* Live Chat Window - Opens above the button */}
      {showChat && (
        <div className="fixed bottom-24 right-4 w-96 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 flex flex-col h-[500px]">
          {/* Chat Header */}
          <div className="bg-[#C8102E] text-white px-5 py-4 rounded-t-lg">
            <div className="flex items-center justify-between mb-1">
              <h3 className="font-semibold text-base">Live Support</h3>
              <button onClick={() => setShowChat(false)} className="text-white hover:text-gray-200 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-red-100">Chat with our support team</p>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {chatMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'agent' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[75%] ${msg.sender === 'agent' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-center gap-2 mb-1">
                    {msg.sender === 'support' && (
                      <div className="w-6 h-6 bg-[#C8102E] rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs font-medium">ST</span>
                      </div>
                    )}
                    <span className="text-xs font-medium text-gray-600">{msg.senderName}</span>
                    <span className="text-xs text-gray-400">{msg.timestamp}</span>
                  </div>
                  <div
                    className={`px-4 py-2.5 rounded-lg ${msg.sender === 'agent'
                      ? 'bg-[#C8102E] text-white'
                      : 'bg-white text-gray-900 border border-gray-200'
                      }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Paperclip className="w-4 h-4" />
              </button>
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendChatMessage()}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
              />
              <button
                onClick={handleSendChatMessage}
                className="px-4 py-2 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}