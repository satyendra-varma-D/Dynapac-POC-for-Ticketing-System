import { Outlet } from 'react-router';
import { Search, Bell, Package, FileText, User, LogOut, Home, Ticket, Settings, BookOpen, Wrench, DollarSign, ShoppingCart, Shield, BarChart3, MessageSquare, Headphones } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

export default function CustomerLayout() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/customer/dashboard', icon: Home },
    { label: 'My Tickets', path: '/customer/tickets', icon: Ticket },
    { label: 'My Orders', path: '/customer/orders', icon: Package },
    { label: 'Assets', path: '/customer/assets', icon: Wrench },
    { label: 'Knowledge Base', path: '/customer/knowledge-base', icon: BookOpen },
    { label: 'Service History', path: '/customer/service-history', icon: FileText },
    { label: 'Parts Catalog', path: '/customer/parts-catalog', icon: ShoppingCart },
    { label: 'Invoices', path: '/customer/invoices', icon: DollarSign },
    { label: 'Contracts', path: '/customer/contracts', icon: Shield },
    { label: 'Analytics', path: '/customer/analytics', icon: BarChart3 },
    { label: 'Feedback', path: '/customer/feedback', icon: MessageSquare },
    { label: 'Support', path: '/customer/support', icon: Headphones },
  ];

  const recentNotifications = [
    {
      id: 1,
      ticketId: 'TKT-10234',
      title: 'Ticket Resolved',
      message: 'Your ticket TKT-10234 has been marked as resolved.',
      time: '10m ago',
      type: 'status',
      icon: CheckCircle,
      color: 'text-green-600',
      bg: 'bg-green-50'
    },
    {
      id: 2,
      ticketId: 'TKT-10198',
      title: 'New Comment',
      message: 'Sarah Johnson added a comment to your ticket TKT-10198.',
      time: '1h ago',
      type: 'comment',
      icon: MessageSquare,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      id: 4,
      ticketId: 'TKT-10145',
      title: 'Priority Updated',
      message: 'Priority for TKT-10145 escalated to High Risk.',
      time: '5h ago',
      type: 'priority',
      icon: AlertCircle,
      color: 'text-red-600',
      bg: 'bg-red-50'
    }
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-[60]">
        <div className="max-w-[1600px] mx-auto px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-3 min-w-[240px]">
              <div className="w-9 h-9 bg-[#C8102E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">A</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  Aftermarket Service
                </div>
                <div className="text-xs text-gray-500">Customer Portal</div>
              </div>
            </div>

            {/* Navigation Tabs - Scrollable on smaller screens */}
            <nav className="flex items-center gap-1 flex-1 px-8 overflow-x-auto no-scrollbar">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.path}
                    onClick={() => navigate(item.path)}
                    className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors relative whitespace-nowrap ${
                      isActive(item.path)
                        ? 'text-[#C8102E]'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                    {isActive(item.path) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8102E]"></div>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-4 min-w-[240px] justify-end relative">
              {/* Search */}
              <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Order / Ticket ID..."
                  className="w-48 pl-9 pr-3 py-1.5 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                />
              </div>

              {/* Notifications */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowProfileMenu(false);
                  }}
                  className={`relative p-2 rounded-lg transition-colors ${
                    showNotifications ? 'bg-gray-100 text-[#C8102E]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8102E] rounded-full ring-2 ring-white"></span>
                </button>

                {showNotifications && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowNotifications(false)}
                    />
                    <div className="absolute right-0 mt-3 w-[350px] bg-white rounded-xl shadow-2xl border border-gray-200 py-0 z-50 overflow-hidden animate-fade-in">
                      <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                        <h3 className="text-base font-bold text-gray-900">Notifications</h3>
                        <button className="text-xs font-semibold text-[#C8102E] hover:underline">Mark all as read</button>
                      </div>
                      
                      <div className="max-h-[420px] overflow-y-auto">
                        {recentNotifications.map((notif) => {
                          const Icon = notif.icon;
                          return (
                            <div 
                              key={notif.id}
                              className="px-4 py-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 cursor-pointer transition-colors group"
                            >
                              <div className="flex items-start gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${notif.bg}`}>
                                  <Icon className={`w-4 h-4 ${notif.color}`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#C8102E] transition-colors">{notif.title}</p>
                                    <span className="text-[11px] text-gray-400 font-medium">{notif.time}</span>
                                  </div>
                                  <p className="text-xs text-gray-600 leading-relaxed font-medium mb-2">{notif.message}</p>
                                  <button 
                                    onClick={() => {
                                      setShowNotifications(false);
                                      navigate(`/customer/tickets/${notif.ticketId}`);
                                    }}
                                    className="text-[11px] font-bold text-[#C8102E] uppercase tracking-wider flex items-center gap-1 opacity-100 transition-opacity"
                                  >
                                    View Details <ChevronRight className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => {
                          setShowNotifications(false);
                          navigate('/customer/notifications');
                        }}
                        className="w-full py-2.5 bg-gray-50 text-sm font-bold text-gray-700 hover:text-[#C8102E] transition-colors border-t border-gray-100"
                      >
                        View All Notifications
                      </button>
                    </div>
                  </>
                )}
              </div>

              {/* Profile */}
              <div className="relative">
                <button 
                  onClick={() => {
                    setShowProfileMenu(!showProfileMenu);
                    setShowNotifications(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1 transition-colors ${
                    showProfileMenu ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-bold text-gray-900">John Doe</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Acme Corp</div>
                  </div>
                </button>

                {showProfileMenu && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-200 py-2 z-50 animate-fade-in text-left">
                      <div className="px-5 py-4 border-b border-gray-100">
                        <p className="text-sm font-bold text-gray-900">John Doe</p>
                        <p className="text-xs font-medium text-gray-500">john.doe@acmecorp.com</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold uppercase">Customer</span>
                          <span className="px-2 py-0.5 bg-red-50 text-[#C8102E] rounded text-[10px] font-bold uppercase border border-red-100">Pro Account</span>
                        </div>
                      </div>
                      <div className="py-2">
                        <button
                          onClick={() => {
                            setShowProfileMenu(false);
                            navigate('/customer/settings');
                          }}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#C8102E] transition-all"
                        >
                          <Settings className="w-4 h-4" />
                          Account Settings
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-5 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}