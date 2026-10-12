import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { AlertCircle, CheckCircle2, Eye, EyeOff, Lock, ArrowLeft } from 'lucide-react';

const newPasswordSchema = z
  .object({
    password: z.string().min(8, 'Password baru minimal 8 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

type NewPasswordFormData = z.infer<typeof newPasswordSchema>;

const CURRENT_YEAR = new Date().getFullYear();

export const ResetPassword = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPasswordFormData>({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  useEffect(() => {
    // Check if recovery session or token is active
    const checkSession = async () => {
      try {
        const { data } = await supabase.auth.getSession();
        // Even if session isn't loaded immediately, let Supabase process URL hash
        if (!data.session && !window.location.hash.includes('access_token')) {
          // If neither session nor recovery hash present, notify user
          console.warn('[ResetPassword] No recovery session detected in URL or storage.');
        }
      } catch (err) {
        console.error('[ResetPassword] Session check error:', err);
      } finally {
        setIsCheckingSession(false);
      }
    };

    checkSession();
  }, []);

  const onSubmit = async (data: NewPasswordFormData) => {
    setServerError(null);
    try {
      const { error } = await supabase.auth.updateUser({
        password: data.password,
      });

      if (error) {
        setServerError(error.message || 'Gagal memperbarui password. Silakan coba lagi.');
        return;
      }

      setIsSuccess(true);
      setTimeout(() => {
        navigate('/login', { replace: true });
      }, 2500);
    } catch (err: unknown) {
      console.error('[ResetPassword] Update error:', err);
      setServerError('Terjadi kesalahan teknis saat memperbarui password.');
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col justify-between selection:bg-accent selection:text-cream">
      {/* Top Bar */}
      <header className="px-6 md:px-12 py-6 border-b border-ink/10 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-2xl md:text-3xl text-ink tracking-tight hover:text-accent transition-colors"
        >
          NESS
        </a>
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="inline-flex items-center gap-1.5 font-body text-xs uppercase tracking-widest font-semibold text-ink/70 hover:text-ink cursor-pointer"
        >
          <ArrowLeft size={16} />
          Kembali ke Login
        </button>
      </header>

      {/* Main Form Content */}
      <main className="flex-1 flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full max-w-md bg-cream border-2 border-ink p-8 md:p-10 shadow-[8px_8px_0px_0px_#0A0A0A]"
        >
          <div className="mb-8">
            <div className="w-12 h-12 bg-ink text-cream flex items-center justify-center mb-4">
              <Lock size={24} />
            </div>
            <h1 className="font-display text-3xl md:text-4xl text-ink uppercase tracking-tight">
              Password Baru
            </h1>
            <p className="font-body text-sm text-ink/70 mt-2">
              Masukkan password baru untuk mengamankan akun Anda.
            </p>
          </div>

          {serverError && (
            <div
              role="alert"
              className="mb-6 p-3.5 bg-red-500/10 border-l-4 border-red-500 text-red-600 text-sm flex items-start gap-2.5 font-body leading-snug"
            >
              <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
              <span>{serverError}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="p-5 bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-800 space-y-3 font-body">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-6 h-6 shrink-0 mt-0.5 text-emerald-600" />
                <div>
                  <h2 className="font-semibold text-base">Password Berhasil Diperbarui!</h2>
                  <p className="text-xs text-emerald-700 mt-1">
                    Anda sekarang dapat masuk dengan password baru Anda. Mengalihkan ke halaman login...
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => navigate('/login', { replace: true })}
                className="w-full mt-2"
              >
                Masuk Sekarang
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              <div className="relative">
                <Input
                  label="Password Baru"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimal 8 karakter"
                  autoComplete="new-password"
                  disabled={isCheckingSession}
                  error={errors.password?.message}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-[38px] text-ink/40 hover:text-ink transition-colors p-1"
                  aria-label={showPassword ? 'Sembunyikan password' : 'Lihat password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="relative">
                <Input
                  label="Konfirmasi Password Baru"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Ulangi password baru"
                  autoComplete="new-password"
                  disabled={isCheckingSession}
                  error={errors.confirmPassword?.message}
                  {...register('confirmPassword')}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-[38px] text-ink/40 hover:text-ink transition-colors p-1"
                  aria-label={showConfirmPassword ? 'Sembunyikan konfirmasi password' : 'Lihat konfirmasi password'}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <Button
                type="submit"
                variant="primary"
                size="md"
                loading={isSubmitting}
                className="w-full mt-3"
              >
                {isSubmitting ? 'Memperbarui...' : 'Simpan Password Baru'}
              </Button>
            </form>
          )}
        </motion.div>
      </main>

      {/* Footer minimal */}
      <footer className="px-6 py-4 text-center text-xs font-body text-ink/50 border-t border-ink/10">
        &copy; {CURRENT_YEAR} NESS Studio. Hak Cipta Dilindungi.
      </footer>
    </div>
  );
};

export default ResetPassword;
