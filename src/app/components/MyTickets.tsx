import { useNavigate } from 'react-router';
import { AlertTriangle, Search, MoreVertical, Grid3x3, List } from 'lucide-react';
import { useState } from 'react';

interface Ticket {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  customerName: string;
  customerEmail: string;
  dealerName: string;
  orderNumber: string;
  category: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  createdDate: string;
  lastUpdated: string;
}

// Mock assigned tickets (tickets assigned to the logged-in agent)
const myAssignedTickets: Ticket[] = [
  {
    id: 'TKT-10234',
    title: 'Part Missing',
    priority: 'high',
    customerName: 'John Smith',
    customerEmail: 'john.smith@autopartsdirect.com',
    dealerName: 'AutoParts Direct',
    orderNumber: 'ORD-45676',
    category: 'Delivery',
    status: 'open',
    createdDate: '2024-03-08',
    lastUpdated: '2 hours ago',
  },
  {
    id: 'TKT-10198',
    title: 'Delivery Delay',
    priority: 'medium',
    customerName: 'Sarah Johnson',
    customerEmail: 'sarah.j@southernparts.com',
    dealerName: 'Southern Parts Hub',
    orderNumber: 'ORD-45321',
    category: 'Logistics',
    status: 'in-progress',
    createdDate: '2024-03-07',
    lastUpdated: '1 day ago',
  },
  {
    id: 'TKT-10145',
    title: 'Wrong Part',
    priority: 'high',
    customerName: 'Michael Davis',
    customerEmail: 'mdavis@precisionauto.com',
    dealerName: 'Precision Auto Parts',
    orderNumber: 'ORD-45123',
    category: 'Quality',
    status: 'resolved',
    createdDate: '2024-03-06',
    lastUpdated: '2 days ago',
  },
  {
    id: 'TKT-10098',
    title: 'Quality Issue',
    priority: 'low',
    customerName: 'Emily Rodriguez',
    customerEmail: 'erodriguez@quickfix.com',
    dealerName: 'Quick Fix Automotive',
    orderNumber: 'ORD-44987',
    category: 'Quality',
    status: 'closed',
    createdDate: '2024-03-05',
    lastUpdated: '3 days ago',
  },
  {
    id: 'TKT-10056',
    title: 'Return Request',
    priority: 'medium',
    customerName: 'Robert Wilson',
    customerEmail: 'rwilson@metroauto.com',
    dealerName: 'Metro Auto Supply',
    orderNumber: 'ORD-44821',
    category: 'Delivery',
    status: 'in-progress',
    createdDate: '2024-03-04',
    lastUpdated: '4 days ago',
  },
];

export default function MyTickets() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const getStatusColor = (status: Ticket['status']) => {
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

  const getStatusLabel = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'Open';
      case 'in-progress':
        return 'In Progress';
      case 'resolved':
        return 'Resolved';
      case 'closed':
        return 'Closed';
      default:
        return status;
    }
  };

  const getBorderColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open':
        return 'border-l-blue-500';
      case 'in-progress':
        return 'border-l-yellow-500';
      case 'resolved':
        return 'border-l-green-500';
      case 'closed':
        return 'border-l-gray-400';
      default:
        return 'border-l-gray-300';
    }
  };

  return (
    <div className="px-8 py-6">
      {/* Page Header */}
      <div className="mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">Support Tickets</h1>
          <p className="text-sm text-gray-500">Manage delivery operations, team allocation, and issue tracking</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex items-center gap-4">
        {/* Search Bar */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search tickets, orders, issues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
          />
        </div>

        {/* Filter Dropdown */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
        >
          <option value="all">All ({myAssignedTickets.length})</option>
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="closed">Closed</option>
        </select>

        {/* View Toggle */}
        <div className="flex items-center bg-white border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 transition-colors ${
              viewMode === 'grid' ? 'bg-[#C8102E] text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 transition-colors ${
              viewMode === 'list' ? 'bg-[#C8102E] text-white' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tickets Grid */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myAssignedTickets.map((ticket) => (
            <div
              key={ticket.id}
              onClick={() => navigate(`/dashboard/ticket/${ticket.id}`)}
              className={`bg-white rounded-lg border-l-4 ${getBorderColor(ticket.status)} border-t border-r border-b border-gray-200 p-5 hover:shadow-md transition-all cursor-pointer`}
            >
              {/* Card Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-[#C8102E]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#C8102E]">{ticket.id}</span>
                      <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusLabel(ticket.status)}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>

              {/* Ticket Title */}
              <h3 className="text-base font-semibold text-gray-900 mb-4">{ticket.title}</h3>

              {/* Ticket Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Customer</div>
                  <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Category</div>
                  <div className="text-sm font-medium text-gray-900">{ticket.category}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Created Date</div>
                  <div className="text-sm text-gray-700">{ticket.createdDate}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Order Number</div>
                  <div className="text-sm text-gray-700">{ticket.orderNumber}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Priority Level</div>
                  <div className="text-sm font-medium text-gray-900 capitalize">{ticket.priority}</div>
                </div>
                <div>
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">Last Updated</div>
                  <div className="text-sm text-gray-700">{ticket.lastUpdated}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tickets Table */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Ticket
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Priority
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Order Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {myAssignedTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => navigate(`/dashboard/ticket/${ticket.id}`)}
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-red-50 rounded-lg flex items-center justify-center">
                          <AlertTriangle className="w-4 h-4 text-[#C8102E]" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-[#C8102E]">{ticket.id}</div>
                          <div className="text-xs text-gray-600">{ticket.title}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 rounded text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {getStatusLabel(ticket.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{ticket.customerName}</div>
                      <div className="text-xs text-gray-500">{ticket.dealerName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.category}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`text-sm font-medium capitalize ${
                        ticket.priority === 'high' ? 'text-red-600' :
                        ticket.priority === 'medium' ? 'text-yellow-600' :
                        'text-green-600'
                      }`}>
                        {ticket.priority}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{ticket.orderNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">{ticket.lastUpdated}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}