import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Filter, MoreVertical, Grid3x3, List, User, Clock, AlertCircle, Package, Settings } from 'lucide-react';

export default function CustomerTickets() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const tickets = [
    {
      id: 'TKT-10234',
      orderNumber: 'ORD-45676',
      issueType: 'Part Missing',
      status: 'open',
      lastUpdated: '2 hours ago',
      description: 'Missing component in delivered package',
      priority: 'high',
      assignedTo: 'Sarah Johnson',
      category: 'Delivery',
      createdDate: '2024-03-08',
      company: 'Acme Corp',
    },
    {
      id: 'TKT-10198',
      orderNumber: 'ORD-45321',
      issueType: 'Delivery Delay',
      status: 'in-progress',
      lastUpdated: '1 day ago',
      description: 'Order delayed beyond expected delivery date',
      priority: 'medium',
      assignedTo: 'Mike Chen',
      category: 'Logistics',
      createdDate: '2024-03-07',
      company: 'Acme Corp',
    },
    {
      id: 'TKT-10145',
      orderNumber: 'ORD-44987',
      issueType: 'Wrong Part',
      status: 'resolved',
      lastUpdated: '3 days ago',
      description: 'Received incorrect part number',
      priority: 'high',
      assignedTo: 'Emily Davis',
      category: 'Quality',
      createdDate: '2024-03-05',
      company: 'Acme Corp',
    },
    {
      id: 'TKT-10098',
      orderNumber: 'ORD-44756',
      issueType: 'Quality Issue',
      status: 'closed',
      lastUpdated: '1 week ago',
      description: 'Part quality does not meet specifications',
      priority: 'medium',
      assignedTo: 'John Smith',
      category: 'Quality',
      createdDate: '2024-03-01',
      company: 'Acme Corp',
    },
    {
      id: 'TKT-10045',
      orderNumber: 'ORD-44532',
      issueType: 'Installation Support',
      status: 'resolved',
      lastUpdated: '2 weeks ago',
      description: 'Need help with part installation',
      priority: 'low',
      assignedTo: 'Sarah Johnson',
      category: 'Technical',
      createdDate: '2024-02-25',
      company: 'Acme Corp',
    },
    {
      id: 'TKT-10012',
      orderNumber: 'ORD-44321',
      issueType: 'Return Request',
      status: 'closed',
      lastUpdated: '3 weeks ago',
      description: 'Request to return unused parts',
      priority: 'low',
      assignedTo: 'Mike Chen',
      category: 'Returns',
      createdDate: '2024-02-18',
      company: 'Acme Corp',
    },
  ];

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'open':
        return { color: 'bg-blue-100 text-blue-700', label: 'Open' };
      case 'in-progress':
        return { color: 'bg-amber-100 text-amber-700', label: 'In Progress' };
      case 'resolved':
        return { color: 'bg-green-100 text-green-700', label: 'Resolved' };
      case 'closed':
        return { color: 'bg-gray-100 text-gray-700', label: 'Closed' };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: status };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'high':
        return { color: 'bg-red-100 text-red-700', label: 'High Risk' };
      case 'medium':
        return { color: 'bg-orange-100 text-orange-700', label: 'Medium Risk' };
      case 'low':
        return { color: 'bg-green-100 text-green-700', label: 'Low Risk' };
      default:
        return { color: 'bg-gray-100 text-gray-700', label: priority };
    }
  };

  const getStatusBorderColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'border-t-blue-500';
      case 'in-progress':
        return 'border-t-amber-500';
      case 'resolved':
        return 'border-t-green-500';
      case 'closed':
        return 'border-t-gray-400';
      default:
        return 'border-t-gray-300';
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.issueType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: tickets.length,
    open: tickets.filter((t) => t.status === 'open').length,
    'in-progress': tickets.filter((t) => t.status === 'in-progress').length,
    resolved: tickets.filter((t) => t.status === 'resolved').length,
    closed: tickets.filter((t) => t.status === 'closed').length,
  };

  return (
    <div className="h-full flex flex-col overflow-hidden bg-[#F5F6F8]">
      <div className="flex-1 overflow-y-auto">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">Support Tickets</h1>
              <p className="text-sm text-gray-500">
                Manage delivery operations, team allocation, and issue tracking
              </p>
            </div>
            <button
              onClick={() => navigate('/customer/create-ticket')}
              className="flex items-center gap-2 px-5 py-2.5 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors font-medium text-sm shadow-sm"
            >
              + Create Ticket
            </button>
          </div>

          {/* Toolbar */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Left side - Search */}
            <div className="flex flex-1 gap-3 w-full sm:w-auto max-w-md">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets, orders, issues..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side - Filter and View Toggle */}
            <div className="flex items-center gap-3">
              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent min-w-[140px]"
              >
                <option value="all">All ({statusCounts.all})</option>
                <option value="open">Open ({statusCounts.open})</option>
                <option value="in-progress">In Progress ({statusCounts['in-progress']})</option>
                <option value="resolved">Resolved ({statusCounts.resolved})</option>
                <option value="closed">Closed ({statusCounts.closed})</option>
              </select>

              {/* View Toggle */}
              <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-[#C8102E] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Grid3x3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-[#C8102E] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Grid View */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {filteredTickets.length === 0 ? (
                <div className="col-span-full bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <p className="text-gray-500">No tickets found matching your criteria</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => {
                  const statusConfig = getStatusConfig(ticket.status);
                  const priorityConfig = getPriorityConfig(ticket.priority);
                  const borderColor = getStatusBorderColor(ticket.status);

                  return (
                    <div
                      key={ticket.id}
                      className={`bg-white rounded-lg border border-gray-200 border-t-[3px] ${borderColor} hover:shadow-lg transition-all cursor-pointer`}
                      onClick={() => navigate(`/customer/tickets/${ticket.id}`)}
                    >
                      {/* Card Header */}
                      <div className="p-4">
                        {/* Ticket ID, Status Badge, and Menu */}
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <Package className="w-4 h-4 text-[#C8102E]" />
                            <span className="text-sm font-bold text-[#C8102E] font-mono">
                              {ticket.id}
                            </span>
                            <span
                              className={`inline-flex px-2.5 py-1 rounded text-xs font-semibold ${statusConfig.color}`}
                            >
                              {statusConfig.label}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                            }}
                            className="p-1 hover:bg-gray-100 rounded transition-colors"
                          >
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                          </button>
                        </div>

                        {/* Issue Title */}
                        <h3 className="text-base font-bold text-gray-900 mb-4">
                          {ticket.issueType}
                        </h3>

                        {/* Details Grid - 2 Columns */}
                        <div className="space-y-3">
                          {/* Row 1: Assigned To | Category */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Assigned To
                              </p>
                              <p className="text-sm text-gray-900 font-semibold">{ticket.assignedTo}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Category
                              </p>
                              <p className="text-sm text-gray-900 font-semibold">{ticket.category}</p>
                            </div>
                          </div>

                          {/* Row 2: Created Date | Order Number */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Created Date
                              </p>
                              <p className="text-sm text-gray-900">{ticket.createdDate}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Order Number
                              </p>
                              <p className="text-sm text-gray-900 font-mono">{ticket.orderNumber}</p>
                            </div>
                          </div>

                          {/* Row 3: Priority Level | Last Updated */}
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Priority Level
                              </p>
                              <p className="text-sm text-gray-900 capitalize font-semibold">{ticket.priority}</p>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                                Last Updated
                              </p>
                              <p className="text-sm text-gray-900">{ticket.lastUpdated}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : (
            /* List View */
            <div className="space-y-3">
              {filteredTickets.length === 0 ? (
                <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
                  <p className="text-gray-500">No tickets found matching your criteria</p>
                </div>
              ) : (
                filteredTickets.map((ticket) => {
                  const statusConfig = getStatusConfig(ticket.status);
                  const priorityConfig = getPriorityConfig(ticket.priority);

                  // Get initials for avatar
                  const initials = ticket.assignedTo
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase();

                  return (
                    <div
                      key={ticket.id}
                      className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all cursor-pointer group"
                      onClick={() => navigate(`/customer/tickets/${ticket.id}`)}
                    >
                      <div className="flex items-center gap-6 p-5">
                        {/* Ticket ID */}
                        <div className="w-28 flex-shrink-0">
                          <span className="text-sm font-semibold text-[#C8102E] font-mono">
                            {ticket.id}
                          </span>
                        </div>

                        {/* Issue Type & Description */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 text-sm mb-1 truncate">
                            {ticket.issueType}
                          </h3>
                          <p className="text-xs text-gray-500 truncate">{ticket.description}</p>
                        </div>

                        {/* Status Badge */}
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-medium ${statusConfig.color}`}
                          >
                            {statusConfig.label}
                          </span>
                        </div>

                        {/* Priority Badge */}
                        <div className="flex-shrink-0">
                          <span
                            className={`inline-flex px-3 py-1.5 rounded-lg text-xs font-medium ${priorityConfig.color}`}
                          >
                            {priorityConfig.label}
                          </span>
                        </div>

                        {/* Assigned Person with Avatar */}
                        <div className="flex items-center gap-2 w-40 flex-shrink-0">
                          <div className="w-8 h-8 bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-xs">{initials}</span>
                          </div>
                          <span className="text-sm text-gray-700 truncate">{ticket.assignedTo}</span>
                        </div>

                        {/* Time */}
                        <div className="flex items-center gap-1.5 w-28 flex-shrink-0">
                          <Clock className="w-3.5 h-3.5 text-gray-400" />
                          <span className="text-xs text-gray-500">{ticket.lastUpdated}</span>
                        </div>

                        {/* Actions */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors opacity-0 group-hover:opacity-100 flex-shrink-0"
                        >
                          <MoreVertical className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}