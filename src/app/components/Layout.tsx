import { Outlet } from 'react-router';
import { Search, Bell, Home, Ticket, BookOpen, ChevronRight, ChevronDown, Menu, User, Settings, LogOut, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';

export default function Layout() {
  const [userRegion, setUserRegion] = useState('Global');
  const [userQueue, setUserQueue] = useState('Spare Parts');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [userName, setUserName] = useState('Mike Chen');
  const [userInitials, setUserInitials] = useState('MC');
  const [userEmail, setUserEmail] = useState('mike.chen@company.com');
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['tickets']);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get user workspace info from session storage
    const region = sessionStorage.getItem('userRegion') || 'global';
    const queue = sessionStorage.getItem('userQueue') || 'spare-parts';
    
    setUserRegion(region.charAt(0).toUpperCase() + region.slice(1));
    setUserQueue(queue.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '));
  }, []);

  useEffect(() => {
    // Close profile menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (showProfileMenu && !target.closest('.profile-menu-container')) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showProfileMenu]);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/');
  };

  const toggleMenu = (menuKey: string) => {
    setExpandedMenus(prev => 
      prev.includes(menuKey) 
        ? prev.filter(k => k !== menuKey) 
        : [...prev, menuKey]
    );
  };

  const isActive = (path: string) => {
    if (path === '/dashboard' && (location.pathname === '/dashboard' || location.pathname.startsWith('/dashboard/ticket/'))) return true;
    if (path === '/my-tickets' && location.pathname === '/my-tickets') return true;
    if (path === '/sla' && location.pathname === '/sla') return true;
    if (path === '/knowledge-base' && location.pathname === '/knowledge-base') return true;
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="min-h-screen bg-[#F5F6F8] flex">
      {/* Left Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Logo & Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#C8102E] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  Aftermarket
                </div>
                <div className="text-xs text-[#C8102E]">
                  Support Agent
                </div>
              </div>
            </div>
            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          {/* Dashboard */}
          <button
            onClick={() => navigate('/dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive('/dashboard')
                ? 'text-[#C8102E] bg-red-50'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Dashboard</span>
          </button>

          {/* Tickets - Expandable */}
          <div>
            <button
              onClick={() => toggleMenu('tickets')}
              className="w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <Ticket className="w-5 h-5" />
                <span>Tickets</span>
              </div>
              {expandedMenus.includes('tickets') ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>

            {/* Sub-items */}
            {expandedMenus.includes('tickets') && (
              <div className="bg-gray-50">
                <button
                  onClick={() => navigate('/my-tickets')}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 pl-12 text-sm transition-colors ${
                    isActive('/my-tickets')
                      ? 'text-[#C8102E] bg-red-50 font-medium'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                  <span>My Tickets</span>
                </button>
              </div>
            )}
          </div>

          {/* Knowledge Base */}
          <button
            onClick={() => navigate('/knowledge-base')}
            className={`w-full flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive('/knowledge-base')
                ? 'text-[#C8102E] bg-red-50'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <BookOpen className="w-5 h-5" />
              <span>Knowledge Base</span>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${isActive('/knowledge-base') ? 'rotate-90' : ''}`} />
          </button>

          {/* SLA */}
          <button
            onClick={() => navigate('/sla')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${
              isActive('/sla')
                ? 'text-[#C8102E] bg-red-50'
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Clock className="w-5 h-5" />
            <span>SLA</span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => {}}
            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors relative"
          >
            <Bell className="w-5 h-5" />
            <span>Notifications</span>
            <span className="absolute left-8 top-2 w-2 h-2 bg-[#C8102E] rounded-full"></span>
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 flex-shrink-0">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Region & Queue Info */}
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="font-medium">{userQueue}</span>
                <span>·</span>
                <span>{userRegion}</span>
              </div>

              {/* Right: Search, Notifications, Profile */}
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search tickets..."
                    className="w-64 pl-9 pr-3 py-2 bg-[#F5F6F8] border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#C8102E] focus:border-transparent transition-all"
                  />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C8102E] rounded-full"></span>
                </button>

                {/* Profile */}
                <div className="relative profile-menu-container">
                  <button 
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors"
                  >
                    <div className="w-9 h-9 bg-[#C8102E] rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">{userInitials}</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">{userName}</div>
                      <div className="text-xs text-gray-500">support-agent</div>
                    </div>
                  </button>

                  {/* Profile Menu */}
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">{userName}</p>
                        <p className="text-xs text-gray-500">{userEmail}</p>
                      </div>
                      <button
                        onClick={() => setShowProfileMenu(false)}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </button>
                      <button
                        onClick={() => setShowProfileMenu(false)}
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
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}