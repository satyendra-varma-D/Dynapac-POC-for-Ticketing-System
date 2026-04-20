import { useState } from 'react';
import { Bell, CheckCircle, Calendar, Package, AlertCircle, Wrench, FileText, Trash2, Settings as SettingsIcon } from 'lucide-react';

const notifications = [
  {
    id: 'N-001',
    type: 'service',
    title: 'Service Scheduled',
    message: 'Your preventive maintenance for Hydraulic Press HP-3000 is scheduled for March 15, 2026',
    timestamp: '2 hours ago',
    read: false,
    priority: 'high',
    icon: Wrench,
    actionLabel: 'View Details',
    actionUrl: '#',
  },
  {
    id: 'N-002',
    type: 'ticket',
    title: 'Ticket Update - TKT-10234',
    message: 'Your ticket has been updated. Our technician will arrive on March 12, 2026',
    timestamp: '5 hours ago',
    read: false,
    priority: 'medium',
    icon: FileText,
    actionLabel: 'View Ticket',
    actionUrl: '#',
  },
  {
    id: 'N-003',
    type: 'order',
    title: 'Order Shipped - ORD-45678',
    message: 'Your order has been shipped and is on the way. Expected delivery: March 11, 2026',
    timestamp: '1 day ago',
    read: false,
    priority: 'medium',
    icon: Package,
    actionLabel: 'Track Order',
    actionUrl: '#',
  },
  {
    id: 'N-004',
    type: 'contract',
    title: 'Contract Renewal Reminder',
    message: 'Your Premium Service Agreement (CNT-2024-001) is up for renewal in 32 days',
    timestamp: '2 days ago',
    read: true,
    priority: 'high',
    icon: Calendar,
    actionLabel: 'Renew Now',
    actionUrl: '#',
  },
  {
    id: 'N-005',
    type: 'system',
    title: 'System Maintenance Notice',
    message: 'Scheduled system maintenance on March 20, 2026 from 2:00 AM to 4:00 AM EST',
    timestamp: '3 days ago',
    read: true,
    priority: 'low',
    icon: AlertCircle,
    actionLabel: 'Learn More',
    actionUrl: '#',
  },
  {
    id: 'N-006',
    type: 'service',
    title: 'Maintenance Due Soon',
    message: 'Air Compressor AC-200 requires scheduled maintenance within 15 days',
    timestamp: '4 days ago',
    read: true,
    priority: 'medium',
    icon: Wrench,
    actionLabel: 'Schedule Service',
    actionUrl: '#',
  },
  {
    id: 'N-007',
    type: 'ticket',
    title: 'Ticket Resolved - TKT-10198',
    message: 'Your support ticket has been marked as resolved. Please provide feedback',
    timestamp: '5 days ago',
    read: true,
    priority: 'low',
    icon: CheckCircle,
    actionLabel: 'Give Feedback',
    actionUrl: '#',
  },
  {
    id: 'N-008',
    type: 'order',
    title: 'Order Delivered - ORD-45321',
    message: 'Your order has been successfully delivered. Thank you for your purchase!',
    timestamp: '1 week ago',
    read: true,
    priority: 'low',
    icon: Package,
    actionLabel: 'View Order',
    actionUrl: '#',
  },
];

export default function CustomerNotifications() {
  const [filter, setFilter] = useState('all');
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-4 border-l-[#C8102E]';
      case 'medium':
        return 'border-l-4 border-l-yellow-500';
      case 'low':
        return 'border-l-4 border-l-blue-500';
      default:
        return 'border-l-4 border-l-gray-300';
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'service':
        return 'bg-blue-100 text-blue-600';
      case 'ticket':
        return 'bg-purple-100 text-purple-600';
      case 'order':
        return 'bg-green-100 text-green-600';
      case 'contract':
        return 'bg-orange-100 text-orange-600';
      case 'system':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  const filteredNotifications = notifications.filter(notif => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !notif.read;
    return notif.type === filter;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleSelection = (id: string) => {
    setSelectedNotifications(prev =>
      prev.includes(id) ? prev.filter(nId => nId !== id) : [...prev, id]
    );
  };

  const markAllAsRead = () => {
    // In a real app, this would update the backend
    console.log('Mark all as read');
  };

  const deleteSelected = () => {
    // In a real app, this would delete from backend
    console.log('Delete selected:', selectedNotifications);
    setSelectedNotifications([]);
  };

  return (
    <div className="h-[calc(100vh-64px)] overflow-y-auto bg-[#F5F6F8]">
      <div className="max-w-[1600px] mx-auto px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 mb-1">
                Notifications
              </h1>
              <p className="text-sm text-gray-500">
                Stay updated on service reminders, ticket updates, and order shipments
              </p>
            </div>
            <div className="flex items-center gap-3">
              {selectedNotifications.length > 0 && (
                <button
                  onClick={deleteSelected}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete ({selectedNotifications.length})
                </button>
              )}
              <button className="flex items-center gap-2 px-4 py-2.5 bg-white border-2 border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <SettingsIcon className="w-4 h-4" />
                Preferences
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total</p>
                <p className="text-3xl font-bold text-gray-900">{notifications.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Unread</p>
                <p className="text-3xl font-bold text-[#C8102E]">{unreadCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-[#C8102E]" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Service Alerts</p>
                <p className="text-3xl font-bold text-gray-900">
                  {notifications.filter(n => n.type === 'service').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wrench className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Order Updates</p>
                <p className="text-3xl font-bold text-gray-900">
                  {notifications.filter(n => n.type === 'order').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'all' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilter('unread')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'unread' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Unread ({unreadCount})
              </button>
              <button
                onClick={() => setFilter('service')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'service' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Service
              </button>
              <button
                onClick={() => setFilter('ticket')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'ticket' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Tickets
              </button>
              <button
                onClick={() => setFilter('order')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  filter === 'order' ? 'bg-[#C8102E] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Orders
              </button>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-sm font-medium text-[#C8102E] hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-3">
          {filteredNotifications.map((notification) => {
            const Icon = notification.icon;
            const isSelected = selectedNotifications.includes(notification.id);
            
            return (
              <div
                key={notification.id}
                className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${getPriorityColor(notification.priority)} ${
                  !notification.read ? 'bg-blue-50/30' : ''
                }`}
              >
                <div className="px-6 py-4">
                  <div className="flex items-start gap-4">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => toggleSelection(notification.id)}
                      className="mt-1 w-4 h-4 text-[#C8102E] border-gray-300 rounded focus:ring-[#C8102E]"
                    />

                    {/* Icon */}
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-1">
                        <h3 className={`font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <span className="text-xs text-gray-500 whitespace-nowrap">{notification.timestamp}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{notification.message}</p>
                      <button className="text-sm font-medium text-[#C8102E] hover:underline">
                        {notification.actionLabel} →
                      </button>
                    </div>

                    {/* Unread Indicator */}
                    {!notification.read && (
                      <div className="w-2 h-2 bg-[#C8102E] rounded-full flex-shrink-0 mt-2"></div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Bell className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications</h3>
            <p className="text-sm text-gray-500">You're all caught up!</p>
          </div>
        )}
      </div>
    </div>
  );
}
