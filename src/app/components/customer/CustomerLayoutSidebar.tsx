import { Outlet } from 'react-router';
import { Search, LogOut, Home, Ticket, BookOpen, Settings, ChevronDown, ChevronRight, Menu, Plus, Clock, User, Bell, Package, MessageSquare, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import AIChatbot from './AIChatbot';

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
  const [expandedGroups, setExpandedGroups] = useState<string[]>(['Tickets']);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showHeaderProfileMenu, setShowHeaderProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close header menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (showHeaderProfileMenu && !target.closest('.header-profile-menu-container')) {
        setShowHeaderProfileMenu(false);
      }
      if (showNotifications && !target.closest('.notifications-container')) {
        setShowNotifications(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showHeaderProfileMenu, showNotifications]);

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
      label: 'Resources',
      icon: BookOpen,
      items: [
        { label: 'Knowledge Base', path: '/customer/knowledge-base', icon: BookOpen },
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
    <div className="min-h-screen bg-[#F5F6F8] flex relative">
      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
          sidebarCollapsed ? 'w-20' : 'w-64'
        } z-20`}
      >
        {/* Logo Section */}
        <div className="h-16 border-b border-gray-200 flex items-center justify-between px-4">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#C8102E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-base">D</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">Dynapac</div>
                <div className="text-xs text-gray-500">Aftermarket Portal</div>
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

                {isExpanded && !sidebarCollapsed && (
                  <div className="ml-6 mt-1 space-y-1">
                    {group.items.map((item) => {
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
                          <div className={`w-1.5 h-1.5 rounded-full ${isActive(item.path) ? 'bg-[#C8102E]' : 'bg-gray-400'} flex-shrink-0`}></div>
                          <span className="flex-1 text-left">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-gray-200 h-16 z-10">
          <div className="h-full px-8 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tickets..."
                  className="w-full pl-10 pr-4 py-2 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative notifications-container">
                <button 
                  onClick={() => {
                    setShowNotifications(!showNotifications);
                    setShowHeaderProfileMenu(false);
                  }}
                  className={`relative p-2 rounded-lg transition-colors ${
                    showNotifications ? 'bg-gray-100 text-[#C8102E]' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8102E] rounded-full ring-2 ring-white"></span>
                </button>

                {showNotifications && (
                  <div className="absolute right-0 mt-3 w-[350px] bg-white rounded-xl shadow-2xl border border-gray-200 py-0 z-[100] overflow-hidden animate-fade-in">
                    <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                      <h3 className="text-base font-bold text-gray-900">Notifications</h3>
                      <button className="text-xs font-semibold text-[#C8102E] hover:underline">Mark all as read</button>
                    </div>
                    
                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
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
                                <p className="text-xs text-gray-600 leading-relaxed font-medium mb-1.5 line-clamp-2">{notif.message}</p>
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
                )}
              </div>

              <div className="relative header-profile-menu-container">
                <button
                  onClick={() => {
                    setShowHeaderProfileMenu(!showHeaderProfileMenu);
                    setShowNotifications(false);
                  }}
                  className={`flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors ${
                    showHeaderProfileMenu ? 'bg-gray-100' : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="w-9 h-9 bg-gradient-to-br from-[#C8102E] to-[#A00D25] rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-white shadow-sm">
                    <span className="text-white font-bold text-sm">JD</span>
                  </div>
                  <div className="text-left hidden sm:block">
                    <div className="text-sm font-bold text-gray-900 leading-tight">John Doe</div>
                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Acme Corp</div>
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

        <main className="flex-1 overflow-hidden">
          <Outlet />
        </main>
      </div>

      {/* Global AI Chatbot */}
      <AIChatbot />
    </div>
  );
}