import { Outlet } from 'react-router';
import { Search, Bell, LogOut, Home, Ticket, Package, BookOpen, DollarSign, Shield, BarChart3, MessageSquare, Headphones, Settings, ChevronDown, ChevronRight, Menu, Plus, Clock, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

interface MenuItem {
  label: string;
  path: string;
  icon: React.ElementType;
}

interface MenuGroup {
  label: string;
  icon: React.ElementType;
  items: MenuItem[];
}

export default function CustomerLayoutSidebar() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Tickets', 'Orders']);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHeaderProfileMenu, setShowHeaderProfileMenu] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close header profile menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showHeaderProfileMenu && !target.closest('.header-profile-menu-container')) {
        setShowHeaderProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHeaderProfileMenu]);

  const menuGroups: MenuGroup[] = [
    {
      label: 'Tickets',
      icon: Ticket,
      items: [
        { label: 'My Tickets', path: '/customer/tickets', icon: Ticket },
        { label: 'Create Ticket', path: '/customer/create-ticket', icon: Plus },
      ],
    },
    {
      label: 'Orders',
      icon: Package,
      items: [
        { label: 'My Orders', path: '/customer/orders', icon: Package },
      ],
    },
    {
      label: 'Financial',
      icon: DollarSign,
      items: [
        { label: 'Invoices', path: '/customer/invoices', icon: DollarSign },
        { label: 'Contracts & SLA', path: '/customer/contracts', icon: Shield },
      ],
    },
    {
      label: 'Resources',
      icon: BookOpen,
      items: [
        { label: 'Knowledge Base', path: '/customer/knowledge-base', icon: BookOpen },
        { label: 'Analytics', path: '/customer/analytics', icon: BarChart3 },
        { label: 'Feedback', path: '/customer/feedback', icon: MessageSquare },
        { label: 'Live Support', path: '/customer/support', icon: Headphones },
      ],
    },
  ];

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const toggleGroup = (groupLabel: string) => {
    setExpandedGroups(prev =>
      prev.includes(groupLabel)
        ? prev.filter(g => g !== groupLabel)
        : [...prev, groupLabel]
    );
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        }`}
      >
        {/* Logo Section */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#C8102E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">A</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Aftermarket</div>
                <div className="text-xs text-gray-500">Customer Portal</div>
              </div>
            </div>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          {/* Dashboard - Always visible */}
          <button
            onClick={() => navigate('/customer/dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mb-2 ${
              isActive('/customer/dashboard')
                ? 'bg-red-50 text-[#C8102E]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Home className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Dashboard</span>}
          </button>

          {/* Menu Groups */}
          {menuGroups.map((group) => {
            const GroupIcon = group.icon;
            const isExpanded = expandedGroups.includes(group.label);

            return (
              <div key={group.label} className="mb-2">
                <button
                  onClick={() => toggleGroup(group.label)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isExpanded ? 'text-gray-900' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <GroupIcon className="w-5 h-5 flex-shrink-0" />
                    {!sidebarCollapsed && <span>{group.label}</span>}
                  </div>
                  {!sidebarCollapsed && (
                    isExpanded ? (
                      <ChevronDown className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <ChevronRight className="w-4 h-4 flex-shrink-0" />
                    )
                  )}
                </button>

                {/* Submenu Items */}
                {isExpanded && !sidebarCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {group.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <button
                          key={item.path}
                          onClick={() => navigate(item.path)}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                            isActive(item.path)
                              ? 'bg-red-50 text-[#C8102E] font-medium'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400 flex-shrink-0"></div>
                          <span className="flex-1 text-left">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {/* Notifications - Always visible */}
          <button
            onClick={() => navigate('/customer/notifications')}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors mt-2 relative ${
              isActive('/customer/notifications')
                ? 'bg-red-50 text-[#C8102E]'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Bell className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span>Notifications</span>}
            <span className="absolute top-2 left-8 w-2 h-2 bg-[#C8102E] rounded-full"></span>
          </button>
        </nav>

        {/* User Profile - Bottom */}
        <div className="border-t border-gray-200 p-3">
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-gray-100 transition-colors ${
                sidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <div className="w-9 h-9 bg-[#C8102E] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold text-sm">JD</span>
              </div>
              {!sidebarCollapsed && (
                <div className="flex-1 text-left">
                  <div className="text-sm font-medium text-gray-900">John Doe</div>
                  <div className="text-xs text-gray-500">Acme Corp</div>
                </div>
              )}
            </button>

            {showProfileMenu && (
              <div className={`absolute ${sidebarCollapsed ? 'left-full ml-2' : 'bottom-full mb-2'} ${sidebarCollapsed ? 'bottom-0' : 'left-0 right-0'} bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50`}>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/customer/settings');
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors whitespace-nowrap"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                <button
                  onClick={() => navigate('/')}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors whitespace-nowrap"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 h-16">
          <div className="h-full px-8 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders or tickets..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button
                onClick={() => navigate('/customer/notifications')}
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8102E] rounded-full"></span>
              </button>

              {/* Profile Dropdown */}
              <div className="relative header-profile-menu-container">
                <button
                  onClick={() => setShowHeaderProfileMenu(!showHeaderProfileMenu)}
                  className="flex items-center gap-2 hover:bg-gray-100 rounded-lg px-2 py-1.5 transition-colors"
                >
                  <div className="w-9 h-9 bg-[#C8102E] rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-semibold text-sm">JD</span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-medium text-gray-900 leading-tight">John Doe</div>
                    <div className="text-xs text-gray-500">Acme Corp</div>
                  </div>
                </button>

                {showHeaderProfileMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-900">John Doe</p>
                      <p className="text-xs text-gray-500">john.doe@acmecorp.com</p>
                    </div>
                    <button
                      onClick={() => { setShowHeaderProfileMenu(false); navigate('/customer/profile'); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </button>
                    <button
                      onClick={() => { setShowHeaderProfileMenu(false); navigate('/customer/settings'); }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => { setShowHeaderProfileMenu(false); navigate('/'); }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}