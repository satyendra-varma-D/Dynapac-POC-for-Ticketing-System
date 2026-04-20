import { useState } from 'react';
import { useNavigate } from 'react-router';
import { AlertTriangle, Filter, UserPlus, X } from 'lucide-react';

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
  assignedTo?: string;
}

const unassignedTickets: Ticket[] = [
  {
    id: 'TKT-2456',
    priority: 'high',
    dealer: 'Northern Auto Supply',
    orderNumber: 'ORD-89267',
    issueType: 'Missing Parts',
    status: 'new',
    supplierETA: 'Mar 4, 2026',
    slaCountdown: '1h 30m',
    slaRisk: true,
    lastUpdated: '5 min ago',
  },
  {
    id: 'TKT-2455',
    priority: 'medium',
    dealer: 'East Coast Motors',
    orderNumber: 'ORD-89256',
    issueType: 'Part Inquiry',
    status: 'new',
    supplierETA: 'Mar 5, 2026',
    slaCountdown: '4h 20m',
    slaRisk: false,
    lastUpdated: '12 min ago',
  },
  {
    id: 'TKT-2453',
    priority: 'high',
    dealer: 'West Parts Direct',
    orderNumber: 'ORD-89242',
    issueType: 'Urgent Delivery',
    status: 'new',
    supplierETA: 'Mar 3, 2026',
    slaCountdown: '45m',
    slaRisk: true,
    lastUpdated: '20 min ago',
  },
];

const myTickets: Ticket[] = [
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
    assignedTo: 'Sarah Johnson',
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
    assignedTo: 'Sarah Johnson',
  },
];

const teamTickets: Ticket[] = [
  {
    id: 'TKT-2450',
    priority: 'medium',
    dealer: 'Central Auto Parts',
    orderNumber: 'ORD-89223',
    issueType: 'Order Status',
    status: 'in-progress',
    supplierETA: 'Mar 6, 2026',
    slaCountdown: '6h 45m',
    slaRisk: false,
    lastUpdated: '30 min ago',
    assignedTo: 'Mike Chen',
  },
  {
    id: 'TKT-2449',
    priority: 'high',
    dealer: 'Pacific Motors',
    orderNumber: 'ORD-89212',
    issueType: 'Wrong Part',
    status: 'in-progress',
    supplierETA: 'Mar 4, 2026',
    slaCountdown: '3h 10m',
    slaRisk: true,
    lastUpdated: '1 hour ago',
    assignedTo: 'Lisa Brown',
  },
];

export default function QueueManagement() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'unassigned' | 'my-tickets' | 'team'>('unassigned');
  const [selectedTickets, setSelectedTickets] = useState<string[]>([]);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const getCurrentTickets = () => {
    if (activeTab === 'unassigned') return unassignedTickets;
    if (activeTab === 'my-tickets') return myTickets;
    return teamTickets;
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-100 text-blue-700';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-700';
      case 'waiting-supplier':
        return 'bg-purple-100 text-purple-700';
      case 'resolved':
        return 'bg-green-100 text-green-700';
      case 'closed':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
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

  const toggleTicketSelection = (ticketId: string) => {
    setSelectedTickets((prev) =>
      prev.includes(ticketId)
        ? prev.filter((id) => id !== ticketId)
        : [...prev, ticketId]
    );
  };

  const toggleSelectAll = () => {
    const currentTickets = getCurrentTickets();
    if (selectedTickets.length === currentTickets.length) {
      setSelectedTickets([]);
    } else {
      setSelectedTickets(currentTickets.map((t) => t.id));
    }
  };

  return (
    <div className="max-w-[1440px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">Queue Management</h1>
        <p className="text-sm text-gray-500">Manage and assign support tickets across teams</p>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 flex items-center justify-between px-6 py-4">
          <div className="flex gap-1">
            <button
              onClick={() => {
                setActiveTab('unassigned');
                setSelectedTickets([]);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'unassigned'
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Unassigned ({unassignedTickets.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('my-tickets');
                setSelectedTickets([]);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'my-tickets'
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              My Tickets ({myTickets.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('team');
                setSelectedTickets([]);
              }}
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === 'team'
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              Team Queue ({teamTickets.length})
            </button>
          </div>

          <div className="flex items-center gap-3">
            {selectedTickets.length > 0 && (
              <button
                onClick={() => setShowAssignModal(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors"
              >
                <UserPlus className="w-4 h-4" />
                Assign ({selectedTickets.length})
              </button>
            )}
            <button
              onClick={() => setShowFilterModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3.5 text-left">
                  <input
                    type="checkbox"
                    checked={selectedTickets.length === getCurrentTickets().length && getCurrentTickets().length > 0}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E] cursor-pointer"
                  />
                </th>
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
                  Order Number
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Issue Type
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  SLA Countdown
                </th>
                {activeTab !== 'unassigned' && (
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    Assigned To
                  </th>
                )}
                <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {getCurrentTickets().map((ticket) => (
                <tr
                  key={ticket.id}
                  className={`hover:bg-gray-50 transition-colors ${
                    ticket.slaRisk ? 'bg-red-50' : ''
                  }`}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedTickets.includes(ticket.id)}
                      onChange={() => toggleTicketSelection(ticket.id)}
                      className="w-4 h-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E] cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getPriorityIcon(ticket.priority)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-blue-600">{ticket.id}</span>
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
                      {ticket.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        ticket.slaRisk ? 'text-[#C8102E]' : 'text-gray-900'
                      }`}
                    >
                      {ticket.slaCountdown}
                    </span>
                  </td>
                  {activeTab !== 'unassigned' && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">{ticket.assignedTo}</span>
                    </td>
                  )}
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

      {/* Assign Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Assign Tickets
                </h3>
                <p className="text-sm text-gray-600">
                  Assign {selectedTickets.length} ticket(s) to an agent
                </p>
              </div>
              <button
                onClick={() => setShowAssignModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Agent
              </label>
              <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all">
                <option>Sarah Johnson</option>
                <option>Mike Chen</option>
                <option>Lisa Brown</option>
                <option>John Davis</option>
              </select>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAssignModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAssignModal(false);
                  setSelectedTickets([]);
                }}
                className="px-4 py-2 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors"
              >
                Assign
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full mx-4 p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Filter Tickets</h3>
              <button
                onClick={() => setShowFilterModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Region
                </label>
                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all">
                  <option>All Regions</option>
                  <option>Germany</option>
                  <option>European Union</option>
                  <option>Global</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Priority
                </label>
                <select className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all">
                  <option>All Priorities</option>
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>

              <div>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#C8102E] focus:ring-[#C8102E] cursor-pointer"
                  />
                  <span className="ml-2 text-sm text-gray-700">SLA Risk Only</span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 bg-[#C8102E] text-white rounded-lg text-sm font-medium hover:bg-[#A00D25] transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}