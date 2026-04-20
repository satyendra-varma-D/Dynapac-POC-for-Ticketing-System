import { useState } from 'react';
import { Calendar, Filter, Search, Grid3x3, List, Package, Truck, Clock, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router';

const orders = [
  {
    orderNumber: 'ORD-45678',
    orderDate: '2024-02-28',
    status: 'in-transit',
    statusLabel: 'In Transit',
    eta: 'Mar 5, 2026',
    shipmentStatus: 'On the way',
    items: 3,
    totalAmount: '$2,450.00',
    carrier: 'FedEx Express',
    trackingNumber: 'TRK-8923764521',
    lastUpdated: '2 hours ago',
  },
  {
    orderNumber: 'ORD-45321',
    orderDate: '2024-02-25',
    status: 'in-transit',
    statusLabel: 'In Transit',
    eta: 'Mar 3, 2026',
    shipmentStatus: 'Delayed',
    items: 2,
    totalAmount: '$890.00',
    carrier: 'UPS Ground',
    trackingNumber: 'TRK-8923764522',
    lastUpdated: '5 hours ago',
  },
  {
    orderNumber: 'ORD-44987',
    orderDate: '2024-02-20',
    status: 'delivered',
    statusLabel: 'Delivered',
    eta: 'Feb 25, 2026',
    shipmentStatus: 'Delivered',
    items: 5,
    totalAmount: '$3,120.00',
    carrier: 'FedEx Express',
    trackingNumber: 'TRK-8923764523',
    lastUpdated: '3 days ago',
  },
  {
    orderNumber: 'ORD-44756',
    orderDate: '2024-02-15',
    status: 'delivered',
    statusLabel: 'Delivered',
    eta: 'Feb 20, 2026',
    shipmentStatus: 'Delivered',
    items: 1,
    totalAmount: '$450.00',
    carrier: 'USPS Priority',
    trackingNumber: 'TRK-8923764524',
    lastUpdated: '8 days ago',
  },
  {
    orderNumber: 'ORD-44523',
    orderDate: '2024-02-10',
    status: 'delivered',
    statusLabel: 'Delivered',
    eta: 'Feb 15, 2026',
    shipmentStatus: 'Delivered',
    items: 4,
    totalAmount: '$1,780.00',
    carrier: 'FedEx Ground',
    trackingNumber: 'TRK-8923764525',
    lastUpdated: '13 days ago',
  },
  {
    orderNumber: 'ORD-44201',
    orderDate: '2024-02-05',
    status: 'processing',
    statusLabel: 'Processing',
    eta: 'Mar 12, 2026',
    shipmentStatus: 'Preparing shipment',
    items: 2,
    totalAmount: '$620.00',
    carrier: 'Pending',
    trackingNumber: 'Pending',
    lastUpdated: '1 day ago',
  },
];

export default function CustomerOrders() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'border-blue-500';
      case 'delivered':
        return 'border-green-500';
      case 'processing':
        return 'border-yellow-500';
      case 'delayed':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'in-transit':
        return 'bg-blue-100 text-blue-700';
      case 'delivered':
        return 'bg-green-100 text-green-700';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700';
      case 'delayed':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.orderNumber
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-[1600px] mx-auto px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 mb-1">My Orders</h1>
        <p className="text-sm text-gray-500">Track and manage all your orders</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search */}
        <div className="flex-1 max-w-md relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search orders, tracking..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
          />
        </div>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all min-w-[150px]"
          >
            <option value="all">All ({orders.length})</option>
            <option value="processing">Processing</option>
            <option value="in-transit">In Transit</option>
            <option value="delivered">Delivered</option>
            <option value="delayed">Delayed</option>
          </select>

          {/* View Toggle */}
          <div className="flex items-center bg-white border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2.5 transition-colors ${
                viewMode === 'grid'
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2.5 transition-colors ${
                viewMode === 'list'
                  ? 'bg-[#C8102E] text-white'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Orders Grid/List */}
      {filteredOrders.length > 0 ? (
        <div
          className={
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 gap-4'
              : 'flex flex-col gap-4'
          }
        >
          {filteredOrders.map((order) => (
            <div
              key={order.orderNumber}
              onClick={() => navigate(`/customer/orders/${order.orderNumber}`)}
              className={`bg-white rounded-xl border-t-4 ${getStatusColor(
                order.status
              )} shadow-sm hover:shadow-md transition-all cursor-pointer group`}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Package className="w-5 h-5 text-[#C8102E]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-base">
                        {order.orderNumber}
                      </h3>
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-medium mt-1 ${getStatusBadgeColor(
                          order.status
                        )}`}
                      >
                        {order.statusLabel}
                      </span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>

                {/* Order Info Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Order Date
                    </p>
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(order.orderDate).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Total Amount
                    </p>
                    <p className="text-sm font-medium text-gray-900">{order.totalAmount}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Shipment Status
                    </p>
                    <p className="text-sm font-medium text-gray-900">{order.shipmentStatus}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
                      Carrier
                    </p>
                    <p className="text-sm font-medium text-gray-900">{order.carrier}</p>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Package className="w-3.5 h-3.5" />
                      {order.items} items
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {order.lastUpdated}
                    </span>
                  </div>
                  {order.status === 'in-transit' && (
                    <div className="flex items-center gap-1.5 text-xs font-medium text-blue-600">
                      <Truck className="w-3.5 h-3.5" />
                      <span>Track</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Package className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">
            {searchQuery || statusFilter !== 'all'
              ? 'Try adjusting your search or filters'
              : 'You have no orders yet'}
          </p>
        </div>
      )}
    </div>
  );
}
