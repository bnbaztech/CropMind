import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet, Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import {
  Leaf,
  Home,
  Compass,
  Layers,
  CloudSun,
  TrendingUp,
  Database,
  MessageSquare,
  User,
  Settings,
  HelpCircle,
  Bell,
  LogOut,
  Globe,
  Wifi,
  WifiOff,
  Menu,
  X,
  Search,
  ChevronDown,
  Sun,
  Moon,
  Sparkles
} from 'lucide-react';

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    activeFarmer,
    isOnline,
    setIsOnline,
    language,
    setLanguage,
    theme,
    setTheme,
    notifications,
    logout
  } = useApp();

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Sidebar Links config
  const navItems = [
    { name: 'Dashboard Overview', path: '/dashboard', icon: <Home className="w-4 h-4" /> },
    { name: 'AI Plant Scanner', path: '/dashboard/scanner', icon: <Leaf className="w-4 h-4" /> },
    { name: 'Soil Advisor', path: '/dashboard/soil', icon: <Compass className="w-4 h-4" /> },
    { name: 'Weather Intelligence', path: '/dashboard/weather', icon: <CloudSun className="w-4 h-4" /> },
    { name: 'Satellite Monitoring', path: '/dashboard/satellite', icon: <Layers className="w-4 h-4" /> },
    { name: 'Yield Analytics', path: '/dashboard/yield', icon: <TrendingUp className="w-4 h-4" /> },
    { name: 'Farm Records Ledger', path: '/dashboard/records', icon: <Database className="w-4 h-4" /> },
    { name: 'AI Chat Assistant', path: '/dashboard/chat', icon: <MessageSquare className="w-4 h-4" /> },
  ];

  const secondaryNavItems = [
    { name: 'My Profile', path: '/dashboard/profile', icon: <User className="w-4 h-4" /> },
    { name: 'Node Settings', path: '/dashboard/settings', icon: <Settings className="w-4 h-4" /> },
    { name: 'Help Center & FAQs', path: '/dashboard/help', icon: <HelpCircle className="w-4 h-4" /> },
  ];

  const handleLogoutClick = () => {
    logout();
    navigate('/');
  };

  const unreadNotifsCount = notifications.filter(n => !n.read).length;

  return (
    <div className={`min-h-screen flex font-sans bg-transparent ${
      theme === 'dark' ? 'text-[#E5EAE5]' : 'text-[#0E2313]'
    } transition-colors duration-200`}>
      
      {/* 1. Sidebar - Desktop view */}
      <aside className={`hidden lg:flex flex-col w-64 border-r transition-colors duration-200 shrink-0 ${
        theme === 'dark' ? 'bg-[#0A100C] border-emerald-950' : 'bg-[#F1F4F1] border-[#CCD4CC]'
      }`}>
        
        {/* Sidebar Brand Logo */}
        <Link
          to="/"
          className="h-20 flex items-center px-6 border-b border-stone-100 dark:border-emerald-950 gap-3 hover:opacity-85 transition-opacity cursor-pointer"
          title="Go to Main Landing Page"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#1E2F23] to-[#4A7C59] flex items-center justify-center shadow">
            <Leaf className="w-4.5 h-4.5 text-[#FDFCF8]" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-base text-[#4A7C59] dark:text-emerald-400">
              CropMind Suite
            </span>
            <p className="text-[9px] text-[#5A5A40] font-mono tracking-widest uppercase dark:text-stone-400">COOPERATIVE HUB</p>
          </div>
        </Link>

         {/* Sidebar Nav Links list */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          
          <div className="space-y-1">
            <p className="px-3 text-[9px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 font-bold">Main Modules</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#4A7C59] text-white shadow-sm'
                      : 'text-stone-700 dark:text-stone-400 hover:text-[#4A7C59] hover:bg-stone-50 dark:hover:bg-emerald-950/20'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[9px] font-mono uppercase tracking-wider text-stone-600 dark:text-stone-400 font-bold">Account & Help</p>
            {secondaryNavItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#4A7C59] text-white shadow-sm'
                      : 'text-stone-700 dark:text-stone-400 hover:text-[#4A7C59] hover:bg-stone-50 dark:hover:bg-emerald-950/20'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

        </div>

        {/* Sidebar Bottom Profile */}
        <div className="p-4 border-t border-stone-100 dark:border-emerald-950 space-y-2">
          <div className="flex items-center space-x-2.5 p-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#1E2F23] to-[#4A7C59] flex items-center justify-center font-bold text-white text-xs shrink-0">
              {activeFarmer?.name ? activeFarmer.name.split(' ').map(n => n[0]).join('') : 'AM'}
            </div>
            <div className="truncate text-xs">
              <p className="font-bold">{activeFarmer?.name || 'Adebayo Mensah'}</p>
              <p className="text-[10px] text-stone-600 dark:text-stone-400 truncate">{activeFarmer?.email || 'adebayo.cocoa@cropmind.com'}</p>
            </div>
          </div>
          <button
            onClick={handleLogoutClick}
            className="w-full text-left flex items-center space-x-2 px-3 py-2 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/10 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out Session</span>
          </button>
        </div>

      </aside>

      {/* Main dashboard view container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        
        {/* Top Navbar */}
        <header className={`h-20 border-b flex items-center justify-between px-6 transition-colors duration-200 shrink-0 z-40 ${
          theme === 'dark' ? 'bg-[#0A100C] border-emerald-950' : 'bg-[#F1F4F1] border-[#CCD4CC]'
        }`}>
          
          {/* Topbar Left: search & mobile toggle */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-1.5 rounded-lg border border-stone-200 dark:border-emerald-950 cursor-pointer"
            >
              <Menu className="w-5 h-5 text-[#1E2F23] dark:text-stone-300" />
            </button>

            {/* Quick jump search input */}
            <div className="hidden md:flex items-center relative w-64">
              <input
                type="text"
                placeholder="Search modules, crops, treatments..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-emerald-950 rounded-xl py-2 pl-9 pr-4 text-xs focus:outline-none focus:border-[#4A7C59]"
              />
              <Search className="w-3.5 h-3.5 text-stone-450 absolute left-3" />
            </div>
          </div>

          {/* Topbar Right: controls, alerts, dropdowns */}
          <div className="flex items-center space-x-4">
            
            {/* System sync indicator */}
            <div className="flex items-center bg-[#F5F5F0] dark:bg-emerald-950/40 border border-[#E5E2D9] dark:border-emerald-900 rounded-xl p-0.5">
              <button
                onClick={() => setIsOnline(true)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  isOnline ? 'bg-[#4A7C59] text-white font-bold' : 'text-stone-500'
                }`}
                title="Online Sync enabled"
              >
                <Wifi className="w-3 h-3" />
                <span className="hidden sm:inline">Online API</span>
              </button>
              <button
                onClick={() => setIsOnline(false)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all cursor-pointer ${
                  !isOnline ? 'bg-amber-500 text-white font-bold' : 'text-stone-500'
                }`}
                title="Offline rule engine active"
              >
                <WifiOff className="w-3 h-3" />
                <span className="hidden sm:inline">Offline</span>
              </button>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => {
                  setLangDropdownOpen(!langDropdownOpen);
                  setNotifDropdownOpen(false);
                  setUserDropdownOpen(false);
                }}
                className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg border border-[#E5E2D9] dark:border-emerald-950 hover:bg-[#F5F5F0] dark:hover:bg-emerald-950/20 text-xs font-semibold cursor-pointer"
              >
                <Globe className="w-3.5 h-3.5 text-[#4A7C59]" />
                <span className="uppercase font-mono text-[10px]">{language}</span>
              </button>
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-emerald-950 border border-stone-200 dark:border-emerald-900 rounded-lg shadow-xl z-50 p-1">
                  {['en', 'sw', 'ha', 'yo', 'ig', 'fr', 'ar'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang as any);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs rounded hover:bg-stone-100 dark:hover:bg-emerald-900/40 transition-colors uppercase font-mono font-bold"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Day/Night Theme Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2.5 rounded-xl border transition-all duration-300 cursor-pointer flex items-center justify-center ${
                theme === 'dark' 
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.25)] hover:bg-amber-500/20' 
                  : 'border-[#4A7C59]/40 bg-[#4A7C59]/10 text-[#4A7C59] shadow-[0_0_12px_rgba(74,124,89,0.15)] hover:bg-[#4A7C59]/20'
              }`}
              title={theme === 'dark' ? 'Switch to Sunlit Day Mode' : 'Switch to Midnight Dark Mode'}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 animate-spin-slow text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-[#4A7C59] fill-[#4A7C59]/25" />
              )}
            </button>

            {/* Notification alert bell dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotifDropdownOpen(!notifDropdownOpen);
                  setUserDropdownOpen(false);
                }}
                className="p-2 rounded-xl border border-stone-200 dark:border-emerald-950 hover:bg-[#F5F5F0] dark:hover:bg-emerald-950/20 text-stone-500 relative cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifsCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white dark:bg-stone-900 border border-stone-250 dark:border-emerald-900 rounded-xl shadow-2xl z-50 overflow-hidden text-xs">
                  <div className="p-3 border-b font-bold flex justify-between bg-stone-50 dark:bg-emerald-950/30">
                    <span>Recent Activity Logs</span>
                    <Link to="/dashboard/notifications" onClick={() => setNotifDropdownOpen(false)} className="text-[#4A7C59] hover:underline text-[10px]">View All</Link>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-stone-100 dark:divide-stone-850">
                    {notifications.slice(0, 3).map((notif) => (
                      <div key={notif.id} className="p-3 space-y-1">
                        <p className="font-bold text-[11px] text-[#0E2313] dark:text-stone-100">{notif.title}</p>
                        <p className="text-[#2D4533] dark:text-stone-300 text-[10px] leading-normal">{notif.message}</p>
                        <span className="text-[8px] text-[#5A6F5A] dark:text-stone-400 font-mono">{notif.timestamp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile settings dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setUserDropdownOpen(!userDropdownOpen);
                  setNotifDropdownOpen(false);
                }}
                className="flex items-center space-x-1 p-1 hover:bg-[#F5F5F0] dark:hover:bg-emerald-950/20 rounded-xl cursor-pointer"
              >
                <div className="w-8 h-8 rounded-lg bg-[#4A7C59] flex items-center justify-center font-bold text-white text-xs shrink-0 shadow">
                  {activeFarmer?.name ? activeFarmer.name.split(' ').map(n => n[0]).join('') : 'AM'}
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-stone-900 border border-stone-250 dark:border-emerald-900 rounded-xl shadow-2xl z-50 py-1 text-xs font-bold">
                  <Link
                    to="/dashboard/profile"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-stone-50 dark:hover:bg-emerald-950/30 text-stone-700 dark:text-stone-300"
                  >
                    My Profile
                  </Link>
                  <Link
                    to="/dashboard/settings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="block px-4 py-2 hover:bg-stone-50 dark:hover:bg-emerald-950/30 text-stone-700 dark:text-stone-300"
                  >
                    Node Settings
                  </Link>
                  <button
                    onClick={handleLogoutClick}
                    className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/15"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

          </div>

        </header>

        {/* 2. Main content viewport area */}
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>

      </div>

      {/* 3. Sidebar drawer - Mobile view */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
          <div className={`w-64 flex flex-col h-full border-r ${
            theme === 'dark' ? 'bg-[#0A100C] border-emerald-950' : 'bg-[#F1F4F1] border-[#CCD4CC]'
          }`}>
            <div className="h-20 flex items-center justify-between px-6 border-b">
              <Link
                to="/"
                className="font-bold text-sm text-[#4A7C59] hover:underline cursor-pointer"
                onClick={() => setMobileSidebarOpen(false)}
                title="Go to Main Landing Page"
              >
                CropMind Mobile
              </Link>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1 rounded-lg border"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    location.pathname === item.path ? 'bg-[#4A7C59] text-white' : 'text-stone-500'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}

              <div className="pt-4 border-t my-4"></div>

              {secondaryNavItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    location.pathname === item.path ? 'bg-[#4A7C59] text-white' : 'text-stone-500'
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>

            <div className="p-4 border-t">
              <button
                onClick={handleLogoutClick}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-bold py-2.5 rounded-xl text-xs flex items-center justify-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout Session</span>
              </button>
            </div>
          </div>
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)}></div>
        </div>
      )}

    </div>
  );
}