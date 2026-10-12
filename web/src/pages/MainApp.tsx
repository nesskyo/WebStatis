import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import { LogOut, User as UserIcon, ShieldCheck } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const MainApp: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/', { replace: true });
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between selection:bg-accent selection:text-cream">
      {/* Top Header */}
      <header className="px-6 md:px-12 py-5 border-b-2 border-ink flex items-center justify-between bg-cream">
        <div className="flex items-center gap-3">
          <a href="/" className="font-display text-2xl md:text-3xl text-ink tracking-tight">
            NESS
          </a>
          <span className="bg-ink text-cream text-[10px] uppercase font-bold tracking-widest px-2 py-0.5">
            App Area
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 text-xs font-body font-medium text-ink/70">
            <UserIcon size={16} className="text-accent" />
            <span>{user?.email}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-1.5"
          >
            <LogOut size={14} />
            Keluar
          </Button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-4xl mx-auto w-full p-6 md:p-12 flex flex-col justify-center">
        <div className="border-2 border-ink p-8 md:p-12 bg-cream shadow-[10px_10px_0px_0px_#0A0A0A]">
          <div className="inline-flex items-center gap-2 bg-neon/30 text-ink px-3 py-1 font-body text-xs font-bold uppercase tracking-wider mb-4 border border-ink/20">
            <ShieldCheck size={16} className="text-ink" />
            Autentikasi Terverifikasi (Fase 3 Sukses)
          </div>

          <h1 className="font-display text-4xl md:text-5xl text-ink uppercase tracking-tight">
            Selamat Datang di Portal NESS
          </h1>

          <p className="font-body text-base text-ink/80 mt-4 leading-relaxed">
            Anda berhasil masuk sebagai <strong className="text-ink font-semibold">{user?.email}</strong>.
            Sesi autentikasi Supabase Anda aktif dan persisten.
          </p>

          <div className="mt-8 pt-6 border-t border-ink/15 flex flex-wrap gap-4 items-center justify-between">
            <span className="font-body text-xs text-ink/60 uppercase tracking-widest">
              User ID: {user?.id}
            </span>
            <Button variant="secondary" size="sm" onClick={handleLogout}>
              Keluar Sesi (Logout)
            </Button>
          </div>
        </div>
      </main>

      <footer className="px-6 py-4 text-center text-xs font-body text-ink/50 border-t border-ink/10">
        &copy; {CURRENT_YEAR} NESS Studio • Workspace Terproteksi
      </footer>
    </div>
  );
};

export default MainApp;
