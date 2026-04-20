import { useNavigate } from 'react-router';
import { Ticket, Package, Clock, CheckCircle, Plus, FileText, Search, Wrench, BookOpen, ShoppingCart, BarChart3, MessageSquare } from 'lucide-react';

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
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">
          Welcome back, John!
        </h1>
        <p className="text-sm text-gray-500">
          Here's an overview of your orders and support tickets
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Open Tickets</p>
              <p className="text-3xl font-bold text-gray-900">3</p>
              <p className="text-xs text-gray-500 mt-2">Awaiting response</p>
            </div>
            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
              <Ticket className="w-7 h-7 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Orders In Transit</p>
              <p className="text-3xl font-bold text-gray-900">5</p>
              <p className="text-xs text-gray-500 mt-2">On the way</p>
            </div>
            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
              <Package className="w-7 h-7 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Delayed Orders</p>
              <p className="text-3xl font-bold text-[#C8102E]">2</p>
              <p className="text-xs text-[#C8102E] mt-2">Check status</p>
            </div>
            <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center">
              <Clock className="w-7 h-7 text-[#C8102E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Recently Resolved</p>
              <p className="text-3xl font-bold text-gray-900">12</p>
              <p className="text-xs text-green-600 mt-2">Last 30 days</p>
            </div>
            <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-7 h-7 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Tickets Table */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Recent Tickets</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Ticket ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Order Number
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Issue Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Last Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-100">
                  {recentTickets.map((ticket) => (
                    <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-gray-900">{ticket.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{ticket.orderNumber}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-700">{ticket.issueType}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 rounded-md text-xs font-medium ${getStatusColor(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600">{ticket.lastUpdated}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/customer/tickets/${ticket.id}`)}
                          className="text-sm font-medium text-[#C8102E] hover:underline"
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
        </div>

        {/* Quick Actions */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                onClick={() => navigate('/customer/create-ticket')}
                className="w-full flex items-center gap-3 px-4 py-3.5 bg-[#C8102E] text-white rounded-lg hover:bg-[#A00D25] transition-colors shadow-sm"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">Create New Ticket</span>
              </button>

              <button
                onClick={() => navigate('/customer/track-order')}
                className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Search className="w-5 h-5" />
                <span className="font-medium">Check Order Status</span>
              </button>

              <button
                onClick={() => navigate('/customer/assets')}
                className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <Wrench className="w-5 h-5" />
                <span className="font-medium">My Equipment</span>
              </button>

              <button
                onClick={() => navigate('/customer/knowledge-base')}
                className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BookOpen className="w-5 h-5" />
                <span className="font-medium">Knowledge Base</span>
              </button>

              <button
                onClick={() => navigate('/customer/parts-catalog')}
                className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="font-medium">Order Parts</span>
              </button>

              <button
                onClick={() => navigate('/customer/analytics')}
                className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">View Analytics</span>
              </button>

              <button
                onClick={() => navigate('/customer/support')}
                className="w-full flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <MessageSquare className="w-5 h-5" />
                <span className="font-medium">Contact Support</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}