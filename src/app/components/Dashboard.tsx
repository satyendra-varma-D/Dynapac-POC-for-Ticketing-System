import { useNavigate } from 'react-router';
import { AlertTriangle, Clock, Package, CheckCircle, Ticket, TrendingUp, MessageCircle, X, HelpCircle, Send, Paperclip } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  },
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
    <div className="max-w-[1600px] mx-auto px-6 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900 mb-2">
          Welcome back, Mike!
        </h1>
        <p className="text-gray-600">
          Focus on priority tickets that need immediate attention
        </p>
      </div>

      {/* KPI Cards - Agent View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">SLA At Risk</p>
              <p className="text-3xl font-bold text-[#C8102E]">{slaAtRiskCount}</p>
              <p className="text-xs text-[#C8102E] mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Requires attention
              </p>
            </div>
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-[#C8102E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Avg Response Time</p>
              <p className="text-3xl font-bold text-gray-900">2.4h</p>
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Last 7 days
              </p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            Priority Tickets
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            Showing high priority and SLA at-risk tickets
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Priority
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Ticket ID
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Dealer
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Order<br />Number
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Issue Type
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Supplier<br />ETA
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  SLA<br />Countdown
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Last<br />Updated
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {priorityTickets.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityIcon(ticket.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-blue-600">
                      {ticket.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{ticket.dealer}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-600">{ticket.orderNumber}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{ticket.issueType}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {getStatusLabel(ticket.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{ticket.supplierETA}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm ${getSLAColor(ticket.slaCountdown, ticket.slaRisk)}`}
                    >
                      {ticket.slaCountdown}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-500">{ticket.lastUpdated}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => navigate(`/dashboard/ticket/${ticket.id}`)}
                      className="text-sm font-medium text-[#C8102E] hover:text-[#A00D25] transition-colors"
                    >
                      View
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