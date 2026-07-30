import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';

// Public Pages
import LandingPage from './pages/public/LandingPage';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';

// Dashboard Layout
import DashboardLayout from './layouts/DashboardLayout';

// Dashboard Module Pages
import DashboardHome from './pages/dashboard/DashboardHome';
import PlantScannerPage from './pages/dashboard/PlantScannerPage';
import SoilAdvisorPage from './pages/dashboard/SoilAdvisorPage';
import WeatherPage from './pages/dashboard/WeatherPage';
import SatellitePage from './pages/dashboard/SatellitePage';
import YieldAnalyticsPage from './pages/dashboard/YieldAnalyticsPage';
import FarmRecordsPage from './pages/dashboard/FarmRecordsPage';
import AIChatPage from './pages/dashboard/AIChatPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import HelpPage from './pages/dashboard/HelpPage';
import NotificationsPage from './pages/dashboard/NotificationsPage';

// Simple Route Protection Guard
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useApp();
  if (!isLoggedIn) {
    // If not authenticated, redirect securely to login screen
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default function App() {
  return (
    <AppProvider>
      <HashRouter>
        <Routes>
          {/* Public SaaS Marketing Paths */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Secure Authenticated Dashboard Path Modules */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            {/* Index summary dashboard */}
            <Route index element={<DashboardHome />} />
            
            {/* Feature modules as separate sub-routes */}
            <Route path="scanner" element={<PlantScannerPage />} />
            <Route path="soil" element={<SoilAdvisorPage />} />
            <Route path="weather" element={<WeatherPage />} />
            <Route path="satellite" element={<SatellitePage />} />
            <Route path="yield" element={<YieldAnalyticsPage />} />
            <Route path="records" element={<FarmRecordsPage />} />
            <Route path="chat" element={<AIChatPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="help" element={<HelpPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
          </Route>

          {/* Catch-all fallback, redirecting back to home landing page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </HashRouter>
    </AppProvider>
  );
}
