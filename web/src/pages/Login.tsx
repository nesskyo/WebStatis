import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import ResetForm from '../components/auth/ResetForm';
import { ArrowLeft, Sparkles } from 'lucide-react';

const CURRENT_YEAR = new Date().getFullYear();

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, loading } = useAuth();

  // Mode can be 'login' | 'register' | 'reset'
  const initialMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register' | 'reset'>(initialMode);

  // If user is already authenticated, redirect to /app (PRD §10)
  useEffect(() => {
    if (!loading && user) {
      navigate('/app', { replace: true });
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-cream flex flex-col items-center justify-center p-6">
        <div className="w-12 h-12 border-4 border-ink/20 border-t-accent animate-spin" />
        <p className="mt-4 font-body text-sm font-medium text-ink/70 uppercase tracking-widest">
          Memeriksa Sesi...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between selection:bg-accent selection:text-cream">
      {/* Top Navbar Header */}
      <header className="px-6 md:px-12 py-6 border-b border-ink/10 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-2xl md:text-3xl text-ink tracking-tight hover:text-accent transition-colors"
        >
          NESS
        </a>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest font-semibold text-ink/70 hover:text-ink transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} />
          Kembali ke Beranda
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <div className="w-full max-w-md">
          {/* Decorative Tag / Badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 bg-ink text-cream text-[11px] font-body uppercase font-bold tracking-widest px-2.5 py-1">
              <Sparkles size={12} className="text-neon" />
              Portal Klien & Anggota
            </span>
          </div>

          {/* Form Card Container */}
          <div className="bg-cream border-2 border-ink p-7 md:p-9 shadow-[10px_10px_0px_0px_#0A0A0A]">
            {/* Header Titles */}
            <div className="mb-6">
              <h1 className="font-display text-4xl md:text-5xl text-ink uppercase tracking-tight">
                {mode === 'login'
                  ? 'Selamat Datang'
                  : mode === 'register'
                  ? 'Daftar Akun'
                  : 'Lupa Password'}
              </h1>
              <p className="font-body text-sm text-ink/70 mt-1">
                {mode === 'login'
                  ? 'Masuk untuk mengakses dashboard proyek dan portofolio Anda.'
                  : mode === 'register'
                  ? 'Buat akun baru untuk mulai berkolaborasi dengan NESS Studio.'
                  : 'Pulihkan akses akun Anda dengan cepat.'}
              </p>
            </div>

            {/* Toggle Tabs (Only shown when not in 'reset' mode) */}
            {mode !== 'reset' && (
              <div className="grid grid-cols-2 border-2 border-ink mb-6 p-0.5 bg-ink/5">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`
                    py-2.5 text-xs uppercase font-body font-bold tracking-wider transition-all cursor-pointer
                    ${mode === 'login'
                      ? 'bg-ink text-cream shadow-sm'
                      : 'text-ink/60 hover:text-ink'
                    }
                  `}
                >
                  Masuk (Login)
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`
                    py-2.5 text-xs uppercase font-body font-bold tracking-wider transition-all cursor-pointer
                    ${mode === 'register'
                      ? 'bg-ink text-cream shadow-sm'
                      : 'text-ink/60 hover:text-ink'
                    }
                  `}
                >
                  Daftar (Register)
                </button>
              </div>
            )}

            {/* Form Transitions with Framer Motion */}
            <AnimatePresence mode="wait">
              {mode === 'login' && (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <LoginForm
                    onForgotPassword={() => setMode('reset')}
                    onSwitchToRegister={() => setMode('register')}
                  />
                </motion.div>
              )}

              {mode === 'register' && (
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <RegisterForm onSwitchToLogin={() => setMode('login')} />
                </motion.div>
              )}

              {mode === 'reset' && (
                <motion.div
                  key="reset-form"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <ResetForm onBackToLogin={() => setMode('login')} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      {/* Footer minimal */}
      <footer className="px-6 py-4 text-center text-xs font-body text-ink/50 border-t border-ink/10">
        &copy; {CURRENT_YEAR} NESS Digital Studio. Dirancang dengan presisi editorial.
      </footer>
    </div>
  );
};

export default Login;
