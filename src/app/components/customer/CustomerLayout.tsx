import { Outlet } from 'react-router';
import { Search, Bell, Package, FileText, User, LogOut, Home, Ticket, Settings, BookOpen, Wrench, DollarSign, ShoppingCart, Shield, BarChart3, MessageSquare, Headphones } from 'lucide-react';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';

export default function CustomerLayout() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
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
            <nav className="flex items-center gap-1 flex-1 px-8 overflow-x-auto">
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
            <div className="flex items-center gap-4 min-w-[240px] justify-end">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Order / Ticket ID..."
                  className="w-48 pl-9 pr-3 py-1.5 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                />
              </div>

              {/* Notifications */}
              <button 
                onClick={() => navigate('/customer/notifications')}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8102E] rounded-full"></span>
              </button>

              {/* Profile */}
              <div className="relative">
                <button 
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                >
                  <div className="w-9 h-9 bg-[#C8102E] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">JD</span>
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">John Doe</div>
                    <div className="text-xs text-gray-500">Acme Corp</div>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@acmecorp.com</p>
                      <p className="text-xs text-gray-400 mt-1">Acme Corporation</p>
                    </div>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate('/customer/settings');
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
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