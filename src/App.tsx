/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { SaaSAdminDashboard } from './components/SaaSAdminDashboard';
import { LandingPage } from './components/LandingPage';
import { useState } from 'react';

function AppContent() {
  const { user, loading } = useAuth();
  // Using a simple state for routing in this demo
  const [currentView, setCurrentView] = useState<'public' | 'admin'>('public');

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin mb-6" />
        <span className="text-gray-400 font-display font-extrabold uppercase tracking-widest text-xs">Schoolly OS Loading</span>
      </div>
    );
  }

  // If user is logged in, show admin dashboard
  if (user) {
    return (
      <>
        <Navbar />
        <SaaSAdminDashboard />
        <button 
          onClick={() => window.location.href = '#'}
          className="fixed bottom-8 right-8 px-6 py-3 bg-white border border-gray-200 rounded-full shadow-2xl font-bold text-gray-900 border-b-4 border-b-indigo-500 z-[100]"
          onClickCapture={() => setCurrentView('public')}
        >
          View Public Site
        </button>
      </>
    );
  }

  return (
    <div className="min-h-screen">
      <LandingPage />
      <div className="fixed bottom-8 right-8 group z-[100]">
        <button 
          onClick={() => window.location.href = '/login'}
          className="p-4 bg-gray-900 text-white rounded-full shadow-2xl hover:bg-gray-800 transition-all flex items-center gap-2"
          onClickCapture={() => window.location.href = '#' /* Trick to stay on page or trigger login if we had real routes */}
        >
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 whitespace-nowrap text-sm font-bold">Admin Portal</span>
          <div className="w-6 h-6 flex items-center justify-center">🔐</div>
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

