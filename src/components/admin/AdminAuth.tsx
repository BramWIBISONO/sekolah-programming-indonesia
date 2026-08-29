import React, { useState } from 'react';
import { Lock, LogIn, UserPlus } from 'lucide-react';
import { ASSETS } from '../../constants/assets';

interface AdminAuthProps {
  onBack: () => void;
  onLogin: (token: string, user: any) => void;
  initialMode?: 'login' | 'signup';
}

export const AdminAuth: React.FC<AdminAuthProps> = ({ onBack, onLogin, initialMode = 'login' }) => {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/signup';
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      if (mode === 'login') {
        onLogin(data.token, data.user);
      } else {
        // Switch to login after successful signup
        setMode('login');
        setError('');
        setPassword('');
        alert('Signup successful! Please login.');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 selection:bg-[#176DF8] selection:text-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <img src={ASSETS.LOGO} alt="SPI Logo" className="h-12 w-auto" />
        </div>
        <h2 className="mt-6 text-center text-2xl font-black text-slate-800">
          Admin Portal
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500">
          Secure Content Management System
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl shadow-slate-200/50 sm:rounded-2xl sm:px-10 border border-slate-100">
          <div className="flex justify-center mb-6 border-b border-slate-100">
            <button
              onClick={() => setMode('login')}
              className={`pb-3 px-4 text-sm font-bold transition-colors ${mode === 'login' ? 'text-[#176DF8] border-b-2 border-[#176DF8]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('signup')}
              className={`pb-3 px-4 text-sm font-bold transition-colors ${mode === 'signup' ? 'text-[#176DF8] border-b-2 border-[#176DF8]' : 'text-slate-400 hover:text-slate-600'}`}
            >
              Sign Up
            </button>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100 text-center font-semibold">
                {error}
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176DF8]/50 focus:border-[#176DF8] sm:text-sm transition-all"
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-4 py-3 border border-slate-200 rounded-xl shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#176DF8]/50 focus:border-[#176DF8] sm:text-sm transition-all"
                  placeholder="••••••••"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-bold text-white bg-[#176DF8] hover:bg-[#1059D4] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#176DF8] disabled:opacity-70 disabled:cursor-not-allowed transition-all cursor-pointer"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {mode === 'login' ? 'Authenticating...' : 'Creating account...'}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    {mode === 'login' ? 'Sign in securely' : 'Create Admin Account'}
                  </span>
                )}
              </button>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <button 
              onClick={onBack}
              className="text-sm font-semibold text-slate-500 hover:text-[#176DF8] transition-colors cursor-pointer"
            >
              &larr; Back to Public Site
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
