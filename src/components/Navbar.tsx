import { motion, AnimatePresence } from 'motion/react';
import { Logo } from './Logo';
import { LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-panel h-16 px-6 flex items-center justify-between border-b border-gray-200 bg-white/70">
      <Logo size="sm" />

      {user && (
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-sm font-medium text-gray-900">{user.displayName || 'Teacher'}</span>
            <span className="text-xs text-gray-500">{user.email}</span>
          </div>
          <button 
            onClick={logout}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      )}
    </nav>
  );
}
