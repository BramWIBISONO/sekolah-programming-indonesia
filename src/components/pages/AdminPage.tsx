import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Calendar, FileText, BookOpen, Star, Trophy, LogOut } from 'lucide-react';
import { ASSETS } from '../../constants/assets';
import { AdminAuth } from '../admin/AdminAuth';

// Placeholders for the actual managers which we will build next
import { DashboardOverview } from '../admin/DashboardOverview';
import { EventsManager } from '../admin/EventsManager';
import { BlogManager } from '../admin/BlogManager';
import { JournalManager } from '../admin/JournalManager';
import { ProgramsManager } from '../admin/ProgramsManager';
import { AchievementsManager } from '../admin/AchievementsManager';

interface AdminPageProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  onBack: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ currentPath, onNavigate, onBack }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('spi_admin_token'));
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const res = await fetch('/api/auth/me', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        } else {
          setToken(null);
          localStorage.removeItem('spi_admin_token');
        }
      } catch (e) {
        setToken(null);
        localStorage.removeItem('spi_admin_token');
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, [token]);

  const handleLogin = (newToken: string, newUser: any) => {
    localStorage.setItem('spi_admin_token', newToken);
    setToken(newToken);
    setUser(newUser);
    onNavigate('/admin');
  };

  const handleLogout = () => {
    localStorage.removeItem('spi_admin_token');
    setToken(null);
    setUser(null);
    onNavigate('/admin/login');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50">Loading...</div>;
  }

  // Handle unauthenticated routes
  if (!token) {
    if (currentPath === '/admin/signup') {
      return <AdminAuth onBack={onBack} onLogin={handleLogin} initialMode="signup" />;
    }
    return <AdminAuth onBack={onBack} onLogin={handleLogin} initialMode="login" />;
  }

  // Sidebar navigation items
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Upcoming Events', path: '/admin/events', icon: Calendar },
    { name: 'Blog', path: '/admin/blog', icon: FileText },
    { name: 'Journal', path: '/admin/journal', icon: BookOpen },
    { name: 'Monthly Programs', path: '/admin/programs', icon: Star },
    { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-[#0B1220] text-white flex flex-col h-screen sticky top-0">
        <div className="p-6">
          <img src={ASSETS.brand.logo} alt="SPI Logo" className="h-10 w-auto brightness-0 invert cursor-pointer" onClick={() => onNavigate('/admin')} />
        </div>
        
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPath === item.path;
            return (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-[#176DF8] text-white' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </button>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-white/10">
          <div className="px-4 mb-4">
            <p className="text-xs text-slate-500 uppercase font-bold tracking-wider mb-1">Logged in as</p>
            <p className="text-sm font-semibold truncate text-slate-300">{user?.email}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full text-slate-400 hover:text-red-400 hover:bg-red-400/10 rounded-xl font-semibold transition-colors cursor-pointer"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-slate-200 px-8 py-5 flex items-center justify-between shrink-0">
          <h1 className="text-xl font-bold text-slate-800">
            {navItems.find(i => i.path === currentPath)?.name || 'Admin'}
          </h1>
          <button 
            onClick={onBack}
            className="text-sm font-semibold text-[#176DF8] hover:text-[#1059D4] cursor-pointer"
          >
            View Live Site &rarr;
          </button>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          {currentPath === '/admin' && <DashboardOverview />}
          {currentPath === '/admin/events' && <EventsManager token={token} />}
          {currentPath === '/admin/blog' && <BlogManager token={token} />}
          {currentPath === '/admin/journal' && <JournalManager token={token} />}
          {currentPath === '/admin/programs' && <ProgramsManager token={token} />}
          {currentPath === '/admin/achievements' && <AchievementsManager token={token} />}
        </main>
      </div>
    </div>
  );
};
