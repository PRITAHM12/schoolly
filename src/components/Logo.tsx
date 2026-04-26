import React from 'react';
import { Globe, GraduationCap } from 'lucide-react';

export function Logo({ className = '', size = 'md', variant = 'dark' }: { className?: string, size?: 'sm' | 'md' | 'lg', variant?: 'light' | 'dark' }) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  const textColors = {
    light: 'text-white',
    dark: 'text-gray-900'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`${sizes[size]} bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200/50 relative overflow-hidden group`}>
        {/* Animated background flare */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        <div className="absolute -inset-2 bg-indigo-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        
        {/* The "SY" Monogram */}
        <div className="relative z-10 flex items-center justify-center">
          <span className={`font-display font-black text-white tracking-tighter leading-none select-none ${
            size === 'sm' ? 'text-lg' : size === 'md' ? 'text-xl' : 'text-3xl'
          }`}>
            S
            <span className="text-indigo-200 -ml-1 inline-block transform rotate-12">Y</span>
          </span>
          
          {/* Subtle accent dot */}
          <div className={`absolute -right-1 -top-1 bg-violet-400 rounded-full border-2 border-indigo-700 ${
            size === 'sm' ? 'w-2 h-2' : size === 'md' ? 'w-2.5 h-2.5' : 'w-4 h-4'
          }`} />
        </div>
      </div>
      
      {/* Brand Text */}
      <span className={`font-display font-black tracking-tight ${
        variant === 'light' ? 'text-white' : 'text-gray-900'
      } ${
        size === 'sm' ? 'text-xl' : size === 'md' ? 'text-2xl' : 'text-4xl'
      }`}>
        SCHOOL<span className="text-indigo-600">LY</span>
      </span>
    </div>
  );
}
