import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import Loader from '../components/common/Loader';
import { getDefaultRouteForRole, isKnownRole } from '../utils/roles';

const LoginPage = lazy(() => import('../pages/LoginPage'));
const ForgotPassword = lazy(() => import('../pages/ForgotPassword'));
const OverviewPage = lazy(() => import('../pages/OverviewPage'));
const Reports = lazy(() => import('../pages/Reports'));
const Settings = lazy(() => import('../pages/setting'));
const RecyclingMetricsPage = lazy(() => import('../pages/RecyclingMetricsPage'));
const FleetMonitoring = lazy(() => import('../pages/FleetMonitoring'));
const WasteAnalytics = lazy(() => import('../pages/WasteAnalytics'));

const getStoredRole = () => {
  const storedUser = localStorage.getItem('user');
  const fallbackRole = localStorage.getItem('role');

  if (!storedUser && !fallbackRole) return null;

  try {
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    return parsedUser?.role || fallbackRole;
  } catch {
    return fallbackRole;
  }
};

const AccessDeniedPage = () => {
  const role = getStoredRole();
  const destination = isKnownRole(role) ? getDefaultRouteForRole(role) : '/login';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
        <a href={destination} className="inline-block px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Go to Home
        </a>
      </div>
    </div>
  );
};

const AppRouter = () => {
  return (
    <Suspense fallback={<Loader message="Loading page..." />}>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/access-denied" element={<AccessDeniedPage />} />

        {/* Protected Routes */}
        <Route 
          path="/" 
          element={
            <ProtectedRoute featureKey="dashboard">
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<OverviewPage />} />
          <Route 
            path="waste-analytics" 
            element={
              <ProtectedRoute featureKey="wasteAnalytics">
                <WasteAnalytics />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="recycling-metrics" 
            element={
              <ProtectedRoute featureKey="recyclingMetrics">
                <RecyclingMetricsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="fleet-monitoring" 
            element={
              <ProtectedRoute featureKey="fleetMonitoring">
                <FleetMonitoring />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="reports" 
            element={
              <ProtectedRoute featureKey="reports">
                <Reports />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="settings" 
            element={
              <ProtectedRoute featureKey="settings">
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Catch-all - redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
