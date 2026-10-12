import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { supabase } from '../../lib/supabase';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { AlertCircle, CheckCircle2, Eye, EyeOff } from 'lucide-react';

const registerSchema = z
  .object({
    fullName: z.string().trim().optional(),
    email: z.string().min(1, 'Email wajib diisi').email('Format email tidak valid'),
    password: z.string().min(8, 'Password minimal 8 karakter'),
    confirmPassword: z.string().min(1, 'Konfirmasi password wajib diisi'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Konfirmasi password tidak cocok',
    path: ['confirmPassword'],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSwitchToLogin?: () => void;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    setServerError(null);
    setSuccessMessage(null);
    try {
      const { data: authData, error } = await supabase.auth.signUp({
        email: data.email.trim(),
        password: data.password,
        options: {
          data: {
            full_name: data.fullName?.trim() || null,
          },
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes('user already registered')) {
          setServerError('Email sudah terdaftar. Silakan gunakan email lain atau masuk.');
        } else {
          setServerError(error.message || 'Gagal mendaftar. Silakan coba lagi.');
        }
        return;
      }

      // If session is immediately available (e.g. email confirmation disabled), go to /app
      if (authData.session) {
        navigate('/app', { replace: true });
        return;
      }

      // If email confirmation is enabled on Supabase project
      setSuccessMessage(
        'Pendaftaran berhasil! Tautan konfirmasi telah dikirim ke email Anda. Silakan periksa inbox atau spam.'
      );
    } catch (err: unknown) {
      console.error('[RegisterForm] Unexpected error:', err);
      setServerError('Terjadi kesalahan teknis. Silakan coba beberapa saat lagi.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full" noValidate>
      {serverError && (
        <div
          role="alert"
          className="p-3.5 bg-red-500/10 border-l-4 border-red-500 text-red-600 text-sm flex items-start gap-2.5 font-body leading-snug"
        >
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5 text-red-500" />
          <span>{serverError}</span>
        </div>
      )}

      {successMessage && (
        <div
          role="status"
          className="p-3.5 bg-emerald-500/10 border-l-4 border-emerald-500 text-emerald-800 text-sm flex items-start gap-2.5 font-body leading-snug"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-emerald-600" />
          <div>
            <p className="font-semibold">{successMessage}</p>
            {onSwitchToLogin && (
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="mt-2 text-accent font-semibold hover:underline block"
              >
                Kembali ke Form Masuk →
              </button>
            )}
          </div>
        </div>
      )}

      <div>
        <Input
          label="Nama Lengkap (Opsional)"
          type="text"
          placeholder="Alex Johnson"
          autoComplete="name"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
      </div>

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
          placeholder="Minimal 8 karakter"
          autoComplete="new-password"
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
          label="Konfirmasi Password"
          type={showConfirmPassword ? 'text' : 'password'}
          placeholder="Ulangi password"
          autoComplete="new-password"
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
        {isSubmitting ? 'Mendaftarkan...' : 'Buat Akun Baru'}
      </Button>

      {onSwitchToLogin && (
        <p className="text-center font-body text-sm text-ink/60 pt-2">
          Sudah memiliki akun?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-ink font-semibold hover:text-accent underline underline-offset-4 cursor-pointer"
          >
            Masuk di sini
          </button>
        </p>
      )}
    </form>
  );
};

export default RegisterForm;
