import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
  password: z.string().min(8, 'Password minimal 8 karakter'),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onForgotPassword?: () => void;
  onSwitchToRegister?: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onForgotPassword,
  onSwitchToRegister,
}) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setServerError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email.trim(),
        password: data.password,
      });

      if (error) {
        if (error.message.toLowerCase().includes('invalid login credentials')) {
          setServerError('Email atau password salah. Silakan coba lagi.');
        } else if (error.message.toLowerCase().includes('email not confirmed')) {
          setServerError('Email belum diverifikasi. Silakan periksa inbox email Anda.');
        } else {
          setServerError('Gagal masuk. Periksa kembali informasi login Anda.');
        }
        return;
      }

      // Success redirect to /app (PRD A-05, M-01)
      navigate('/app', { replace: true });
    } catch (err: unknown) {
      console.error('[LoginForm] Unexpected error:', err);
      setServerError('Terjadi kesalahan teknis. Silakan coba beberapa saat lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 w-full" noValidate>
      {serverError && (
        <div
          role="alert"
          className="p-3.5 bg-red-500/10 border-l-4 border-red-500 text-red-600 text-sm flex items-start gap-2.5 font-body leading-snug"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      <div>
        <Input
          label="Email"
          type="email"
          placeholder="nama@perusahaan.com"
          autoComplete="email"
          error={errors.email?.message}
          {...register('email')}
        />
      </div>

      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          placeholder="••••••••"
          autoComplete="current-password"
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

      <div className="flex items-center justify-between text-xs font-body pt-1">
        <span className="text-ink/60">Minimal 8 karakter</span>
        <button
          type="button"
          onClick={() => {
            if (onForgotPassword) {
              onForgotPassword();
            } else {
              navigate('/reset-password');
            }
          }}
          className="text-accent hover:underline font-semibold uppercase tracking-wider cursor-pointer"
        >
          Lupa password?
        </button>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="md"
        loading={isSubmitting}
        className="w-full mt-2"
      >
        {isSubmitting ? 'Memproses...' : 'Masuk ke Akun'}
      </Button>

      {onSwitchToRegister && (
        <p className="text-center font-body text-sm text-ink/60 pt-2">
          Belum punya akun?{' '}
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-ink font-semibold hover:text-accent underline underline-offset-4 cursor-pointer"
          >
            Daftar Sekarang
          </button>
        </p>
      )}
    </form>
  );
};

export default LoginForm;
