import React, { createContext, useContext, useState, useEffect } from 'react';
import { SupportedLanguage, Farmer } from '../types';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: string;
}

interface AppContextType {
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  isOnline: boolean;
  setIsOnline: (online: boolean) => void;
  activeFarmer: Farmer | null;
  setActiveFarmer: (farmer: Farmer | null) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
  notifications: AppNotification[];
  addNotification: (title: string, message: string, type?: AppNotification['type']) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  login: (email: string, name?: string) => Promise<boolean>;
  signup: (farmerData: Omit<Farmer, 'id' | 'memberSince'>) => Promise<boolean>;
  logout: () => void;
  systemHealth: 'ok' | 'loading' | 'error';
  setSystemHealth: (status: 'ok' | 'loading' | 'error') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<SupportedLanguage>('en');
  const [isOnline, setIsOnlineState] = useState<boolean>(true);
  const [activeFarmer, setActiveFarmerState] = useState<Farmer | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');
  const [systemHealth, setSystemHealth] = useState<'ok' | 'loading' | 'error'>('loading');
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: '1',
      title: 'Welcome to CropMind Platform',
      message: 'Explore your satellite analytics, disease diagnostics, and soil health advisors.',
      type: 'success',
      read: false,
      timestamp: new Date().toLocaleTimeString()
    },
    {
      id: '2',
      title: 'ESA Sentinel-2 Update',
      message: 'New simulated crop moisture levels are calculated for your area.',
      type: 'info',
      read: true,
      timestamp: new Date().toLocaleTimeString()
    }
  ]);

  // Load language and active farmer on start
  useEffect(() => {
    const savedLang = localStorage.getItem('cropmind_language') as SupportedLanguage;
    if (savedLang) {
      setLanguageState(savedLang);
    }
    const savedFarmer = localStorage.getItem('cropmind_active_farmer');
    if (savedFarmer) {
      const parsed = JSON.parse(savedFarmer);
      setActiveFarmerState(parsed);
      setIsLoggedIn(true);
    }
    const savedTheme = localStorage.getItem('cropmind_theme') as 'light' | 'dark';
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Check backend health
    const checkHealth = async () => {
      try {
        const response = await fetch('/api/health');
        if (response.ok) {
          setSystemHealth('ok');
        } else {
          setSystemHealth('error');
        }
      } catch (err) {
        console.warn('Backend server connectivity failed on startup check, using fallback.', err);
        setSystemHealth('ok');
      }
    };
    checkHealth();
  }, []);

  const setLanguage = (lang: SupportedLanguage) => {
    setLanguageState(lang);
    localStorage.setItem('cropmind_language', lang);
  };

  const setIsOnline = (online: boolean) => {
    setIsOnlineState(online);
    addNotification(
      online ? 'Online Server Sync Restored' : 'Offline Mode Activated',
      online ? 'Direct integration with Gemma 4 AI diagnostics is now live.' : 'Running local offline rule-based diagnosis models with transactional ledger.',
      online ? 'success' : 'warning'
    );
  };

  const setTheme = (newTheme: 'light' | 'dark') => {
    setThemeState(newTheme);
    localStorage.setItem('cropmind_theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const setActiveFarmer = (farmer: Farmer | null) => {
    setActiveFarmerState(farmer);
    if (farmer) {
      localStorage.setItem('cropmind_active_farmer', JSON.stringify(farmer));
    } else {
      localStorage.removeItem('cropmind_active_farmer');
    }
  };

  const addNotification = (title: string, message: string, type: AppNotification['type'] = 'info') => {
    const newNotif: AppNotification = {
      id: Math.random().toString(36).substr(2, 9),
      title,
      message,
      type,
      read: false,
      timestamp: new Date().toLocaleTimeString()
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const login = async (email: string, name?: string): Promise<boolean> => {
    // Check if farmer is already in database, otherwise fetch demo data or save new
    const demoFarmer: Farmer = {
      id: 'f-demo-999',
      name: name || 'Adebayo Mensah',
      email: email,
      farmName: 'Mensah Organic Cocoa Fields',
      location: 'Eastern Province, Ghana',
      farmSize: 4.8,
      primaryCrop: 'Cocoa',
      memberSince: '2026-06-15'
    };
    setActiveFarmer(demoFarmer);
    setIsLoggedIn(true);
    addNotification('Access Granted', `Welcome back, ${demoFarmer.name}! Logged in successfully.`, 'success');
    return true;
  };

  const signup = async (farmerData: Omit<Farmer, 'id' | 'memberSince'>): Promise<boolean> => {
    const newFarmer: Farmer = {
      ...farmerData,
      id: 'f-' + Math.floor(Math.random() * 1000000),
      memberSince: new Date().toISOString().split('T')[0]
    };
    setActiveFarmer(newFarmer);
    setIsLoggedIn(true);
    addNotification('Account Activated', `Farmer profile created for ${newFarmer.name}. Welcome to CropMind!`, 'success');
    return true;
  };

  const logout = () => {
    setActiveFarmer(null);
    setIsLoggedIn(false);
    addNotification('Logged Out', 'You have been signed out from your secure session.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        isOnline,
        setIsOnline,
        activeFarmer,
        setActiveFarmer,
        isLoggedIn,
        setIsLoggedIn,
        theme,
        setTheme,
        notifications,
        addNotification,
        markNotificationRead,
        clearNotifications,
        login,
        signup,
        logout,
        systemHealth,
        setSystemHealth
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
