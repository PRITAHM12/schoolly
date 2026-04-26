import { motion } from 'motion/react';
import { useAuth } from '../context/AuthContext';
import { LayoutDashboard, GraduationCap, Users, ShieldCheck } from 'lucide-react';

export function AuthPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left side: branding/intro */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-indigo-600 text-white relative overflow-hidden">
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
              <LayoutDashboard className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-display font-bold">Schoolly Tasks</span>
          </div>
          
          <h1 className="text-6xl font-display font-bold leading-tight mb-6">
            Organize your <br/> teaching flow.
          </h1>
          <p className="text-indigo-100 text-lg max-w-md leading-relaxed">
            The professional task management companion designed for modern educators. 
            Streamline your curriculum planning, grading schedules, and school events.
          </p>
        </div>

        <div className="relative z-10 grid grid-cols-2 gap-8">
          <div className="space-y-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold">Academic Focused</h3>
            <p className="text-sm text-indigo-200">Tailored categories for school management.</p>
          </div>
          <div className="space-y-2">
            <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-white" />
            </div>
            <h3 className="font-bold">Secure & Private</h3>
            <p className="text-sm text-indigo-200">Your school data is protected by industry-grade security.</p>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/50 rounded-full blur-3xl -mr-48 -mt-48" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-700/50 rounded-full blur-3xl -ml-48 -mb-48" />
      </div>

      {/* Right side: Login form */}
      <div className="flex flex-col items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-12 justify-center">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-display font-bold">Schoolly Tasks</span>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100">
            <div className="mb-8 text-center">
              <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">Welcome Back</h2>
              <p className="text-gray-500 font-medium tracking-tight">Access your academic goal dashboard</p>
            </div>

            <button 
              onClick={loginWithGoogle}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border border-gray-200 rounded-xl font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all active:scale-[0.98] shadow-sm"
            >
              <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>

            <div className="mt-8 flex items-center gap-4 text-gray-300">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Institutional Access</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              By continuing, you agree to Schoolly's institutional terms of service and academic data privacy policy.
            </p>
          </div>
          
          <p className="mt-8 text-center text-gray-400 text-sm">
            &copy; 2026 Schoolly Services. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
